const MarkdownIt = require('markdown-it');
const highlight = require('./highlight');
const cardWrapper = require('./card-wrapper');

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
});

module.exports = function(source, options) {
  this.cacheable && this.cacheable();

  options = {
    wrapper,
    ...options
  };

  return options.wrapper(parser.render(source));
};
