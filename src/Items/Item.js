const vscode = require('vscode');

class variable {
    /**
    * @param {vscode.TextDocument} document
    */
    constructor(document) {
        var myArray;
        var regex = /(local|static)?\s?(\w+)\s*(?:=|<-)(?:\s*([\w\.]+)(\(.*\))?|\s*{.*})/gm;
        this.list = [];
        while (myArray = regex.exec(document.getText())) {
            this.list.push(new variableItem(myArray[0], myArray[1], myArray[2], myArray[3]));
        }
    }

    GetVariableCompletionArray() {
        var tab = [];
        for (const element of this.list) {
            tab.push(new vscode.CompletionItem(element.name, vscode.CompletionItemKind.Variable));
        }
        return tab;
    }
}

class variableItem {
    constructor(body, local, name, value) {
        this.body = body;
        this.local = local;
        this.name = name;
        this.value = value;
    }
}

module.exports = {
    variable
}