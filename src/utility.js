const vscode = require('vscode');
const fs = require('fs')
const path = require('path')

function searchRecursive(dir, pattern) {
    var results = [];
    fs.readdirSync(dir).forEach(function (dirInner) {
        dirInner = path.resolve(dir, dirInner);
        var stat = fs.statSync(dirInner);
        if (stat.isDirectory()) {
            results = results.concat(searchRecursive(dirInner, pattern));
        }
        if (stat.isFile() && dirInner.endsWith(pattern)) {
            results.push(dirInner);
        }
    });
    return results;
};

function matchLineNumber(m) {
    if (!m) return -1;
    let line = 0;
    let character = 0;
    for (let i = 0; i < m.index; i++) {
        character++;
        if (m.input[i] == '\n') {
            character = 0;
            line++;
        }
    }
    return new vscode.Position(line, character);
}
function indexLineNumber(index, txt) {
    if (typeof index != "number") return -1;
    let line = 0;
    let character = 0;
    for (let i = 0; i < index; i++) {
        character++;
        if (txt[i] == '\n') {
            character = 0;
            line++;
        }
    }
    return new vscode.Position(line, character);
}

function PositionToIndex(str, position) {
    let line = 0;
    let character = 0;
    let index = 0;
    for (let i = 0; i < str.length; i++) {
        index++;
        character++;
        if (str[i] == '\n') {
            character = 0;
            line++;
        }
        if (position.line == line && position.character == character) {
            return index;
        }

    }
    return -1;
}

function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}
function isObject(object) {
    return object != null && typeof object === 'object';
}

module.exports = { searchRecursive, matchLineNumber, PositionToIndex, indexLineNumber, deepEqual}