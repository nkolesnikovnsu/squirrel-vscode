const vscode = require('vscode');
const APIparser = require('../DOCS/APIparser')
const item = require('../Items/Item');

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
            for (const element of APIparser.SharedHover) {
                if (word == element.name) {
                    element.range = range;
                    return element;
                }
            }
            for (const element of APIparser.Constants) {
                for (const element2 of element.hover) {
                    if (word == element2.name) {
                        element2.range = range;
                        return element2;
                    }
                }
            }
            var variable = new item.variable(document);
            if (word.indexOf('.') != -1) {
                for (const element of variable.list) {
                    if (word.split('.')[0] == element.name) {
                        for (const element2 of APIparser.aDOT) {
                            if (element.value == element2.name) {
                                    for (const element3 of element2.Hover) {
                                        if (word.split('.')[1] == element3.name.split('.')[1]) {
                                            element3.range = range;
                                            return element3;
                                        }
                                    }
                            }
                        }
                    }
                }
            }
            return undefined;
    }
}

module.exports = { provideHover }