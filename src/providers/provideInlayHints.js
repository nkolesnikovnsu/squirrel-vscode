const vscode = require('vscode');
const APIparser = require('../DOCS/APIparser')
const configuration = vscode.workspace.getConfiguration('vscode-squirrel', undefined)
const utility = require('../utility');

class provideInlayHints extends vscode.InlayHint {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @returns {vscode.T[]}
    */
    async provideInlayHints(document, range, token) {
            var reg = /([\w\.]+\()(.*)\)|\s*{.*}/g;
            var regforparameters = /(?:[^,()]+(?:\((?:[^()]|\(|\))*\))*)+/g;
            let match;
            let match2;
            let temp = [];
            while (match = reg.exec(document.getText())) {
                var temp2 = {
                    name: match[1].replace(/\s*\(/, ""),
                    parameters: [],
                    position: [],
                }
                while (match2 = regforparameters.exec(match[2])) {
                    temp2.parameters.push(match2[0]);
                    temp2.position.push(document.positionAt(match.index + match[1].length + match2.index));
                }
                temp.push(temp2);
            }
            return GetInlayHints(APIparser.SharedSignature, temp);
    }
}
function GetInlayHints(doc, temp2) {
    var tab = [];
    for (const elementtemp of temp2) {
        for (const element of doc) {
            if (element.name == elementtemp.name) {
                for (let i = 0; i < element.parameters.length; i++) {
                    if (configuration.get('InlayHints') == "both")
                        var temp = new vscode.InlayHint(elementtemp.position[i], element.parameters[i].label + ":" + element.parameters[i].type, vscode.InlayHintKind.Parameter)
                    if (configuration.get('InlayHints') == "params")
                        var temp = new vscode.InlayHint(elementtemp.position[i], element.parameters[i].label + ":", vscode.InlayHintKind.Parameter)
                    if (configuration.get('InlayHints') == "type")
                        var temp = new vscode.InlayHint(elementtemp.position[i], element.parameters[i].type + ":", vscode.InlayHintKind.Parameter)
                    temp.tooltip = new vscode.MarkdownString(element.parameters[i].documentation);
                    temp.paddingRight = true;
                    temp.name = element.name;
                    if (!CheckExists(tab, temp)) {
                        tab.push(temp);
                    }
                }
            }
        }
    }
    return tab;
}

function CheckExists(tab, check) {
    for (const element of tab) {
        if (utility.deepEqual(element, check)) {
            return true;
        }
    }
    return false;
}

module.exports = { provideInlayHints }