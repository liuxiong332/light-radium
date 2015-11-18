export default function mergeStyleArray(styles) {
  if(!Array.isArray(styles)) return styles;
  return Object.assign({}, ...styles);
}
