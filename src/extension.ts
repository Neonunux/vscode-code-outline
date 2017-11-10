import * as vscode from 'vscode';

import { SymbolOutlineProvider } from './symbolOutline';

export function activate(context: vscode.ExtensionContext) {
    const symbolOutlineProvider = new SymbolOutlineProvider(context);
    vscode.window.registerTreeDataProvider('symbolOutline', symbolOutlineProvider);
    vscode.commands.registerCommand('symbolOutline.refresh', () => {
        symbolOutlineProvider.refresh();
    });
    vscode.commands.registerCommand('symbolOutline.filterVariable', () => {
        symbolOutlineProvider.filterManager('Variable');
    });
    vscode.commands.registerCommand('symbolOutline.filterFunction', () => {
        symbolOutlineProvider.filterManager('Function');
    });
    vscode.commands.registerCommand('symbolOutline.filterClass', () => {
        symbolOutlineProvider.filterManager('Class');
    });
    vscode.commands.registerCommand('symbolOutline.revealRange', (editor: vscode.TextEditor, range: vscode.Range) => {
        editor.revealRange(range, vscode.TextEditorRevealType.Default);
        editor.selection = new vscode.Selection(range.start, range.end);
        vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
    });
}

export function deactivate() {
}
