/* @flow */

const createMarkupForStyles = function(style, spaces = ''): string {
  return Object.keys(style).map(property => {
    return spaces + property + ': ' + style[property] + ';';
  }).join('\n');
};

export default createMarkupForStyles;
