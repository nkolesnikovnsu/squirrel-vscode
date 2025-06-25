const vscode = require('vscode');
let JSDocElements = require('../Items/jsdoc');


let completions = Object.keys(JSDocElements).map(key => {
    let element = JSDocElements[key];
    let completion = new vscode.CompletionItem(key + " ");
    completion.documentation = element.desc;
    completion.kind = vscode.CompletionItemKind.Snippet;
    if (element.snippet) {
        completion.insertText = new vscode.SnippetString(key + " " + element.snippet);
    }
    if (element.detail) {
        completion.detail = element.detail;
    }
    return completion;
});

class provideCompletionItems extends vscode.CompletionItem {
    /**
    * 
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, context) {
        const line = document.lineAt(position).text;
        let prefix = line.slice(0, position.character);
        if (!prefix.includes('@')) return [];
        const txt = document.getText();
        const matcher = /\/\*\*[^\*](?:\r|\n|.)*?\*\//g;
        let match = matcher.exec(txt);
        let p = document.offsetAt(position);
        while (match) {
            if (match.index > p) {
                match = null;
                break;
            }
            if (match.index < p && match.index + match[0].length > p) {
                break;
            }
            match = matcher.exec(txt);
        }
        if (!match) return [];
        p = prefix.lastIndexOf('@');
        prefix = prefix.slice(p + 1);
        if (prefix.match(/\s/)) return [];
        return completions;
    }
}


module.exports = { provideCompletionItems }