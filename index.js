#!/usr/bin/env node
"use strict";

function GenerateIncludesWebpackPlugin() {}

GenerateIncludesWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    compilation.chunks.forEach(function(chunk) {
      chunk.files.forEach(function(filename) {
        console.log(filename);
      });
    });

    callback();
  });
};

module.exports = GenerateIncludesWebpackPlugin;
