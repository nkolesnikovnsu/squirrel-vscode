import * as vscode from 'vscode';
import { SquirrelDefinitionProvider } from './definitionProvider.js';

export function activate(context: vscode.ExtensionContext) {
    console.log('Squirrel Language extension is now active!');

    const definitionProvider = new SquirrelDefinitionProvider();
    const definitionRegistration = vscode.languages.registerDefinitionProvider(
        { language: 'squirrel' },
        definitionProvider
    );

    const goToDefinitionCommand = vscode.commands.registerCommand(
        'squirrel.goToDefinition',
        () => {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'squirrel') {
                const position = editor.selection.active;
                definitionProvider.provideDefinition(editor.document, position, new vscode.CancellationTokenSource().token)
                    .then((location: vscode.Location | undefined) => {
                        if (location) {
                            vscode.commands.executeCommand('vscode.open', location.uri, {
                                selection: location.range
                            });
                        } else {
                            vscode.window.showInformationMessage('Definition not found');
                        }
                    });
            }
        }
    );

    context.subscriptions.push(definitionRegistration, goToDefinitionCommand);
}

export function deactivate() {} 