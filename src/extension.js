const vscode = require('vscode')
const provideSignatureHelp = require('./providers/provideSignatureHelp').provideSignatureHelp
const provideCompletionItems = require('./providers/provideCompletionItems')
const provideHover = require('./providers/provideHover').provideHover
const provideInlayHints = require('./providers/provideInlayHints');
const provideOnType = require('./providers/provideOnTypeFormatting').provideOnTypeFormattingEdits;
const beautify = require('./js-beautify');
//const squirrel_parser = require('vscode-squirrel_parser');
const squirrel_parser = require('./index');
const APIparser = require('./DOCS/APIparser')
new APIparser.APIparser(require('./DOCS/api.json'));
const provideOther = require('./providers/provideOther')
const provideDefinitionProvider = require('./providers/provideDefinitionProvider')
let JSDocElements = require('./providers/provideCompletionItemsJSDOC');
const path = require('path');
const utility = require('./utility');
const UnreachableCode = require('./UnreachableCode');
let timeout = undefined;

const decorationType = vscode.window.createTextEditorDecorationType({
    opacity: '0.7',
    fontStyle: 'italic',
    backgroundColor: 'rgba(255, 0, 0, 0.15)',
    isWholeLine: true
});

let activeEditor = vscode.window.activeTextEditor
/**
* @param {vscode.ExtensionContext} context
*/
//export function activate(context) {
function activate(context) {
    // let a = vscode.extensions.getExtension("marcinbar.vscode-squirrel")
    //  //let b = a.exports
    //  console.log(a)

    console.log('[EXT] Активирован extension.js');
    const file = require('./Files')
    file.init(context);
    const configuration = vscode.workspace.getConfiguration('vscode-squirrel', undefined)
    if (configuration.get('CompletionOther')) {
        context.subscriptions.push(vscode.languages.registerHoverProvider('squirrel', new provideOther.provideHover({})))
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider('squirrel', new provideOther.provideOtherCompletion()));
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider('squirrel', new provideOther.provideOtherCompletionDOT(), '.'))
    }
    if (configuration.get('OnTypeFormatting')) {
        const notifyFormatOnType = context.globalState.get("vscode-squirrel.notifyFormatOnType") ?? true
        if (notifyFormatOnType && !vscode.workspace.getConfiguration('editor', undefined).get('formatOnType')) {
            vscode.window.showInformationMessage("Format On Type must be checked to fully work Squirrel Language Supports extension. Do you want enable Format On Type?", "Yes", "No", "No and don't ask").then(function (output) {
                if (output == "Yes") {
                    vscode.workspace.getConfiguration('editor', undefined).update('formatOnType', true, vscode.ConfigurationTarget.Global);
                }
                else if (output == "No and don't ask") {
                    context.globalState.update("vscode-squirrel.notifyFormatOnType", false);
                }
            })
        }
    }
    if (configuration.get('OnTypeFormatting')) {
        context.subscriptions.push(vscode.languages.registerOnTypeFormattingEditProvider('squirrel', new provideOnType(), ')', ';', '}'))
    };
    if (configuration.get('InlayHints') != "disable") {
        context.subscriptions.push(vscode.languages.registerInlayHintsProvider('squirrel', new provideInlayHints.provideInlayHints()))
    }
    if (configuration.get('SignatureHelp')) { context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('squirrel', new provideSignatureHelp(), '(', ',')) }
    if (configuration.get('Hover')) { context.subscriptions.push(vscode.languages.registerHoverProvider('squirrel', new provideHover({}))) }
    if (configuration.get('Completion')) {
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider('squirrel', new provideCompletionItems.provideCompletionItems()))
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider('squirrel', new provideCompletionItems.provideCompletionItemsDOT(), '.'))
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider('squirrel', new JSDocElements.provideCompletionItems(), '@'))
    }

    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider('squirrel', {
        async provideDocumentSymbols(document, token) {
            return squirrel_parser.Parse(document.fileName);
        }
    }))
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('squirrel', {
        provideDocumentFormattingEdits(document, options, token) {
            const fullText = document.getText()
            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
            let config = Object.assign(configuration.inspect('FormatterOptions').defaultValue, configuration.inspect('FormatterOptions').globalValue)
            return [vscode.TextEdit.replace(fullRange, beautify.js_beautify(fullText, config))];
        }
    }));
    // context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider({ language: 'squirrel' }, {
    //     provideDocumentRangeFormattingEdits(document, range, options, token) {
    //         // const fullText = document.getText()
    //         // const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
    //         // let config = Object.assign(configuration.inspect('FormatterOptions').defaultValue, configuration.inspect('FormatterOptions').globalValue)
    //         // return [vscode.TextEdit.replace(fullRange, beautify.js_beautify(fullText, config).replace(/local\s+function/g, "local function").replace(/static\s+function/g, "static function").replace(/< -/g, "<- ").replace(/<= >/g, "<=>"))];
    //     }
    // }));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('squirrel', new provideDefinitionProvider.provideDefinition()))
    if (configuration.get('TrailingWhitespace')) {
        context.subscriptions.push(vscode.workspace.onWillSaveTextDocument((event) => {
            var editor = vscode.window.activeTextEditor;
            if (!editor) return null;
            if (path.extname(event.document.fileName) == ".nut") {
                let ranges = [];
                var reg = /[ \t]+$/gm;
                let match;
                while (match = reg.exec(editor.document.getText())) {
                    let matchLineNumber = utility.matchLineNumber(match);
                    let range = new vscode.Range(matchLineNumber.line, matchLineNumber.character, matchLineNumber.line, matchLineNumber.character + match[0].length);
                    ranges.push(range)
                }
                event.waitUntil(Promise.resolve(ranges.map((r) => { return vscode.TextEdit.delete(r); })));
            }
        }));
    }

    if (configuration.get('UnreachableCode')) {
        function highlightUnreachable(editor = vscode.window.activeTextEditor) {
            const diagnostics = UnreachableCode.analyzeUnreachableCode(editor.document);
            const decorationsArray = diagnostics.map(d => ({
                range: d.range,
                hoverMessage: "Unreachable code detected"
            }));
            editor.setDecorations(decorationType, decorationsArray);
        }

        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
            activeEditor = editor;
            if (editor) {
                if (editor.document.languageId === "squirrel") {
                    highlightUnreachable(editor)
                }
            }
        }, null, context.subscriptions))
        context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            timeout = setTimeout(function () {
                if (event.document.languageId === "squirrel") {
                    if (activeEditor && event.document === activeEditor.document) {
                        highlightUnreachable(activeEditor)
                    }
                }
            }, 300)
        }, null, context.subscriptions));
        if (activeEditor) {
            if (activeEditor.document.languageId === "squirrel") {
                highlightUnreachable(activeEditor)
            }
        }
    }

    vscode.workspace.onDidChangeConfiguration(event => {
        let affected = event.affectsConfiguration("vscode-squirrel");
        if (affected) {
            vscode.commands.executeCommand("workbench.action.restartExtensionHost");
        }
    })
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}