const vscode = require('vscode');
const path = require('path');
const fs = require("fs");
const utility = require('./utility');
const squirrel_parser = require('./index');

let tab = searchRecursive(vscode.workspace.workspaceFolders[0].uri.fsPath, '.nut');

function searchRecursive(dir, pattern) {
    var results = [];
    fs.readdirSync(dir).forEach(function (dirInner) {
        dirInner = path.resolve(dir, dirInner);
        var stat = fs.statSync(dirInner);
        if (stat.isDirectory()) {
            results = results.concat(searchRecursive(dirInner, pattern));
        }
        if (stat.isFile() && dirInner.endsWith(pattern)) {
            results.push({ fullPath: dirInner });
        }
    });
    return results;
};

/**
* @param {vscode.TextDocument} fileName
*/
function Parse(fileName = undefined) {
    if (fileName) {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].fullPath == fileName) {
                tab[i].Parse = squirrel_parser.Parse(tab[i].fullPath);
                console.log('[Files.js] Parse для', fileName, '=>', tab[i].Parse);
                return;
            }
        }
    }
    else {
        for (let i = 0; i < tab.length; i++) {
            tab[i].Parse = squirrel_parser.Parse(tab[i].fullPath);
            console.log('[Files.js] Parse для', tab[i].fullPath, '=>', tab[i].Parse);
        }
    }
}


let timeout = undefined;
function init(context) {
    Parse();
    var watchers = [];
    var watcherNUT = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.workspace.workspaceFolders[0], '**/*.nut'), false, true, false);
    watchers.push(watcherNUT);

    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => {
        if (e.document.languageId === "squirrel") {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            timeout = setTimeout(function () {
                Parse(e.document.fileName);
            }, 200)
        }
    }));
    //onDidCreate and onDidDelete
    //context.subscriptions.push(vscode.workspace.onDidRenameFiles(event => {}));
    watcherNUT.onDidCreate((event) => {
        tab.push({
            fullPath: event.fsPath,
            Parse: squirrel_parser.Parse(event.fsPath)
        })
    })

    watcherNUT.onDidDelete((event) => {
        for (let i = 0; i < tab.length; i++) {
            if (event.fsPath == tab[i].fullPath) {
                tab.splice(i, 1);
            }
        }
    })
}


module.exports = {
    init, tab
}
