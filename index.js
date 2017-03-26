#!/usr/bin/env node
"use strict";

const chunkSorter = require("./libs/chunkSorter");

function GenerateIncludesWebpackPlugin() {}

GenerateIncludesWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    let head = "";
    let body = "";
    const sortedChunks = chunkSorter(compilation.chunks);

    let publicPath = compilation.mainTemplate.getPublicPath({
      hash: compilation.hash
    }) || "";
    if (publicPath && publicPath.substr(-1) !== "/") {
      publicPath += "/";
    }

    for (const chunk of sortedChunks) {
      if (chunk.name) {
        for (const filename of chunk.files) {
          if (filename.match(/\.css$/)) {
            head += `link(href="${publicPath + filename}", rel="stylesheet")\n`;
          } else if (filename.match(/\.js$/)) {
            body += `script(type="text/javascript", src="${publicPath + filename}")\n`;
          }
        }
      }
    }

    compilation.assets["head.pug"] = {
      source: function() {
        return head;
      },
      size: function() {
        return head.length;
      }
    };

    compilation.assets["body.pug"] = {
      source: function() {
        return body;
      },
      size: function() {
        return body.length;
      }
    };

    callback();
  });
};

module.exports = GenerateIncludesWebpackPlugin;
