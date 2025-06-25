const vscode = require('vscode');
const fs = require('fs');
const JSDOCParse = require('comment-parser');
//const tokenize = require("./tokenize")

const commentblock = /\/\*(?<=\*)\s*(?:[^\*]|\*[^\/])*\*\/|\/\/.*$|\#.*$/gm;
const JSDOC = /(\/\*\*\s*\n(?:[^\*]|\*[^\/])*\*\/\s*)?/;

let JSDOCText = [];

//const code = vscode.window.activeTextEditor.document.fileName
// const result = this.Parse(code)
// console.log(result);

exports.Parse = function (fileName) {
    console.log('[index.js] Parse для', fileName);
    
    // Проверяем наличие активного редактора
    const activeEditor = vscode.window.activeTextEditor;
    
    let text;
    if (activeEditor && activeEditor.document.fileName === fileName) {
        // Если есть активный редактор и он открытый файл совпадает с нужным
        text = activeEditor.document.getText();
    } else {
        // Иначе читаем файл напрямую через fs
        text = fs.readFileSync(fileName, 'utf8');
    }

    // Остальной ваш код обработки текста...
    if (text.length > 500000) {
        console.warn('[Parse] Файл слишком большой, парсинг пропущен:', fileName);
        return [];
    }

    const temptext = RemoveComment(text);

    const reg = [
        /(local\s|static\s)?enum\s*([\w.:]+)\s*{/gm,
        /(local\s|static\s)?([\w.:]+)\s*<-\s*function\s*(\([^\)]*\))\s*{/gms,
        /(local\s|static\s)?function\s*([\w.:]+)\s?\([^\)]*\)\s*{/gms,
        /(local\s|static\s)?class\s*([\w.:]+)\s*(extends\s+[\w.:]+\s*)?{/gm,
        /(?<=\s)(local\s|static\s)?(\w+)\s*(?:=|<-)\s*((?!function\b)(?:[-\w\.\"\[\]{]+)(\(.*\))?|\s*{.*})/gm,
        /(local\s|static\s)?(constructor)\s*\s?\(.*\)\s*{/gm
    ];

    const SymbolKind = [
        vscode.SymbolKind.Enum,
        vscode.SymbolKind.Function,
        vscode.SymbolKind.Function,
        vscode.SymbolKind.Class,
        vscode.SymbolKind.Variable,
        vscode.SymbolKind.Constructor,
    ];

    const rootNode = GETBracketTree(temptext);
    if (rootNode === null) {
        return [];
    }
    let symbolsList = [];

    for (let j = 0; j < reg.length; j++) {
        if (SymbolKind[j] === vscode.SymbolKind.Variable) {
            let match;
            while ((match = reg[j].exec(temptext))) {
                const range = new vscode.Range(indexLineNumber(match.index + match[0].length, temptext), indexLineNumber(match.index, temptext));
                const location = new vscode.Location(vscode.Uri.file(fileName), range);
                const parentNode = FindNode(match.index, rootNode);
                const parentName = parentNode ? parentNode.name : match[2];
                const info = new vscode.SymbolInformation(match[2], SymbolKind[j], parentName, location);
                info.data = GETLocalOrStatic(match[1]);
                info.metadata = match[0];
                info.regex = match;
                symbolsList.push(info);
            }
        } else {
            let match;
            while ((match = reg[j].exec(temptext))) {
                UpdateBracketTreeNames(match, SymbolKind[j], rootNode);
            }
        }
        reg[j].lastIndex = 0;
    }

    const treeSymbols = MakeSymbolsList(rootNode, '', temptext, fileName);
    symbolsList.push(...treeSymbols);

    symbolsList = addJSDOC(symbolsList, JSDOCText);
    return symbolsList;
};

function addJSDOC(symbolsList, JSDOCText) {
    for (const element of JSDOCText) {
        const temprange = new vscode.Position(element.range.end.line + 1, element.range.end.character);
        for (const symbol of symbolsList) {
            if (!symbol.jsdoc && symbol.location.range.contains(temprange)) {
                symbol.jsdoc = element;
                break;
            }
        }
    }
    return symbolsList;
}

function UpdateBracketTreeNames(match, type, currNode) {
    const matchPos = match.index + match[0].length;
    const targetNode = findNearestNode(matchPos, currNode, 10);

    if (targetNode) {
        targetNode.name = match[2];
        targetNode.type = type;
        targetNode.start = match.index;
        targetNode.localOrStatic = GETLocalOrStatic(match[1]);
    }
}

function findNearestNode(pos, node, tolerance) {
    for (const child of node.childs) {
        if (Math.abs(child.start - pos) <= tolerance) {
            return child;
        }
        const deep = findNearestNode(pos, child, tolerance);
        if (deep) return deep;
    }
    return null;
}

function MakeSymbolsList(currNode, parentName, temptext, fileName) {
    let symbolsList = [];
    let currName = currNode.name || `${parentName}(${currNode.start}:${currNode.end})`;

    if (currNode.type && currNode.localOrStatic) {
        const range = new vscode.Range(indexLineNumber(currNode.start, temptext), indexLineNumber(currNode.end, temptext));
        const location = new vscode.Location(vscode.Uri.file(fileName), range);
        const info = new vscode.SymbolInformation(currNode.name, currNode.type, parentName, location);
        info.data = currNode.localOrStatic;
        info.metadata = temptext.substring(currNode.start, currNode.end + 1);
        symbolsList.push(info);
    }

    if (currNode.type === vscode.SymbolKind.Enum) {
        const enumText = temptext.substring(currNode.start, currNode.end + 1);
        const lines = enumText.split('\n');
        let offset = currNode.start;

        for (let line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
                offset += line.length + 1;
                continue;
            }

            const match = /^\s*([\w_]+)\s*,?/.exec(trimmed);
            if (match) {
                const memberName = match[1];
                const memberStart = offset + line.indexOf(memberName);
                const memberEnd = memberStart + memberName.length;

                const range = new vscode.Range(indexLineNumber(memberStart, temptext), indexLineNumber(memberEnd, temptext));
                const location = new vscode.Location(vscode.Uri.file(fileName), range);
                const info = new vscode.SymbolInformation(memberName, vscode.SymbolKind.EnumMember, currNode.name, location);
                symbolsList.push(info);
            }

            offset += line.length + 1;
        }
    }

    for (const child of currNode.childs) {
        symbolsList.push(...MakeSymbolsList(child, currName, temptext, fileName));
    }

    return symbolsList;
}

function FindNode(pos, currNode) {
    if (pos < currNode.start || pos > currNode.end) return null;
    for (const child of currNode.childs) {
        const result = FindNode(pos, child);
        if (result) return result;
    }
    return currNode;
}

function GETBracketTree(text) {
    const rootNode = {
        start: 0,
        end: text.length,
        name: 'root',
        parentNode: null,
        childs: []
    };
    let curNode = rootNode;
    const startStack = [];
    const MAX_DEPTH = 1000; // или другое разумное значение

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{') {
            if (startStack.length > MAX_DEPTH) {
                console.warn('[Parse] Превышена максимальная вложенность скобок, файл пропущен');
                return null;
            }
            startStack.push(i);
            const newNode = {
                start: i,
                end: text.length,
                name: '',
                parentNode: curNode,
                childs: []
            };
            curNode.childs.push(newNode);
            curNode = newNode;
        } else if (text[i] === '}') {
            if (startStack.length > 0) {
                curNode.end = i;
                curNode = curNode.parentNode;
                startStack.pop();
            }
        }
    }
    return rootNode;
}

function Spacebar(m) {
    return ' '.repeat(m);
}

function RemoveComment(text) {
    JSDOCText = [];
    return text.replace(commentblock, (match, offset, string) => {
        const jsdoc = JSDOC.exec(match);
        if (jsdoc?.[0]?.trim()) {
            JSDOCText.push({
                text: jsdoc[0],
                range: new vscode.Range(indexLineNumber(offset, string), indexLineNumber(offset + jsdoc[0].length, string)),
                parsed: JSDOCParse.parse(jsdoc[0])[0],
            });
        }
        return match.split("\n").map(line => Spacebar(line.length)).join("\n");
    });
}

function GETLocalOrStatic(modifier) {
    const trimmed = (modifier || '').trim();
    return {
        local: trimmed === 'local',
        static: trimmed === 'static'
    };
}

function indexLineNumber(index, txt) {
    let line = 0, character = 0;
    for (let i = 0; i < index; i++) {
        character++;
        if (txt[i] === '\n') {
            line++;
            character = 0;
        }
    }
    return new vscode.Position(line, character);
}