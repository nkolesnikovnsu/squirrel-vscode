"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquirrelDefinitionProvider = void 0;
const vscode = require("vscode");
class SquirrelDefinitionProvider {
    async provideDefinition(document, position, token) {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }
        const symbol = document.getText(wordRange);
        // We are looking for the definition in the current file.
        const localDefinition = this.findDefinitionInDocument(document, symbol, position);
        if (localDefinition) {
            return localDefinition;
        }
        // We are looking for the definition in other files.
        const workspaceDefinition = await this.findDefinitionInWorkspace(document, symbol);
        if (workspaceDefinition) {
            return workspaceDefinition;
        }
        return undefined;
    }
    findDefinitionInDocument(document, symbol, currentPosition) {
        const text = document.getText();
        const lines = text.split('\n');
        const functionPatterns = [
            new RegExp(`^\\s*function\\s+${this.escapeRegex(symbol)}\\s*\\(`, 'm'),
            new RegExp(`^\\s*${this.escapeRegex(symbol)}\\s*=\\s*function\\s*\\(`, 'm'),
            new RegExp(`^\\s*${this.escapeRegex(symbol)}\\s*:\\s*function\\s*\\(`, 'm')
        ];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (const pattern of functionPatterns) {
                if (pattern.test(line)) {
                    const startPos = new vscode.Position(i, line.indexOf(symbol));
                    const endPos = new vscode.Position(i, startPos.character + symbol.length);
                    // Проверяем, что это не то же самое место, где мы находимся
                    if (startPos.line !== currentPosition.line ||
                        startPos.character !== currentPosition.character) {
                        return new vscode.Location(document.uri, new vscode.Range(startPos, endPos));
                    }
                }
            }
        }
        return undefined;
    }
    async findDefinitionInWorkspace(document, symbol) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return undefined;
        }
        const pattern = '**/*.nut';
        try {
            const files = await vscode.workspace.findFiles(pattern, '**/node_modules/**');
            for (const file of files) {
                if (file.fsPath === document.uri.fsPath) {
                    continue;
                }
                try {
                    const content = await vscode.workspace.fs.readFile(file);
                    const text = Buffer.from(content).toString('utf8');
                    const lines = text.split('\n');
                    const functionPatterns = [
                        new RegExp(`^\\s*function\\s+${this.escapeRegex(symbol)}\\s*\\(`, 'm'),
                        new RegExp(`^\\s*${this.escapeRegex(symbol)}\\s*=\\s*function\\s*\\(`, 'm'),
                        new RegExp(`^\\s*${this.escapeRegex(symbol)}\\s*:\\s*function\\s*\\(`, 'm')
                    ];
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        for (const pattern of functionPatterns) {
                            if (pattern.test(line)) {
                                const startPos = new vscode.Position(i, line.indexOf(symbol));
                                const endPos = new vscode.Position(i, startPos.character + symbol.length);
                                return new vscode.Location(file, new vscode.Range(startPos, endPos));
                            }
                        }
                    }
                }
                catch (error) {
                    console.warn(`Error reading file ${file.fsPath}:`, error);
                }
            }
        }
        catch (error) {
            console.warn('Error searching workspace:', error);
        }
        return undefined;
    }
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
exports.SquirrelDefinitionProvider = SquirrelDefinitionProvider;
//# sourceMappingURL=definitionProvider.js.map