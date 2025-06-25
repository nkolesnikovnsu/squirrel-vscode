const vscode = require('vscode');
const file = require('../Files')

class provideDefinition {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @returns {vscode.Definition|vscode.LocationLink[]}
    */
    async provideDefinition(document, position, token) {
        console.log('[GoToDef] Запуск provideDefinition');
        const commentIndex = document.lineAt(position.line).text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex) {
            console.log('[GoToDef] Курсор в комментарии, выход');
            return undefined;
        }
        const range = document.getWordRangeAtPosition(position);
        if (range == undefined) {
            console.log('[GoToDef] Не найдено слово под курсором');
            return undefined;
        }
        const word = document.lineAt(position.line).text.slice(0, range.end.character).match(/[\w.]+$/g)[0];
        console.log('[GoToDef] Ищу определение для слова:', word);
        for (let i = 0; i < file.tab.length; i++) {
            for (let j = 0; j < file.tab[i].Parse.length; j++) {
                if (file.tab[i].Parse[j].name == word) {
                    console.log('[GoToDef] Найдено определение:', file.tab[i].Parse[j]);
                    return file.tab[i].Parse[j].location
                }
            }
        }
        console.log('[GoToDef] Определение не найдено');
    }
}

function children(symbols, word) {
    for (const element of symbols) {
        if (element.name == word || "this." + element.name == word) {
            return element.location
        }
        else {
            let result = children(element.children, word)
            if (result != undefined) {
                return result
            }
        }
    }
    return undefined;
}

module.exports = { provideDefinition }