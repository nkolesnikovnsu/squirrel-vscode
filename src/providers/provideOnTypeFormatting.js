const vscode = require('vscode');
const beautify = require('../js-beautify');
const configuration = vscode.workspace.getConfiguration('vscode-squirrel', undefined)
const indent = require('../indent-only');

class provideOnTypeFormattingEdits extends vscode.TextEdit {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {string} ch
    * @param {vscode.FormattingOptions} options
    * @param {vscode.CancellationToken} token
    * @returns {vscode.TextEdit[]}
    */
    async provideOnTypeFormattingEdits(document, position, ch, options, token) {
        if (ch === "}") {
            let range = new vscode.Range(findMatchingOpeningBrace(document, position.with(position.line, position.character - 1)), position)
            return [vscode.TextEdit.replace(range, indent.formatSquirrelIndent(document.getText(range), options))]
        }
        const fullText = document.lineAt(position.line).text
        const fullRange = new vscode.Range(position.line, 0, position.line, fullText.length);
        return [vscode.TextEdit.replace(fullRange, beautify.js_beautify(fullText, { "indent_with_tabs": configuration.get('IndentWithTabs') }).replace(/local\s+function/g, "local function").replace("< -", "<- "))]
    }
}

function findMatchingOpeningBrace(document, position) {
    let depth = 0;
    let inBlockComment = false;
    let inLineComment = false;
    let inString = false;
    let stringChar = null;

    for (let lineNum = position.line; lineNum >= 0; lineNum--) {
        const lineText = document.lineAt(lineNum).text;
        let charIndex = (lineNum === position.line) ? position.character - 1 : lineText.length - 1;

        while (charIndex >= 0) {
            const ch = lineText[charIndex];
            const prev = charIndex > 0 ? lineText[charIndex - 1] : '';

            if (inBlockComment) {
                if (prev === '/' && ch === '*') { 
                    inBlockComment = false;
                    charIndex -= 2;
                    continue;
                }
                charIndex--;
                continue;
            }

            if (!inBlockComment && prev === '*' && ch === '/') {
                inBlockComment = true;
                charIndex -= 2;
                continue;
            }

            if (inLineComment) {
                break;
            }

            if (inString) {
                if (ch === stringChar) {
                    let escapeCount = 0;
                    let idx = charIndex - 1;
                    while (idx >= 0 && lineText[idx] === '\\') {
                        escapeCount++;
                        idx--;
                    }
                    if (escapeCount % 2 === 0) {
                        inString = false;
                        stringChar = null;
                    }
                }
                charIndex--;
                continue;
            }

            if (!inString && !inLineComment && !inBlockComment) {
                if (prev === '/' && ch === '*') {
                    inBlockComment = true;
                    charIndex -= 2;
                    continue;
                }
                if (prev === '/' && ch === '/') {
                    inLineComment = true;
                    break;
                }
                if (ch === '"' || ch === '\'') {
                    inString = true;
                    stringChar = ch;
                    charIndex--;
                    continue;
                }
            }

            if (ch === '}') {
                depth++;
            } else if (ch === '{') {
                if (depth === 0) {
                    return new vscode.Position(lineNum, 0);
                } else {
                    depth--;
                }
            }

            charIndex--;
        }

        inLineComment = false;
    }
    return null;
}


module.exports = { provideOnTypeFormattingEdits }