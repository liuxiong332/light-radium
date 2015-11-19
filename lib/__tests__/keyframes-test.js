import keyframes from '../keyframes'

describe('keyframes', () => {
  let styleElement;

  beforeEach(() => {
    styleElement = {
      textContent: '',
      sheet: {
        insertRule: sinon.spy(),
        cssRules: []
      },
      style: {WebkitAnimationName: ''}
    };

    sinon.stub(document, 'createElement', () => {
      return styleElement;
    });

    sinon.stub(document.head, 'appendChild');
  });

  afterEach(() => {
    document.createElement.restore();
    document.head.appendChild.restore();
  });


  it('returns a name for the keyframes', () => {
    const name = keyframes({}, 'MyComponent');
    expect(name.length).to.be.greaterThan(0);
  });

  it('does not always require a component', () => {
    const name = keyframes({});
    expect(name.length).to.be.greaterThan(0);
  });

  it('prefixes @keyframes if needed', () => {
    const name = keyframes({}, 'MyComponent');

    expect(styleElement.sheet.insertRule).to.have.been.called;
    expect(styleElement.sheet.insertRule.lastCall.args).to.deep.equal([
      '@-webkit-keyframes ' + name + ' {\n\n}\n',
      0
    ]);
  });
//
//   it('doesn\'t prefix @keyframes if not needed', () => {
//     document.createElement.restore();
//     sinon.stub(document, 'createElement', () => {
//       return {...styleElement, style: {animationName: ''}};
//     });
//     const keyframes = require('inject?-./create-markup-for-styles!keyframes.js')({
//       'exenv': exenv,
//       './prefixer': require('__mocks__/prefixer.js')
//     });
//     const name = keyframes({}, 'MyComponent');
//
//     expect(styleElement.sheet.insertRule.lastCall.args[0]).to.equal(
//       '@keyframes ' + name + ' {\n\n}\n'
//     );
//   });
//
//   it('serializes keyframes', () => {
//     const keyframes = require('inject?-./create-markup-for-styles!keyframes.js')({
//       'exenv': exenv,
//       './prefixer': require('__mocks__/prefixer.js')
//     });
//     const name = keyframes({
//       from: {
//         width: 100
//       },
//       to: {
//         width: 200
//       }
//     }, 'MyComponent');
//
//     expect(styleElement.sheet.insertRule.lastCall.args[0]).to.equal(
//       `@-webkit-keyframes ${name} {
//   from {
//     width: 100;
//   }
//   to {
//     width: 200;
//   }
// }
// `);
  // });
});
