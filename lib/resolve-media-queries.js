import mergeStyleArray from './merge-style-array'

export default function resolveMediaQueries(resolver, style) {
  const newComponentFields = {};
  let newStyle = style, component = resolver.component;
  const matchMedia = window.matchMedia;
  if (!matchMedia) return newStyle;

  Object.keys(style)
  .filter(name => name.indexOf('@media') === 0)
  .map(query => {
    const mediaQueryStyles = style[query];
    query = query.replace('@media ', '');

    let mql = matchMedia(query);
    const mediaQueryInfos = component.state['_mediaQuery'];

    if (mediaQueryInfos[query] == null) {
      const listener = () => {
        let newInfos = Object.assign({}, mediaQueryInfos, {[query]: mql.matches});
        component.setState({_mediaQuery: newInfos});
      };
      mql.addListener(listener);
      resolver.registerDispose(() => mpl.removeListener(listener));
    }

    // Apply media query states
    if (mql.matches) {
      newStyle = mergeStyleArray([newStyle, mediaQueryStyles]);
    }
  });

  // Remove media queries
  newStyle = Object.keys(newStyle).reduce((styleWithoutMedia, key) => {
    if (key.indexOf('@media') !== 0) {
      styleWithoutMedia[key] = newStyle[key];
    }
    return styleWithoutMedia;
  }, {});
  return newStyle;
}
