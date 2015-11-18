import mergeStyleArray from './merge-style-array'
import resolveMediaQueries from './resolve-media-queries'

export default class StyleCompose {
  constructor(component) {
    this.component = component;
    this.disposes = [];
    component.state['_mediaQuery'] = {};
  }

  dispose() {
    this.disposes.forEach(callback => callback());
  }

  registerDispose(callback) {
    this.dispose.push(callback);
  }

  resolve(styles) {
    let newStyles = mergeStyleArray(styles);
    return resolveMediaQueries(this, newStyles);
  }
}
