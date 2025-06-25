const vscode = require('vscode');
const APIparser = require('../DOCS/APIparser')
const item = require('../Items/Item');

class provideSignatureHelp extends vscode.SignatureHelp {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.SignatureHelpContext} context
    * @returns {SignatureHelp}
    */
    async provideSignatureHelp(document, position, token, context) {
        const line = document.lineAt(position.line);
        let Idx = line.text.lastIndexOf('(', position.character)
        let Idx2 = line.text.lastIndexOf(',', position.character)
        if (Idx === -1 && Idx2 === -1) {
            return ([]);
        }
            var reg = /([\w.]+)\s?\(/g;
            let match;
            let match2 = []
            while (match = reg.exec(line.text)) {
                var end = line.text.length;
                var licznik = 1;
                for (var i = match.index + match[0].length; i < line.text.length; i++) {
                    if (line.text[i] == ")") licznik = licznik - 1;
                    else if (line.text[i] == "(") licznik = licznik + 1;
                    if (licznik == 0) {
                        end = i;
                        break;
                    }
                }
                match2.push({ value: match[1], range: new vscode.Range(new vscode.Position(line.lineNumber, match.index + match[0].length), new vscode.Position(line.lineNumber, end)) })
            }
            var variable = new item.variable(document);
            for (var i = match2.length - 1; i >= 0; i--) {
                if (match2[i].range.contains(position)) {
                    if (match2[i].value.indexOf('.') != -1) {
                        var temp = match2[i].value.split('.');
                        for (const element of variable.list) {
                            if (temp[0] == element.name.split('.')[0]) {
                                for (const element2 of APIparser.aDOT) {
                                    if (element2.name == element.value) {
                                        for (const element3 of element2.SignatureInformation) {
                                            if (element3.name.split('.')[1] == temp[1]) {
                                                let signatureHelp = new vscode.SignatureHelp();
                                                signatureHelp.signatures.push(element3);
                                                signatureHelp.activeParameter = document.getText(match2[i].range).split(',').length - 1;
                                                return signatureHelp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let signatureHelp = new vscode.SignatureHelp();
                    signatureHelp = GetsignatureHelp(signatureHelp, APIparser.SharedSignature, match2[i].value);
                    signatureHelp.activeParameter = document.getText(match2[i].range).split(',').length - 1;
                    return signatureHelp;
                }
            }
            return undefined;
    }
}

function GetsignatureHelp(signatureHelp, doc, match) {
    for (const element of doc) {
        if (element.name == match) {
            signatureHelp.signatures.push(element);
        }
    }
    return signatureHelp;
}

module.exports = { provideSignatureHelp }