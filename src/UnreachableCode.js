const vscode = require('vscode');

/**
 * Analyze unreachable code in a given document and return diagnostics.
 * @param {vscode.TextDocument} document
 * @returns {vscode.Diagnostic[]}
 */
function analyzeUnreachableCode(document) {
    const diagnostics = [];

    // Stacks to manage block structures
    const blockStack = [];
    const unreachableFromLine = new Map();
    const deadControlStack = [];
    const unreachableLines = [];
    const switchStack = [];

    let inBlockComment = false;
    let inString = false;
    let stringChar = null;

    let lastControlStatement = null;
    let controlStatementJustReturned = false;

    const linesToSkipUnreachableCheck = new Set();

    /**
     * Check if the current context is inside a catch block.
     * Helps to avoid false positives after try-catch constructs.
     */
    function isInCatchBlock() {
        for (let i = blockStack.length - 1; i >= 0; i--) {
            if (blockStack[i].type === 'catch') return true;
            if (blockStack[i].type === 'try') break;
        }
        return false;
    }

    /**
     * PREPROCESSING: Pre-mark lines that should be skipped for unreachable analysis.
     * For example, when 'else' without braces has a single 'return' statement.
     */
    function preprocessControlBlocks() {
        for (let lineNum = 0; lineNum < document.lineCount - 1; lineNum++) {
            const lineText = document.lineAt(lineNum).text.trim();
            const nextLineText = document.lineAt(lineNum + 1).text.trim();

            // Detect control statements without braces
            if (/(if|else|while|for|catch)\b/.test(lineText) && !lineText.endsWith('{')) {
                // If next line is return/break/continue, mark following lines as safe
                if (/^\s*(return|break|continue)\s*;?\s*$/.test(nextLineText)) {
                    let l = lineNum + 2;
                    let prev = lineNum + 1;
                    while (l < document.lineCount) {
                        if (!document.lineAt(l).text.trim()) break;
                        if (l !== prev + 1) break;
                        linesToSkipUnreachableCheck.add(l);
                        prev = l;
                        l++;
                    }
                }
            }
        }
    }

    preprocessControlBlocks();

    // MAIN PASS: Analyze the document line by line
    for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
        const rawLine = document.lineAt(lineNum).text;
        let cleanLine = '';
        let i = 0;

        // Clean the line from comments and strings
        while (i < rawLine.length) {
            const ch = rawLine[i];
            const next = i + 1 < rawLine.length ? rawLine[i + 1] : '';

            if (inBlockComment) {
                if (ch === '*' && next === '/') {
                    inBlockComment = false;
                    i += 2;
                } else {
                    i++;
                }
                continue;
            }

            if (!inString && ch === '/' && next === '*') {
                inBlockComment = true;
                i += 2;
                continue;
            }

            if (!inString && ch === '/' && next === '/') break;

            if (!inString && (ch === '"' || ch === "'")) {
                inString = true;
                stringChar = ch;
                cleanLine += ' ';
                i++;
                continue;
            }

            if (inString) {
                if (ch === stringChar && rawLine[i - 1] !== '\\') {
                    inString = false;
                    stringChar = null;
                }
                cleanLine += ' ';
                i++;
                continue;
            }

            cleanLine += ch;
            i++;
        }

        const trimmed = cleanLine.trim();
        if (!trimmed) {
            lastControlStatement = null;
            continue;
        }


        // Prevent marking unreachable after single-line control statements without braces:
        // examples: if (cond) return;, else return;, while (cond) break;, for (...) continue;, catch (...) return;
        if (/^(if|else|while|for|catch)\s*(\([^)]*\))?\s*(return|break|continue)\s*;?$/.test(trimmed)) {
            controlStatementJustReturned = false;
            lastControlStatement = null;
            continue;
        }

        // Handle control statements without braces
        const noBraceControlMatch = /^\s*(if|else|while|for|catch)\b.*\)\s*$/.exec(trimmed);
        const lineEndsWithBrace = trimmed.endsWith('{');

        if (noBraceControlMatch && !lineEndsWithBrace) {
            lastControlStatement = { type: noBraceControlMatch[1], line: lineNum };
        } else if (
            lastControlStatement &&
            /^\s*(return|throw|continue)\s*;?\s*$/.test(trimmed)
        ) {
            controlStatementJustReturned = true;
            linesToSkipUnreachableCheck.add(lineNum + 1);
        } else {
            controlStatementJustReturned = false;
            lastControlStatement = null;
        }

        // Handle block starts
        if (trimmed.includes('{')) {
            const lower = trimmed.toLowerCase();
            let type = 'block';
            if (/^\s*try\b/.test(lower)) type = 'try';
            else if (/^\s*catch\b/.test(lower)) type = 'catch';
            else if (/^\s*function\b/.test(lower)) type = 'function';
            blockStack.push({ type, line: lineNum });
            unreachableFromLine.set(blockStack.length - 1, null);

            if (/^\s*switch\b/.test(trimmed)) {
                switchStack.push({ fallthrough: false });
            }

            continue;
        }

        // Handle block ends
        if (trimmed.includes('}')) {
            blockStack.pop();
            unreachableFromLine.delete(blockStack.length);

            if (deadControlStack.length && deadControlStack[deadControlStack.length - 1] < lineNum) {
                deadControlStack.pop();
            }

            if (switchStack.length > 0 && blockStack.length < switchStack.length) {
                switchStack.pop();
            }

            continue;
        }

        // Handle case/default in switch
        const isCase = /^\s*(case\b|default\b)/.test(trimmed);
        if (isCase && switchStack.length > 0) {
            switchStack[switchStack.length - 1].fallthrough = true;

            unreachableFromLine.forEach((val, key) => {
                if (val !== null && val <= lineNum) {
                    unreachableFromLine.set(key, null);
                }
            });
        }

        // Check for control flow statements
        const controlFlowMatch = trimmed.match(/\b(return|throw|continue)\b/);
        const controlFlow = controlFlowMatch ? controlFlowMatch[1] : null;

        if (controlFlow && blockStack.length > 0) {
            const isInTryBlock = blockStack.some(b => b.type === 'try');

            if (!isInCatchBlock() && !isInTryBlock) {
                if (!lastControlStatement || !controlStatementJustReturned) {
                    unreachableFromLine.set(blockStack.length - 1, lineNum + 1);
                }
            }

            if (switchStack.length > 0) {
                if (controlFlow === 'return' || controlFlow === 'throw') {
                    switchStack[switchStack.length - 1].fallthrough = false;
                }
            }

            continue;
        }

        // Determine if line is unreachable
        const isFallthroughComment = /\/\/\s*fall.?through/i.test(trimmed);
        let isUnreachable = false;

        for (let i = blockStack.length - 1; i >= 0; i--) {
            const fromLine = unreachableFromLine.get(i);
            if (fromLine !== null && lineNum >= fromLine) {
                if (
                    !isCase &&
                    !/^\s*(else|catch|function)\b/.test(trimmed) &&
                    !isFallthroughComment &&
                    !(switchStack.length > 0 && switchStack[switchStack.length - 1].fallthrough)
                ) {
                    if (!isInCatchBlock() && !linesToSkipUnreachableCheck.has(lineNum)) {
                        isUnreachable = true;
                        break;
                    }
                }
            }
        }

        if (
            (deadControlStack.length > 0 && deadControlStack[deadControlStack.length - 1] < lineNum) ||
            isUnreachable
        ) {
            unreachableLines.push(lineNum);
        }
    }

    /**
     * Merge consecutive unreachable lines into ranges.
     */
    function mergeLinesToRanges(lines) {
        if (lines.length === 0) return [];
        const ranges = [];
        let start = lines[0];
        let end = lines[0];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i] === end + 1) {
                end = lines[i];
            } else {
                ranges.push([start, end]);
                start = lines[i];
                end = lines[i];
            }
        }
        ranges.push([start, end]);
        return ranges;
    }

    // Convert unreachable lines into diagnostic ranges
    const mergedRanges = mergeLinesToRanges(unreachableLines);

    for (const [start, end] of mergedRanges) {
        const startPos = new vscode.Position(start, 0);
        const endPos = new vscode.Position(end, document.lineAt(end).text.length);
        const range = new vscode.Range(startPos, endPos);

        diagnostics.push(
            new vscode.Diagnostic(
                range,
                'Unreachable code detected',
                vscode.DiagnosticSeverity.Information
            )
        );
    }

    return diagnostics;
}

module.exports = {
    analyzeUnreachableCode
};