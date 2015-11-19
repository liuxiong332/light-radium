/* @flow */

import camelCasePropsToDashCase from './utils/camel-case-props-to-dash-case';
import createMarkupForStyles from './utils/create-markup-for-styles';
import {getPrefixedStyle} from './utils/prefixer';

let isAnimationSupported = false;
let keyframesPrefixed = 'keyframes';

function detectAnimationSupported() {
  // Animation feature detection and keyframes prefixing from MDN:
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
  const domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
  const element = document.createElement('div');

  if (element.style.animationName !== undefined) {
    return true;
  } else {
    return domPrefixes.some(prefix => {
      if (element.style[prefix + 'AnimationName'] !== undefined) {
        keyframesPrefixed = '-' + prefix.toLowerCase() + '-keyframes';
        isAnimationSupported = true;
        return true;
      }
      return false;
    });
  }
}
isAnimationSupported = detectAnimationSupported();

let animationIndex = 1;
let animationStyleSheet = null;

if (isAnimationSupported) {
  animationStyleSheet = document.createElement('style');
  document.head.appendChild(animationStyleSheet);
}

// Simple animation helper that injects CSS into a style object containing the
// keyframes, and returns a string with the generated animation name.
export default function keyframes(keyframeRules, componentName, prefix = getPrefixedStyle) {
  const name = 'Animation' + animationIndex;
  animationIndex += 1;

  if (!isAnimationSupported) {
    return name;
  }

  const rule = '@' + keyframesPrefixed + ' ' + name + ' {\n' +
    Object.keys(keyframeRules).map(percentage => {
      const props = keyframeRules[percentage];
      const prefixedProps = prefix(props);
      const cssPrefixedProps = camelCasePropsToDashCase(prefixedProps);
      const serializedProps = createMarkupForStyles(cssPrefixedProps, '  ');
      return '  ' + percentage + ' {\n  ' + serializedProps + '\n  }';
    }).join('\n') +
    '\n}\n';

  console.log(rule, animationStyleSheet);
  // for flow
  /* istanbul ignore next */
  if (!animationStyleSheet) {
    throw new Error('keyframes not initialized properly');
  }

  console.log(animationStyleSheet);
  animationStyleSheet.sheet.insertRule(
    rule,
    animationStyleSheet.sheet.cssRules.length
  );
  return name;
}
