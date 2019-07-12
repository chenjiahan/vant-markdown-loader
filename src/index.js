const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const highlight = require('./highlight');
const cardWrapper = require('./card-wrapper');
const slugify = require('transliteration').slugify;

function wrapper(content) {
  content = cardWrapper(content);
  content = escape(content);

  return `
<template>
  <section v-html="content" v-once />
</template>

<script>
export default {
  created() {
    this.content = unescape(\`${content}\`);
  }
};
</script>
`;
}

const parser = new MarkdownIt({
  html: true,
  highlight
}).use(markdownItAnchor, {
  level: 2,
  slugify,
  permalink: true,
  permalinkSymbol: '#'
});

module.exports = function(source, options) {
  this.cacheable && this.cacheable();

  options = {
    wrapper,
    ...options
  };

  return options.wrapper(parser.render(source));
};
