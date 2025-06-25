"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const definitionProvider_1 = require("./definitionProvider");
function activate(context) {
    console.log('Squirrel Language extension is now active!');
    const definitionProvider = new definitionProvider_1.SquirrelDefinitionProvider();
    const definitionRegistration = vscode.languages.registerDefinitionProvider({ language: 'squirrel' }, definitionProvider);
    const goToDefinitionCommand = vscode.commands.registerCommand('squirrel.goToDefinition', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === 'squirrel') {
            const position = editor.selection.active;
            definitionProvider.provideDefinition(editor.document, position, new vscode.CancellationTokenSource().token)
                .then((location) => {
                if (location) {
                    vscode.commands.executeCommand('vscode.open', location.uri, {
                        selection: location.range
                    });
                }
                else {
                    vscode.window.showInformationMessage('Definition not found');
                }
            });
        }
    });
    context.subscriptions.push(definitionRegistration, goToDefinitionCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map