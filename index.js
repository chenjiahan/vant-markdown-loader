const hljs = require('highlight.js');
const MarkdownIt = require('markdown-it');

const wrapper = content => `
<template>
  <section v-html="content" v-once />
</template>

<script>
export default {
  created() {
    this.content = unescape(\`${escape(content)}\`);
  }
};
</script>
`;

const highlight = (str, lang) => lang && hljs.getLanguage(lang) ? hljs.highlight(lang, str, true).value : '';
const parser = new MarkdownIt({ highlight });

module.exports = function(source, options) {
  this.cacheable && this.cacheable();

  options = {
    wrapper,
    ...options;
  };

  return options.wrapper(parser.render(source));
}
