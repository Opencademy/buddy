// Generated by CoffeeScript 1.4.0
var RE_COMMENT_LINES, RE_MODULE, RE_REQUIRE, RE_SPACES, RE_WIN_SEPARATOR, fs, indent, path;

path = require('path');

fs = require('fs');

indent = require('../../utils').indent;

RE_WIN_SEPARATOR = /\\\\?/g;

RE_MODULE = /^require\.register\(.+function *\( *module *, *exports *, *require *\) *{/gm;

RE_COMMENT_LINES = /^\s*(?:\/\/|#).+$/gm;

RE_REQUIRE = /require[\s|\(]['|"](.*?)['|"]/g;

RE_SPACES = /\s/;

module.exports = {
  name: 'node',
  category: 'js',
  type: 'module',
  getModuleId: function(qualifiedFilename) {
    var module;
    module = qualifiedFilename.toLowerCase().replace(RE_SPACES, '');
    if (process.platform === 'win32') {
      module = module.replace(RE_WIN_SEPARATOR, '/');
    }
    return module;
  },
  getModuleDependencies: function(contents, id) {
    var dep, deps, match, part, parts, _i, _len, _ref;
    deps = [];
    contents = contents.replace(RE_COMMENT_LINES, '');
    while (match = RE_REQUIRE.exec(contents)) {
      dep = match[1];
      parts = dep.split('/');
      if (dep.charAt(0) === '.') {
        parts = id.split('/');
        parts.pop();
        _ref = dep.split('/');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          part = _ref[_i];
          if (part === '..') {
            parts.pop();
          } else if (part !== '.') {
            parts.push(part);
          }
        }
      }
      deps.push(parts.join('/'));
    }
    return deps;
  },
  wrapModuleContents: function(contents, id) {
    RE_MODULE.lastIndex = 0;
    if (!RE_MODULE.test(contents)) {
      contents = "require.register('" + id + "', function(module, exports, require) {\n" + (indent(contents, 2)) + "\n});";
    }
    return contents;
  }
};