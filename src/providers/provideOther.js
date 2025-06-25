const vscode = require('vscode');
const fs = require('fs')
const path = require('path')
const configuration = vscode.workspace.getConfiguration('vscode-squirrel', undefined)
const utility = require('../utility');
const file = require('../Files')


class provideOtherCompletion extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, contex) {
            let temp = [];
            let element = FindElement(document)
            let temp2 = undefined
            for (let i = 0; i < element.length; i++) {
                if (element[i].Parse.containerName == "root") {
                    temp.push(CreateCompletion(element[i].Parse, element[i].fullPath))
                }
                else {
                    if (element[i].Parse.location.range.contains(position)) {
                        temp2 = element[i].Parse
                    }
                }
            }
            if (temp2) {
                element = FindElement(document, undefined, temp2.name)
                for (let i = 0; i < element.length; i++) {
                    temp.push(CreateCompletion(element[i].Parse, element[i].fullPath))
                }
            }
            return temp;
    }
}

class provideOtherCompletionDOT extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, contex) {
            const range = document.getWordRangeAtPosition(position.with(position.line, position.character - 1));
            const word = document.getText(range);
            let temp = [];
            let telement2 = FindElement(document, word)
            for (let j = 0; j < telement2.length; j++) {
                let telement = FindElement(document, undefined, telement2[j].Parse.regex[3])
                for (let i = 0; i < telement.length; i++) {
                    temp.push(CreateCompletion(telement[i].Parse, telement[i].fullPath))
                }

            }
            return temp;
    }
}

class provideHover extends vscode.Hover {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @returns {vscode.Hover}
    */
    async provideHover(document, position, token) {
        const commentIndex = document.lineAt(position.line).text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex)
            return (undefined);
        const range = document.getWordRangeAtPosition(position);
        if (range == undefined)
            return (undefined);
            const word = document.lineAt(position.line).text.slice(0, range.end.character).match(/[\w.]+$/g)[0];
            let hover = undefined
            let t = word.split(".")
            if (t.length == 2) {
                let telement = FindElement(document, t[0])
                let telement2 = FindElement(document, t[1])
                for (let j = 0; j < telement2.length; j++) {
                    if (telement2[j].Parse.containerName == telement[0].Parse.regex[3]) {
                        hover = mergeHover(hover, CreateHover(telement2[j].Parse, telement2[j].fullPath, word, range));
                    }
                }
            }
            else {
                let element = FindElement(document, word)
                for (let i = 0; i < element.length; i++) {
                    if (element[i].Parse.containerName == "root") {
                        hover = mergeHover(hover, CreateHover(element[i].Parse, element[i].fullPath, word, range));
                    }
                }
            }
            return hover;
    }
}
function FindElement(document, name = undefined, containerName = undefined) {
    let temp = [];
    let flag = false
    for (let i = 0; i < file.tab.length; i++) {
        flag = false
        if (document.fileName == file.tab[i].fullPath) {
            flag = true
        }
        if (configuration.get('CompletionOtherShowOnlySubfolders')) {
            if (!(path.dirname(file.tab[i].fullPath).replace(path.dirname(document.fileName), "").length < path.dirname(file.tab[i].fullPath).length)) {
                continue;
            }
        }
        for (let j = 0; j < file.tab[i].Parse.length; j++) {
            if (file.tab[i].Parse[j].name != "constructor") {
                if (file.tab[i].Parse[j].data.local == false || flag) {
                    if (name) {
                        if (name == file.tab[i].Parse[j].name) {
                            temp.push({
                                fullPath: file.tab[i].fullPath,
                                Parse: file.tab[i].Parse[j]
                            })
                        }
                    }
                    else if (containerName) {
                        if (containerName == file.tab[i].Parse[j].containerName) {
                            temp.push({
                                fullPath: file.tab[i].fullPath,
                                Parse: file.tab[i].Parse[j]
                            })
                        }
                    }
                    else {
                        temp.push({
                            fullPath: file.tab[i].fullPath,
                            Parse: file.tab[i].Parse[j]
                        })
                    }
                }
            }
        }
    }
    return temp
}

function CreateCompletion(obj, fullPath) {
    let completion = new vscode.CompletionItem(obj.name, SymbolKindTOCompletionKind(obj.kind))
    let documentation = new vscode.MarkdownString()
    let docs = GetJSDOC(obj)
    if (docs) {
        documentation.appendCodeblock(docs.head, "javascript")
        documentation.appendText("\n\n")
        documentation.appendMarkdown(docs.description)
    } else {
        documentation.appendCodeblock(obj.metadata.split('\n')[0], "squirrel")
    }
    documentation.appendText("\n\n" + path.relative(vscode.workspace.workspaceFolders[0].uri.fsPath, fullPath))
    completion.documentation = documentation
    return completion;
}

function CreateHover(obj, fullPath, word, range) {
    let documentation = new vscode.MarkdownString()
    let docs = GetJSDOC(obj)
    if (docs) {
        documentation.appendCodeblock(docs.head, "javascript")
        documentation.appendText("\n\n")
        documentation.appendMarkdown(docs.description)
    }
    else {
        documentation = documentation.appendCodeblock(obj.metadata.split('\n')[0], "squirrel")
    }
    documentation.appendText("\n\n" + path.relative(vscode.workspace.workspaceFolders[0].uri.fsPath, fullPath))
    let hover = new vscode.Hover(documentation, range);
    hover.name = word
    return hover;
}

/**
* @param {vscode.Hover} hover
* @param {vscode.Hover} hover2
*/
function mergeHover(hover, hover2) {
        if (hover == undefined) {
            return hover2
        }
        else {
            hover.contents[0].value += " \n_________________\n" + hover2.contents[0].value
            hover.range = hover2.range;
        }
    return hover;
}

function SymbolKindTOCompletionKind(item) {
    switch (item) {
        case vscode.SymbolKind.Enum:
            return vscode.CompletionItemKind.Enum
        case vscode.SymbolKind.Function:
            return vscode.CompletionItemKind.Function
        case vscode.SymbolKind.Class:
            return vscode.CompletionItemKind.Class
        case vscode.SymbolKind.Variable:
            return vscode.CompletionItemKind.Variable
        case vscode.SymbolKind.Constructor:
            return vscode.CompletionItemKind.Constructor
    }
}

/**
 * Description
 * @param {int} [element] pid description
 * @return {int} [element] pid description
 */
function GetJSDOC(element) {
    try {
        if (element.jsdoc) {
            let head = ""
            if (element.data.local)
                head += "local "
            if (element.data.static)
                head += "static "
            let description = element.jsdoc.parsed.description + "\n"
            head += string_of_enum(vscode.SymbolKind, element.kind).toLowerCase() + " " + (element.containerName == "root" ? "" : (element.containerName + ".")) + element.name
            if (element.kind == vscode.SymbolKind.Function || element.kind == vscode.SymbolKind.Class || element.kind == vscode.SymbolKind.Method) {
                head += "("
            }
            let returns = ""
            for (let i = 0; i < element.jsdoc.parsed.tags.length; i++) {
                if (element.jsdoc.parsed.tags[i].tag == "param") {
                    head += element.jsdoc.parsed.tags[i].name + ": " + (element.jsdoc.parsed.tags[i].optional ? element.jsdoc.parsed.tags[i].type + "?" : element.jsdoc.parsed.tags[i].type)
                }
                if (element.jsdoc.parsed.tags[i].tag == "return" || element.jsdoc.parsed.tags[i].tag == "returns" || element.jsdoc.parsed.tags[i].tag == "type") {
                    returns += ": " + element.jsdoc.parsed.tags[i].type
                }
                description += "\n`@" + element.jsdoc.parsed.tags[i].tag + " " + element.jsdoc.parsed.tags[i].name + "`" + (element.jsdoc.parsed.tags[i].description != "" ? " - " + element.jsdoc.parsed.tags[i].description : "") + "\n"
            }
            if (element.kind == vscode.SymbolKind.Function || element.kind == vscode.SymbolKind.Class || element.kind == vscode.SymbolKind.Method) {
                head += ")"
            }
            head += returns

            return {
                head: head,
                description: description
            }
        }
    } catch {
        return undefined;
    }
}

function string_of_enum(enumn, value) {
    for (var k in enumn) if (enumn[k] == value) return k;
    return null;
}
module.exports = { provideOtherCompletion, provideOtherCompletionDOT, provideHover }