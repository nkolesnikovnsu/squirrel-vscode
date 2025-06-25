const vscode = require('vscode');
const item = require('../Items/Item');
const APIparser = require('../DOCS/APIparser')

class provideCompletionItems extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, context) {
            return [...APIparser.SharedCompletion, ...GetConstants(APIparser.Constants, "constants")];
    }
}

class provideCompletionItemsDOT extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, contex) {
        let line = document.lineAt(position.line)
        let dotIdx = line.text.lastIndexOf('.', position.character)
        if (dotIdx === -1) {
            return [];
        }
        const commentIndex = line.text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex) {
            return [];
        }

            const range = document.getWordRangeAtPosition(position.with(position.line, position.character - 1));
            const word = document.getText(range);
            var variable = new item.variable(document);
            for (const element of APIparser.aDOT) {
                if (element.static == true) {
                    if (word == element.name) {
                        return element.Completion;
                    }
                } else {
                    for (const element2 of variable.list) {
                        if (word == element2.name) {
                            if (element.name == element2.value) {
                                return element.Completion;
                            }
                        }
                    }
                }
            }
            return [];
    }
}

function GetConstants(Constants, category) {
    for (const element of Constants) {
        if (element.category == category) {
            return element.completion;
        }
    }
    return null;
}

module.exports = { provideCompletionItems, provideCompletionItemsDOT }