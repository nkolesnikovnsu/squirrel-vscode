/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/comment-parser/lib/index.cjs":
/*!***************************************************!*\
  !*** ./node_modules/comment-parser/lib/index.cjs ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.util = exports.tokenizers = exports.transforms = exports.inspect = exports.stringify = exports.parse = void 0;

const index_js_1 = __webpack_require__(/*! ./parser/index.cjs */ "./node_modules/comment-parser/lib/parser/index.cjs");

const description_js_1 = __webpack_require__(/*! ./parser/tokenizers/description.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/description.cjs");

const name_js_1 = __webpack_require__(/*! ./parser/tokenizers/name.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/name.cjs");

const tag_js_1 = __webpack_require__(/*! ./parser/tokenizers/tag.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/tag.cjs");

const type_js_1 = __webpack_require__(/*! ./parser/tokenizers/type.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/type.cjs");

const index_js_2 = __webpack_require__(/*! ./stringifier/index.cjs */ "./node_modules/comment-parser/lib/stringifier/index.cjs");

const align_js_1 = __webpack_require__(/*! ./transforms/align.cjs */ "./node_modules/comment-parser/lib/transforms/align.cjs");

const indent_js_1 = __webpack_require__(/*! ./transforms/indent.cjs */ "./node_modules/comment-parser/lib/transforms/indent.cjs");

const crlf_js_1 = __webpack_require__(/*! ./transforms/crlf.cjs */ "./node_modules/comment-parser/lib/transforms/crlf.cjs");

const index_js_3 = __webpack_require__(/*! ./transforms/index.cjs */ "./node_modules/comment-parser/lib/transforms/index.cjs");

const util_js_1 = __webpack_require__(/*! ./util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

__exportStar(__webpack_require__(/*! ./primitives.cjs */ "./node_modules/comment-parser/lib/primitives.cjs"), exports);

function parse(source, options = {}) {
  return (0, index_js_1.default)(options)(source);
}

exports.parse = parse;
exports.stringify = (0, index_js_2.default)();

var inspect_js_1 = __webpack_require__(/*! ./stringifier/inspect.cjs */ "./node_modules/comment-parser/lib/stringifier/inspect.cjs");

Object.defineProperty(exports, "inspect", ({
  enumerable: true,
  get: function () {
    return inspect_js_1.default;
  }
}));
exports.transforms = {
  flow: index_js_3.flow,
  align: align_js_1.default,
  indent: indent_js_1.default,
  crlf: crlf_js_1.default
};
exports.tokenizers = {
  tag: tag_js_1.default,
  type: type_js_1.default,
  name: name_js_1.default,
  description: description_js_1.default
};
exports.util = {
  rewireSpecs: util_js_1.rewireSpecs,
  rewireSource: util_js_1.rewireSource,
  seedBlock: util_js_1.seedBlock,
  seedTokens: util_js_1.seedTokens
};
//# sourceMappingURL=index.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/block-parser.cjs":
/*!*****************************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/block-parser.cjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const reTag = /^@\S+/;
/**
 * Creates configured `Parser`
 * @param {Partial<Options>} options
 */

function getParser({
  fence = '```'
} = {}) {
  const fencer = getFencer(fence);

  const toggleFence = (source, isFenced) => fencer(source) ? !isFenced : isFenced;

  return function parseBlock(source) {
    // start with description section
    const sections = [[]];
    let isFenced = false;

    for (const line of source) {
      if (reTag.test(line.tokens.description) && !isFenced) {
        sections.push([line]);
      } else {
        sections[sections.length - 1].push(line);
      }

      isFenced = toggleFence(line.tokens.description, isFenced);
    }

    return sections;
  };
}

exports["default"] = getParser;

function getFencer(fence) {
  if (typeof fence === 'string') return source => source.split(fence).length % 2 === 0;
  return fence;
}
//# sourceMappingURL=block-parser.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/index.cjs":
/*!**********************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/index.cjs ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const primitives_js_1 = __webpack_require__(/*! ../primitives.cjs */ "./node_modules/comment-parser/lib/primitives.cjs");

const util_js_1 = __webpack_require__(/*! ../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

const block_parser_js_1 = __webpack_require__(/*! ./block-parser.cjs */ "./node_modules/comment-parser/lib/parser/block-parser.cjs");

const source_parser_js_1 = __webpack_require__(/*! ./source-parser.cjs */ "./node_modules/comment-parser/lib/parser/source-parser.cjs");

const spec_parser_js_1 = __webpack_require__(/*! ./spec-parser.cjs */ "./node_modules/comment-parser/lib/parser/spec-parser.cjs");

const tag_js_1 = __webpack_require__(/*! ./tokenizers/tag.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/tag.cjs");

const type_js_1 = __webpack_require__(/*! ./tokenizers/type.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/type.cjs");

const name_js_1 = __webpack_require__(/*! ./tokenizers/name.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/name.cjs");

const description_js_1 = __webpack_require__(/*! ./tokenizers/description.cjs */ "./node_modules/comment-parser/lib/parser/tokenizers/description.cjs");

function getParser({
  startLine = 0,
  fence = '```',
  spacing = 'compact',
  markers = primitives_js_1.Markers,
  tokenizers = [(0, tag_js_1.default)(), (0, type_js_1.default)(spacing), (0, name_js_1.default)(), (0, description_js_1.default)(spacing)]
} = {}) {
  if (startLine < 0 || startLine % 1 > 0) throw new Error('Invalid startLine');
  const parseSource = (0, source_parser_js_1.default)({
    startLine,
    markers
  });
  const parseBlock = (0, block_parser_js_1.default)({
    fence
  });
  const parseSpec = (0, spec_parser_js_1.default)({
    tokenizers
  });
  const joinDescription = (0, description_js_1.getJoiner)(spacing);
  return function (source) {
    const blocks = [];

    for (const line of (0, util_js_1.splitLines)(source)) {
      const lines = parseSource(line);
      if (lines === null) continue;
      const sections = parseBlock(lines);
      const specs = sections.slice(1).map(parseSpec);
      blocks.push({
        description: joinDescription(sections[0], markers),
        tags: specs,
        source: lines,
        problems: specs.reduce((acc, spec) => acc.concat(spec.problems), [])
      });
    }

    return blocks;
  };
}

exports["default"] = getParser;
//# sourceMappingURL=index.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/source-parser.cjs":
/*!******************************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/source-parser.cjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const primitives_js_1 = __webpack_require__(/*! ../primitives.cjs */ "./node_modules/comment-parser/lib/primitives.cjs");

const util_js_1 = __webpack_require__(/*! ../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

function getParser({
  startLine = 0,
  markers = primitives_js_1.Markers
} = {}) {
  let block = null;
  let num = startLine;
  return function parseSource(source) {
    let rest = source;
    const tokens = (0, util_js_1.seedTokens)();
    [tokens.lineEnd, rest] = (0, util_js_1.splitCR)(rest);
    [tokens.start, rest] = (0, util_js_1.splitSpace)(rest);

    if (block === null && rest.startsWith(markers.start) && !rest.startsWith(markers.nostart)) {
      block = [];
      tokens.delimiter = rest.slice(0, markers.start.length);
      rest = rest.slice(markers.start.length);
      [tokens.postDelimiter, rest] = (0, util_js_1.splitSpace)(rest);
    }

    if (block === null) {
      num++;
      return null;
    }

    const isClosed = rest.trimRight().endsWith(markers.end);

    if (tokens.delimiter === '' && rest.startsWith(markers.delim) && !rest.startsWith(markers.end)) {
      tokens.delimiter = markers.delim;
      rest = rest.slice(markers.delim.length);
      [tokens.postDelimiter, rest] = (0, util_js_1.splitSpace)(rest);
    }

    if (isClosed) {
      const trimmed = rest.trimRight();
      tokens.end = rest.slice(trimmed.length - markers.end.length);
      rest = trimmed.slice(0, -markers.end.length);
    }

    tokens.description = rest;
    block.push({
      number: num,
      source,
      tokens
    });
    num++;

    if (isClosed) {
      const result = block.slice();
      block = null;
      return result;
    }

    return null;
  };
}

exports["default"] = getParser;
//# sourceMappingURL=source-parser.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/spec-parser.cjs":
/*!****************************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/spec-parser.cjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const util_js_1 = __webpack_require__(/*! ../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

function getParser({
  tokenizers
}) {
  return function parseSpec(source) {
    var _a;

    let spec = (0, util_js_1.seedSpec)({
      source
    });

    for (const tokenize of tokenizers) {
      spec = tokenize(spec);
      if ((_a = spec.problems[spec.problems.length - 1]) === null || _a === void 0 ? void 0 : _a.critical) break;
    }

    return spec;
  };
}

exports["default"] = getParser;
//# sourceMappingURL=spec-parser.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/tokenizers/description.cjs":
/*!***************************************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/tokenizers/description.cjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getJoiner = void 0;

const primitives_js_1 = __webpack_require__(/*! ../../primitives.cjs */ "./node_modules/comment-parser/lib/primitives.cjs");
/**
 * Makes no changes to `spec.lines[].tokens` but joins them into `spec.description`
 * following given spacing srtategy
 * @param {Spacing} spacing tells how to handle the whitespace
 * @param {BlockMarkers} markers tells how to handle comment block delimitation
 */


function descriptionTokenizer(spacing = 'compact', markers = primitives_js_1.Markers) {
  const join = getJoiner(spacing);
  return spec => {
    spec.description = join(spec.source, markers);
    return spec;
  };
}

exports["default"] = descriptionTokenizer;

function getJoiner(spacing) {
  if (spacing === 'compact') return compactJoiner;
  if (spacing === 'preserve') return preserveJoiner;
  return spacing;
}

exports.getJoiner = getJoiner;

function compactJoiner(lines, markers = primitives_js_1.Markers) {
  return lines.map(({
    tokens: {
      description
    }
  }) => description.trim()).filter(description => description !== '').join(' ');
}

const lineNo = (num, {
  tokens
}, i) => tokens.type === '' ? num : i;

const getDescription = ({
  tokens
}) => (tokens.delimiter === '' ? tokens.start : tokens.postDelimiter.slice(1)) + tokens.description;

function preserveJoiner(lines, markers = primitives_js_1.Markers) {
  if (lines.length === 0) return ''; // skip the opening line with no description

  if (lines[0].tokens.description === '' && lines[0].tokens.delimiter === markers.start) lines = lines.slice(1); // skip the closing line with no description

  const lastLine = lines[lines.length - 1];
  if (lastLine !== undefined && lastLine.tokens.description === '' && lastLine.tokens.end.endsWith(markers.end)) lines = lines.slice(0, -1); // description starts at the last line of type definition

  lines = lines.slice(lines.reduce(lineNo, 0));
  return lines.map(getDescription).join('\n');
}
//# sourceMappingURL=description.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/tokenizers/name.cjs":
/*!********************************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/tokenizers/name.cjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const util_js_1 = __webpack_require__(/*! ../../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

const isQuoted = s => s && s.startsWith('"') && s.endsWith('"');
/**
 * Splits remaining `spec.lines[].tokens.description` into `name` and `descriptions` tokens,
 * and populates the `spec.name`
 */


function nameTokenizer() {
  const typeEnd = (num, {
    tokens
  }, i) => tokens.type === '' ? num : i;

  return spec => {
    // look for the name in the line where {type} ends
    const {
      tokens
    } = spec.source[spec.source.reduce(typeEnd, 0)];
    const source = tokens.description.trimLeft();
    const quotedGroups = source.split('"'); // if it starts with quoted group, assume it is a literal

    if (quotedGroups.length > 1 && quotedGroups[0] === '' && quotedGroups.length % 2 === 1) {
      spec.name = quotedGroups[1];
      tokens.name = `"${quotedGroups[1]}"`;
      [tokens.postName, tokens.description] = (0, util_js_1.splitSpace)(source.slice(tokens.name.length));
      return spec;
    }

    let brackets = 0;
    let name = '';
    let optional = false;
    let defaultValue; // assume name is non-space string or anything wrapped into brackets

    for (const ch of source) {
      if (brackets === 0 && (0, util_js_1.isSpace)(ch)) break;
      if (ch === '[') brackets++;
      if (ch === ']') brackets--;
      name += ch;
    }

    if (brackets !== 0) {
      spec.problems.push({
        code: 'spec:name:unpaired-brackets',
        message: 'unpaired brackets',
        line: spec.source[0].number,
        critical: true
      });
      return spec;
    }

    const nameToken = name;

    if (name[0] === '[' && name[name.length - 1] === ']') {
      optional = true;
      name = name.slice(1, -1);
      const parts = name.split('=');
      name = parts[0].trim();
      if (parts[1] !== undefined) defaultValue = parts.slice(1).join('=').trim();

      if (name === '') {
        spec.problems.push({
          code: 'spec:name:empty-name',
          message: 'empty name',
          line: spec.source[0].number,
          critical: true
        });
        return spec;
      }

      if (defaultValue === '') {
        spec.problems.push({
          code: 'spec:name:empty-default',
          message: 'empty default value',
          line: spec.source[0].number,
          critical: true
        });
        return spec;
      } // has "=" and is not a string, except for "=>"


      if (!isQuoted(defaultValue) && /=(?!>)/.test(defaultValue)) {
        spec.problems.push({
          code: 'spec:name:invalid-default',
          message: 'invalid default value syntax',
          line: spec.source[0].number,
          critical: true
        });
        return spec;
      }
    }

    spec.optional = optional;
    spec.name = name;
    tokens.name = nameToken;
    if (defaultValue !== undefined) spec.default = defaultValue;
    [tokens.postName, tokens.description] = (0, util_js_1.splitSpace)(source.slice(tokens.name.length));
    return spec;
  };
}

exports["default"] = nameTokenizer;
//# sourceMappingURL=name.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/tokenizers/tag.cjs":
/*!*******************************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/tokenizers/tag.cjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * Splits the `@prefix` from remaining `Spec.lines[].token.description` into the `tag` token,
 * and populates `spec.tag`
 */

function tagTokenizer() {
  return spec => {
    const {
      tokens
    } = spec.source[0];
    const match = tokens.description.match(/\s*(@(\S+))(\s*)/);

    if (match === null) {
      spec.problems.push({
        code: 'spec:tag:prefix',
        message: 'tag should start with "@" symbol',
        line: spec.source[0].number,
        critical: true
      });
      return spec;
    }

    tokens.tag = match[1];
    tokens.postTag = match[3];
    tokens.description = tokens.description.slice(match[0].length);
    spec.tag = match[2];
    return spec;
  };
}

exports["default"] = tagTokenizer;
//# sourceMappingURL=tag.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/parser/tokenizers/type.cjs":
/*!********************************************************************!*\
  !*** ./node_modules/comment-parser/lib/parser/tokenizers/type.cjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const util_js_1 = __webpack_require__(/*! ../../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");
/**
 * Sets splits remaining `Spec.lines[].tokes.description` into `type` and `description`
 * tokens and populates Spec.type`
 *
 * @param {Spacing} spacing tells how to deal with a whitespace
 * for type values going over multiple lines
 */


function typeTokenizer(spacing = 'compact') {
  const join = getJoiner(spacing);
  return spec => {
    let curlies = 0;
    let lines = [];

    for (const [i, {
      tokens
    }] of spec.source.entries()) {
      let type = '';
      if (i === 0 && tokens.description[0] !== '{') return spec;

      for (const ch of tokens.description) {
        if (ch === '{') curlies++;
        if (ch === '}') curlies--;
        type += ch;
        if (curlies === 0) break;
      }

      lines.push([tokens, type]);
      if (curlies === 0) break;
    }

    if (curlies !== 0) {
      spec.problems.push({
        code: 'spec:type:unpaired-curlies',
        message: 'unpaired curlies',
        line: spec.source[0].number,
        critical: true
      });
      return spec;
    }

    const parts = [];
    const offset = lines[0][0].postDelimiter.length;

    for (const [i, [tokens, type]] of lines.entries()) {
      tokens.type = type;

      if (i > 0) {
        tokens.type = tokens.postDelimiter.slice(offset) + type;
        tokens.postDelimiter = tokens.postDelimiter.slice(0, offset);
      }

      [tokens.postType, tokens.description] = (0, util_js_1.splitSpace)(tokens.description.slice(type.length));
      parts.push(tokens.type);
    }

    parts[0] = parts[0].slice(1);
    parts[parts.length - 1] = parts[parts.length - 1].slice(0, -1);
    spec.type = join(parts);
    return spec;
  };
}

exports["default"] = typeTokenizer;

const trim = x => x.trim();

function getJoiner(spacing) {
  if (spacing === 'compact') return t => t.map(trim).join('');else if (spacing === 'preserve') return t => t.join('\n');else return spacing;
}
//# sourceMappingURL=type.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/primitives.cjs":
/*!********************************************************!*\
  !*** ./node_modules/comment-parser/lib/primitives.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Markers = void 0;
/** @deprecated */

var Markers;

(function (Markers) {
  Markers["start"] = "/**";
  Markers["nostart"] = "/***";
  Markers["delim"] = "*";
  Markers["end"] = "*/";
})(Markers = exports.Markers || (exports.Markers = {}));
//# sourceMappingURL=primitives.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/stringifier/index.cjs":
/*!***************************************************************!*\
  !*** ./node_modules/comment-parser/lib/stringifier/index.cjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function join(tokens) {
  return tokens.start + tokens.delimiter + tokens.postDelimiter + tokens.tag + tokens.postTag + tokens.type + tokens.postType + tokens.name + tokens.postName + tokens.description + tokens.end + tokens.lineEnd;
}

function getStringifier() {
  return block => block.source.map(({
    tokens
  }) => join(tokens)).join('\n');
}

exports["default"] = getStringifier;
//# sourceMappingURL=index.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/stringifier/inspect.cjs":
/*!*****************************************************************!*\
  !*** ./node_modules/comment-parser/lib/stringifier/inspect.cjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const util_js_1 = __webpack_require__(/*! ../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

const zeroWidth = {
  line: 0,
  start: 0,
  delimiter: 0,
  postDelimiter: 0,
  tag: 0,
  postTag: 0,
  name: 0,
  postName: 0,
  type: 0,
  postType: 0,
  description: 0,
  end: 0,
  lineEnd: 0
};
const headers = {
  lineEnd: 'CR'
};
const fields = Object.keys(zeroWidth);

const repr = x => (0, util_js_1.isSpace)(x) ? `{${x.length}}` : x;

const frame = line => '|' + line.join('|') + '|';

const align = (width, tokens) => Object.keys(tokens).map(k => repr(tokens[k]).padEnd(width[k]));

function inspect({
  source
}) {
  var _a, _b;

  if (source.length === 0) return '';
  const width = Object.assign({}, zeroWidth);

  for (const f of fields) width[f] = ((_a = headers[f]) !== null && _a !== void 0 ? _a : f).length;

  for (const {
    number,
    tokens
  } of source) {
    width.line = Math.max(width.line, number.toString().length);

    for (const k in tokens) width[k] = Math.max(width[k], repr(tokens[k]).length);
  }

  const lines = [[], []];

  for (const f of fields) lines[0].push(((_b = headers[f]) !== null && _b !== void 0 ? _b : f).padEnd(width[f]));

  for (const f of fields) lines[1].push('-'.padEnd(width[f], '-'));

  for (const {
    number,
    tokens
  } of source) {
    const line = number.toString().padStart(width.line);
    lines.push([line, ...align(width, tokens)]);
  }

  return lines.map(frame).join('\n');
}

exports["default"] = inspect;
//# sourceMappingURL=inspect.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/transforms/align.cjs":
/*!**************************************************************!*\
  !*** ./node_modules/comment-parser/lib/transforms/align.cjs ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const primitives_js_1 = __webpack_require__(/*! ../primitives.cjs */ "./node_modules/comment-parser/lib/primitives.cjs");

const util_js_1 = __webpack_require__(/*! ../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

const zeroWidth = {
  start: 0,
  tag: 0,
  type: 0,
  name: 0
};

const getWidth = (markers = primitives_js_1.Markers) => (w, {
  tokens: t
}) => ({
  start: t.delimiter === markers.start ? t.start.length : w.start,
  tag: Math.max(w.tag, t.tag.length),
  type: Math.max(w.type, t.type.length),
  name: Math.max(w.name, t.name.length)
});

const space = len => ''.padStart(len, ' ');

function align(markers = primitives_js_1.Markers) {
  let intoTags = false;
  let w;

  function update(line) {
    const tokens = Object.assign({}, line.tokens);
    if (tokens.tag !== '') intoTags = true;
    const isEmpty = tokens.tag === '' && tokens.name === '' && tokens.type === '' && tokens.description === ''; // dangling '*/'

    if (tokens.end === markers.end && isEmpty) {
      tokens.start = space(w.start + 1);
      return Object.assign(Object.assign({}, line), {
        tokens
      });
    }

    switch (tokens.delimiter) {
      case markers.start:
        tokens.start = space(w.start);
        break;

      case markers.delim:
        tokens.start = space(w.start + 1);
        break;

      default:
        tokens.delimiter = '';
        tokens.start = space(w.start + 2);
      // compensate delimiter
    }

    if (!intoTags) {
      tokens.postDelimiter = tokens.description === '' ? '' : ' ';
      return Object.assign(Object.assign({}, line), {
        tokens
      });
    }

    const nothingAfter = {
      delim: false,
      tag: false,
      type: false,
      name: false
    };

    if (tokens.description === '') {
      nothingAfter.name = true;
      tokens.postName = '';

      if (tokens.name === '') {
        nothingAfter.type = true;
        tokens.postType = '';

        if (tokens.type === '') {
          nothingAfter.tag = true;
          tokens.postTag = '';

          if (tokens.tag === '') {
            nothingAfter.delim = true;
          }
        }
      }
    }

    tokens.postDelimiter = nothingAfter.delim ? '' : ' ';
    if (!nothingAfter.tag) tokens.postTag = space(w.tag - tokens.tag.length + 1);
    if (!nothingAfter.type) tokens.postType = space(w.type - tokens.type.length + 1);
    if (!nothingAfter.name) tokens.postName = space(w.name - tokens.name.length + 1);
    return Object.assign(Object.assign({}, line), {
      tokens
    });
  }

  return _a => {
    var {
      source
    } = _a,
        fields = __rest(_a, ["source"]);

    w = source.reduce(getWidth(markers), Object.assign({}, zeroWidth));
    return (0, util_js_1.rewireSource)(Object.assign(Object.assign({}, fields), {
      source: source.map(update)
    }));
  };
}

exports["default"] = align;
//# sourceMappingURL=align.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/transforms/crlf.cjs":
/*!*************************************************************!*\
  !*** ./node_modules/comment-parser/lib/transforms/crlf.cjs ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const util_js_1 = __webpack_require__(/*! ../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

const order = ['end', 'description', 'postType', 'type', 'postName', 'name', 'postTag', 'tag', 'postDelimiter', 'delimiter', 'start'];

function crlf(ending) {
  function update(line) {
    return Object.assign(Object.assign({}, line), {
      tokens: Object.assign(Object.assign({}, line.tokens), {
        lineEnd: ending === 'LF' ? '' : '\r'
      })
    });
  }

  return _a => {
    var {
      source
    } = _a,
        fields = __rest(_a, ["source"]);

    return (0, util_js_1.rewireSource)(Object.assign(Object.assign({}, fields), {
      source: source.map(update)
    }));
  };
}

exports["default"] = crlf;
//# sourceMappingURL=crlf.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/transforms/indent.cjs":
/*!***************************************************************!*\
  !*** ./node_modules/comment-parser/lib/transforms/indent.cjs ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const util_js_1 = __webpack_require__(/*! ../util.cjs */ "./node_modules/comment-parser/lib/util.cjs");

const pull = offset => str => str.slice(offset);

const push = offset => {
  const space = ''.padStart(offset, ' ');
  return str => str + space;
};

function indent(pos) {
  let shift;

  const pad = start => {
    if (shift === undefined) {
      const offset = pos - start.length;
      shift = offset > 0 ? push(offset) : pull(-offset);
    }

    return shift(start);
  };

  const update = line => Object.assign(Object.assign({}, line), {
    tokens: Object.assign(Object.assign({}, line.tokens), {
      start: pad(line.tokens.start)
    })
  });

  return _a => {
    var {
      source
    } = _a,
        fields = __rest(_a, ["source"]);

    return (0, util_js_1.rewireSource)(Object.assign(Object.assign({}, fields), {
      source: source.map(update)
    }));
  };
}

exports["default"] = indent;
//# sourceMappingURL=indent.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/transforms/index.cjs":
/*!**************************************************************!*\
  !*** ./node_modules/comment-parser/lib/transforms/index.cjs ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.flow = void 0;

function flow(...transforms) {
  return block => transforms.reduce((block, t) => t(block), block);
}

exports.flow = flow;
//# sourceMappingURL=index.cjs.map


/***/ }),

/***/ "./node_modules/comment-parser/lib/util.cjs":
/*!**************************************************!*\
  !*** ./node_modules/comment-parser/lib/util.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.rewireSpecs = exports.rewireSource = exports.seedTokens = exports.seedSpec = exports.seedBlock = exports.splitLines = exports.splitSpace = exports.splitCR = exports.hasCR = exports.isSpace = void 0;

function isSpace(source) {
  return /^\s+$/.test(source);
}

exports.isSpace = isSpace;

function hasCR(source) {
  return /\r$/.test(source);
}

exports.hasCR = hasCR;

function splitCR(source) {
  const matches = source.match(/\r+$/);
  return matches == null ? ['', source] : [source.slice(-matches[0].length), source.slice(0, -matches[0].length)];
}

exports.splitCR = splitCR;

function splitSpace(source) {
  const matches = source.match(/^\s+/);
  return matches == null ? ['', source] : [source.slice(0, matches[0].length), source.slice(matches[0].length)];
}

exports.splitSpace = splitSpace;

function splitLines(source) {
  return source.split(/\n/);
}

exports.splitLines = splitLines;

function seedBlock(block = {}) {
  return Object.assign({
    description: '',
    tags: [],
    source: [],
    problems: []
  }, block);
}

exports.seedBlock = seedBlock;

function seedSpec(spec = {}) {
  return Object.assign({
    tag: '',
    name: '',
    type: '',
    optional: false,
    description: '',
    problems: [],
    source: []
  }, spec);
}

exports.seedSpec = seedSpec;

function seedTokens(tokens = {}) {
  return Object.assign({
    start: '',
    delimiter: '',
    postDelimiter: '',
    tag: '',
    postTag: '',
    name: '',
    postName: '',
    type: '',
    postType: '',
    description: '',
    end: '',
    lineEnd: ''
  }, tokens);
}

exports.seedTokens = seedTokens;
/**
 * Assures Block.tags[].source contains references to the Block.source items,
 * using Block.source as a source of truth. This is a counterpart of rewireSpecs
 * @param block parsed coments block
 */

function rewireSource(block) {
  const source = block.source.reduce((acc, line) => acc.set(line.number, line), new Map());

  for (const spec of block.tags) {
    spec.source = spec.source.map(line => source.get(line.number));
  }

  return block;
}

exports.rewireSource = rewireSource;
/**
 * Assures Block.source contains references to the Block.tags[].source items,
 * using Block.tags[].source as a source of truth. This is a counterpart of rewireSource
 * @param block parsed coments block
 */

function rewireSpecs(block) {
  const source = block.tags.reduce((acc, spec) => spec.source.reduce((acc, line) => acc.set(line.number, line), acc), new Map());
  block.source = block.source.map(line => source.get(line.number) || line);
  return block;
}

exports.rewireSpecs = rewireSpecs;
//# sourceMappingURL=util.cjs.map


/***/ }),

/***/ "./src/DOCS/APIparser.js":
/*!*******************************!*\
  !*** ./src/DOCS/APIparser.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");

var SharedCompletion = [];
var SharedHover = [];
var SharedSignature = [];
var Constants = [];
var aDOT = [];

class APIparser {
    constructor(docs) {
        for (const element of docs.functions) {
            Get(element, vscode.CompletionItemKind.Function)
        }
        for (const element of docs.classes) {
            Get(element, vscode.CompletionItemKind.Class);
            var temp = {
                static: element.definition.static,
                name: element.definition.name,
                Completion: [],
                Hover: [],
                SignatureInformation: []
            }
            for (const element2 of element.methods) {
                var head = GetHead(element2, vscode.CompletionItemKind.Function);
                var documentation = GetDocumentation(element2, vscode.CompletionItemKind.Function);
                var Completion = GetCompletion(element2.name, head, documentation, vscode.CompletionItemKind.Function)
                var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
                Hover.name = element.definition.name + "." + element2.name;
                var signatureInformation = new vscode.SignatureInformation(head, new vscode.MarkdownString(element.definition.description))
                signatureInformation.name = element.definition.name + "." + element2.name;
                signatureInformation.parameters = GetParameterInformation(element2)
                temp.Completion.push(Completion);
                temp.Hover.push(Hover);
                temp.SignatureInformation.push(signatureInformation);
                if (element.definition.static) {
                    ToSIDE(undefined, Hover, signatureInformation)
                }
            }
            for (const element2 of element.properties) {
                var head = GetHead(element2, vscode.CompletionItemKind.Property);
                var documentation = GetDocumentation(element2, vscode.CompletionItemKind.Property);
                var Completion = GetCompletion(element2.name, head, documentation, vscode.CompletionItemKind.Property)
                var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
                Hover.name = element.definition.name + "." + element2.name;
                temp.Completion.push(Completion);
                temp.Hover.push(Hover);
                if (element.definition.static) {
                    ToSIDE(undefined, Hover, undefined)
                }
            }
            aDOT.push(temp)
        }
        GetEvent(docs);
        GetConstants(docs);
        return docs;
    }
}

function Get(element, kind) {
    var name;
    var description;
    if (kind == vscode.CompletionItemKind.Function) {
        name = element.name;
        description = element.description
    }
    else if (kind == vscode.CompletionItemKind.Class) {
        name = element.definition.name;
        description = element.definition.description
    }
    var head = GetHead(element, kind);
    var documentation = GetDocumentation(element, kind);
    var Completion = GetCompletion(name, head, documentation, kind)
    var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
    Hover.name = name;
    var signatureInformation = new vscode.SignatureInformation(head, new vscode.MarkdownString(description))
    signatureInformation.name = name;
    if (kind == vscode.CompletionItemKind.Class) {
        if (element.constructors.length != 0) {
            signatureInformation.parameters = GetParameterInformation(element.constructors[0])
        }
    }
    else {
        signatureInformation.parameters = GetParameterInformation(element)
    }
    ToSIDE(Completion, Hover, signatureInformation)
}

function GetExtends(element) {
    let s = ""
    if (element.definition.extends != null) {
        s = " extends " + /\[(\w+)\]/.exec(element.definition.extends)[1];
    }
    return s;
}

function GetParameterInformation(element) {
    let tab = [];
    for (const element2 of element.params) {
        let temp = new vscode.ParameterInformation(element2.name, element2.description)
        temp.type = element2.type;
        tab.push(temp);

    }
    return tab;
}

function ToSIDE(Completion, Hover, signatureInformation) {
        if (Completion != undefined)
            SharedCompletion.push(Completion)
        if (Hover != undefined)
            SharedHover.push(Hover)
        if (signatureInformation != undefined)
            SharedSignature.push(signatureInformation)
}

function GetEvent(docs) {
    for (const element of docs.events) {
        var head = GetHead(element, vscode.CompletionItemKind.Event);
        var documentation = GetDocumentation(element, vscode.CompletionItemKind.Event);
        var Hover = new vscode.Hover("``` typescript\n" + head + "\n```\n" + documentation);
        Hover.name = element.name;
        SharedHover.push(Hover)
    }
}

function GetConstants(docs) {
    for (const element of docs.constants) {
        var obj = {
            category: element.category,
            completion: [],
            hover: [],
        };
        for (const element2 of element.elements) {
            obj.completion.push(GetCompletion(element2.name, element2.name, element2.description, vscode.CompletionItemKind.Constant));
            var hover = new vscode.Hover("``` typescript\n" + element2.name + "\n```\n" + element2.description);
            hover.name = element2.name
            obj.hover.push(hover);
        }
        Constants.push(obj)
    }
}

function GetCompletion(name, head, documentation = null, kind = vscode.CompletionItemKind.Keyword) {
    var Completion = new vscode.CompletionItem(name, kind);
    Completion.documentation = new vscode.MarkdownString("``` typescript\n" + head + "\n```\n" + documentation);
    Completion.documentation.supportHtml = true;
    return Completion;
}

function GetHead(obj, kind) {
    var code = "";
    var params = "";
    if (kind == vscode.CompletionItemKind.Function) {
        code += "function " + obj.name;
        params = obj;
    }
    else if (kind == vscode.CompletionItemKind.Class) {
        if (obj.definition.static)
            code += "static "
        code += "class " + obj.definition.name;
        params = obj.constructors[0];
    }
    else if (kind == vscode.CompletionItemKind.Property) {
        code += "properties " + obj.name;
        code += GetReturnsHead(obj.returns);
        return code;
    }
    else if (kind == vscode.CompletionItemKind.Event) {
        code += "event " + obj.name;
        params = obj;
    }
    code += GetHeadParams(params);
    if (kind == vscode.CompletionItemKind.Class) {
        code += GetExtends(obj);
    }
    return code;
}

function GetHeadParams(obj) {
    var code = "(";
    if (obj == undefined) {
        code += "): void";// only class without params
        return code;
    }
    if (obj.params.length != 0) {
        for (var i = 0; i < obj.params.length; i++) {
            code += obj.params[i].name;
            if (obj.params[i].default != null)
                code += "? = " + obj.params[i].default;
            code += ": " + obj.params[i].type;
            if (i < obj.params.length - 1)
                code += ", ";
        }
    }
    code += ")";
    code += GetReturnsHead(obj.returns);
    return code;
}

function GetReturnsHead(returns) {
    if (returns != null) {
        return ": " + returns.type;
    }
    else {
        return ": void";
    }
}

function GetDocumentation(obj, kind) {
    var definition = "";
    var constructors = "";
    var documentation = "";
    if (kind == vscode.CompletionItemKind.Function) {
        definition = obj;
        constructors = obj;
    }
    else if (kind == vscode.CompletionItemKind.Class) {
        definition = obj.definition;
        constructors = obj.constructors[0];
    }
    else if (kind == vscode.CompletionItemKind.Property) {
        definition = obj;
        constructors = obj;
        documentation += GetDeprected(definition) + "\n\n";
        documentation += definition.description + "\n\n";
        documentation += GetNotes(definition);
        return documentation;
    }
    else if (kind == vscode.CompletionItemKind.Event) {
        definition = obj;
        constructors = obj;
        documentation += GetDeprected(definition) + "\n\n";
        documentation += definition.description + "\n\n";
        documentation += GetNotes(definition);
        return documentation;
    }
    documentation += GetDeprected(definition) + "\n\n";
    documentation += definition.description + "\n\n";
    documentation += GetNotes(definition);
    documentation += GetDocumentationParams(constructors);
    documentation += GetReturnsDocumentation(definition.returns)
    return documentation;
}

function GetDeprected(element) {
    let s = ""
    if (element.deprecated != null)
        s = "***Deprecated since version: " + element.deprecated + "***"
    return s;
}

function GetNotes(definition) {
    var temp = "";
    if (definition.notes != null) {
        for (const element of definition.notes) {
            temp += element + "\n\n"
        }
    }
    return temp;
}

function GetDocumentationParams(obj) {
    var documentation = "";
    if (obj != null) {
        if (obj.params.length != 0) {
            for (const element of obj.params) {
                documentation += "@param " + "`" + element.name + "` " + element.description + "\n\n";
            }
        }
    }
    return documentation;
}

function GetReturnsDocumentation(returns) {
    if (returns != null) {
        return "@return " + returns.description + "\n\n";
    }
    return "";
}

module.exports = {
    APIparser, Constants, aDOT, SharedCompletion, SharedHover, SharedSignature,
}

/***/ }),

/***/ "./src/DOCS/api.json":
/*!***************************!*\
  !*** ./src/DOCS/api.json ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"classes":[{"constructors":[{"declaration":"string path, string pattern","deprecated":null,"description":"creates a file with read/write access in the current directory. It’s contructor imitates the behaviour of the C runtime function fopen for eg.","notes":[],"params":[{"default":null,"description":"","name":"path","type":"string"},{"default":null,"description":"","name":"pattern","type":"string"}],"version":"0.0.0"}],"definition":{"category":"file","deprecated":null,"description":"creates a file with read/write access in the current directory. It’s contructor imitates the behaviour of the C runtime function fopen for eg.","extends":null,"name":"file","notes":[],"side":"shared","static":false,"version":"0.0.0"},"methods":[{"declaration":"void close()","deprecated":null,"description":"Closes the file.","name":"close","notes":[],"params":[],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void eos()","deprecated":null,"description":"Returns a non null value if the read/write pointer is at the end of the stream.","name":"eos","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"void flush()","deprecated":null,"description":"Flushes the stream.return a value != null if succeded, otherwise returns null.","name":"flush","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"void len()","deprecated":null,"description":"Returns the length of the stream","name":"len","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"void readblob(int size)","deprecated":null,"description":"Read n bytes from the stream and retuns them as blob","name":"readblob","notes":[],"params":[{"default":null,"description":"","name":"size","type":"int"}],"returns":{"description":"","type":"bytes"},"static":false,"version":"0.0.0"},{"declaration":"void readn(int type)","deprecated":null,"description":"Reads a number from the stream according to the type pameter.","name":"readn","notes":[],"params":[{"default":null,"description":"type of the number to read","name":"type","type":"int"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void resize(int size)","deprecated":null,"description":"Resizes the blob to the specified size","name":"resize","notes":[],"params":[{"default":null,"description":"the new size of the blob in bytes","name":"size","type":"int"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void seek(int offset, int origin)","deprecated":null,"description":"Moves the read/write pointer to a specified location.","name":"seek","notes":[],"params":[{"default":null,"description":"the new size of the blob in bytes","name":"offset","type":"int"},{"default":null,"description":"the new size of the blob in bytes","name":"origin","type":"int"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"int swap2()","deprecated":null,"description":"Swaps the byte order of the blob content as it would be an array of 16bits integers","name":"swap2","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"int swap4()","deprecated":null,"description":"Swaps the byte order of the blob content as it would be an array of 32bits integers","name":"swap4","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"void tell()","deprecated":null,"description":"Returns the read/write pointer absolute position","name":"tell","notes":[],"params":[],"returns":{"description":"","type":"any"},"static":false,"version":"0.0.0"},{"declaration":"void writeblob(blob src)","deprecated":null,"description":"Moves the read/write pointer to a specified location.","name":"writeblob","notes":[],"params":[{"default":null,"description":"the source blob containing the data to be written","name":"src","type":"blob"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void writen(int n, int type)","deprecated":null,"description":"Writes a number in the stream formatted according to the type pameter","name":"writen","notes":[],"params":[{"default":null,"description":"the value to be written","name":"n","type":"int"},{"default":null,"description":"type of the number to write","name":"type","type":"int"}],"returns":null,"static":false,"version":"0.0.0"}],"properties":[]},{"constructors":[{"declaration":"string size","deprecated":null,"description":"returns a new instance of a blob class of the specified size in bytes","notes":[],"params":[{"default":null,"description":"","name":"size","type":"string"}],"version":"0.0.0"}],"definition":{"category":"blob","deprecated":null,"description":"returns a new instance of a blob class of the specified size in bytes","extends":null,"name":"blob","notes":[],"side":"shared","static":false,"version":"0.0.0"},"methods":[{"declaration":"int eos()","deprecated":null,"description":"Returns a non null value if the read/write pointer is at the end of the stream.","name":"eos","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"int flush()","deprecated":null,"description":"Flushes the stream.return a value != null if succeded, otherwise returns null","name":"flush","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"int len()","deprecated":null,"description":"Returns the length of the stream","name":"len","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"bytes readblob(int size)","deprecated":null,"description":"read n bytes from the stream and retuns them as blob","name":"readblob","notes":[],"params":[],"returns":{"description":"","type":"bytes"},"static":false,"version":"0.0.0"},{"declaration":"void eos()","deprecated":null,"description":"Returns a non null value if the read/write pointer is at the end of the stream.","name":"eos","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"void flush()","deprecated":null,"description":"Flushes the stream.return a value != null if succeded, otherwise returns null.","name":"flush","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"void len()","deprecated":null,"description":"Returns the length of the stream","name":"len","notes":[],"params":[],"returns":{"description":"","type":"int"},"static":false,"version":"0.0.0"},{"declaration":"void readblob(int size)","deprecated":null,"description":"Read n bytes from the stream and retuns them as blob","name":"readblob","notes":[],"params":[{"default":null,"description":"","name":"size","type":"int"}],"returns":{"description":"","type":"bytes"},"static":false,"version":"0.0.0"},{"declaration":"void readn(int type)","deprecated":null,"description":"Reads a number from the stream according to the type pameter.","name":"readn","notes":[],"params":[{"default":null,"description":"type of the number to read","name":"type","type":"int"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void resize(int size)","deprecated":null,"description":"Resizes the blob to the specified size","name":"resize","notes":[],"params":[{"default":null,"description":"the new size of the blob in bytes","name":"size","type":"int"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void seek(int offset, int origin)","deprecated":null,"description":"Moves the read/write pointer to a specified location.","name":"seek","notes":[],"params":[{"default":null,"description":"the new size of the blob in bytes","name":"offset","type":"int"},{"default":null,"description":"the new size of the blob in bytes","name":"origin","type":"int"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void tell(int size)","deprecated":null,"description":"Returns the read/write pointer absolute position","name":"tell","notes":[],"params":[],"returns":{"description":"","type":"any"},"static":false,"version":"0.0.0"},{"declaration":"void writeblob(blob src)","deprecated":null,"description":"Moves the read/write pointer to a specified location.","name":"writeblob","notes":[],"params":[{"default":null,"description":"","name":"src","type":"blob"}],"returns":null,"static":false,"version":"0.0.0"},{"declaration":"void writen(int n, int type)","deprecated":null,"description":"Writes a number in the stream formatted according to the type pameter","name":"writen","notes":[],"params":[{"default":null,"description":"the value to be written","name":"n","type":"int"},{"default":null,"description":"type of the number to write","name":"type","type":"int"}],"returns":null,"static":false,"version":"0.0.0"}],"properties":[]},{"constructors":[{"declaration":"string size","deprecated":null,"description":"The regexp object rapresent a precompiled regular experssion pattern. The object is created trough regexp(patern).","notes":[],"params":[{"default":null,"description":"","name":"pattern","type":"string"}],"version":"0.0.0"}],"definition":{"category":"regexp","deprecated":null,"description":"The regexp object rapresent a precompiled regular experssion pattern. The object is created trough regexp(patern).","extends":null,"name":"regexp","notes":[],"side":"shared","static":false,"version":"0.0.0"},"methods":[{"declaration":"Array capture(string str, string start)","deprecated":null,"description":"Returns an array of tables containing two indexs(“begin” and “end”)of the first match of the regular expression in the string str. An array entry is created for each captured sub expressions. If no match occurs returns null. The first element of the returned array(index 0) always contains the complete match.","name":"capture","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"},{"default":null,"description":"The search starts from the index start of the string, if start is omitted the search starts from the beginning of the string.","name":"start","type":"string"}],"returns":{"description":"","type":"Array"},"static":false,"version":"0.0.0"},{"declaration":"boolean match(string str)","deprecated":null,"description":"Returns a true if the regular expression matches the string str, otherwise returns false.","name":"match","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"}],"returns":{"description":"","type":"boolean"},"static":false,"version":"0.0.0"},{"declaration":"Array search(string str, string start)","deprecated":null,"description":"Returns an array of tables containing two indexs(“begin” and “end”)of the first match of the regular expression in the string str. An array entry is created for each captured sub expressions. If no match occurs returns null. The first element of the returned array(index 0) always contains the complete match.","name":"search","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"},{"default":null,"description":"The search starts from the index start of the string, if start is omitted the search starts from the beginning of the string.","name":"start","type":"string"}],"returns":{"description":"","type":"Array"},"static":false,"version":"0.0.0"}],"properties":[]}],"constants":[{"category":"constants","elements":[{"category":"constants","deprecated":null,"description":"The numeric constant pi (3.141592) is the ratio of the circumference of a circle to its diameter","name":"PI","side":"shared","version":null},{"category":"constants","deprecated":null,"description":"The maximum value that can be returned by the rand() function","name":"RAND_MAX","side":"shared","version":null}],"side":"server"}],"events":[],"functions":[{"category":"functions","declaration":"int dofile(string path, boolean raiseerror)","deprecated":null,"description":"Compiles a squirrel script or loads a precompiled one and executes it. When squirrel is compiled in unicode mode the function can handle different character ecodings, UTF8 with and without prefix and UCS-2 prefixed(both big endian an little endian). If the source stream is not prefixed UTF8 ecoding is used as default.","name":"dofile","notes":[],"params":[{"default":null,"description":"","name":"path","type":"string"},{"default":null,"description":"if is true, the compiler error handler is invoked in case of a syntax error. If is omitted or set to false, the compiler error handler is not ivoked.","name":"raiseerror","type":"boolean"}],"returns":{"description":"returns the value returned by the script or null if no value is returned","type":"int"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"void loadfile(string path, boolean raiseerror)","deprecated":null,"description":"Compiles a squirrel script or loads a precompiled one an returns it as as function. When squirrel is compiled in unicode mode the function can handle different character ecodings, UTF8 with and without prefix and UCS-2 prefixed(both big endian an little endian). If the source stream is not prefixed UTF8 ecoding is used as default.","name":"loadfile","notes":[],"params":[{"default":null,"description":"","name":"path","type":"string"},{"default":null,"description":"if the optional parameter ‘raiseerror’ is true, the compiler error handler is invoked in case of a syntax error. If raiseerror is omitted or set to false, the compiler error handler is not ivoked.","name":"raiseerror","type":"boolean"}],"returns":null,"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int writeclosuretofile(string destpath, any closure)","deprecated":null,"description":"serializes a closure to a bytecode file (destpath). The serialized file can be loaded using loadfile() and dofile().","name":"writeclosuretofile","notes":[],"params":[{"default":null,"description":"","name":"destpath","type":"string"},{"default":null,"description":"","name":"closure","type":"any"}],"returns":null,"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int castf2i(float f)","deprecated":null,"description":"Casts a float to a int","name":"castf2i","notes":[],"params":[{"default":null,"description":"","name":"f","type":"float"}],"returns":{"description":"","type":"int"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int casti2f(int n)","deprecated":null,"description":"Casts a int to a float","name":"casti2f","notes":[],"params":[{"default":null,"description":"","name":"n","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int swap2(int n)","deprecated":null,"description":"Swap the byte order of a number (like it would be a 16bits integer)","name":"swap2","notes":[],"params":[{"default":null,"description":"","name":"n","type":"int"}],"returns":{"description":"","type":"int"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int swap4(int n)","deprecated":null,"description":"Swap the byte order of an integer","name":"swap4","notes":[],"params":[{"default":null,"description":"","name":"n","type":"int"}],"returns":{"description":"","type":"int"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int swapfloat(float f)","deprecated":null,"description":"Swaps the byteorder of a float","name":"swapfloat","notes":[],"params":[{"default":null,"description":"","name":"f","type":"float"}],"returns":{"description":"","type":"int"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float abs(int x)","deprecated":null,"description":"Returns the absolute value of x as an integer","name":"abs","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float acos(int x)","deprecated":null,"description":"Returns the arccosine of x","name":"acos","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float asin(int x)","deprecated":null,"description":"Returns the arcsine of x","name":"asin","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float atan(int x)","deprecated":null,"description":"Returns the arctangent of x","name":"atan","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float atan2(int x, int y)","deprecated":null,"description":"Returns the arctangent of x/y","name":"atan","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"},{"default":null,"description":"","name":"y","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float ceil(int x)","deprecated":null,"description":"Returns a float value representing the smallest integer that is greater than or equal to x","name":"ceil","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float cos(int x)","deprecated":null,"description":"Returns the cosine of x","name":"cos","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float exp(int x)","deprecated":null,"description":"Returns the exponential value of the float parameter x","name":"exp","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float fabs(int x)","deprecated":null,"description":"Returns the absolute value of x as a float","name":"fabs","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float floor(int x)","deprecated":null,"description":"Returns a float value representing the largest integer that is less than or equal to x","name":"floor","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float log(int x)","deprecated":null,"description":"Returns the natural logarithm of x","name":"log","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float log10(int x)","deprecated":null,"description":"Returns the logarithm base-10 of x","name":"log10","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float pow(int x)","deprecated":null,"description":"Returns x raised to the power of y","name":"pow","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int rand()","deprecated":null,"description":"Returns a pseudorandom integer in the range 0 to RAND_MAX","name":"rand","notes":[],"params":[],"returns":{"description":"","type":"int"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float sin(int x)","deprecated":null,"description":"Returns the sine of x","name":"sin","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float sqrt(int x)","deprecated":null,"description":"Returns the square root of x","name":"sqrt","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"int srand(int seed)","deprecated":null,"description":"Sets the starting point for generating a series of pseudorandom integers","name":"srand","notes":[],"params":[{"default":null,"description":"","name":"seed","type":"int"}],"returns":{"description":"","type":"int"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float tan(int x)","deprecated":null,"description":"Returns the tangent of x","name":"tan","notes":[],"params":[{"default":null,"description":"","name":"x","type":"int"}],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"float clock()","deprecated":null,"description":"Returns a float representing the number of seconds elapsed since the start of the process","name":"clock","notes":[],"params":[],"returns":{"description":"","type":"float"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"[] date(int time, string format)","deprecated":null,"description":"Returns a table containing a date/time splitted in the slots","name":"date","notes":[],"params":[{"default":null,"description":"if omitted the current time is used.","name":"time","type":"int"},{"default":null,"description":"if format can be ‘l’ local time or ‘u’ UTC time, if omitted is defaulted as ‘l’(local time).","name":"format","type":"string"}],"returns":{"description":"","type":"[]"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string getenv(int varaname)","deprecated":null,"description":"Returns a string containing the value of the environment variable varname","name":"getenv","notes":[],"params":[{"default":null,"description":"","name":"varaname","type":"int"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"void remove(string varaname)","deprecated":null,"description":"Deletes the file specified by path","name":"remove","notes":[],"params":[{"default":null,"description":"","name":"path","type":"string"}],"returns":null,"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"void rename(string oldname, string newname)","deprecated":null,"description":"Renames the file or directory specified by oldname to the name given by newname","name":"rename","notes":[],"params":[{"default":null,"description":"","name":"oldname","type":"string"},{"default":null,"description":"","name":"newname","type":"string"}],"returns":null,"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"void system(string cmd)","deprecated":null,"description":"Renames the file or directory specified by oldname to the name given by newname","name":"system","notes":[],"params":[{"default":null,"description":"","name":"cmd","type":"string"}],"returns":null,"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string time()","deprecated":null,"description":"Returns the number of seconds elapsed since midnight 00:00:00, January 1, 1970. the result of this function can be formatted through the function date()","name":"time","notes":[],"params":[],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"boolean endswith(string str, string cmp)","deprecated":null,"description":"Returns true if the end of the string str matches a the string cmp otherwise returns false","name":"endswith","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"},{"default":null,"description":"","name":"cmp","type":"string"}],"returns":{"description":"","type":"boolean"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string escape(string str)","deprecated":null,"description":"Returns a string with backslashes before characters that need to be escaped(”,a,b,t,n,v,f,r,\\\\,”,’,0,xnn)","name":"escape","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string format(string formatstr, string optional)","deprecated":null,"description":"Returns a string formatted according formatstr and the optional parameters following it. The format string follows the same rules as the printf family of standard C functions( the “*” is not supported).","name":"format","notes":[],"params":[{"default":null,"description":"","name":"formatstr","type":"string"},{"default":null,"description":"","name":"optional","type":"...string"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string rstrip(string str)","deprecated":null,"description":"Strips white-space-only characters that might appear at the beginning of the given string and returns the new stripped string.","name":"rstrip","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string rstrip(string str)","deprecated":null,"description":"Strips white-space-only characters that might appear at the end of the given string and returns the new stripped string.","name":"rstrip","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string split(string str, string separtators)","deprecated":null,"description":"Returns an array of strings split at each point where a separator character occurs in str. The separator is not returned as part of any array element.","name":"split","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"},{"default":null,"description":"The parameter separators is a string that specifies the characters as to be used for the splitting.","name":"separtators","type":"string"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"boolean startswith(string str, string cmp)","deprecated":null,"description":"Returns true if the beginning of the string str matches a the string cmp otherwise returns false","name":"startswith","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"},{"default":null,"description":"","name":"cmp","type":"string"}],"returns":{"description":"","type":"boolean"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string strip(string str)","deprecated":null,"description":"Strips white-space-only characters that might appear at the beginning or end of the given string and returns the new stripped string.","name":"strip","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"void print(string message)","deprecated":null,"description":"Prints a message to the console.","name":"print","notes":[],"params":[{"default":null,"description":"","name":"message","type":"string"}],"returns":null,"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string typeof(any value)","deprecated":null,"description":"Returns the type of the value as a string.","name":"typeof","notes":[],"params":[{"default":null,"description":"","name":"value","type":"any"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"table getroottable()","deprecated":null,"description":"Returns the root table.","name":"getroottable","notes":[],"params":[],"returns":{"description":"","type":"table"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"void setroottable(table t)","deprecated":null,"description":"Sets the root table to the given table.","name":"setroottable","notes":[],"params":[{"default":null,"description":"","name":"t","type":"table"}],"returns":null,"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"string lstrip(string str)","deprecated":null,"description":"Removes whitespace characters from the beginning of the string.","name":"lstrip","notes":[],"params":[{"default":null,"description":"","name":"str","type":"string"}],"returns":{"description":"","type":"string"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"function compilestring(string src)","deprecated":null,"description":"Compiles and returns function from source string.","name":"compilestring","notes":[],"params":[{"default":null,"description":"","name":"src","type":"string"}],"returns":{"description":"","type":"function"},"side":"shared","version":"0.0.0"},{"category":"functions","declaration":"void assert(boolean condition, string message)","deprecated":null,"description":"Raises an error if condition is false.","name":"assert","notes":[],"params":[{"default":null,"description":"","name":"condition","type":"boolean"},{"default":null,"description":"","name":"message","type":"string"}],"returns":null,"side":"shared","version":"0.0.0"}]}');

/***/ }),

/***/ "./src/Files.js":
/*!**********************!*\
  !*** ./src/Files.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
const utility = __webpack_require__(/*! ./utility */ "./src/utility.js");
const squirrel_parser = __webpack_require__(/*! ./index */ "./src/index.js");

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


/***/ }),

/***/ "./src/Items/Item.js":
/*!***************************!*\
  !*** ./src/Items/Item.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");

class variable {
    /**
    * @param {vscode.TextDocument} document
    */
    constructor(document) {
        var myArray;
        var regex = /(local|static)?\s?(\w+)\s*(?:=|<-)(?:\s*([\w\.]+)(\(.*\))?|\s*{.*})/gm;
        this.list = [];
        while (myArray = regex.exec(document.getText())) {
            this.list.push(new variableItem(myArray[0], myArray[1], myArray[2], myArray[3]));
        }
    }

    GetVariableCompletionArray() {
        var tab = [];
        for (const element of this.list) {
            tab.push(new vscode.CompletionItem(element.name, vscode.CompletionItemKind.Variable));
        }
        return tab;
    }
}

class variableItem {
    constructor(body, local, name, value) {
        this.body = body;
        this.local = local;
        this.name = name;
        this.value = value;
    }
}

module.exports = {
    variable
}

/***/ }),

/***/ "./src/Items/jsdoc.js":
/*!****************************!*\
  !*** ./src/Items/jsdoc.js ***!
  \****************************/
/***/ ((module) => {

let elements = {
	abstract: {
		desc: "This member must be implemented (or overridden) by the inheritor.",
	},
	access: {
		desc: "Specify the access level of this member (private, public, or protected).",
		detail: "<private|protected|public>",
        snippet: "${1|private,protected,public|}"
	},
	alias: {
		desc: "Treat a member as if it had a different name.",
		detail: "<aliasNamepath>",
		snippet: "${1:aliasNamepath}"
	},
	augments: {
		desc: "Indicate that a symbol inherits from, ands adds to, a parent symbol.",
		detail: "<namepath>",
		snippet: "${1:namepath}"
	},
	author: {
		desc: "Identify the author of an item.",
		detail: "<name> [<emailAddress>]",
		snippet: "${1:name} [${2:emailAddress}]"
	},
	borrows: {
		desc: "This object uses something from another object.",
		detail: "<that namepath> as <this namepath>",
		snippet: "${1:refNamePath} as ${1:thisNamePath}"
	},
	callback: {
		desc: "Document a callback function.",
		detail: "<namepath>",
		snippet: "${1:namepath}"
	},
	class: {
		desc: "This function is intended to be called with the \"new\" keyword.",
		detail: "[<type> <name>]",
	},
	classdesc: {
		desc: "Use the following text to describe the entire class.",
		detail: "<some description>",
		snippet: "${1:description}"
	},
	constant: {
		desc: "Document an object as a constant.",
		detail: "[<type> <name>]",
	},
	constructs: {
		desc: "This function member will be the constructor for the previous class.",
		detail: "[<name>]",
	},
	copyright: {
		desc: "Document some copyright information.",
		detail: "<copyright text>",
		snippet: "${1:copyright text}"
	},
	default: {
		desc: "Document the default value.",
		detail: "[<some value>]",
	},
	deprecated: {
		desc: "Document that this is no longer the preferred way.",
		detail: "[<some text>]",
		snippet: "${1:text}"
	},
	description: {
		desc: "Describe a symbol.",
		detail: "<some description>",
		snippet: "${1:description}"
	},
	enum: {
		desc: "Document a collection of related properties.",
		detail: "[<type>]",
		snippet: "{${1:type}}"
	},
	event: {
		desc: "Document an event.",
		detail: "<classname>#[event:]<eventName>",
		snippet: "${1:classname}#${2:eventName}"
	},
	example: {
		desc: "Provide an example of how to use a documented item."
	},
	exports: {
		desc: "Identify the member that is exported by a JavaScript module.",
		detail: "<moduleName>",
		snippet: "${1:moduleName}"
	},
	external: {
		desc: "Identifies an external class, namespace, or module.",
		detail: "<nameOfExternal>",
		snippet: "${1:nameOfExternal}"
	},
	file: {
		desc: "Describe a file."
	},
	fires: {
		desc: "Describe the events this method may fire.",
		detail: "<classname>#[event:]<eventName>",
		snippet: "${1:classname}#${2:eventName}"
	},
	function: {
		desc: "Describe a function or method.",
		detail: "[<FunctionName>]",
		snippet: "${1:FunctionName}"
	},
	global: {
		desc: "Document a global object."
	},
	ignore: {
		desc: "Omit a symbol from the documentation."
	},
	implements: {
		desc: "This symbol implements an interface.",
		detail: "{<typeExpression>}",
		snippet: "{${1:typeExpression}}"
	},
	inheritdoc: {
		desc: "Indicate that a symbol should inherit its parent's documentation."
	},
	inner: {
		desc: "Document an inner object."
	},
	instance: {
		desc: "Document an instance member."
	},
	interface: {
		desc: "This symbol is an interface that others can implement.",
		detail: "[<name>]",
		snippet: "${1:name}"
	},
	kind: {
		desc: "What kind of symbol is this?",
		detail: "<kindName>",
		snippet: "${1|class,constant,event,external,file,function,member,mixin,module,namespace,typedef|}"
	},
	lends: {
		desc: "Document properties on an object literal as if they belonged to a symbol with a given name.",
		detail: "<namepath>",
		snippet: "${1:namepath}"
	},
	license: {
		desc: "Identify the license that applies to this code.",
		detail: "<identifier>",
		snippet: "${1:identifier}"
	},
	listens: {
		desc: "List the events that a symbol listens for.",
		detail: "<eventName>",
		snippet: "${1:eventName}"
	},
	member: {
		desc: "Document a member.",
		detail: "[<type>] [<name>]",
		snippet: "{${1:type}} ${2:name}"
	},
	memberof: {
		desc: "This symbol belongs to a parent symbol.",
		detail: "<parentNamepath>",
		snippet: "${1:parentNamepath}"
	},
	"memberof!": {
		desc: "Force this symbol to belongs to a parent symbol.",
		detail: "<parentNamepath>",
		snippet: "${1:parentNamepath}"
	},
	mixes: {
		desc: "This object mixes in all the members from another object.",
		detail: "<otherObjectPath>",
		snippet: "${1:otherObjectPath}"
	},
	mixin: {
		desc: "Document a mixin object.",
		detail: "[<mixinName>]",
		snippet: "${1:mixinName}"
	},
	module: {
		desc: "Document a JavaScript module.",
		detail: "[[{<type>}] <moduleName>]",
		snippet: "{${1:type}} ${2:moduleName}"
	},
	name: {
		desc: "Document the name of an object.",
		detail: "<namepath>",
		snippet: "${1:namepath}"
	},
	namespace: {
		desc: "Document a namespace object.",
		detail: "[[{<type>}] <SomeName>]",
		snippet: "{${1:type}} ${2:SomeName}"
	},
	override: {
		desc: "Indicate that a symbol overrides its parent."
	},
	param: {
		desc: " Document the parameter to a function.",
		detail: "[[{<type>}] <name> [<Param description>]]",
		snippet: "{${1:type}} ${2:name} ${3:description}"
	},
	private: {
		desc: "This symbol is meant to be private."
	},
	property: {
		desc: "Document a property of an object.",
		detail: "[[{<type>}] <name> [<Property description>]]",
		snippet: "{${1:type}} ${2:name} ${3:description}"
	},
	protected: {
		desc: "This symbol is meant to be protected."
	},
	public: {
		desc: "This symbol is meant to be public."
	},
	readonly: {
		desc: "This symbol is meant to be read-only."
	},
	requires: {
		desc: "This file requires a JavaScript module.",
		detail: "<someModuleName>",
		snippet: "${1:someModuleName}"
	},
	returns: {
		desc: "Document the return value of a function.",
		detail: "[{<type>} [<Return description>]]",
		snippet: "{${1:type}} ${2:description}"
	},
	see: {
		desc: "Refer to some other documentation for more information.",
		detail: "<namepath>|<text>",
		snippet: "${1|namepath,text|}"
	},
	since: {
		desc: "When was this feature added?",
		detail: "<versionDescription>",
		snippet: "${1:versionDescription}"
	},
	static: {
		desc: "Document a static member."
	},
	summary: {
		desc: "A shorter version of the full description."
	},
	this: {
		desc: "What does the 'this' keyword refer to here?",
		detail: "<namepath>",
		snippet: "${1:namepath}"
	},
	throws: {
		desc: "Describe what errors could be thrown.",
		detail: "[{<type>}] [<free-form description>]",
		snippet: "{${1:type}} ${2:description}"
	},
	todo: {
		desc: "Document tasks to be completed."
	},
	tutorial: {
		desc: "Insert a link to an included tutorial file."
	},
	type: {
		desc: "Document the type of an object.",
		detail: "{typeName}",
		snippet: "{${1:typeName}}"
	},
	typedef: {
		desc: "Document a custom type.",
		detail: "[<type>] <namepath>",
		snippet: "{${1:type}} ${1:namepath}"
	},
	variation: {
		desc: "Distinguish different objects with the same name.",
		detail: "<variationNumber>",
		snippet: "${1:variationNumber}"
	},
	version: {
		desc: "Documents the version number of an item.",
		detail: "<versionDescription>",
		snippet: "${1:versionDescription}"
	}
};

//synonyms
elements.virtual = elements.abstract;
elements.extends = elements.augments;
elements.constructor = elements.class;
elements.const = elements.constant;
elements.defaultvalue = elements.default;
elements.desc = elements.description;
elements.host = elements.external;
elements.fileoverview = elements.overview = elements.file;
elements.emits = elements.fires;
elements.func = elements.method = elements.function;
elements.var = elements.method;
elements.arg = elements.argument = elements.param;
elements.prop = elements.property;
elements.return = elements.returns;
elements.exception = elements.throws;

module.exports = elements;


/***/ }),

/***/ "./src/UnreachableCode.js":
/*!********************************!*\
  !*** ./src/UnreachableCode.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");

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

/***/ }),

/***/ "./src/extension.js":
/*!**************************!*\
  !*** ./src/extension.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode")
const provideSignatureHelp = (__webpack_require__(/*! ./providers/provideSignatureHelp */ "./src/providers/provideSignatureHelp.js").provideSignatureHelp)
const provideCompletionItems = __webpack_require__(/*! ./providers/provideCompletionItems */ "./src/providers/provideCompletionItems.js")
const provideHover = (__webpack_require__(/*! ./providers/provideHover */ "./src/providers/provideHover.js").provideHover)
const provideInlayHints = __webpack_require__(/*! ./providers/provideInlayHints */ "./src/providers/provideInlayHints.js");
const provideOnType = (__webpack_require__(/*! ./providers/provideOnTypeFormatting */ "./src/providers/provideOnTypeFormatting.js").provideOnTypeFormattingEdits);
const beautify = __webpack_require__(/*! ./js-beautify */ "./src/js-beautify.js");
//const squirrel_parser = require('vscode-squirrel_parser');
const squirrel_parser = __webpack_require__(/*! ./index */ "./src/index.js");
const APIparser = __webpack_require__(/*! ./DOCS/APIparser */ "./src/DOCS/APIparser.js")
new APIparser.APIparser(__webpack_require__(/*! ./DOCS/api.json */ "./src/DOCS/api.json"));
const provideOther = __webpack_require__(/*! ./providers/provideOther */ "./src/providers/provideOther.js")
const provideDefinitionProvider = __webpack_require__(/*! ./providers/provideDefinitionProvider */ "./src/providers/provideDefinitionProvider.js")
let JSDocElements = __webpack_require__(/*! ./providers/provideCompletionItemsJSDOC */ "./src/providers/provideCompletionItemsJSDOC.js");
const path = __webpack_require__(/*! path */ "path");
const utility = __webpack_require__(/*! ./utility */ "./src/utility.js");
const UnreachableCode = __webpack_require__(/*! ./UnreachableCode */ "./src/UnreachableCode.js");
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
    const file = __webpack_require__(/*! ./Files */ "./src/Files.js")
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

    // if (configuration.get('UnreachableCode')) {
    //     function highlightUnreachable(editor = vscode.window.activeTextEditor) {
    //         const diagnostics = UnreachableCode.analyzeUnreachableCode(editor.document);
    //         const decorationsArray = diagnostics.map(d => ({
    //             range: d.range,
    //             hoverMessage: "Unreachable code detected"
    //         }));
    //         editor.setDecorations(decorationType, decorationsArray);
    //     }

    //     context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
    //         activeEditor = editor;
    //         if (editor) {
    //             if (editor.document.languageId === "squirrel") {
    //                 highlightUnreachable(editor)
    //             }
    //         }
    //     }, null, context.subscriptions))
    //     context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
    //         if (timeout) {
    //             clearTimeout(timeout);
    //             timeout = undefined;
    //         }
    //         timeout = setTimeout(function () {
    //             if (event.document.languageId === "squirrel") {
    //                 if (activeEditor && event.document === activeEditor.document) {
    //                     highlightUnreachable(activeEditor)
    //                 }
    //             }
    //         }, 300)
    //     }, null, context.subscriptions));
    //     if (activeEditor) {
    //         if (activeEditor.document.languageId === "squirrel") {
    //             highlightUnreachable(activeEditor)
    //         }
    //     }
    // }

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

/***/ }),

/***/ "./src/indent-only.js":
/*!****************************!*\
  !*** ./src/indent-only.js ***!
  \****************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const fs = __webpack_require__(/*! fs */ "fs");
const JSDOCParse = __webpack_require__(/*! comment-parser */ "./node_modules/comment-parser/lib/index.cjs");
//const tokenize = require("./tokenize")

const commentblock = /\/\*(?<=\*)\s*(?:[^\*]|\*[^\/])*\*\/|\/\/.*$|\#.*$/gm;
const JSDOC = /(\/\*\*\s*\n(?:[^\*]|\*[^\/])*\*\/\s*)?/;

let JSDOCText = [];

//const code = vscode.window.activeTextEditor.document.fileName
// const result = this.Parse(code)
// console.log(result);

exports.Parse = function (fileName) {
    console.log('[index.js] Parse для', fileName);
    
    // Проверяем наличие активного редактора
    const activeEditor = vscode.window.activeTextEditor;
    
    let text;
    if (activeEditor && activeEditor.document.fileName === fileName) {
        // Если есть активный редактор и он открытый файл совпадает с нужным
        text = activeEditor.document.getText();
    } else {
        // Иначе читаем файл напрямую через fs
        text = fs.readFileSync(fileName, 'utf8');
    }

    // Остальной ваш код обработки текста...
    if (text.length > 500000) {
        console.warn('[Parse] Файл слишком большой, парсинг пропущен:', fileName);
        return [];
    }

    const temptext = RemoveComment(text);

    const reg = [
        /(local\s|static\s)?enum\s*([\w.:]+)\s*{/gm,
        /(local\s|static\s)?([\w.:]+)\s*<-\s*function\s*(\([^\)]*\))\s*{/gms,
        /(local\s|static\s)?function\s*([\w.:]+)\s?\([^\)]*\)\s*{/gms,
        /(local\s|static\s)?class\s*([\w.:]+)\s*(extends\s+[\w.:]+\s*)?{/gm,
        /(?<=\s)(local\s|static\s)?(\w+)\s*(?:=|<-)\s*((?!function\b)(?:[-\w\.\"\[\]{]+)(\(.*\))?|\s*{.*})/gm,
        /(local\s|static\s)?(constructor)\s*\s?\(.*\)\s*{/gm
    ];

    const SymbolKind = [
        vscode.SymbolKind.Enum,
        vscode.SymbolKind.Function,
        vscode.SymbolKind.Function,
        vscode.SymbolKind.Class,
        vscode.SymbolKind.Variable,
        vscode.SymbolKind.Constructor,
    ];

    const rootNode = GETBracketTree(temptext);
    if (rootNode === null) {
        return [];
    }
    let symbolsList = [];

    for (let j = 0; j < reg.length; j++) {
        if (SymbolKind[j] === vscode.SymbolKind.Variable) {
            let match;
            while ((match = reg[j].exec(temptext))) {
                const range = new vscode.Range(indexLineNumber(match.index + match[0].length, temptext), indexLineNumber(match.index, temptext));
                const location = new vscode.Location(vscode.Uri.file(fileName), range);
                const parentNode = FindNode(match.index, rootNode);
                const parentName = parentNode ? parentNode.name : match[2];
                const info = new vscode.SymbolInformation(match[2], SymbolKind[j], parentName, location);
                info.data = GETLocalOrStatic(match[1]);
                info.metadata = match[0];
                info.regex = match;
                symbolsList.push(info);
            }
        } else {
            let match;
            while ((match = reg[j].exec(temptext))) {
                UpdateBracketTreeNames(match, SymbolKind[j], rootNode);
            }
        }
        reg[j].lastIndex = 0;
    }

    const treeSymbols = MakeSymbolsList(rootNode, '', temptext, fileName);
    symbolsList.push(...treeSymbols);

    symbolsList = addJSDOC(symbolsList, JSDOCText);
    return symbolsList;
};

function addJSDOC(symbolsList, JSDOCText) {
    for (const element of JSDOCText) {
        const temprange = new vscode.Position(element.range.end.line + 1, element.range.end.character);
        for (const symbol of symbolsList) {
            if (!symbol.jsdoc && symbol.location.range.contains(temprange)) {
                symbol.jsdoc = element;
                break;
            }
        }
    }
    return symbolsList;
}

function UpdateBracketTreeNames(match, type, currNode) {
    const matchPos = match.index + match[0].length;
    const targetNode = findNearestNode(matchPos, currNode, 10);

    if (targetNode) {
        targetNode.name = match[2];
        targetNode.type = type;
        targetNode.start = match.index;
        targetNode.localOrStatic = GETLocalOrStatic(match[1]);
    }
}

function findNearestNode(pos, node, tolerance) {
    for (const child of node.childs) {
        if (Math.abs(child.start - pos) <= tolerance) {
            return child;
        }
        const deep = findNearestNode(pos, child, tolerance);
        if (deep) return deep;
    }
    return null;
}

function MakeSymbolsList(currNode, parentName, temptext, fileName) {
    let symbolsList = [];
    let currName = currNode.name || `${parentName}(${currNode.start}:${currNode.end})`;

    if (currNode.type && currNode.localOrStatic) {
        const range = new vscode.Range(indexLineNumber(currNode.start, temptext), indexLineNumber(currNode.end, temptext));
        const location = new vscode.Location(vscode.Uri.file(fileName), range);
        const info = new vscode.SymbolInformation(currNode.name, currNode.type, parentName, location);
        info.data = currNode.localOrStatic;
        info.metadata = temptext.substring(currNode.start, currNode.end + 1);
        symbolsList.push(info);
    }

    if (currNode.type === vscode.SymbolKind.Enum) {
        const enumText = temptext.substring(currNode.start, currNode.end + 1);
        const lines = enumText.split('\n');
        let offset = currNode.start;

        for (let line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
                offset += line.length + 1;
                continue;
            }

            const match = /^\s*([\w_]+)\s*,?/.exec(trimmed);
            if (match) {
                const memberName = match[1];
                const memberStart = offset + line.indexOf(memberName);
                const memberEnd = memberStart + memberName.length;

                const range = new vscode.Range(indexLineNumber(memberStart, temptext), indexLineNumber(memberEnd, temptext));
                const location = new vscode.Location(vscode.Uri.file(fileName), range);
                const info = new vscode.SymbolInformation(memberName, vscode.SymbolKind.EnumMember, currNode.name, location);
                symbolsList.push(info);
            }

            offset += line.length + 1;
        }
    }

    for (const child of currNode.childs) {
        symbolsList.push(...MakeSymbolsList(child, currName, temptext, fileName));
    }

    return symbolsList;
}

function FindNode(pos, currNode) {
    if (pos < currNode.start || pos > currNode.end) return null;
    for (const child of currNode.childs) {
        const result = FindNode(pos, child);
        if (result) return result;
    }
    return currNode;
}

function GETBracketTree(text) {
    const rootNode = {
        start: 0,
        end: text.length,
        name: 'root',
        parentNode: null,
        childs: []
    };
    let curNode = rootNode;
    const startStack = [];
    const MAX_DEPTH = 1000; // или другое разумное значение

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{') {
            if (startStack.length > MAX_DEPTH) {
                console.warn('[Parse] Превышена максимальная вложенность скобок, файл пропущен');
                return null;
            }
            startStack.push(i);
            const newNode = {
                start: i,
                end: text.length,
                name: '',
                parentNode: curNode,
                childs: []
            };
            curNode.childs.push(newNode);
            curNode = newNode;
        } else if (text[i] === '}') {
            if (startStack.length > 0) {
                curNode.end = i;
                curNode = curNode.parentNode;
                startStack.pop();
            }
        }
    }
    return rootNode;
}

function Spacebar(m) {
    return ' '.repeat(m);
}

function RemoveComment(text) {
    JSDOCText = [];
    return text.replace(commentblock, (match, offset, string) => {
        const jsdoc = JSDOC.exec(match);
        if (jsdoc?.[0]?.trim()) {
            JSDOCText.push({
                text: jsdoc[0],
                range: new vscode.Range(indexLineNumber(offset, string), indexLineNumber(offset + jsdoc[0].length, string)),
                parsed: JSDOCParse.parse(jsdoc[0])[0],
            });
        }
        return match.split("\n").map(line => Spacebar(line.length)).join("\n");
    });
}

function GETLocalOrStatic(modifier) {
    const trimmed = (modifier || '').trim();
    return {
        local: trimmed === 'local',
        static: trimmed === 'static'
    };
}

function indexLineNumber(index, txt) {
    let line = 0, character = 0;
    for (let i = 0; i < index; i++) {
        character++;
        if (txt[i] === '\n') {
            line++;
            character = 0;
        }
    }
    return new vscode.Position(line, character);
}

/***/ }),

/***/ "./src/js-beautify.js":
/*!****************************!*\
  !*** ./src/js-beautify.js ***!
  \****************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@beautifier.io>
      https://beautifier.io/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@beautifier.io>


  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy        !jslint_happy
            ---------------------------------
            function ()         function()

            switch () {         switch() {
            case 1:               case 1:
              break;                break;
            }                   }

    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
          NOTE: This option is overridden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none" | any of the former + ",preserve-inline"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
            preserve-inline will try to preserve inline blocks of curly braces

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    end_with_newline (default false)  - end output with a newline


    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/

(function() {

    /* GENERATED_BUILD_OUTPUT */
    var legacy_beautify_js;
    /******/ (function() { // webpackBootstrap
    /******/ 	"use strict";
    /******/ 	var __webpack_modules__ = ([
    /* 0 */
    /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_4123__) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Beautifier = (__nested_webpack_require_4123__(1).Beautifier),
      Options = (__nested_webpack_require_4123__(5).Options);
    
    function js_beautify(js_source_text, options) {
      var beautifier = new Beautifier(js_source_text, options);
      return beautifier.beautify();
    }
    
    module.exports = js_beautify;
    module.exports.defaultOptions = function() {
      return new Options();
    };
    
    
    /***/ }),
    /* 1 */
    /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_5992__) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Output = (__nested_webpack_require_5992__(2).Output);
    var Token = (__nested_webpack_require_5992__(3).Token);
    var acorn = __nested_webpack_require_5992__(4);
    var Options = (__nested_webpack_require_5992__(5).Options);
    var Tokenizer = (__nested_webpack_require_5992__(7).Tokenizer);
    var line_starters = (__nested_webpack_require_5992__(7).line_starters);
    var positionable_operators = (__nested_webpack_require_5992__(7).positionable_operators);
    var TOKEN = (__nested_webpack_require_5992__(7).TOKEN);
    
    
    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }
    
    function ltrim(s) {
      return s.replace(/^\s+/g, '');
    }
    
    function generateMapFromStrings(list) {
      var result = {};
      for (var x = 0; x < list.length; x++) {
        // make the mapped names underscored instead of dash
        result[list[x].replace(/-/g, '_')] = list[x];
      }
      return result;
    }
    
    function reserved_word(token, word) {
      return token && token.type === TOKEN.RESERVED && token.text === word;
    }
    
    function reserved_array(token, words) {
      return token && token.type === TOKEN.RESERVED && in_array(token.text, words);
    }
    // Unsure of what they mean, but they work. Worth cleaning up in future.
    var special_words = ['case', 'return', 'do', 'if', 'throw', 'else', 'await', 'break', 'continue', 'async'];
    
    var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];
    
    // Generate map from array
    var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);
    
    var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];
    
    var MODE = {
      BlockStatement: 'BlockStatement', // 'BLOCK'
      Statement: 'Statement', // 'STATEMENT'
      ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
      ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
      ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
      Conditional: 'Conditional', //'(COND-EXPRESSION)',
      Expression: 'Expression' //'(EXPRESSION)'
    };
    
    function remove_redundant_indentation(output, frame) {
      // This implementation is effective but has some issues:
      //     - can cause line wrap to happen too soon due to indent removal
      //           after wrap points are calculated
      // These issues are minor compared to ugly indentation.
    
      if (frame.multiline_frame ||
        frame.mode === MODE.ForInitializer ||
        frame.mode === MODE.Conditional) {
        return;
      }
    
      // remove one indent from each line inside this section
      output.remove_indent(frame.start_line_index);
    }
    
    // we could use just string.split, but
    // IE doesn't like returning empty strings
    function split_linebreaks(s) {
      //return s.split(/\x0d\x0a|\x0a/);
    
      s = s.replace(acorn.allLineBreaks, '\n');
      var out = [],
        idx = s.indexOf("\n");
      while (idx !== -1) {
        out.push(s.substring(0, idx));
        s = s.substring(idx + 1);
        idx = s.indexOf("\n");
      }
      if (s.length) {
        out.push(s);
      }
      return out;
    }
    
    function is_array(mode) {
      return mode === MODE.ArrayLiteral;
    }
    
    function is_expression(mode) {
      return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }
    
    function all_lines_start_with(lines, c) {
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line.charAt(0) !== c) {
          return false;
        }
      }
      return true;
    }
    
    function each_line_matches_indent(lines, indent) {
      var i = 0,
        len = lines.length,
        line;
      for (; i < len; i++) {
        line = lines[i];
        // allow empty lines to pass through
        if (line && line.indexOf(indent) !== 0) {
          return false;
        }
      }
      return true;
    }
    
    
    function Beautifier(source_text, options) {
      options = options || {};
      this._source_text = source_text || '';
    
      this._output = null;
      this._tokens = null;
      this._last_last_text = null;
      this._flags = null;
      this._previous_flags = null;
    
      this._flag_store = null;
      this._options = new Options(options);
    }
    
    Beautifier.prototype.create_flags = function(flags_base, mode) {
      var next_indent_level = 0;
      if (flags_base) {
        next_indent_level = flags_base.indentation_level;
        if (!this._output.just_added_newline() &&
          flags_base.line_indent_level > next_indent_level) {
          next_indent_level = flags_base.line_indent_level;
        }
      }
    
      var next_flags = {
        mode: mode,
        parent: flags_base,
        last_token: flags_base ? flags_base.last_token : new Token(TOKEN.START_BLOCK, ''), // last token text
        last_word: flags_base ? flags_base.last_word : '', // last TOKEN.WORD passed
        declaration_statement: false,
        declaration_assignment: false,
        multiline_frame: false,
        inline_frame: false,
        if_block: false,
        else_block: false,
        class_start_block: false, // class A { INSIDE HERE } or class B extends C { INSIDE HERE }
        do_block: false,
        do_while: false,
        import_block: false,
        in_case_statement: false, // switch(..){ INSIDE HERE }
        in_case: false, // we're on the exact line with "case 0:"
        case_body: false, // the indented case-action block
        case_block: false, // the indented case-action block is wrapped with {}
        indentation_level: next_indent_level,
        alignment: 0,
        line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
        start_line_index: this._output.get_line_number(),
        ternary_depth: 0
      };
      return next_flags;
    };
    
    Beautifier.prototype._reset = function(source_text) {
      var baseIndentString = source_text.match(/^[\t ]*/)[0];
    
      this._last_last_text = ''; // pre-last token text
      this._output = new Output(this._options, baseIndentString);
    
      // If testing the ignore directive, start with output disable set to true
      this._output.raw = this._options.test_output_raw;
    
    
      // Stack of parsing/formatting states, including MODE.
      // We tokenize, parse, and output in an almost purely a forward-only stream of token input
      // and formatted output.  This makes the beautifier less accurate than full parsers
      // but also far more tolerant of syntax errors.
      //
      // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
      // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
      // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
      // most full parsers would die, but the beautifier gracefully falls back to
      // MODE.BlockStatement and continues on.
      this._flag_store = [];
      this.set_mode(MODE.BlockStatement);
      var tokenizer = new Tokenizer(source_text, this._options);
      this._tokens = tokenizer.tokenize();
      return source_text;
    };
    
    Beautifier.prototype.beautify = function() {
      // if disabled, return the input unchanged.
      if (this._options.disabled) {
        return this._source_text;
      }
    
      var sweet_code;
      var source_text = this._reset(this._source_text);
    
      var eol = this._options.eol;
      if (this._options.eol === 'auto') {
        eol = '\n';
        if (source_text && acorn.lineBreak.test(source_text || '')) {
          eol = source_text.match(acorn.lineBreak)[0];
        }
      }
    
      var current_token = this._tokens.next();
      while (current_token) {
        this.handle_token(current_token);
    
        this._last_last_text = this._flags.last_token.text;
        this._flags.last_token = current_token;
    
        current_token = this._tokens.next();
      }
    
      sweet_code = this._output.get_code(eol);
    
      return sweet_code;
    };
    
    Beautifier.prototype.handle_token = function(current_token, preserve_statement_flags) {
      if (current_token.type === TOKEN.START_EXPR) {
        this.handle_start_expr(current_token);
      } else if (current_token.type === TOKEN.END_EXPR) {
        this.handle_end_expr(current_token);
      } else if (current_token.type === TOKEN.START_BLOCK) {
        this.handle_start_block(current_token);
      } else if (current_token.type === TOKEN.END_BLOCK) {
        this.handle_end_block(current_token);
      } else if (current_token.type === TOKEN.WORD) {
        this.handle_word(current_token);
      } else if (current_token.type === TOKEN.RESERVED) {
        this.handle_word(current_token);
      } else if (current_token.type === TOKEN.SEMICOLON) {
        this.handle_semicolon(current_token);
      } else if (current_token.type === TOKEN.STRING) {
        this.handle_string(current_token);
      } else if (current_token.type === TOKEN.EQUALS) {
        this.handle_equals(current_token);
      } else if (current_token.type === TOKEN.OPERATOR) {
        this.handle_operator(current_token);
      } else if (current_token.type === TOKEN.COMMA) {
        this.handle_comma(current_token);
      } else if (current_token.type === TOKEN.BLOCK_COMMENT) {
        this.handle_block_comment(current_token, preserve_statement_flags);
      } else if (current_token.type === TOKEN.COMMENT) {
        this.handle_comment(current_token, preserve_statement_flags);
      } else if (current_token.type === TOKEN.DOT) {
        this.handle_dot(current_token);
      } else if (current_token.type === TOKEN.EOF) {
        this.handle_eof(current_token);
      } else if (current_token.type === TOKEN.UNKNOWN) {
        this.handle_unknown(current_token, preserve_statement_flags);
      } else {
        this.handle_unknown(current_token, preserve_statement_flags);
      }
    };
    
    Beautifier.prototype.handle_whitespace_and_comments = function(current_token, preserve_statement_flags) {
      var newlines = current_token.newlines;
      var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);
    
      if (current_token.comments_before) {
        var comment_token = current_token.comments_before.next();
        while (comment_token) {
          // The cleanest handling of inline comments is to treat them as though they aren't there.
          // Just continue formatting and the behavior should be logical.
          // Also ignore unknown tokens.  Again, this should result in better behavior.
          this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
          this.handle_token(comment_token, preserve_statement_flags);
          comment_token = current_token.comments_before.next();
        }
      }
    
      if (keep_whitespace) {
        for (var i = 0; i < newlines; i += 1) {
          this.print_newline(i > 0, preserve_statement_flags);
        }
      } else {
        if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
          newlines = this._options.max_preserve_newlines;
        }
    
        if (this._options.preserve_newlines) {
          if (newlines > 1) {
            this.print_newline(false, preserve_statement_flags);
            for (var j = 1; j < newlines; j += 1) {
              this.print_newline(true, preserve_statement_flags);
            }
          }
        }
      }
    
    };
    
    var newline_restricted_tokens = ['async', 'break', 'continue', 'return', 'throw', 'yield'];
    
    Beautifier.prototype.allow_wrap_or_preserved_newline = function(current_token, force_linewrap) {
      force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;
    
      // Never wrap the first token on a line
      if (this._output.just_added_newline()) {
        return;
      }
    
      var shouldPreserveOrForce = (this._options.preserve_newlines && current_token.newlines) || force_linewrap;
      var operatorLogicApplies = in_array(this._flags.last_token.text, positionable_operators) ||
        in_array(current_token.text, positionable_operators);
    
      if (operatorLogicApplies) {
        var shouldPrintOperatorNewline = (
            in_array(this._flags.last_token.text, positionable_operators) &&
            in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
          ) ||
          in_array(current_token.text, positionable_operators);
        shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
      }
    
      if (shouldPreserveOrForce) {
        this.print_newline(false, true);
      } else if (this._options.wrap_line_length) {
        if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
          // These tokens should never have a newline inserted
          // between them and the following expression.
          return;
        }
        this._output.set_wrap_point();
      }
    };
    
    Beautifier.prototype.print_newline = function(force_newline, preserve_statement_flags) {
      if (!preserve_statement_flags) {
        if (this._flags.last_token.text !== ';' && this._flags.last_token.text !== ',' && this._flags.last_token.text !== '=' && (this._flags.last_token.type !== TOKEN.OPERATOR || this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) {
          var next_token = this._tokens.peek();
          while (this._flags.mode === MODE.Statement &&
            !(this._flags.if_block && reserved_word(next_token, 'else')) &&
            !this._flags.do_block) {
            this.restore_mode();
          }
        }
      }
    
      if (this._output.add_new_line(force_newline)) {
        this._flags.multiline_frame = true;
      }
    };
    
    Beautifier.prototype.print_token_line_indentation = function(current_token) {
      if (this._output.just_added_newline()) {
        if (this._options.keep_array_indentation &&
          current_token.newlines &&
          (current_token.text === '[' || is_array(this._flags.mode))) {
          this._output.current_line.set_indent(-1);
          this._output.current_line.push(current_token.whitespace_before);
          this._output.space_before_token = false;
        } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
          this._flags.line_indent_level = this._flags.indentation_level;
        }
      }
    };
    
    Beautifier.prototype.print_token = function(current_token) {
      if (this._output.raw) {
        this._output.add_raw_token(current_token);
        return;
      }
    
      if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN.COMMA &&
        this._output.just_added_newline()) {
        if (this._output.previous_line.last() === ',') {
          var popped = this._output.previous_line.pop();
          // if the comma was already at the start of the line,
          // pull back onto that line and reprint the indentation
          if (this._output.previous_line.is_empty()) {
            this._output.previous_line.push(popped);
            this._output.trim(true);
            this._output.current_line.pop();
            this._output.trim();
          }
    
          // add the comma in front of the next token
          this.print_token_line_indentation(current_token);
          this._output.add_token(',');
          this._output.space_before_token = true;
        }
      }
    
      this.print_token_line_indentation(current_token);
      this._output.non_breaking_space = true;
      this._output.add_token(current_token.text);
      if (this._output.previous_token_wrapped) {
        this._flags.multiline_frame = true;
      }
    };
    
    Beautifier.prototype.indent = function() {
      this._flags.indentation_level += 1;
      this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
    };
    
    Beautifier.prototype.deindent = function() {
      if (this._flags.indentation_level > 0 &&
        ((!this._flags.parent) || this._flags.indentation_level > this._flags.parent.indentation_level)) {
        this._flags.indentation_level -= 1;
        this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
      }
    };
    
    Beautifier.prototype.set_mode = function(mode) {
      if (this._flags) {
        this._flag_store.push(this._flags);
        this._previous_flags = this._flags;
      } else {
        this._previous_flags = this.create_flags(null, mode);
      }
    
      this._flags = this.create_flags(this._previous_flags, mode);
      this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
    };
    
    
    Beautifier.prototype.restore_mode = function() {
      if (this._flag_store.length > 0) {
        this._previous_flags = this._flags;
        this._flags = this._flag_store.pop();
        if (this._previous_flags.mode === MODE.Statement) {
          remove_redundant_indentation(this._output, this._previous_flags);
        }
        this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
      }
    };
    
    Beautifier.prototype.start_of_object_property = function() {
      return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (
        (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || (reserved_array(this._flags.last_token, ['get', 'set'])));
    };
    
    Beautifier.prototype.start_of_statement = function(current_token) {
      var start = false;
      start = start || reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD;
      start = start || reserved_word(this._flags.last_token, 'do');
      start = start || (!(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement)) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
      start = start || reserved_word(this._flags.last_token, 'else') &&
        !(reserved_word(current_token, 'if') && !current_token.comments_before);
      start = start || (this._flags.last_token.type === TOKEN.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional));
      start = start || (this._flags.last_token.type === TOKEN.WORD && this._flags.mode === MODE.BlockStatement &&
        !this._flags.in_case &&
        !(current_token.text === '--' || current_token.text === '++') &&
        this._last_last_text !== 'function' &&
        current_token.type !== TOKEN.WORD && current_token.type !== TOKEN.RESERVED);
      start = start || (this._flags.mode === MODE.ObjectLiteral && (
        (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || reserved_array(this._flags.last_token, ['get', 'set'])));
    
      if (start) {
        this.set_mode(MODE.Statement);
        this.indent();
    
        this.handle_whitespace_and_comments(current_token, true);
    
        // Issue #276:
        // If starting a new statement with [if, for, while, do], push to a new line.
        // if (a) if (b) if(c) d(); else e(); else f();
        if (!this.start_of_object_property()) {
          this.allow_wrap_or_preserved_newline(current_token,
            reserved_array(current_token, ['do', 'for', 'if', 'while']));
        }
        return true;
      }
      return false;
    };
    
    Beautifier.prototype.handle_start_expr = function(current_token) {
      // The conditional starts the statement if appropriate.
      if (!this.start_of_statement(current_token)) {
        this.handle_whitespace_and_comments(current_token);
      }
    
      var next_mode = MODE.Expression;
      if (current_token.text === '[') {
    
        if (this._flags.last_token.type === TOKEN.WORD || this._flags.last_token.text === ')') {
          // this is array index specifier, break immediately
          // a[x], fn()[x]
          if (reserved_array(this._flags.last_token, line_starters)) {
            this._output.space_before_token = true;
          }
          this.print_token(current_token);
          this.set_mode(next_mode);
          this.indent();
          if (this._options.space_in_paren) {
            this._output.space_before_token = true;
          }
          return;
        }
    
        next_mode = MODE.ArrayLiteral;
        if (is_array(this._flags.mode)) {
          if (this._flags.last_token.text === '[' ||
            (this._flags.last_token.text === ',' && (this._last_last_text === ']' || this._last_last_text === '}'))) {
            // ], [ goes to new line
            // }, [ goes to new line
            if (!this._options.keep_array_indentation) {
              this.print_newline();
            }
          }
        }
    
        if (!in_array(this._flags.last_token.type, [TOKEN.START_EXPR, TOKEN.END_EXPR, TOKEN.WORD, TOKEN.OPERATOR, TOKEN.DOT])) {
          this._output.space_before_token = true;
        }
      } else {
        if (this._flags.last_token.type === TOKEN.RESERVED) {
          if (this._flags.last_token.text === 'for') {
            this._output.space_before_token = this._options.space_before_conditional;
            next_mode = MODE.ForInitializer;
          } else if (in_array(this._flags.last_token.text, ['if', 'while', 'switch'])) {
            this._output.space_before_token = this._options.space_before_conditional;
            next_mode = MODE.Conditional;
          } else if (in_array(this._flags.last_word, ['await', 'async'])) {
            // Should be a space between await and an IIFE, or async and an arrow function
            this._output.space_before_token = true;
          } else if (this._flags.last_token.text === 'import' && current_token.whitespace_before === '') {
            this._output.space_before_token = false;
          } else if (in_array(this._flags.last_token.text, line_starters) || this._flags.last_token.text === 'catch') {
            this._output.space_before_token = true;
          }
        } else if (this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
          // Support of this kind of newline preservation.
          // a = (b &&
          //     (c || d));
          if (!this.start_of_object_property()) {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else if (this._flags.last_token.type === TOKEN.WORD) {
          this._output.space_before_token = false;
    
          // function name() vs function name ()
          // function* name() vs function* name ()
          // async name() vs async name ()
          // In ES6, you can also define the method properties of an object
          // var obj = {a: function() {}}
          // It can be abbreviated
          // var obj = {a() {}}
          // var obj = { a() {}} vs var obj = { a () {}}
          // var obj = { * a() {}} vs var obj = { * a () {}}
          var peek_back_two = this._tokens.peek(-3);
          if (this._options.space_after_named_function && peek_back_two) {
            // peek starts at next character so -1 is current token
            var peek_back_three = this._tokens.peek(-4);
            if (reserved_array(peek_back_two, ['async', 'function']) ||
              (peek_back_two.text === '*' && reserved_array(peek_back_three, ['async', 'function']))) {
              this._output.space_before_token = true;
            } else if (this._flags.mode === MODE.ObjectLiteral) {
              if ((peek_back_two.text === '{' || peek_back_two.text === ',') ||
                (peek_back_two.text === '*' && (peek_back_three.text === '{' || peek_back_three.text === ','))) {
                this._output.space_before_token = true;
              }
            } else if (this._flags.parent && this._flags.parent.class_start_block) {
              this._output.space_before_token = true;
            }
          }
        } else {
          // Support preserving wrapped arrow function expressions
          // a.b('c',
          //     () => d.e
          // )
          this.allow_wrap_or_preserved_newline(current_token);
        }
    
        // function() vs function ()
        // yield*() vs yield* ()
        // function*() vs function* ()
        if ((this._flags.last_token.type === TOKEN.RESERVED && (this._flags.last_word === 'function' || this._flags.last_word === 'typeof')) ||
          (this._flags.last_token.text === '*' &&
            (in_array(this._last_last_text, ['function', 'yield']) ||
              (this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))))) {
          this._output.space_before_token = this._options.space_after_anon_function;
        }
      }
    
      if (this._flags.last_token.text === ';' || this._flags.last_token.type === TOKEN.START_BLOCK) {
        this.print_newline();
      } else if (this._flags.last_token.type === TOKEN.END_EXPR || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.END_BLOCK || this._flags.last_token.text === '.' || this._flags.last_token.type === TOKEN.COMMA) {
        // do nothing on (( and )( and ][ and ]( and .(
        // TODO: Consider whether forcing this is required.  Review failing tests when removed.
        this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
      }
    
      this.print_token(current_token);
      this.set_mode(next_mode);
      if (this._options.space_in_paren) {
        this._output.space_before_token = true;
      }
    
      // In all cases, if we newline while inside an expression it should be indented.
      this.indent();
    };
    
    Beautifier.prototype.handle_end_expr = function(current_token) {
      // statements inside expressions are not valid syntax, but...
      // statements must all be closed when their container closes
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
    
      this.handle_whitespace_and_comments(current_token);
    
      if (this._flags.multiline_frame) {
        this.allow_wrap_or_preserved_newline(current_token,
          current_token.text === ']' && is_array(this._flags.mode) && !this._options.keep_array_indentation);
      }
    
      if (this._options.space_in_paren) {
        if (this._flags.last_token.type === TOKEN.START_EXPR && !this._options.space_in_empty_paren) {
          // () [] no inner space in empty parens like these, ever, ref #320
          this._output.trim();
          this._output.space_before_token = false;
        } else {
          this._output.space_before_token = true;
        }
      }
      this.deindent();
      this.print_token(current_token);
      this.restore_mode();
    
      remove_redundant_indentation(this._output, this._previous_flags);
    
      // do {} while () // no statement required after
      if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
        this._previous_flags.mode = MODE.Expression;
        this._flags.do_block = false;
        this._flags.do_while = false;
    
      }
    };
    
    Beautifier.prototype.handle_start_block = function(current_token) {
      this.handle_whitespace_and_comments(current_token);
    
      // Check if this is should be treated as a ObjectLiteral
      var next_token = this._tokens.peek();
      var second_token = this._tokens.peek(1);
      if (this._flags.last_word === 'switch' && this._flags.last_token.type === TOKEN.END_EXPR) {
        this.set_mode(MODE.BlockStatement);
        this._flags.in_case_statement = true;
      } else if (this._flags.case_body) {
        this.set_mode(MODE.BlockStatement);
      } else if (second_token && (
          (in_array(second_token.text, [':', ',']) && in_array(next_token.type, [TOKEN.STRING, TOKEN.WORD, TOKEN.RESERVED])) ||
          (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, [TOKEN.WORD, TOKEN.RESERVED]))
        )) {
        // We don't support TypeScript,but we didn't break it for a very long time.
        // We'll try to keep not breaking it.
        if (in_array(this._last_last_text, ['class', 'interface']) && !in_array(second_token.text, [':', ','])) {
          this.set_mode(MODE.BlockStatement);
        } else {
          this.set_mode(MODE.ObjectLiteral);
        }
      } else if (this._flags.last_token.type === TOKEN.OPERATOR && this._flags.last_token.text === '=>') {
        // arrow function: (param1, paramN) => { statements }
        this.set_mode(MODE.BlockStatement);
      } else if (in_array(this._flags.last_token.type, [TOKEN.EQUALS, TOKEN.START_EXPR, TOKEN.COMMA, TOKEN.OPERATOR]) ||
        reserved_array(this._flags.last_token, ['return', 'throw', 'import', 'default'])
      ) {
        // Detecting shorthand function syntax is difficult by scanning forward,
        //     so check the surrounding context.
        // If the block is being returned, imported, export default, passed as arg,
        //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
        this.set_mode(MODE.ObjectLiteral);
      } else {
        this.set_mode(MODE.BlockStatement);
      }
    
      if (this._flags.last_token) {
        if (reserved_array(this._flags.last_token.previous, ['class', 'extends'])) {
          this._flags.class_start_block = true;
        }
      }
    
      var empty_braces = !next_token.comments_before && next_token.text === '}';
      var empty_anonymous_function = empty_braces && this._flags.last_word === 'function' &&
        this._flags.last_token.type === TOKEN.END_EXPR;
    
      if (this._options.brace_preserve_inline) // check for inline, set inline_frame if so
      {
        // search forward for a newline wanted inside this block
        var index = 0;
        var check_token = null;
        this._flags.inline_frame = true;
        do {
          index += 1;
          check_token = this._tokens.peek(index - 1);
          if (check_token.newlines) {
            this._flags.inline_frame = false;
            break;
          }
        } while (check_token.type !== TOKEN.EOF &&
          !(check_token.type === TOKEN.END_BLOCK && check_token.opened === current_token));
      }
    
      if ((this._options.brace_style === "expand" ||
          (this._options.brace_style === "none" && current_token.newlines)) &&
        !this._flags.inline_frame) {
        if (this._flags.last_token.type !== TOKEN.OPERATOR &&
          (empty_anonymous_function ||
            this._flags.last_token.type === TOKEN.EQUALS ||
            (reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== 'else'))) {
          this._output.space_before_token = true;
        } else {
          this.print_newline(false, true);
        }
      } else { // collapse || inline_frame
        if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.COMMA)) {
          if (this._flags.last_token.type === TOKEN.COMMA || this._options.space_in_paren) {
            this._output.space_before_token = true;
          }
    
          if (this._flags.last_token.type === TOKEN.COMMA || (this._flags.last_token.type === TOKEN.START_EXPR && this._flags.inline_frame)) {
            this.allow_wrap_or_preserved_newline(current_token);
            this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
            this._flags.multiline_frame = false;
          }
        }
        if (this._flags.last_token.type !== TOKEN.OPERATOR && this._flags.last_token.type !== TOKEN.START_EXPR) {
          if (in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.SEMICOLON]) && !this._flags.inline_frame) {
            this.print_newline();
          } else {
            this._output.space_before_token = true;
          }
        }
      }
      this.print_token(current_token);
      this.indent();
    
      // Except for specific cases, open braces are followed by a new line.
      if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
        this.print_newline();
      }
    };
    
    Beautifier.prototype.handle_end_block = function(current_token) {
      // statements must all be closed when their container closes
      this.handle_whitespace_and_comments(current_token);
    
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
    
      var empty_braces = this._flags.last_token.type === TOKEN.START_BLOCK;
    
      if (this._flags.inline_frame && !empty_braces) { // try inline_frame (only set if this._options.braces-preserve-inline) first
        this._output.space_before_token = true;
      } else if (this._options.brace_style === "expand") {
        if (!empty_braces) {
          this.print_newline();
        }
      } else {
        // skip {}
        if (!empty_braces) {
          if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
            // we REALLY need a newline here, but newliner would skip that
            this._options.keep_array_indentation = false;
            this.print_newline();
            this._options.keep_array_indentation = true;
    
          } else {
            this.print_newline();
          }
        }
      }
      this.restore_mode();
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_word = function(current_token) {
      if (current_token.type === TOKEN.RESERVED) {
        if (in_array(current_token.text, ['set', 'get']) && this._flags.mode !== MODE.ObjectLiteral) {
          current_token.type = TOKEN.WORD;
        } else if (current_token.text === 'import' && in_array(this._tokens.peek().text, ['(', '.'])) {
          current_token.type = TOKEN.WORD;
        } else if (in_array(current_token.text, ['as', 'from']) && !this._flags.import_block) {
          current_token.type = TOKEN.WORD;
        } else if (this._flags.mode === MODE.ObjectLiteral) {
          var next_token = this._tokens.peek();
          if (next_token.text === ':') {
            current_token.type = TOKEN.WORD;
          }
        }
      }
    
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        if (reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD) {
          this._flags.declaration_statement = true;
        }
      } else if (current_token.newlines && !is_expression(this._flags.mode) &&
        (this._flags.last_token.type !== TOKEN.OPERATOR || (this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) &&
        this._flags.last_token.type !== TOKEN.EQUALS &&
        (this._options.preserve_newlines || !reserved_array(this._flags.last_token, ['var', 'let', 'const', 'set', 'get']))) {
        this.handle_whitespace_and_comments(current_token);
        this.print_newline();
      } else {
        this.handle_whitespace_and_comments(current_token);
      }
    
      if (this._flags.do_block && !this._flags.do_while) {
        if (reserved_word(current_token, 'while')) {
          // do {} ## while ()
          this._output.space_before_token = true;
          this.print_token(current_token);
          this._output.space_before_token = true;
          this._flags.do_while = true;
          return;
        } else {
          // do {} should always have while as the next word.
          // if we don't see the expected while, recover
          this.print_newline();
          this._flags.do_block = false;
        }
      }
    
      // if may be followed by else, or not
      // Bare/inline ifs are tricky
      // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
      if (this._flags.if_block) {
        if (!this._flags.else_block && reserved_word(current_token, 'else')) {
          this._flags.else_block = true;
        } else {
          while (this._flags.mode === MODE.Statement) {
            this.restore_mode();
          }
          this._flags.if_block = false;
          this._flags.else_block = false;
        }
      }
    
      if (this._flags.in_case_statement && reserved_array(current_token, ['case', 'default'])) {
        this.print_newline();
        if (!this._flags.case_block && (this._flags.case_body || this._options.jslint_happy)) {
          // switch cases following one another
          this.deindent();
        }
        this._flags.case_body = false;
    
        this.print_token(current_token);
        this._flags.in_case = true;
        return;
      }
    
      if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
        if (!this.start_of_object_property() && !(
            // start of object property is different for numeric values with +/- prefix operators
            in_array(this._flags.last_token.text, ['+', '-']) && this._last_last_text === ':' && this._flags.parent.mode === MODE.ObjectLiteral)) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
      }
    
      if (reserved_word(current_token, 'function')) {
        if (in_array(this._flags.last_token.text, ['}', ';']) ||
          (this._output.just_added_newline() && !(in_array(this._flags.last_token.text, ['(', '[', '{', ':', '=', ',']) || this._flags.last_token.type === TOKEN.OPERATOR))) {
          // make sure there is a nice clean space of at least one blank line
          // before a new function definition
          if (!this._output.just_added_blankline() && !current_token.comments_before) {
            this.print_newline();
            this.print_newline(true);
          }
        }
        if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD) {
          if (reserved_array(this._flags.last_token, ['get', 'set', 'new', 'export']) ||
            reserved_array(this._flags.last_token, newline_restricted_tokens)) {
            this._output.space_before_token = true;
          } else if (reserved_word(this._flags.last_token, 'default') && this._last_last_text === 'export') {
            this._output.space_before_token = true;
          } else if (this._flags.last_token.text === 'declare') {
            // accomodates Typescript declare function formatting
            this._output.space_before_token = true;
          } else {
            this.print_newline();
          }
        } else if (this._flags.last_token.type === TOKEN.OPERATOR || this._flags.last_token.text === '=') {
          // foo = function
          this._output.space_before_token = true;
        } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode))) {
          // (function
        } else {
          this.print_newline();
        }
    
        this.print_token(current_token);
        this._flags.last_word = current_token.text;
        return;
      }
    
      var prefix = 'NONE';
    
      if (this._flags.last_token.type === TOKEN.END_BLOCK) {
    
        if (this._previous_flags.inline_frame) {
          prefix = 'SPACE';
        } else if (!reserved_array(current_token, ['else', 'catch', 'finally', 'from'])) {
          prefix = 'NEWLINE';
        } else {
          if (this._options.brace_style === "expand" ||
            this._options.brace_style === "end-expand" ||
            (this._options.brace_style === "none" && current_token.newlines)) {
            prefix = 'NEWLINE';
          } else {
            prefix = 'SPACE';
            this._output.space_before_token = true;
          }
        }
      } else if (this._flags.last_token.type === TOKEN.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
        // TODO: Should this be for STATEMENT as well?
        prefix = 'NEWLINE';
      } else if (this._flags.last_token.type === TOKEN.SEMICOLON && is_expression(this._flags.mode)) {
        prefix = 'SPACE';
      } else if (this._flags.last_token.type === TOKEN.STRING) {
        prefix = 'NEWLINE';
      } else if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD ||
        (this._flags.last_token.text === '*' &&
          (in_array(this._last_last_text, ['function', 'yield']) ||
            (this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))))) {
        prefix = 'SPACE';
      } else if (this._flags.last_token.type === TOKEN.START_BLOCK) {
        if (this._flags.inline_frame) {
          prefix = 'SPACE';
        } else {
          prefix = 'NEWLINE';
        }
      } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
        this._output.space_before_token = true;
        prefix = 'NEWLINE';
      }
    
      if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
        if (this._flags.inline_frame || this._flags.last_token.text === 'else' || this._flags.last_token.text === 'export') {
          prefix = 'SPACE';
        } else {
          prefix = 'NEWLINE';
        }
    
      }
    
      if (reserved_array(current_token, ['else', 'catch', 'finally'])) {
        if ((!(this._flags.last_token.type === TOKEN.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) ||
            this._options.brace_style === "expand" ||
            this._options.brace_style === "end-expand" ||
            (this._options.brace_style === "none" && current_token.newlines)) &&
          !this._flags.inline_frame) {
          this.print_newline();
        } else {
          this._output.trim(true);
          var line = this._output.current_line;
          // If we trimmed and there's something other than a close block before us
          // put a newline back in.  Handles '} // comment' scenario.
          if (line.last() !== '}') {
            this.print_newline();
          }
          this._output.space_before_token = true;
        }
      } else if (prefix === 'NEWLINE') {
        if (reserved_array(this._flags.last_token, special_words)) {
          // no newline between 'return nnn'
          this._output.space_before_token = true;
        } else if (this._flags.last_token.text === 'declare' && reserved_array(current_token, ['var', 'let', 'const'])) {
          // accomodates Typescript declare formatting
          this._output.space_before_token = true;
        } else if (this._flags.last_token.type !== TOKEN.END_EXPR) {
          if ((this._flags.last_token.type !== TOKEN.START_EXPR || !reserved_array(current_token, ['var', 'let', 'const'])) && this._flags.last_token.text !== ':') {
            // no need to force newline on 'var': for (var x = 0...)
            if (reserved_word(current_token, 'if') && reserved_word(current_token.previous, 'else')) {
              // no newline for } else if {
              this._output.space_before_token = true;
            } else {
              this.print_newline();
            }
          }
        } else if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
          this.print_newline();
        }
      } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === ',' && this._last_last_text === '}') {
        this.print_newline(); // }, in lists get a newline treatment
      } else if (prefix === 'SPACE') {
        this._output.space_before_token = true;
      }
      if (current_token.previous && (current_token.previous.type === TOKEN.WORD || current_token.previous.type === TOKEN.RESERVED)) {
        this._output.space_before_token = true;
      }
      this.print_token(current_token);
      this._flags.last_word = current_token.text;
    
      if (current_token.type === TOKEN.RESERVED) {
        if (current_token.text === 'do') {
          this._flags.do_block = true;
        } else if (current_token.text === 'if') {
          this._flags.if_block = true;
        } else if (current_token.text === 'import') {
          this._flags.import_block = true;
        } else if (this._flags.import_block && reserved_word(current_token, 'from')) {
          this._flags.import_block = false;
        }
      }
    };
    
    Beautifier.prototype.handle_semicolon = function(current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        // Semicolon can be the start (and end) of a statement
        this._output.space_before_token = false;
      } else {
        this.handle_whitespace_and_comments(current_token);
      }
    
      var next_token = this._tokens.peek();
      while (this._flags.mode === MODE.Statement &&
        !(this._flags.if_block && reserved_word(next_token, 'else')) &&
        !this._flags.do_block) {
        this.restore_mode();
      }
    
      // hacky but effective for the moment
      if (this._flags.import_block) {
        this._flags.import_block = false;
      }
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_string = function(current_token) {
      if (current_token.text.startsWith("`") && current_token.newlines === 0 && current_token.whitespace_before === '' && (current_token.previous.text === ')' || this._flags.last_token.type === TOKEN.WORD)) {
        //Conditional for detectign backtick strings
      } else if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        // One difference - strings want at least a space before
        this._output.space_before_token = true;
      } else {
        this.handle_whitespace_and_comments(current_token);
        if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD || this._flags.inline_frame) {
          this._output.space_before_token = true;
        } else if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
          if (!this.start_of_object_property()) {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else if ((current_token.text.startsWith("`") && this._flags.last_token.type === TOKEN.END_EXPR && (current_token.previous.text === ']' || current_token.previous.text === ')') && current_token.newlines === 0)) {
          this._output.space_before_token = true;
        } else {
          this.print_newline();
        }
      }
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_equals = function(current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
      } else {
        this.handle_whitespace_and_comments(current_token);
      }
    
      if (this._flags.declaration_statement) {
        // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
        this._flags.declaration_assignment = true;
      }
      this._output.space_before_token = true;
      this.print_token(current_token);
      this._output.space_before_token = true;
    };
    
    Beautifier.prototype.handle_comma = function(current_token) {
      this.handle_whitespace_and_comments(current_token, true);
    
      this.print_token(current_token);
      this._output.space_before_token = true;
      if (this._flags.declaration_statement) {
        if (is_expression(this._flags.parent.mode)) {
          // do not break on comma, for(var a = 1, b = 2)
          this._flags.declaration_assignment = false;
        }
    
        if (this._flags.declaration_assignment) {
          this._flags.declaration_assignment = false;
          this.print_newline(false, true);
        } else if (this._options.comma_first) {
          // for comma-first, we want to allow a newline before the comma
          // to turn into a newline after the comma, which we will fixup later
          this.allow_wrap_or_preserved_newline(current_token);
        }
      } else if (this._flags.mode === MODE.ObjectLiteral ||
        (this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral)) {
        if (this._flags.mode === MODE.Statement) {
          this.restore_mode();
        }
    
        if (!this._flags.inline_frame) {
          this.print_newline();
        }
      } else if (this._options.comma_first) {
        // EXPR or DO_BLOCK
        // for comma-first, we want to allow a newline before the comma
        // to turn into a newline after the comma, which we will fixup later
        this.allow_wrap_or_preserved_newline(current_token);
      }
    };
    
    Beautifier.prototype.handle_operator = function(current_token) {
      var isGeneratorAsterisk = current_token.text === '*' &&
        (reserved_array(this._flags.last_token, ['function', 'yield']) ||
          (in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.COMMA, TOKEN.END_BLOCK, TOKEN.SEMICOLON]))
        );
      var isUnary = in_array(current_token.text, ['-', '+']) && (
        in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.START_EXPR, TOKEN.EQUALS, TOKEN.OPERATOR]) ||
        in_array(this._flags.last_token.text, line_starters) ||
        this._flags.last_token.text === ','
      );
    
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
      } else {
        var preserve_statement_flags = !isGeneratorAsterisk;
        this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
      }
    
      // hack for actionscript's import .*;
      if (current_token.text === '*' && this._flags.last_token.type === TOKEN.DOT) {
        this.print_token(current_token);
        return;
      }
    
      if (current_token.text === '::') {
        // no spaces around exotic namespacing syntax operator
        this.print_token(current_token);
        return;
      }
    
      if (in_array(current_token.text, ['-', '+']) && this.start_of_object_property()) {
        // numeric value with +/- symbol in front as a property
        this.print_token(current_token);
        return;
      }
    
      // Allow line wrapping between operators when operator_position is
      //   set to before or preserve
      if (this._flags.last_token.type === TOKEN.OPERATOR && in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    
      if (current_token.text === ':' && this._flags.in_case) {
        this.print_token(current_token);
    
        this._flags.in_case = false;
        this._flags.case_body = true;
        if (this._tokens.peek().type !== TOKEN.START_BLOCK) {
          this.indent();
          this.print_newline();
          this._flags.case_block = false;
        } else {
          this._flags.case_block = true;
          this._output.space_before_token = true;
        }
        return;
      }
    
      var space_before = true;
      var space_after = true;
      var in_ternary = false;
      if (current_token.text === ':') {
        if (this._flags.ternary_depth === 0) {
          // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
          space_before = false;
        } else {
          this._flags.ternary_depth -= 1;
          in_ternary = true;
        }
      } else if (current_token.text === '?') {
        this._flags.ternary_depth += 1;
      }
    
      // let's handle the operator_position option prior to any conflicting logic
      if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array(current_token.text, positionable_operators)) {
        var isColon = current_token.text === ':';
        var isTernaryColon = (isColon && in_ternary);
        var isOtherColon = (isColon && !in_ternary);
    
        switch (this._options.operator_position) {
          case OPERATOR_POSITION.before_newline:
            // if the current token is : and it's not a ternary statement then we set space_before to false
            this._output.space_before_token = !isOtherColon;
    
            this.print_token(current_token);
    
            if (!isColon || isTernaryColon) {
              this.allow_wrap_or_preserved_newline(current_token);
            }
    
            this._output.space_before_token = true;
            return;
    
          case OPERATOR_POSITION.after_newline:
            // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
            //   then print a newline.
    
            this._output.space_before_token = true;
    
            if (!isColon || isTernaryColon) {
              if (this._tokens.peek().newlines) {
                this.print_newline(false, true);
              } else {
                this.allow_wrap_or_preserved_newline(current_token);
              }
            } else {
              this._output.space_before_token = false;
            }
    
            this.print_token(current_token);
    
            this._output.space_before_token = true;
            return;
    
          case OPERATOR_POSITION.preserve_newline:
            if (!isOtherColon) {
              this.allow_wrap_or_preserved_newline(current_token);
            }
    
            // if we just added a newline, or the current token is : and it's not a ternary statement,
            //   then we set space_before to false
            space_before = !(this._output.just_added_newline() || isOtherColon);
    
            this._output.space_before_token = space_before;
            this.print_token(current_token);
            this._output.space_before_token = true;
            return;
        }
      }
    
      if (isGeneratorAsterisk) {
        this.allow_wrap_or_preserved_newline(current_token);
        space_before = false;
        var next_token = this._tokens.peek();
        space_after = next_token && in_array(next_token.type, [TOKEN.WORD, TOKEN.RESERVED]);
      } else if (current_token.text === '...') {
        this.allow_wrap_or_preserved_newline(current_token);
        space_before = this._flags.last_token.type === TOKEN.START_BLOCK;
        space_after = false;
      } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
        // unary operators (and binary +/- pretending to be unary) special cases
        if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
    
        space_before = false;
        space_after = false;
    
        // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
        // if there is a newline between -- or ++ and anything else we should preserve it.
        if (current_token.newlines && (current_token.text === '--' || current_token.text === '++' || current_token.text === '~')) {
          var new_line_needed = reserved_array(this._flags.last_token, special_words) && current_token.newlines;
          if (new_line_needed && (this._previous_flags.if_block || this._previous_flags.else_block)) {
            this.restore_mode();
          }
          this.print_newline(new_line_needed, true);
        }
    
        if (this._flags.last_token.text === ';' && is_expression(this._flags.mode)) {
          // for (;; ++i)
          //        ^^^
          space_before = true;
        }
    
        if (this._flags.last_token.type === TOKEN.RESERVED) {
          space_before = true;
        } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
          space_before = !(this._flags.last_token.text === ']' && (current_token.text === '--' || current_token.text === '++'));
        } else if (this._flags.last_token.type === TOKEN.OPERATOR) {
          // a++ + ++b;
          // a - -b
          space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(this._flags.last_token.text, ['--', '-', '++', '+']);
          // + and - are not unary when preceeded by -- or ++ operator
          // a-- + b
          // a * +b
          // a - -b
          if (in_array(current_token.text, ['+', '-']) && in_array(this._flags.last_token.text, ['--', '++'])) {
            space_after = true;
          }
        }
    
    
        if (((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame) || this._flags.mode === MODE.Statement) &&
          (this._flags.last_token.text === '{' || this._flags.last_token.text === ';')) {
          // { foo; --i }
          // foo(); --bar;
          this.print_newline();
        }
      }
    
      this._output.space_before_token = this._output.space_before_token || space_before;
      this.print_token(current_token);
      this._output.space_before_token = space_after;
    };
    
    Beautifier.prototype.handle_block_comment = function(current_token, preserve_statement_flags) {
      if (this._output.raw) {
        this._output.add_raw_token(current_token);
        if (current_token.directives && current_token.directives.preserve === 'end') {
          // If we're testing the raw output behavior, do not allow a directive to turn it off.
          this._output.raw = this._options.test_output_raw;
        }
        return;
      }
    
      if (current_token.directives) {
        this.print_newline(false, preserve_statement_flags);
        this.print_token(current_token);
        if (current_token.directives.preserve === 'start') {
          this._output.raw = true;
        }
        this.print_newline(false, true);
        return;
      }
    
      // inline block
      if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
        this._output.space_before_token = true;
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
      } else {
        this.print_block_commment(current_token, preserve_statement_flags);
      }
    };
    
    Beautifier.prototype.print_block_commment = function(current_token, preserve_statement_flags) {
      var lines = split_linebreaks(current_token.text);
      var j; // iterator for this case
      var javadoc = false;
      var starless = false;
      var lastIndent = current_token.whitespace_before;
      var lastIndentLength = lastIndent.length;
    
      // block comment starts with a new line
      this.print_newline(false, preserve_statement_flags);
    
      // first line always indented
      this.print_token_line_indentation(current_token);
      this._output.add_token(lines[0]);
      this.print_newline(false, preserve_statement_flags);
    
    
      if (lines.length > 1) {
        lines = lines.slice(1);
        javadoc = all_lines_start_with(lines, '*');
        starless = each_line_matches_indent(lines, lastIndent);
    
        if (javadoc) {
          this._flags.alignment = 1;
        }
    
        for (j = 0; j < lines.length; j++) {
          if (javadoc) {
            // javadoc: reformat and re-indent
            this.print_token_line_indentation(current_token);
            this._output.add_token(ltrim(lines[j]));
          } else if (starless && lines[j]) {
            // starless: re-indent non-empty content, avoiding trim
            this.print_token_line_indentation(current_token);
            this._output.add_token(lines[j].substring(lastIndentLength));
          } else {
            // normal comments output raw
            this._output.current_line.set_indent(-1);
            this._output.add_token(lines[j]);
          }
    
          // for comments on their own line or  more than one line, make sure there's a new line after
          this.print_newline(false, preserve_statement_flags);
        }
    
        this._flags.alignment = 0;
      }
    };
    
    
    Beautifier.prototype.handle_comment = function(current_token, preserve_statement_flags) {
      if (current_token.newlines) {
        this.print_newline(false, preserve_statement_flags);
      } else {
        this._output.trim(true);
      }
    
      this._output.space_before_token = true;
      this.print_token(current_token);
      this.print_newline(false, preserve_statement_flags);
    };
    
    Beautifier.prototype.handle_dot = function(current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
      } else {
        this.handle_whitespace_and_comments(current_token, true);
      }
    
      if (this._flags.last_token.text.match('^[0-9]+$')) {
        this._output.space_before_token = true;
      }
    
      if (reserved_array(this._flags.last_token, special_words)) {
        this._output.space_before_token = false;
      } else {
        // allow preserved newlines before dots in general
        // force newlines on dots after close paren when break_chained - for bar().baz()
        this.allow_wrap_or_preserved_newline(current_token,
          this._flags.last_token.text === ')' && this._options.break_chained_methods);
      }
    
      // Only unindent chained method dot if this dot starts a new line.
      // Otherwise the automatic extra indentation removal will handle the over indent
      if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
        this.deindent();
      }
    
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_unknown = function(current_token, preserve_statement_flags) {
      this.print_token(current_token);
    
      if (current_token.text[current_token.text.length - 1] === '\n') {
        this.print_newline(false, preserve_statement_flags);
      }
    };
    
    Beautifier.prototype.handle_eof = function(current_token) {
      // Unwind any open statements
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
      this.handle_whitespace_and_comments(current_token);
    };
    
    module.exports.Beautifier = Beautifier;
    
    
    /***/ }),
    /* 2 */
    /***/ (function(module) {
    
    /*jshint node:true */
    /*
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function OutputLine(parent) {
      this.__parent = parent;
      this.__character_count = 0;
      // use indent_count as a marker for this.__lines that have preserved indentation
      this.__indent_count = -1;
      this.__alignment_count = 0;
      this.__wrap_point_index = 0;
      this.__wrap_point_character_count = 0;
      this.__wrap_point_indent_count = -1;
      this.__wrap_point_alignment_count = 0;
    
      this.__items = [];
    }
    
    OutputLine.prototype.clone_empty = function() {
      var line = new OutputLine(this.__parent);
      line.set_indent(this.__indent_count, this.__alignment_count);
      return line;
    };
    
    OutputLine.prototype.item = function(index) {
      if (index < 0) {
        return this.__items[this.__items.length + index];
      } else {
        return this.__items[index];
      }
    };
    
    OutputLine.prototype.has_match = function(pattern) {
      for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
        if (this.__items[lastCheckedOutput].match(pattern)) {
          return true;
        }
      }
      return false;
    };
    
    OutputLine.prototype.set_indent = function(indent, alignment) {
      if (this.is_empty()) {
        this.__indent_count = indent || 0;
        this.__alignment_count = alignment || 0;
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
      }
    };
    
    OutputLine.prototype._set_wrap_point = function() {
      if (this.__parent.wrap_line_length) {
        this.__wrap_point_index = this.__items.length;
        this.__wrap_point_character_count = this.__character_count;
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
      }
    };
    
    OutputLine.prototype._should_wrap = function() {
      return this.__wrap_point_index &&
        this.__character_count > this.__parent.wrap_line_length &&
        this.__wrap_point_character_count > this.__parent.next_line.__character_count;
    };
    
    OutputLine.prototype._allow_wrap = function() {
      if (this._should_wrap()) {
        this.__parent.add_new_line();
        var next = this.__parent.current_line;
        next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
        next.__items = this.__items.slice(this.__wrap_point_index);
        this.__items = this.__items.slice(0, this.__wrap_point_index);
    
        next.__character_count += this.__character_count - this.__wrap_point_character_count;
        this.__character_count = this.__wrap_point_character_count;
    
        if (next.__items[0] === " ") {
          next.__items.splice(0, 1);
          next.__character_count -= 1;
        }
        return true;
      }
      return false;
    };
    
    OutputLine.prototype.is_empty = function() {
      return this.__items.length === 0;
    };
    
    OutputLine.prototype.last = function() {
      if (!this.is_empty()) {
        return this.__items[this.__items.length - 1];
      } else {
        return null;
      }
    };
    
    OutputLine.prototype.push = function(item) {
      this.__items.push(item);
      var last_newline_index = item.lastIndexOf('\n');
      if (last_newline_index !== -1) {
        this.__character_count = item.length - last_newline_index;
      } else {
        this.__character_count += item.length;
      }
    };
    
    OutputLine.prototype.pop = function() {
      var item = null;
      if (!this.is_empty()) {
        item = this.__items.pop();
        this.__character_count -= item.length;
      }
      return item;
    };
    
    
    OutputLine.prototype._remove_indent = function() {
      if (this.__indent_count > 0) {
        this.__indent_count -= 1;
        this.__character_count -= this.__parent.indent_size;
      }
    };
    
    OutputLine.prototype._remove_wrap_indent = function() {
      if (this.__wrap_point_indent_count > 0) {
        this.__wrap_point_indent_count -= 1;
      }
    };
    OutputLine.prototype.trim = function() {
      while (this.last() === ' ') {
        this.__items.pop();
        this.__character_count -= 1;
      }
    };
    
    OutputLine.prototype.toString = function() {
      var result = '';
      if (this.is_empty()) {
        if (this.__parent.indent_empty_lines) {
          result = this.__parent.get_indent_string(this.__indent_count);
        }
      } else {
        result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
        result += this.__items.join('');
      }
      return result;
    };
    
    function IndentStringCache(options, baseIndentString) {
      this.__cache = [''];
      this.__indent_size = options.indent_size;
      this.__indent_string = options.indent_char;
      if (!options.indent_with_tabs) {
        this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
      }
    
      // Set to null to continue support for auto detection of base indent
      baseIndentString = baseIndentString || '';
      if (options.indent_level > 0) {
        baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
      }
    
      this.__base_string = baseIndentString;
      this.__base_string_length = baseIndentString.length;
    }
    
    IndentStringCache.prototype.get_indent_size = function(indent, column) {
      var result = this.__base_string_length;
      column = column || 0;
      if (indent < 0) {
        result = 0;
      }
      result += indent * this.__indent_size;
      result += column;
      return result;
    };
    
    IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
      var result = this.__base_string;
      column = column || 0;
      if (indent_level < 0) {
        indent_level = 0;
        result = '';
      }
      column += indent_level * this.__indent_size;
      this.__ensure_cache(column);
      result += this.__cache[column];
      return result;
    };
    
    IndentStringCache.prototype.__ensure_cache = function(column) {
      while (column >= this.__cache.length) {
        this.__add_column();
      }
    };
    
    IndentStringCache.prototype.__add_column = function() {
      var column = this.__cache.length;
      var indent = 0;
      var result = '';
      if (this.__indent_size && column >= this.__indent_size) {
        indent = Math.floor(column / this.__indent_size);
        column -= indent * this.__indent_size;
        result = new Array(indent + 1).join(this.__indent_string);
      }
      if (column) {
        result += new Array(column + 1).join(' ');
      }
    
      this.__cache.push(result);
    };
    
    function Output(options, baseIndentString) {
      this.__indent_cache = new IndentStringCache(options, baseIndentString);
      this.raw = false;
      this._end_with_newline = options.end_with_newline;
      this.indent_size = options.indent_size;
      this.wrap_line_length = options.wrap_line_length;
      this.indent_empty_lines = options.indent_empty_lines;
      this.__lines = [];
      this.previous_line = null;
      this.current_line = null;
      this.next_line = new OutputLine(this);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
      // initialize
      this.__add_outputline();
    }
    
    Output.prototype.__add_outputline = function() {
      this.previous_line = this.current_line;
      this.current_line = this.next_line.clone_empty();
      this.__lines.push(this.current_line);
    };
    
    Output.prototype.get_line_number = function() {
      return this.__lines.length;
    };
    
    Output.prototype.get_indent_string = function(indent, column) {
      return this.__indent_cache.get_indent_string(indent, column);
    };
    
    Output.prototype.get_indent_size = function(indent, column) {
      return this.__indent_cache.get_indent_size(indent, column);
    };
    
    Output.prototype.is_empty = function() {
      return !this.previous_line && this.current_line.is_empty();
    };
    
    Output.prototype.add_new_line = function(force_newline) {
      // never newline at the start of file
      // otherwise, newline only if we didn't just add one or we're forced
      if (this.is_empty() ||
        (!force_newline && this.just_added_newline())) {
        return false;
      }
    
      // if raw output is enabled, don't print additional newlines,
      // but still return True as though you had
      if (!this.raw) {
        this.__add_outputline();
      }
      return true;
    };
    
    Output.prototype.get_code = function(eol) {
      this.trim(true);
    
      // handle some edge cases where the last tokens
      // has text that ends with newline(s)
      var last_item = this.current_line.pop();
      if (last_item) {
        if (last_item[last_item.length - 1] === '\n') {
          last_item = last_item.replace(/\n+$/g, '');
        }
        this.current_line.push(last_item);
      }
    
      if (this._end_with_newline) {
        this.__add_outputline();
      }
    
      var sweet_code = this.__lines.join('\n');
    
      if (eol !== '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, eol);
      }
      return sweet_code;
    };
    
    Output.prototype.set_wrap_point = function() {
      this.current_line._set_wrap_point();
    };
    
    Output.prototype.set_indent = function(indent, alignment) {
      indent = indent || 0;
      alignment = alignment || 0;
    
      // Next line stores alignment values
      this.next_line.set_indent(indent, alignment);
    
      // Never indent your first output indent at the start of the file
      if (this.__lines.length > 1) {
        this.current_line.set_indent(indent, alignment);
        return true;
      }
    
      this.current_line.set_indent();
      return false;
    };
    
    Output.prototype.add_raw_token = function(token) {
      for (var x = 0; x < token.newlines; x++) {
        this.__add_outputline();
      }
      this.current_line.set_indent(-1);
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
    };
    
    Output.prototype.add_token = function(printable_token) {
      this.__add_space_before_token();
      this.current_line.push(printable_token);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = this.current_line._allow_wrap();
    };
    
    Output.prototype.__add_space_before_token = function() {
      if (this.space_before_token && !this.just_added_newline()) {
        if (!this.non_breaking_space) {
          this.set_wrap_point();
        }
        this.current_line.push(' ');
      }
    };
    
    Output.prototype.remove_indent = function(index) {
      var output_length = this.__lines.length;
      while (index < output_length) {
        this.__lines[index]._remove_indent();
        index++;
      }
      this.current_line._remove_wrap_indent();
    };
    
    Output.prototype.trim = function(eat_newlines) {
      eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;
    
      this.current_line.trim();
    
      while (eat_newlines && this.__lines.length > 1 &&
        this.current_line.is_empty()) {
        this.__lines.pop();
        this.current_line = this.__lines[this.__lines.length - 1];
        this.current_line.trim();
      }
    
      this.previous_line = this.__lines.length > 1 ?
        this.__lines[this.__lines.length - 2] : null;
    };
    
    Output.prototype.just_added_newline = function() {
      return this.current_line.is_empty();
    };
    
    Output.prototype.just_added_blankline = function() {
      return this.is_empty() ||
        (this.current_line.is_empty() && this.previous_line.is_empty());
    };
    
    Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
      var index = this.__lines.length - 2;
      while (index >= 0) {
        var potentialEmptyLine = this.__lines[index];
        if (potentialEmptyLine.is_empty()) {
          break;
        } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 &&
          potentialEmptyLine.item(-1) !== ends_with) {
          this.__lines.splice(index + 1, 0, new OutputLine(this));
          this.previous_line = this.__lines[this.__lines.length - 2];
          break;
        }
        index--;
      }
    };
    
    module.exports.Output = Output;
    
    
    /***/ }),
    /* 3 */
    /***/ (function(module) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Token(type, text, newlines, whitespace_before) {
      this.type = type;
      this.text = text;
    
      // comments_before are
      // comments that have a new line before them
      // and may or may not have a newline after
      // this is a set of comments before
      this.comments_before = null; /* inline comment*/
    
    
      // this.comments_after =  new TokenStream(); // no new line before and newline after
      this.newlines = newlines || 0;
      this.whitespace_before = whitespace_before || '';
      this.parent = null;
      this.next = null;
      this.previous = null;
      this.opened = null;
      this.closed = null;
      this.directives = null;
    }
    
    
    module.exports.Token = Token;
    
    
    /***/ }),
    /* 4 */
    /***/ (function(__unused_webpack_module, exports) {
    
    /* jshint node: true, curly: false */
    // Parts of this section of code is taken from acorn.
    //
    // Acorn was written by Marijn Haverbeke and released under an MIT
    // license. The Unicode regexps (for identifiers and whitespace) were
    // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
    //
    // Git repositories for Acorn are available at
    //
    //     http://marijnhaverbeke.nl/git/acorn
    //     https://github.com/marijnh/acorn.git
    
    // ## Character categories
    
    
    
    
    // acorn used char codes to squeeze the last bit of performance out
    // Beautifier is okay without that, so we're using regex
    // permit # (23), $ (36), and @ (64). @ is used in ES7 decorators.
    // 65 through 91 are uppercase letters.
    // permit _ (95).
    // 97 through 123 are lowercase letters.
    var baseASCIIidentifierStartChars = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a";
    
    // inside an identifier @ is not allowed but 0-9 are.
    var baseASCIIidentifierChars = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a";
    
    // Big ugly regular expressions that match characters in the
    // whitespace, identifier, and identifier-start categories. These
    // are only applied when a character is found to actually have a
    // code point above 128.
    var nonASCIIidentifierStartChars = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc";
    var nonASCIIidentifierChars = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f";
    //var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    //var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    
    var unicodeEscapeOrCodePoint = "\\\\u[0-9a-fA-F]{4}|\\\\u\\{[0-9a-fA-F]+\\}";
    var identifierStart = "(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "])";
    var identifierChars = "(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])*";
    
    exports.identifier = new RegExp(identifierStart + identifierChars, 'g');
    exports.identifierStart = new RegExp(identifierStart);
    exports.identifierMatch = new RegExp("(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])+");
    
    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
    
    // Whether a single character denotes a newline.
    
    exports.newline = /[\n\r\u2028\u2029]/;
    
    // Matches a whole line break (where CRLF is considered a single
    // line break). Used to count lines.
    
    // in javascript, these two differ
    // in python they are the same, different methods are called on them
    exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
    exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');
    
    
    /***/ }),
    /* 5 */
    /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_98356__) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var BaseOptions = (__nested_webpack_require_98356__(6).Options);
    
    var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];
    
    function Options(options) {
      BaseOptions.call(this, options, 'js');
    
      // compatibility, re
      var raw_brace_style = this.raw_options.brace_style || null;
      if (raw_brace_style === "expand-strict") { //graceful handling of deprecated option
        this.raw_options.brace_style = "expand";
      } else if (raw_brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
        this.raw_options.brace_style = "collapse,preserve-inline";
      } else if (this.raw_options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
        this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse";
        // } else if (!raw_brace_style) { //Nothing exists to set it
        //   raw_brace_style = "collapse";
      }
    
      //preserve-inline in delimited string will trigger brace_preserve_inline, everything
      //else is considered a brace_style and the last one only will have an effect
    
      var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);
    
      this.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
      this.brace_style = "collapse";
    
      for (var bs = 0; bs < brace_style_split.length; bs++) {
        if (brace_style_split[bs] === "preserve-inline") {
          this.brace_preserve_inline = true;
        } else {
          this.brace_style = brace_style_split[bs];
        }
      }
    
      this.unindent_chained_methods = this._get_boolean('unindent_chained_methods');
      this.break_chained_methods = this._get_boolean('break_chained_methods');
      this.space_in_paren = this._get_boolean('space_in_paren');
      this.space_in_empty_paren = this._get_boolean('space_in_empty_paren');
      this.jslint_happy = this._get_boolean('jslint_happy');
      this.space_after_anon_function = this._get_boolean('space_after_anon_function');
      this.space_after_named_function = this._get_boolean('space_after_named_function');
      this.keep_array_indentation = this._get_boolean('keep_array_indentation');
      this.space_before_conditional = this._get_boolean('space_before_conditional', true);
      this.unescape_strings = this._get_boolean('unescape_strings');
      this.e4x = this._get_boolean('e4x');
      this.comma_first = this._get_boolean('comma_first');
      this.operator_position = this._get_selection('operator_position', validPositionValues);
    
      // For testing of beautify preserve:start directive
      this.test_output_raw = this._get_boolean('test_output_raw');
    
      // force this._options.space_after_anon_function to true if this._options.jslint_happy
      if (this.jslint_happy) {
        this.space_after_anon_function = true;
      }
    
    }
    Options.prototype = new BaseOptions();
    
    
    
    module.exports.Options = Options;
    
    
    /***/ }),
    /* 6 */
    /***/ (function(module) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Options(options, merge_child_field) {
      this.raw_options = _mergeOpts(options, merge_child_field);
    
      // Support passing the source text back with no change
      this.disabled = this._get_boolean('disabled');
    
      this.eol = this._get_characters('eol', 'auto');
      this.end_with_newline = this._get_boolean('end_with_newline');
      this.indent_size = this._get_number('indent_size', 4);
      this.indent_char = this._get_characters('indent_char', ' ');
      this.indent_level = this._get_number('indent_level');
    
      this.preserve_newlines = this._get_boolean('preserve_newlines', true);
      this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);
      if (!this.preserve_newlines) {
        this.max_preserve_newlines = 0;
      }
    
      this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');
      if (this.indent_with_tabs) {
        this.indent_char = '\t';
    
        // indent_size behavior changed after 1.8.6
        // It used to be that indent_size would be
        // set to 1 for indent_with_tabs. That is no longer needed and
        // actually doesn't make sense - why not use spaces? Further,
        // that might produce unexpected behavior - tabs being used
        // for single-column alignment. So, when indent_with_tabs is true
        // and indent_size is 1, reset indent_size to 4.
        if (this.indent_size === 1) {
          this.indent_size = 4;
        }
      }
    
      // Backwards compat with 1.3.x
      this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
    
      this.indent_empty_lines = this._get_boolean('indent_empty_lines');
    
      // valid templating languages ['django', 'erb', 'handlebars', 'php', 'smarty', 'angular']
      // For now, 'auto' = all off for javascript, all except angular on for html (and inline javascript/css).
      // other values ignored
      this.templating = this._get_selection_list('templating', ['auto', 'none', 'angular', 'django', 'erb', 'handlebars', 'php', 'smarty'], ['auto']);
    }
    
    Options.prototype._get_array = function(name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || [];
      if (typeof option_value === 'object') {
        if (option_value !== null && typeof option_value.concat === 'function') {
          result = option_value.concat();
        }
      } else if (typeof option_value === 'string') {
        result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
      }
      return result;
    };
    
    Options.prototype._get_boolean = function(name, default_value) {
      var option_value = this.raw_options[name];
      var result = option_value === undefined ? !!default_value : !!option_value;
      return result;
    };
    
    Options.prototype._get_characters = function(name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || '';
      if (typeof option_value === 'string') {
        result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
      }
      return result;
    };
    
    Options.prototype._get_number = function(name, default_value) {
      var option_value = this.raw_options[name];
      default_value = parseInt(default_value, 10);
      if (isNaN(default_value)) {
        default_value = 0;
      }
      var result = parseInt(option_value, 10);
      if (isNaN(result)) {
        result = default_value;
      }
      return result;
    };
    
    Options.prototype._get_selection = function(name, selection_list, default_value) {
      var result = this._get_selection_list(name, selection_list, default_value);
      if (result.length !== 1) {
        throw new Error(
          "Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" +
          selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }
    
      return result[0];
    };
    
    
    Options.prototype._get_selection_list = function(name, selection_list, default_value) {
      if (!selection_list || selection_list.length === 0) {
        throw new Error("Selection list cannot be empty.");
      }
    
      default_value = default_value || [selection_list[0]];
      if (!this._is_valid_selection(default_value, selection_list)) {
        throw new Error("Invalid Default Value!");
      }
    
      var result = this._get_array(name, default_value);
      if (!this._is_valid_selection(result, selection_list)) {
        throw new Error(
          "Invalid Option Value: The option '" + name + "' can contain only the following values:\n" +
          selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }
    
      return result;
    };
    
    Options.prototype._is_valid_selection = function(result, selection_list) {
      return result.length && selection_list.length &&
        !result.some(function(item) { return selection_list.indexOf(item) === -1; });
    };
    
    
    // merges child options up with the parent options object
    // Example: obj = {a: 1, b: {a: 2}}
    //          mergeOpts(obj, 'b')
    //
    //          Returns: {a: 2}
    function _mergeOpts(allOptions, childFieldName) {
      var finalOpts = {};
      allOptions = _normalizeOpts(allOptions);
      var name;
    
      for (name in allOptions) {
        if (name !== childFieldName) {
          finalOpts[name] = allOptions[name];
        }
      }
    
      //merge in the per type settings for the childFieldName
      if (childFieldName && allOptions[childFieldName]) {
        for (name in allOptions[childFieldName]) {
          finalOpts[name] = allOptions[childFieldName][name];
        }
      }
      return finalOpts;
    }
    
    function _normalizeOpts(options) {
      var convertedOpts = {};
      var key;
    
      for (key in options) {
        var newKey = key.replace(/-/g, "_");
        convertedOpts[newKey] = options[key];
      }
      return convertedOpts;
    }
    
    module.exports.Options = Options;
    module.exports.normalizeOpts = _normalizeOpts;
    module.exports.mergeOpts = _mergeOpts;
    
    
    /***/ }),
    /* 7 */
    /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_110783__) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var InputScanner = (__nested_webpack_require_110783__(8).InputScanner);
    var BaseTokenizer = (__nested_webpack_require_110783__(9).Tokenizer);
    var BASETOKEN = (__nested_webpack_require_110783__(9).TOKEN);
    var Directives = (__nested_webpack_require_110783__(13).Directives);
    var acorn = __nested_webpack_require_110783__(4);
    var Pattern = (__nested_webpack_require_110783__(12).Pattern);
    var TemplatablePattern = (__nested_webpack_require_110783__(14).TemplatablePattern);
    
    
    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }
    
    
    var TOKEN = {
      START_EXPR: 'TK_START_EXPR',
      END_EXPR: 'TK_END_EXPR',
      START_BLOCK: 'TK_START_BLOCK',
      END_BLOCK: 'TK_END_BLOCK',
      WORD: 'TK_WORD',
      RESERVED: 'TK_RESERVED',
      SEMICOLON: 'TK_SEMICOLON',
      STRING: 'TK_STRING',
      EQUALS: 'TK_EQUALS',
      OPERATOR: 'TK_OPERATOR',
      COMMA: 'TK_COMMA',
      BLOCK_COMMENT: 'TK_BLOCK_COMMENT',
      COMMENT: 'TK_COMMENT',
      DOT: 'TK_DOT',
      UNKNOWN: 'TK_UNKNOWN',
      START: BASETOKEN.START,
      RAW: BASETOKEN.RAW,
      EOF: BASETOKEN.EOF
    };
    
    
    var directives_core = new Directives(/\/\*/, /\*\//);
    
    var number_pattern = /0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/;
    
    var digit = /[0-9]/;
    
    // Dot "." must be distinguished from "..." and decimal
    var dot_pattern = /[^\d\.]/;
    
    var positionable_operators = (
      ">>> === !== &&= ??= ||= " +
      "<< && >= ** != == <= >> || ?? |> " +
      "< / - + > : & % ? ^ | *").split(' ');
    
    // IMPORTANT: this must be sorted longest to shortest or tokenizing many not work.
    // Also, you must update possitionable operators separately from punct
    var punct =
      ">>>= " +
      "... >>= <<= === >>> !== **= &&= ??= ||= <=> " +
      "=> ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> <- " +
      "= ! ? > < : / ^ - + * & % ~ |";
    
    punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
    // ?. but not if followed by a number 
    punct = '\\?\\.(?!\\d) ' + punct;
    punct = punct.replace(/ /g, '|');
    
    var punct_pattern = new RegExp(punct);
    
    // words which should always start on new line.
    var line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,import,export'.split(',');
    var reserved_words = line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as', 'class', 'extends']);
    var reserved_word_pattern = new RegExp('^(?:' + reserved_words.join('|') + ')$');
    
    // var template_pattern = /(?:(?:<\?php|<\?=)[\s\S]*?\?>)|(?:<%[\s\S]*?%>)/g;
    
    var in_html_comment;
    
    var Tokenizer = function(input_string, options) {
      BaseTokenizer.call(this, input_string, options);
    
      this._patterns.whitespace = this._patterns.whitespace.matching(
        /\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,
        /\u2028\u2029/.source);
    
      var pattern_reader = new Pattern(this._input);
      var templatable = new TemplatablePattern(this._input)
        .read_options(this._options);
    
      this.__patterns = {
        template: templatable,
        identifier: templatable.starting_with(acorn.identifier).matching(acorn.identifierMatch),
        number: pattern_reader.matching(number_pattern),
        punct: pattern_reader.matching(punct_pattern),
        // comment ends just before nearest linefeed or end of file
        comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
        //  /* ... */ comment ends with nearest */ or end of file
        block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
        html_comment_start: pattern_reader.matching(/<!--/),
        html_comment_end: pattern_reader.matching(/-->/),
        include: pattern_reader.starting_with(/#include/).until_after(acorn.lineBreak),
        shebang: pattern_reader.starting_with(/#!/).until_after(acorn.lineBreak),
        xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),
        single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
        double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
        template_text: templatable.until(/[`\\$]/),
        template_expression: templatable.until(/[`}\\]/)
      };
    
    };
    Tokenizer.prototype = new BaseTokenizer();
    
    Tokenizer.prototype._is_comment = function(current_token) {
      return current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.BLOCK_COMMENT || current_token.type === TOKEN.UNKNOWN;
    };
    
    Tokenizer.prototype._is_opening = function(current_token) {
      return current_token.type === TOKEN.START_BLOCK || current_token.type === TOKEN.START_EXPR;
    };
    
    Tokenizer.prototype._is_closing = function(current_token, open_token) {
      return (current_token.type === TOKEN.END_BLOCK || current_token.type === TOKEN.END_EXPR) &&
        (open_token && (
          (current_token.text === ']' && open_token.text === '[') ||
          (current_token.text === ')' && open_token.text === '(') ||
          (current_token.text === '}' && open_token.text === '{')));
    };
    
    Tokenizer.prototype._reset = function() {
      in_html_comment = false;
    };
    
    Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
      var token = null;
      this._readWhitespace();
      var c = this._input.peek();
    
      if (c === null) {
        return this._create_token(TOKEN.EOF, '');
      }
    
      token = token || this._read_non_javascript(c);
      token = token || this._read_string(c);
      token = token || this._read_pair(c, this._input.peek(1)); // Issue #2062 hack for record type '#{'
      token = token || this._read_word(previous_token);
      token = token || this._read_singles(c);
      token = token || this._read_comment(c);
      token = token || this._read_regexp(c, previous_token);
      token = token || this._read_xml(c, previous_token);
      token = token || this._read_punctuation();
      token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
    
      return token;
    };
    
    Tokenizer.prototype._read_word = function(previous_token) {
      var resulting_string;
      resulting_string = this.__patterns.identifier.read();
      if (resulting_string !== '') {
        resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
        if (!(previous_token.type === TOKEN.DOT ||
            (previous_token.type === TOKEN.RESERVED && (previous_token.text === 'set' || previous_token.text === 'get'))) &&
          reserved_word_pattern.test(resulting_string)) {
          if ((resulting_string === 'in' || resulting_string === 'of') &&
            (previous_token.type === TOKEN.WORD || previous_token.type === TOKEN.STRING)) { // hack for 'in' and 'of' operators
            return this._create_token(TOKEN.OPERATOR, resulting_string);
          }
          return this._create_token(TOKEN.RESERVED, resulting_string);
        }
        return this._create_token(TOKEN.WORD, resulting_string);
      }
    
      resulting_string = this.__patterns.number.read();
      if (resulting_string !== '') {
        return this._create_token(TOKEN.WORD, resulting_string);
      }
    };
    
    Tokenizer.prototype._read_singles = function(c) {
      var token = null;
      if (c === '(' || c === '[') {
        token = this._create_token(TOKEN.START_EXPR, c);
      } else if (c === ')' || c === ']') {
        token = this._create_token(TOKEN.END_EXPR, c);
      } else if (c === '{') {
        token = this._create_token(TOKEN.START_BLOCK, c);
      } else if (c === '}') {
        token = this._create_token(TOKEN.END_BLOCK, c);
      } else if (c === ';') {
        token = this._create_token(TOKEN.SEMICOLON, c);
      } else if (c === '.' && dot_pattern.test(this._input.peek(1))) {
        token = this._create_token(TOKEN.DOT, c);
      } else if (c === ',') {
        token = this._create_token(TOKEN.COMMA, c);
      }
    
      if (token) {
        this._input.next();
      }
      return token;
    };
    
    Tokenizer.prototype._read_pair = function(c, d) {
      var token = null;
      if (c === '#' && d === '{') {
        token = this._create_token(TOKEN.START_BLOCK, c + d);
      }
    
      if (token) {
        this._input.next();
        this._input.next();
      }
      return token;
    };
    
    Tokenizer.prototype._read_punctuation = function() {
      var resulting_string = this.__patterns.punct.read();
    
      if (resulting_string !== '') {
        if (resulting_string === '=') {
          return this._create_token(TOKEN.EQUALS, resulting_string);
        } else if (resulting_string === '?.') {
          return this._create_token(TOKEN.DOT, resulting_string);
        } else {
          return this._create_token(TOKEN.OPERATOR, resulting_string);
        }
      }
    };
    
    Tokenizer.prototype._read_non_javascript = function(c) {
      var resulting_string = '';
    
      if (c === '#') {
        if (this._is_first_token()) {
          resulting_string = this.__patterns.shebang.read();
    
          if (resulting_string) {
            return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
          }
        }
    
        // handles extendscript #includes
        resulting_string = this.__patterns.include.read();
    
        if (resulting_string) {
          return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
        }
    
        c = this._input.next();
    
        // Spidermonkey-specific sharp variables for circular references. Considered obsolete.
        var sharp = '#';
        if (this._input.hasNext() && this._input.testChar(digit)) {
          do {
            c = this._input.next();
            sharp += c;
          } while (this._input.hasNext() && c !== '#' && c !== '=');
          if (c === '#') {
            //
          } else if (this._input.peek() === '[' && this._input.peek(1) === ']') {
            sharp += '[]';
            this._input.next();
            this._input.next();
          } else if (this._input.peek() === '{' && this._input.peek(1) === '}') {
            sharp += '{}';
            this._input.next();
            this._input.next();
          }
          return this._create_token(TOKEN.WORD, sharp);
        }
    
        this._input.back();
    
      } else if (c === '<' && this._is_first_token()) {
        resulting_string = this.__patterns.html_comment_start.read();
        if (resulting_string) {
          while (this._input.hasNext() && !this._input.testChar(acorn.newline)) {
            resulting_string += this._input.next();
          }
          in_html_comment = true;
          return this._create_token(TOKEN.COMMENT, resulting_string);
        }
      } else if (in_html_comment && c === '-') {
        resulting_string = this.__patterns.html_comment_end.read();
        if (resulting_string) {
          in_html_comment = false;
          return this._create_token(TOKEN.COMMENT, resulting_string);
        }
      }
    
      return null;
    };
    
    Tokenizer.prototype._read_comment = function(c) {
      var token = null;
      if (c === '/') {
        var comment = '';
        if (this._input.peek(1) === '*') {
          // peek for comment /* ... */
          comment = this.__patterns.block_comment.read();
          var directives = directives_core.get_directives(comment);
          if (directives && directives.ignore === 'start') {
            comment += directives_core.readIgnored(this._input);
          }
          comment = comment.replace(acorn.allLineBreaks, '\n');
          token = this._create_token(TOKEN.BLOCK_COMMENT, comment);
          token.directives = directives;
        } else if (this._input.peek(1) === '/') {
          // peek for comment // ...
          comment = this.__patterns.comment.read();
          token = this._create_token(TOKEN.COMMENT, comment);
        }
      }
      return token;
    };
    
    Tokenizer.prototype._read_string = function(c) {
      if (c === '`' || c === "'" || c === '"') {
        var resulting_string = this._input.next();
        this.has_char_escapes = false;
    
        if (c === '`') {
          resulting_string += this._read_string_recursive('`', true, '${');
        } else {
          resulting_string += this._read_string_recursive(c);
        }
    
        if (this.has_char_escapes && this._options.unescape_strings) {
          resulting_string = unescape_string(resulting_string);
        }
    
        if (this._input.peek() === c) {
          resulting_string += this._input.next();
        }
    
        resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
    
        return this._create_token(TOKEN.STRING, resulting_string);
      }
    
      return null;
    };
    
    Tokenizer.prototype._allow_regexp_or_xml = function(previous_token) {
      // regex and xml can only appear in specific locations during parsing
      return (previous_token.type === TOKEN.RESERVED && in_array(previous_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
        (previous_token.type === TOKEN.END_EXPR && previous_token.text === ')' &&
          previous_token.opened.previous.type === TOKEN.RESERVED && in_array(previous_token.opened.previous.text, ['if', 'while', 'for'])) ||
        (in_array(previous_token.type, [TOKEN.COMMENT, TOKEN.START_EXPR, TOKEN.START_BLOCK, TOKEN.START,
          TOKEN.END_BLOCK, TOKEN.OPERATOR, TOKEN.EQUALS, TOKEN.EOF, TOKEN.SEMICOLON, TOKEN.COMMA
        ]));
    };
    
    Tokenizer.prototype._read_regexp = function(c, previous_token) {
    
      if (c === '/' && this._allow_regexp_or_xml(previous_token)) {
        // handle regexp
        //
        var resulting_string = this._input.next();
        var esc = false;
    
        var in_char_class = false;
        while (this._input.hasNext() &&
          ((esc || in_char_class || this._input.peek() !== c) &&
            !this._input.testChar(acorn.newline))) {
          resulting_string += this._input.peek();
          if (!esc) {
            esc = this._input.peek() === '\\';
            if (this._input.peek() === '[') {
              in_char_class = true;
            } else if (this._input.peek() === ']') {
              in_char_class = false;
            }
          } else {
            esc = false;
          }
          this._input.next();
        }
    
        if (this._input.peek() === c) {
          resulting_string += this._input.next();
    
          // regexps may have modifiers /regexp/MOD , so fetch those, too
          // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
          resulting_string += this._input.read(acorn.identifier);
        }
        return this._create_token(TOKEN.STRING, resulting_string);
      }
      return null;
    };
    
    Tokenizer.prototype._read_xml = function(c, previous_token) {
    
      if (this._options.e4x && c === "<" && this._allow_regexp_or_xml(previous_token)) {
        var xmlStr = '';
        var match = this.__patterns.xml.read_match();
        // handle e4x xml literals
        //
        if (match) {
          // Trim root tag to attempt to
          var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
          var isCurlyRoot = rootTag.indexOf('{') === 0;
          var depth = 0;
          while (match) {
            var isEndTag = !!match[1];
            var tagName = match[2];
            var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
            if (!isSingletonTag &&
              (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
              if (isEndTag) {
                --depth;
              } else {
                ++depth;
              }
            }
            xmlStr += match[0];
            if (depth <= 0) {
              break;
            }
            match = this.__patterns.xml.read_match();
          }
          // if we didn't close correctly, keep unformatted.
          if (!match) {
            xmlStr += this._input.match(/[\s\S]*/g)[0];
          }
          xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
          return this._create_token(TOKEN.STRING, xmlStr);
        }
      }
    
      return null;
    };
    
    function unescape_string(s) {
      // You think that a regex would work for this
      // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
      //         return String.fromCharCode(parseInt(val, 16));
      //     })
      // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
      var out = '',
        escaped = 0;
    
      var input_scan = new InputScanner(s);
      var matched = null;
    
      while (input_scan.hasNext()) {
        // Keep any whitespace, non-slash characters
        // also keep slash pairs.
        matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);
    
        if (matched) {
          out += matched[0];
        }
    
        if (input_scan.peek() === '\\') {
          input_scan.next();
          if (input_scan.peek() === 'x') {
            matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
          } else if (input_scan.peek() === 'u') {
            matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
            if (!matched) {
              matched = input_scan.match(/u\{([0-9A-Fa-f]+)\}/g);
            }
          } else {
            out += '\\';
            if (input_scan.hasNext()) {
              out += input_scan.next();
            }
            continue;
          }
    
          // If there's some error decoding, return the original string
          if (!matched) {
            return s;
          }
    
          escaped = parseInt(matched[1], 16);
    
          if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
            // we bail out on \x7f..\xff,
            // leaving whole string escaped,
            // as it's probably completely binary
            return s;
          } else if (escaped >= 0x00 && escaped < 0x20) {
            // leave 0x00...0x1f escaped
            out += '\\' + matched[0];
          } else if (escaped > 0x10FFFF) {
            // If the escape sequence is out of bounds, keep the original sequence and continue conversion
            out += '\\' + matched[0];
          } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
            // single-quote, apostrophe, backslash - escape these
            out += '\\' + String.fromCharCode(escaped);
          } else {
            out += String.fromCharCode(escaped);
          }
        }
      }
    
      return out;
    }
    
    // handle string
    //
    Tokenizer.prototype._read_string_recursive = function(delimiter, allow_unescaped_newlines, start_sub) {
      var current_char;
      var pattern;
      if (delimiter === '\'') {
        pattern = this.__patterns.single_quote;
      } else if (delimiter === '"') {
        pattern = this.__patterns.double_quote;
      } else if (delimiter === '`') {
        pattern = this.__patterns.template_text;
      } else if (delimiter === '}') {
        pattern = this.__patterns.template_expression;
      }
    
      var resulting_string = pattern.read();
      var next = '';
      while (this._input.hasNext()) {
        next = this._input.next();
        if (next === delimiter ||
          (!allow_unescaped_newlines && acorn.newline.test(next))) {
          this._input.back();
          break;
        } else if (next === '\\' && this._input.hasNext()) {
          current_char = this._input.peek();
    
          if (current_char === 'x' || current_char === 'u') {
            this.has_char_escapes = true;
          } else if (current_char === '\r' && this._input.peek(1) === '\n') {
            this._input.next();
          }
          next += this._input.next();
        } else if (start_sub) {
          if (start_sub === '${' && next === '$' && this._input.peek() === '{') {
            next += this._input.next();
          }
    
          if (start_sub === next) {
            if (delimiter === '`') {
              next += this._read_string_recursive('}', allow_unescaped_newlines, '`');
            } else {
              next += this._read_string_recursive('`', allow_unescaped_newlines, '${');
            }
            if (this._input.hasNext()) {
              next += this._input.next();
            }
          }
        }
        next += pattern.read();
        resulting_string += next;
      }
    
      return resulting_string;
    };
    
    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    module.exports.positionable_operators = positionable_operators.slice();
    module.exports.line_starters = line_starters.slice();
    
    
    /***/ }),
    /* 8 */
    /***/ (function(module) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');
    
    function InputScanner(input_string) {
      this.__input = input_string || '';
      this.__input_length = this.__input.length;
      this.__position = 0;
    }
    
    InputScanner.prototype.restart = function() {
      this.__position = 0;
    };
    
    InputScanner.prototype.back = function() {
      if (this.__position > 0) {
        this.__position -= 1;
      }
    };
    
    InputScanner.prototype.hasNext = function() {
      return this.__position < this.__input_length;
    };
    
    InputScanner.prototype.next = function() {
      var val = null;
      if (this.hasNext()) {
        val = this.__input.charAt(this.__position);
        this.__position += 1;
      }
      return val;
    };
    
    InputScanner.prototype.peek = function(index) {
      var val = null;
      index = index || 0;
      index += this.__position;
      if (index >= 0 && index < this.__input_length) {
        val = this.__input.charAt(index);
      }
      return val;
    };
    
    // This is a JavaScript only helper function (not in python)
    // Javascript doesn't have a match method
    // and not all implementation support "sticky" flag.
    // If they do not support sticky then both this.match() and this.test() method
    // must get the match and check the index of the match.
    // If sticky is supported and set, this method will use it.
    // Otherwise it will check that global is set, and fall back to the slower method.
    InputScanner.prototype.__match = function(pattern, index) {
      pattern.lastIndex = index;
      var pattern_match = pattern.exec(this.__input);
    
      if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
        if (pattern_match.index !== index) {
          pattern_match = null;
        }
      }
    
      return pattern_match;
    };
    
    InputScanner.prototype.test = function(pattern, index) {
      index = index || 0;
      index += this.__position;
    
      if (index >= 0 && index < this.__input_length) {
        return !!this.__match(pattern, index);
      } else {
        return false;
      }
    };
    
    InputScanner.prototype.testChar = function(pattern, index) {
      // test one character regex match
      var val = this.peek(index);
      pattern.lastIndex = 0;
      return val !== null && pattern.test(val);
    };
    
    InputScanner.prototype.match = function(pattern) {
      var pattern_match = this.__match(pattern, this.__position);
      if (pattern_match) {
        this.__position += pattern_match[0].length;
      } else {
        pattern_match = null;
      }
      return pattern_match;
    };
    
    InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
      var val = '';
      var match;
      if (starting_pattern) {
        match = this.match(starting_pattern);
        if (match) {
          val += match[0];
        }
      }
      if (until_pattern && (match || !starting_pattern)) {
        val += this.readUntil(until_pattern, until_after);
      }
      return val;
    };
    
    InputScanner.prototype.readUntil = function(pattern, until_after) {
      var val = '';
      var match_index = this.__position;
      pattern.lastIndex = this.__position;
      var pattern_match = pattern.exec(this.__input);
      if (pattern_match) {
        match_index = pattern_match.index;
        if (until_after) {
          match_index += pattern_match[0].length;
        }
      } else {
        match_index = this.__input_length;
      }
    
      val = this.__input.substring(this.__position, match_index);
      this.__position = match_index;
      return val;
    };
    
    InputScanner.prototype.readUntilAfter = function(pattern) {
      return this.readUntil(pattern, true);
    };
    
    InputScanner.prototype.get_regexp = function(pattern, match_from) {
      var result = null;
      var flags = 'g';
      if (match_from && regexp_has_sticky) {
        flags = 'y';
      }
      // strings are converted to regexp
      if (typeof pattern === "string" && pattern !== '') {
        // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
        result = new RegExp(pattern, flags);
      } else if (pattern) {
        result = new RegExp(pattern.source, flags);
      }
      return result;
    };
    
    InputScanner.prototype.get_literal_regexp = function(literal_string) {
      return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    };
    
    /* css beautifier legacy helpers */
    InputScanner.prototype.peekUntilAfter = function(pattern) {
      var start = this.__position;
      var val = this.readUntilAfter(pattern);
      this.__position = start;
      return val;
    };
    
    InputScanner.prototype.lookBack = function(testVal) {
      var start = this.__position - 1;
      return start >= testVal.length && this.__input.substring(start - testVal.length, start)
        .toLowerCase() === testVal;
    };
    
    module.exports.InputScanner = InputScanner;
    
    
    /***/ }),
    /* 9 */
    /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_140593__) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var InputScanner = (__nested_webpack_require_140593__(8).InputScanner);
    var Token = (__nested_webpack_require_140593__(3).Token);
    var TokenStream = (__nested_webpack_require_140593__(10).TokenStream);
    var WhitespacePattern = (__nested_webpack_require_140593__(11).WhitespacePattern);
    
    var TOKEN = {
      START: 'TK_START',
      RAW: 'TK_RAW',
      EOF: 'TK_EOF'
    };
    
    var Tokenizer = function(input_string, options) {
      this._input = new InputScanner(input_string);
      this._options = options || {};
      this.__tokens = null;
    
      this._patterns = {};
      this._patterns.whitespace = new WhitespacePattern(this._input);
    };
    
    Tokenizer.prototype.tokenize = function() {
      this._input.restart();
      this.__tokens = new TokenStream();
    
      this._reset();
    
      var current;
      var previous = new Token(TOKEN.START, '');
      var open_token = null;
      var open_stack = [];
      var comments = new TokenStream();
    
      while (previous.type !== TOKEN.EOF) {
        current = this._get_next_token(previous, open_token);
        while (this._is_comment(current)) {
          comments.add(current);
          current = this._get_next_token(previous, open_token);
        }
    
        if (!comments.isEmpty()) {
          current.comments_before = comments;
          comments = new TokenStream();
        }
    
        current.parent = open_token;
    
        if (this._is_opening(current)) {
          open_stack.push(open_token);
          open_token = current;
        } else if (open_token && this._is_closing(current, open_token)) {
          current.opened = open_token;
          open_token.closed = current;
          open_token = open_stack.pop();
          current.parent = open_token;
        }
    
        current.previous = previous;
        previous.next = current;
    
        this.__tokens.add(current);
        previous = current;
      }
    
      return this.__tokens;
    };
    
    
    Tokenizer.prototype._is_first_token = function() {
      return this.__tokens.isEmpty();
    };
    
    Tokenizer.prototype._reset = function() {};
    
    Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
      this._readWhitespace();
      var resulting_string = this._input.read(/.+/g);
      if (resulting_string) {
        return this._create_token(TOKEN.RAW, resulting_string);
      } else {
        return this._create_token(TOKEN.EOF, '');
      }
    };
    
    Tokenizer.prototype._is_comment = function(current_token) { // jshint unused:false
      return false;
    };
    
    Tokenizer.prototype._is_opening = function(current_token) { // jshint unused:false
      return false;
    };
    
    Tokenizer.prototype._is_closing = function(current_token, open_token) { // jshint unused:false
      return false;
    };
    
    Tokenizer.prototype._create_token = function(type, text) {
      var token = new Token(type, text,
        this._patterns.whitespace.newline_count,
        this._patterns.whitespace.whitespace_before_token);
      return token;
    };
    
    Tokenizer.prototype._readWhitespace = function() {
      return this._patterns.whitespace.read();
    };
    
    
    
    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    
    
    /***/ }),
    /* 10 */
    /***/ (function(module) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function TokenStream(parent_token) {
      // private
      this.__tokens = [];
      this.__tokens_length = this.__tokens.length;
      this.__position = 0;
      this.__parent_token = parent_token;
    }
    
    TokenStream.prototype.restart = function() {
      this.__position = 0;
    };
    
    TokenStream.prototype.isEmpty = function() {
      return this.__tokens_length === 0;
    };
    
    TokenStream.prototype.hasNext = function() {
      return this.__position < this.__tokens_length;
    };
    
    TokenStream.prototype.next = function() {
      var val = null;
      if (this.hasNext()) {
        val = this.__tokens[this.__position];
        this.__position += 1;
      }
      return val;
    };
    
    TokenStream.prototype.peek = function(index) {
      var val = null;
      index = index || 0;
      index += this.__position;
      if (index >= 0 && index < this.__tokens_length) {
        val = this.__tokens[index];
      }
      return val;
    };
    
    TokenStream.prototype.add = function(token) {
      if (this.__parent_token) {
        token.parent = this.__parent_token;
      }
      this.__tokens.push(token);
      this.__tokens_length += 1;
    };
    
    module.exports.TokenStream = TokenStream;
    
    
    /***/ }),
    /* 11 */
    /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_148163__) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Pattern = (__nested_webpack_require_148163__(12).Pattern);
    
    function WhitespacePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);
      if (parent) {
        this._line_regexp = this._input.get_regexp(parent._line_regexp);
      } else {
        this.__set_whitespace_patterns('', '');
      }
    
      this.newline_count = 0;
      this.whitespace_before_token = '';
    }
    WhitespacePattern.prototype = new Pattern();
    
    WhitespacePattern.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
      whitespace_chars += '\\t ';
      newline_chars += '\\n\\r';
    
      this._match_pattern = this._input.get_regexp(
        '[' + whitespace_chars + newline_chars + ']+', true);
      this._newline_regexp = this._input.get_regexp(
        '\\r\\n|[' + newline_chars + ']');
    };
    
    WhitespacePattern.prototype.read = function() {
      this.newline_count = 0;
      this.whitespace_before_token = '';
    
      var resulting_string = this._input.read(this._match_pattern);
      if (resulting_string === ' ') {
        this.whitespace_before_token = ' ';
      } else if (resulting_string) {
        var matches = this.__split(this._newline_regexp, resulting_string);
        this.newline_count = matches.length - 1;
        this.whitespace_before_token = matches[this.newline_count];
      }
    
      return resulting_string;
    };
    
    WhitespacePattern.prototype.matching = function(whitespace_chars, newline_chars) {
      var result = this._create();
      result.__set_whitespace_patterns(whitespace_chars, newline_chars);
      result._update();
      return result;
    };
    
    WhitespacePattern.prototype._create = function() {
      return new WhitespacePattern(this._input, this);
    };
    
    WhitespacePattern.prototype.__split = function(regexp, input_string) {
      regexp.lastIndex = 0;
      var start_index = 0;
      var result = [];
      var next_match = regexp.exec(input_string);
      while (next_match) {
        result.push(input_string.substring(start_index, next_match.index));
        start_index = next_match.index + next_match[0].length;
        next_match = regexp.exec(input_string);
      }
    
      if (start_index < input_string.length) {
        result.push(input_string.substring(start_index, input_string.length));
      } else {
        result.push('');
      }
    
      return result;
    };
    
    
    
    module.exports.WhitespacePattern = WhitespacePattern;
    
    
    /***/ }),
    /* 12 */
    /***/ (function(module) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Pattern(input_scanner, parent) {
      this._input = input_scanner;
      this._starting_pattern = null;
      this._match_pattern = null;
      this._until_pattern = null;
      this._until_after = false;
    
      if (parent) {
        this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
        this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
        this._until_pattern = this._input.get_regexp(parent._until_pattern);
        this._until_after = parent._until_after;
      }
    }
    
    Pattern.prototype.read = function() {
      var result = this._input.read(this._starting_pattern);
      if (!this._starting_pattern || result) {
        result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
      }
      return result;
    };
    
    Pattern.prototype.read_match = function() {
      return this._input.match(this._match_pattern);
    };
    
    Pattern.prototype.until_after = function(pattern) {
      var result = this._create();
      result._until_after = true;
      result._until_pattern = this._input.get_regexp(pattern);
      result._update();
      return result;
    };
    
    Pattern.prototype.until = function(pattern) {
      var result = this._create();
      result._until_after = false;
      result._until_pattern = this._input.get_regexp(pattern);
      result._update();
      return result;
    };
    
    Pattern.prototype.starting_with = function(pattern) {
      var result = this._create();
      result._starting_pattern = this._input.get_regexp(pattern, true);
      result._update();
      return result;
    };
    
    Pattern.prototype.matching = function(pattern) {
      var result = this._create();
      result._match_pattern = this._input.get_regexp(pattern, true);
      result._update();
      return result;
    };
    
    Pattern.prototype._create = function() {
      return new Pattern(this._input, this);
    };
    
    Pattern.prototype._update = function() {};
    
    module.exports.Pattern = Pattern;
    
    
    /***/ }),
    /* 13 */
    /***/ (function(module) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Directives(start_block_pattern, end_block_pattern) {
      start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
      end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
      this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
      this.__directive_pattern = / (\w+)[:](\w+)/g;
    
      this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
    }
    
    Directives.prototype.get_directives = function(text) {
      if (!text.match(this.__directives_block_pattern)) {
        return null;
      }
    
      var directives = {};
      this.__directive_pattern.lastIndex = 0;
      var directive_match = this.__directive_pattern.exec(text);
    
      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = this.__directive_pattern.exec(text);
      }
    
      return directives;
    };
    
    Directives.prototype.readIgnored = function(input) {
      return input.readUntilAfter(this.__directives_end_ignore_pattern);
    };
    
    
    module.exports.Directives = Directives;
    
    
    /***/ }),
    /* 14 */
    /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_158545__) {
    
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Pattern = (__nested_webpack_require_158545__(12).Pattern);
    
    
    var template_names = {
      django: false,
      erb: false,
      handlebars: false,
      php: false,
      smarty: false,
      angular: false
    };
    
    // This lets templates appear anywhere we would do a readUntil
    // The cost is higher but it is pay to play.
    function TemplatablePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);
      this.__template_pattern = null;
      this._disabled = Object.assign({}, template_names);
      this._excluded = Object.assign({}, template_names);
    
      if (parent) {
        this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
        this._excluded = Object.assign(this._excluded, parent._excluded);
        this._disabled = Object.assign(this._disabled, parent._disabled);
      }
      var pattern = new Pattern(input_scanner);
      this.__patterns = {
        handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
        handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
        handlebars: pattern.starting_with(/{{/).until_after(/}}/),
        php: pattern.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
        erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
        // django coflicts with handlebars a bit.
        django: pattern.starting_with(/{%/).until_after(/%}/),
        django_value: pattern.starting_with(/{{/).until_after(/}}/),
        django_comment: pattern.starting_with(/{#/).until_after(/#}/),
        smarty: pattern.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
        smarty_comment: pattern.starting_with(/{\*/).until_after(/\*}/),
        smarty_literal: pattern.starting_with(/{literal}/).until_after(/{\/literal}/)
      };
    }
    TemplatablePattern.prototype = new Pattern();
    
    TemplatablePattern.prototype._create = function() {
      return new TemplatablePattern(this._input, this);
    };
    
    TemplatablePattern.prototype._update = function() {
      this.__set_templated_pattern();
    };
    
    TemplatablePattern.prototype.disable = function(language) {
      var result = this._create();
      result._disabled[language] = true;
      result._update();
      return result;
    };
    
    TemplatablePattern.prototype.read_options = function(options) {
      var result = this._create();
      for (var language in template_names) {
        result._disabled[language] = options.templating.indexOf(language) === -1;
      }
      result._update();
      return result;
    };
    
    TemplatablePattern.prototype.exclude = function(language) {
      var result = this._create();
      result._excluded[language] = true;
      result._update();
      return result;
    };
    
    TemplatablePattern.prototype.read = function() {
      var result = '';
      if (this._match_pattern) {
        result = this._input.read(this._starting_pattern);
      } else {
        result = this._input.read(this._starting_pattern, this.__template_pattern);
      }
      var next = this._read_template();
      while (next) {
        if (this._match_pattern) {
          next += this._input.read(this._match_pattern);
        } else {
          next += this._input.readUntil(this.__template_pattern);
        }
        result += next;
        next = this._read_template();
      }
    
      if (this._until_after) {
        result += this._input.readUntilAfter(this._until_pattern);
      }
      return result;
    };
    
    TemplatablePattern.prototype.__set_templated_pattern = function() {
      var items = [];
    
      if (!this._disabled.php) {
        items.push(this.__patterns.php._starting_pattern.source);
      }
      if (!this._disabled.handlebars) {
        items.push(this.__patterns.handlebars._starting_pattern.source);
      }
      if (!this._disabled.angular) {
        // Handlebars ('{{' and '}}') are also special tokens in Angular)
        items.push(this.__patterns.handlebars._starting_pattern.source);
      }
      if (!this._disabled.erb) {
        items.push(this.__patterns.erb._starting_pattern.source);
      }
      if (!this._disabled.django) {
        items.push(this.__patterns.django._starting_pattern.source);
        // The starting pattern for django is more complex because it has different
        // patterns for value, comment, and other sections
        items.push(this.__patterns.django_value._starting_pattern.source);
        items.push(this.__patterns.django_comment._starting_pattern.source);
      }
      if (!this._disabled.smarty) {
        items.push(this.__patterns.smarty._starting_pattern.source);
      }
    
      if (this._until_pattern) {
        items.push(this._until_pattern.source);
      }
      this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
    };
    
    TemplatablePattern.prototype._read_template = function() {
      var resulting_string = '';
      var c = this._input.peek();
      if (c === '<') {
        var peek1 = this._input.peek(1);
        //if we're in a comment, do something special
        // We treat all comments as literals, even more than preformatted tags
        // we just look for the appropriate close tag
        if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
          resulting_string = resulting_string ||
            this.__patterns.php.read();
        }
        if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
          resulting_string = resulting_string ||
            this.__patterns.erb.read();
        }
      } else if (c === '{') {
        if (!this._disabled.handlebars && !this._excluded.handlebars) {
          resulting_string = resulting_string ||
            this.__patterns.handlebars_comment.read();
          resulting_string = resulting_string ||
            this.__patterns.handlebars_unescaped.read();
          resulting_string = resulting_string ||
            this.__patterns.handlebars.read();
        }
        if (!this._disabled.django) {
          // django coflicts with handlebars a bit.
          if (!this._excluded.django && !this._excluded.handlebars) {
            resulting_string = resulting_string ||
              this.__patterns.django_value.read();
          }
          if (!this._excluded.django) {
            resulting_string = resulting_string ||
              this.__patterns.django_comment.read();
            resulting_string = resulting_string ||
              this.__patterns.django.read();
          }
        }
        if (!this._disabled.smarty) {
          // smarty cannot be enabled with django or handlebars enabled
          if (this._disabled.django && this._disabled.handlebars) {
            resulting_string = resulting_string ||
              this.__patterns.smarty_comment.read();
            resulting_string = resulting_string ||
              this.__patterns.smarty_literal.read();
            resulting_string = resulting_string ||
              this.__patterns.smarty.read();
          }
        }
      }
      return resulting_string;
    };
    
    
    module.exports.TemplatablePattern = TemplatablePattern;
    
    
    /***/ })
    /******/ 	]);
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __nested_webpack_require_167549__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_167549__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module is referenced by other modules so it can't be inlined
    /******/ 	var __nested_webpack_exports__ = __nested_webpack_require_167549__(0);
    /******/ 	legacy_beautify_js = __nested_webpack_exports__;
    /******/ 	
    /******/ })()
    ;
    var js_beautify = legacy_beautify_js;
    /* Footer */
    if (true) {
        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return { js_beautify: js_beautify };
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else // removed by dead control flow
{}
    
    }());
    

/***/ }),

/***/ "./src/providers/provideCompletionItems.js":
/*!*************************************************!*\
  !*** ./src/providers/provideCompletionItems.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const item = __webpack_require__(/*! ../Items/Item */ "./src/Items/Item.js");
const APIparser = __webpack_require__(/*! ../DOCS/APIparser */ "./src/DOCS/APIparser.js")

class provideCompletionItems extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, context) {
            return [...APIparser.SharedCompletion, ...GetConstants(APIparser.Constants, "constants")];
    }
}

class provideCompletionItemsDOT extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, contex) {
        let line = document.lineAt(position.line)
        let dotIdx = line.text.lastIndexOf('.', position.character)
        if (dotIdx === -1) {
            return [];
        }
        const commentIndex = line.text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex) {
            return [];
        }

            const range = document.getWordRangeAtPosition(position.with(position.line, position.character - 1));
            const word = document.getText(range);
            var variable = new item.variable(document);
            for (const element of APIparser.aDOT) {
                if (element.static == true) {
                    if (word == element.name) {
                        return element.Completion;
                    }
                } else {
                    for (const element2 of variable.list) {
                        if (word == element2.name) {
                            if (element.name == element2.value) {
                                return element.Completion;
                            }
                        }
                    }
                }
            }
            return [];
    }
}

function GetConstants(Constants, category) {
    for (const element of Constants) {
        if (element.category == category) {
            return element.completion;
        }
    }
    return null;
}

module.exports = { provideCompletionItems, provideCompletionItemsDOT }

/***/ }),

/***/ "./src/providers/provideCompletionItemsJSDOC.js":
/*!******************************************************!*\
  !*** ./src/providers/provideCompletionItemsJSDOC.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
let JSDocElements = __webpack_require__(/*! ../Items/jsdoc */ "./src/Items/jsdoc.js");


let completions = Object.keys(JSDocElements).map(key => {
    let element = JSDocElements[key];
    let completion = new vscode.CompletionItem(key + " ");
    completion.documentation = element.desc;
    completion.kind = vscode.CompletionItemKind.Snippet;
    if (element.snippet) {
        completion.insertText = new vscode.SnippetString(key + " " + element.snippet);
    }
    if (element.detail) {
        completion.detail = element.detail;
    }
    return completion;
});

class provideCompletionItems extends vscode.CompletionItem {
    /**
    * 
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, context) {
        const line = document.lineAt(position).text;
        let prefix = line.slice(0, position.character);
        if (!prefix.includes('@')) return [];
        const txt = document.getText();
        const matcher = /\/\*\*[^\*](?:\r|\n|.)*?\*\//g;
        let match = matcher.exec(txt);
        let p = document.offsetAt(position);
        while (match) {
            if (match.index > p) {
                match = null;
                break;
            }
            if (match.index < p && match.index + match[0].length > p) {
                break;
            }
            match = matcher.exec(txt);
        }
        if (!match) return [];
        p = prefix.lastIndexOf('@');
        prefix = prefix.slice(p + 1);
        if (prefix.match(/\s/)) return [];
        return completions;
    }
}


module.exports = { provideCompletionItems }

/***/ }),

/***/ "./src/providers/provideDefinitionProvider.js":
/*!****************************************************!*\
  !*** ./src/providers/provideDefinitionProvider.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const file = __webpack_require__(/*! ../Files */ "./src/Files.js")

class provideDefinition {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @returns {vscode.Definition|vscode.LocationLink[]}
    */
    async provideDefinition(document, position, token) {
        console.log('[GoToDef] Запуск provideDefinition');
        const commentIndex = document.lineAt(position.line).text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex) {
            console.log('[GoToDef] Курсор в комментарии, выход');
            return undefined;
        }
        const range = document.getWordRangeAtPosition(position);
        if (range == undefined) {
            console.log('[GoToDef] Не найдено слово под курсором');
            return undefined;
        }
        const word = document.lineAt(position.line).text.slice(0, range.end.character).match(/[\w.]+$/g)[0];
        console.log('[GoToDef] Ищу определение для слова:', word);
        for (let i = 0; i < file.tab.length; i++) {
            for (let j = 0; j < file.tab[i].Parse.length; j++) {
                if (file.tab[i].Parse[j].name == word) {
                    console.log('[GoToDef] Найдено определение:', file.tab[i].Parse[j]);
                    return file.tab[i].Parse[j].location
                }
            }
        }
        console.log('[GoToDef] Определение не найдено');
    }
}

function children(symbols, word) {
    for (const element of symbols) {
        if (element.name == word || "this." + element.name == word) {
            return element.location
        }
        else {
            let result = children(element.children, word)
            if (result != undefined) {
                return result
            }
        }
    }
    return undefined;
}

module.exports = { provideDefinition }

/***/ }),

/***/ "./src/providers/provideHover.js":
/*!***************************************!*\
  !*** ./src/providers/provideHover.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const APIparser = __webpack_require__(/*! ../DOCS/APIparser */ "./src/DOCS/APIparser.js")
const item = __webpack_require__(/*! ../Items/Item */ "./src/Items/Item.js");

class provideHover extends vscode.Hover {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @returns {vscode.Hover}
    */
    async provideHover(document, position, token) {
        const commentIndex = document.lineAt(position.line).text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex)
            return (undefined);
        const range = document.getWordRangeAtPosition(position);
        if (range == undefined)
            return (undefined);
            const word = document.lineAt(position.line).text.slice(0, range.end.character).match(/[\w.]+$/g)[0];
            for (const element of APIparser.SharedHover) {
                if (word == element.name) {
                    element.range = range;
                    return element;
                }
            }
            for (const element of APIparser.Constants) {
                for (const element2 of element.hover) {
                    if (word == element2.name) {
                        element2.range = range;
                        return element2;
                    }
                }
            }
            var variable = new item.variable(document);
            if (word.indexOf('.') != -1) {
                for (const element of variable.list) {
                    if (word.split('.')[0] == element.name) {
                        for (const element2 of APIparser.aDOT) {
                            if (element.value == element2.name) {
                                    for (const element3 of element2.Hover) {
                                        if (word.split('.')[1] == element3.name.split('.')[1]) {
                                            element3.range = range;
                                            return element3;
                                        }
                                    }
                            }
                        }
                    }
                }
            }
            return undefined;
    }
}

module.exports = { provideHover }

/***/ }),

/***/ "./src/providers/provideInlayHints.js":
/*!********************************************!*\
  !*** ./src/providers/provideInlayHints.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const APIparser = __webpack_require__(/*! ../DOCS/APIparser */ "./src/DOCS/APIparser.js")
const configuration = vscode.workspace.getConfiguration('vscode-squirrel', undefined)
const utility = __webpack_require__(/*! ../utility */ "./src/utility.js");

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

/***/ }),

/***/ "./src/providers/provideOnTypeFormatting.js":
/*!**************************************************!*\
  !*** ./src/providers/provideOnTypeFormatting.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const beautify = __webpack_require__(/*! ../js-beautify */ "./src/js-beautify.js");
const configuration = vscode.workspace.getConfiguration('vscode-squirrel', undefined)
const indent = __webpack_require__(/*! ../indent-only */ "./src/indent-only.js");

class provideOnTypeFormattingEdits extends vscode.TextEdit {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {string} ch
    * @param {vscode.FormattingOptions} options
    * @param {vscode.CancellationToken} token
    * @returns {vscode.TextEdit[]}
    */
    async provideOnTypeFormattingEdits(document, position, ch, options, token) {
        if (ch === "}") {
            let range = new vscode.Range(findMatchingOpeningBrace(document, position.with(position.line, position.character - 1)), position)
            return [vscode.TextEdit.replace(range, indent.formatSquirrelIndent(document.getText(range), options))]
        }
        const fullText = document.lineAt(position.line).text
        const fullRange = new vscode.Range(position.line, 0, position.line, fullText.length);
        return [vscode.TextEdit.replace(fullRange, beautify.js_beautify(fullText, { "indent_with_tabs": configuration.get('IndentWithTabs') }).replace(/local\s+function/g, "local function").replace("< -", "<- "))]
    }
}

function findMatchingOpeningBrace(document, position) {
    let depth = 0;
    let inBlockComment = false;
    let inLineComment = false;
    let inString = false;
    let stringChar = null;

    for (let lineNum = position.line; lineNum >= 0; lineNum--) {
        const lineText = document.lineAt(lineNum).text;
        let charIndex = (lineNum === position.line) ? position.character - 1 : lineText.length - 1;

        while (charIndex >= 0) {
            const ch = lineText[charIndex];
            const prev = charIndex > 0 ? lineText[charIndex - 1] : '';

            if (inBlockComment) {
                if (prev === '/' && ch === '*') { 
                    inBlockComment = false;
                    charIndex -= 2;
                    continue;
                }
                charIndex--;
                continue;
            }

            if (!inBlockComment && prev === '*' && ch === '/') {
                inBlockComment = true;
                charIndex -= 2;
                continue;
            }

            if (inLineComment) {
                break;
            }

            if (inString) {
                if (ch === stringChar) {
                    let escapeCount = 0;
                    let idx = charIndex - 1;
                    while (idx >= 0 && lineText[idx] === '\\') {
                        escapeCount++;
                        idx--;
                    }
                    if (escapeCount % 2 === 0) {
                        inString = false;
                        stringChar = null;
                    }
                }
                charIndex--;
                continue;
            }

            if (!inString && !inLineComment && !inBlockComment) {
                if (prev === '/' && ch === '*') {
                    inBlockComment = true;
                    charIndex -= 2;
                    continue;
                }
                if (prev === '/' && ch === '/') {
                    inLineComment = true;
                    break;
                }
                if (ch === '"' || ch === '\'') {
                    inString = true;
                    stringChar = ch;
                    charIndex--;
                    continue;
                }
            }

            if (ch === '}') {
                depth++;
            } else if (ch === '{') {
                if (depth === 0) {
                    return new vscode.Position(lineNum, 0);
                } else {
                    depth--;
                }
            }

            charIndex--;
        }

        inLineComment = false;
    }
    return null;
}


module.exports = { provideOnTypeFormattingEdits }

/***/ }),

/***/ "./src/providers/provideOther.js":
/*!***************************************!*\
  !*** ./src/providers/provideOther.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")
const configuration = vscode.workspace.getConfiguration('vscode-squirrel', undefined)
const utility = __webpack_require__(/*! ../utility */ "./src/utility.js");
const file = __webpack_require__(/*! ../Files */ "./src/Files.js")


class provideOtherCompletion extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, contex) {
            let temp = [];
            let element = FindElement(document)
            let temp2 = undefined
            for (let i = 0; i < element.length; i++) {
                if (element[i].Parse.containerName == "root") {
                    temp.push(CreateCompletion(element[i].Parse, element[i].fullPath))
                }
                else {
                    if (element[i].Parse.location.range.contains(position)) {
                        temp2 = element[i].Parse
                    }
                }
            }
            if (temp2) {
                element = FindElement(document, undefined, temp2.name)
                for (let i = 0; i < element.length; i++) {
                    temp.push(CreateCompletion(element[i].Parse, element[i].fullPath))
                }
            }
            return temp;
    }
}

class provideOtherCompletionDOT extends vscode.CompletionItem {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.CompletionContext} context
    * @returns {vscode.CompletionList}
    */
    async provideCompletionItems(document, position, token, contex) {
            const range = document.getWordRangeAtPosition(position.with(position.line, position.character - 1));
            const word = document.getText(range);
            let temp = [];
            let telement2 = FindElement(document, word)
            for (let j = 0; j < telement2.length; j++) {
                let telement = FindElement(document, undefined, telement2[j].Parse.regex[3])
                for (let i = 0; i < telement.length; i++) {
                    temp.push(CreateCompletion(telement[i].Parse, telement[i].fullPath))
                }

            }
            return temp;
    }
}

class provideHover extends vscode.Hover {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @returns {vscode.Hover}
    */
    async provideHover(document, position, token) {
        const commentIndex = document.lineAt(position.line).text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex)
            return (undefined);
        const range = document.getWordRangeAtPosition(position);
        if (range == undefined)
            return (undefined);
            const word = document.lineAt(position.line).text.slice(0, range.end.character).match(/[\w.]+$/g)[0];
            let hover = undefined
            let t = word.split(".")
            if (t.length == 2) {
                let telement = FindElement(document, t[0])
                let telement2 = FindElement(document, t[1])
                for (let j = 0; j < telement2.length; j++) {
                    if (telement2[j].Parse.containerName == telement[0].Parse.regex[3]) {
                        hover = mergeHover(hover, CreateHover(telement2[j].Parse, telement2[j].fullPath, word, range));
                    }
                }
            }
            else {
                let element = FindElement(document, word)
                for (let i = 0; i < element.length; i++) {
                    if (element[i].Parse.containerName == "root") {
                        hover = mergeHover(hover, CreateHover(element[i].Parse, element[i].fullPath, word, range));
                    }
                }
            }
            return hover;
    }
}
function FindElement(document, name = undefined, containerName = undefined) {
    let temp = [];
    let flag = false
    for (let i = 0; i < file.tab.length; i++) {
        flag = false
        if (document.fileName == file.tab[i].fullPath) {
            flag = true
        }
        if (configuration.get('CompletionOtherShowOnlySubfolders')) {
            if (!(path.dirname(file.tab[i].fullPath).replace(path.dirname(document.fileName), "").length < path.dirname(file.tab[i].fullPath).length)) {
                continue;
            }
        }
        for (let j = 0; j < file.tab[i].Parse.length; j++) {
            if (file.tab[i].Parse[j].name != "constructor") {
                if (file.tab[i].Parse[j].data.local == false || flag) {
                    if (name) {
                        if (name == file.tab[i].Parse[j].name) {
                            temp.push({
                                fullPath: file.tab[i].fullPath,
                                Parse: file.tab[i].Parse[j]
                            })
                        }
                    }
                    else if (containerName) {
                        if (containerName == file.tab[i].Parse[j].containerName) {
                            temp.push({
                                fullPath: file.tab[i].fullPath,
                                Parse: file.tab[i].Parse[j]
                            })
                        }
                    }
                    else {
                        temp.push({
                            fullPath: file.tab[i].fullPath,
                            Parse: file.tab[i].Parse[j]
                        })
                    }
                }
            }
        }
    }
    return temp
}

function CreateCompletion(obj, fullPath) {
    let completion = new vscode.CompletionItem(obj.name, SymbolKindTOCompletionKind(obj.kind))
    let documentation = new vscode.MarkdownString()
    let docs = GetJSDOC(obj)
    if (docs) {
        documentation.appendCodeblock(docs.head, "javascript")
        documentation.appendText("\n\n")
        documentation.appendMarkdown(docs.description)
    } else {
        documentation.appendCodeblock(obj.metadata.split('\n')[0], "squirrel")
    }
    documentation.appendText("\n\n" + path.relative(vscode.workspace.workspaceFolders[0].uri.fsPath, fullPath))
    completion.documentation = documentation
    return completion;
}

function CreateHover(obj, fullPath, word, range) {
    let documentation = new vscode.MarkdownString()
    let docs = GetJSDOC(obj)
    if (docs) {
        documentation.appendCodeblock(docs.head, "javascript")
        documentation.appendText("\n\n")
        documentation.appendMarkdown(docs.description)
    }
    else {
        documentation = documentation.appendCodeblock(obj.metadata.split('\n')[0], "squirrel")
    }
    documentation.appendText("\n\n" + path.relative(vscode.workspace.workspaceFolders[0].uri.fsPath, fullPath))
    let hover = new vscode.Hover(documentation, range);
    hover.name = word
    return hover;
}

/**
* @param {vscode.Hover} hover
* @param {vscode.Hover} hover2
*/
function mergeHover(hover, hover2) {
        if (hover == undefined) {
            return hover2
        }
        else {
            hover.contents[0].value += " \n_________________\n" + hover2.contents[0].value
            hover.range = hover2.range;
        }
    return hover;
}

function SymbolKindTOCompletionKind(item) {
    switch (item) {
        case vscode.SymbolKind.Enum:
            return vscode.CompletionItemKind.Enum
        case vscode.SymbolKind.Function:
            return vscode.CompletionItemKind.Function
        case vscode.SymbolKind.Class:
            return vscode.CompletionItemKind.Class
        case vscode.SymbolKind.Variable:
            return vscode.CompletionItemKind.Variable
        case vscode.SymbolKind.Constructor:
            return vscode.CompletionItemKind.Constructor
    }
}

/**
 * Description
 * @param {int} [element] pid description
 * @return {int} [element] pid description
 */
function GetJSDOC(element) {
    try {
        if (element.jsdoc) {
            let head = ""
            if (element.data && element.data.local)
                head += "local ";
            if (element.data && element.data.static)
                head += "static ";
            let description = element.jsdoc.parsed.description + "\n"
            head += string_of_enum(vscode.SymbolKind, element.kind).toLowerCase() + " " + (element.containerName == "root" ? "" : (element.containerName + ".")) + element.name
            if (element.kind == vscode.SymbolKind.Function || element.kind == vscode.SymbolKind.Class || element.kind == vscode.SymbolKind.Method) {
                head += "("
            }
            let returns = ""
            for (let i = 0; i < element.jsdoc.parsed.tags.length; i++) {
                if (element.jsdoc.parsed.tags[i].tag == "param") {
                    head += element.jsdoc.parsed.tags[i].name + ": " + (element.jsdoc.parsed.tags[i].optional ? element.jsdoc.parsed.tags[i].type + "?" : element.jsdoc.parsed.tags[i].type)
                }
                if (element.jsdoc.parsed.tags[i].tag == "return" || element.jsdoc.parsed.tags[i].tag == "returns" || element.jsdoc.parsed.tags[i].tag == "type") {
                    returns += ": " + element.jsdoc.parsed.tags[i].type
                }
                description += "\n`@" + element.jsdoc.parsed.tags[i].tag + " " + element.jsdoc.parsed.tags[i].name + "`" + (element.jsdoc.parsed.tags[i].description != "" ? " - " + element.jsdoc.parsed.tags[i].description : "") + "\n"
            }
            if (element.kind == vscode.SymbolKind.Function || element.kind == vscode.SymbolKind.Class || element.kind == vscode.SymbolKind.Method) {
                head += ")"
            }
            head += returns

            return {
                head: head,
                description: description
            }
        }
    } catch {
        return undefined;
    }
}

function string_of_enum(enumn, value) {
    for (var k in enumn) if (enumn[k] == value) return k;
    return null;
}
module.exports = { provideOtherCompletion, provideOtherCompletionDOT, provideHover }

/***/ }),

/***/ "./src/providers/provideSignatureHelp.js":
/*!***********************************************!*\
  !*** ./src/providers/provideSignatureHelp.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const APIparser = __webpack_require__(/*! ../DOCS/APIparser */ "./src/DOCS/APIparser.js")
const item = __webpack_require__(/*! ../Items/Item */ "./src/Items/Item.js");

class provideSignatureHelp extends vscode.SignatureHelp {
    /**
    * @param {vscode.TextDocument} document
    * @param {vscode.Position} position
    * @param {vscode.CancellationToken} token
    * @param {vscode.SignatureHelpContext} context
    * @returns {SignatureHelp}
    */
    async provideSignatureHelp(document, position, token, context) {
        const line = document.lineAt(position.line);
        let Idx = line.text.lastIndexOf('(', position.character)
        let Idx2 = line.text.lastIndexOf(',', position.character)
        if (Idx === -1 && Idx2 === -1) {
            return ([]);
        }
            var reg = /([\w.]+)\s?\(/g;
            let match;
            let match2 = []
            while (match = reg.exec(line.text)) {
                var end = line.text.length;
                var licznik = 1;
                for (var i = match.index + match[0].length; i < line.text.length; i++) {
                    if (line.text[i] == ")") licznik = licznik - 1;
                    else if (line.text[i] == "(") licznik = licznik + 1;
                    if (licznik == 0) {
                        end = i;
                        break;
                    }
                }
                match2.push({ value: match[1], range: new vscode.Range(new vscode.Position(line.lineNumber, match.index + match[0].length), new vscode.Position(line.lineNumber, end)) })
            }
            var variable = new item.variable(document);
            for (var i = match2.length - 1; i >= 0; i--) {
                if (match2[i].range.contains(position)) {
                    if (match2[i].value.indexOf('.') != -1) {
                        var temp = match2[i].value.split('.');
                        for (const element of variable.list) {
                            if (temp[0] == element.name.split('.')[0]) {
                                for (const element2 of APIparser.aDOT) {
                                    if (element2.name == element.value) {
                                        for (const element3 of element2.SignatureInformation) {
                                            if (element3.name.split('.')[1] == temp[1]) {
                                                let signatureHelp = new vscode.SignatureHelp();
                                                signatureHelp.signatures.push(element3);
                                                signatureHelp.activeParameter = document.getText(match2[i].range).split(',').length - 1;
                                                return signatureHelp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let signatureHelp = new vscode.SignatureHelp();
                    signatureHelp = GetsignatureHelp(signatureHelp, APIparser.SharedSignature, match2[i].value);
                    signatureHelp.activeParameter = document.getText(match2[i].range).split(',').length - 1;
                    return signatureHelp;
                }
            }
            return undefined;
    }
}

function GetsignatureHelp(signatureHelp, doc, match) {
    for (const element of doc) {
        if (element.name == match) {
            signatureHelp.signatures.push(element);
        }
    }
    return signatureHelp;
}

module.exports = { provideSignatureHelp }

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")

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

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extension.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map