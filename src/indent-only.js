/**
 * Formats the indentation of Squirrel code.
 *
 * @param {string} code - The input Squirrel code as a multiline string.
 * @returns {string} The formatted code with corrected indentation.
 */
function formatSquirrelIndent(code) {
	const indentSize = 1;
	const indentChar = '\t';
	const lines = code.split('\n');

	let indentLevel = 0;
	let result = [];
	let inBlockComment = false;

	let initialIndent = '';
	// Determine the initial indent based on the first non-empty line
	for (const line of lines) {
		if (line.trim() !== '') {
			const match = line.match(/^(\s*)/);
			initialIndent = match ? match[1] : '';
			break;
		}
	}

	let insideSwitch = false;
	let switchIndentLevel = 0;

	for (const rawLine of lines) {
		let line = rawLine;
		let trimmed = line.trim();

		if (trimmed === '') {
			result.push('');
			continue;
		}

		const lower = trimmed.toLowerCase();
		const isSwitch = /^switch\b/.test(lower);
		const isCase = /^(case\b|default\b)/.test(lower);
		const openBraces = (trimmed.match(/{/g) || []).length;
		const closeBraces = (trimmed.match(/}/g) || []).length;

		// Adjust indentLevel before processing line if line starts with a closing brace
		if (trimmed.startsWith('}')) {
			indentLevel -= 1;
			if (indentLevel < 0) indentLevel = 0;

			if (insideSwitch && indentLevel < switchIndentLevel) {
				insideSwitch = false;
			}
		}

		// Check if closing brace is alone in the line
		const isClosingBraceAlone = trimmed === '}' || trimmed.startsWith('} ');

		// Determine effective indentation level
		let effectiveIndent = indentLevel;
		if (insideSwitch) {
			if (isCase) {
				effectiveIndent = switchIndentLevel + 1;
			} else {
				effectiveIndent = switchIndentLevel + 2;
			}
		}

		// If closing brace is alone in the line, reduce indent accordingly
		if (isClosingBraceAlone) {
			effectiveIndent = Math.max(indentLevel, 0);
			if (openBraces === 0 && closeBraces === 1) {
				effectiveIndent = Math.max(indentLevel, 0);
			}
		}

		const indent = initialIndent + indentChar.repeat(indentSize * effectiveIndent);

		// Handle block comments spanning multiple lines
		if (inBlockComment) {
			result.push(indent + trimmed);
			if (trimmed.includes('*/')) {
				inBlockComment = false;
			}
		} else if (trimmed.startsWith('/*') && !trimmed.includes('*/')) {
			inBlockComment = true;
			result.push(indent + trimmed);
		} else {
			result.push(indent + trimmed);
		}

		// Update indentLevel after processing line
		if (openBraces > closeBraces) {
			indentLevel += openBraces - closeBraces;

			if (isSwitch) {
				insideSwitch = true;
				switchIndentLevel = indentLevel - 1; // Fix switch indent level
			}
		} else if (closeBraces > openBraces) {
			indentLevel -= closeBraces - openBraces;
			if (indentLevel < 0) indentLevel = 0;

			if (insideSwitch && indentLevel < switchIndentLevel) {
				insideSwitch = false;
			}
		}
	}

	return result.join('\n');
}

module.exports = {
	formatSquirrelIndent
};
