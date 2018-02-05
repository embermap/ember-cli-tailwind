'use strict';
/*eslint-env node */

let colors = {
  'white': '#eee',
  grey: 'grey'
}

module.exports = {

  /*
  |-----------------------------------------------------------------------------
  | Colors                                  https://tailwindcss.com/docs/colors
  |-----------------------------------------------------------------------------
  |
  | The color palette defined above is also assigned to the "colors" key of
  | your Tailwind config. This makes it easy to access them in your CSS
  | using Tailwind's config helper. For example:
  |
  | .error { color: config('colors.red') }
  |
  */

  colors,

  textColors: colors,
  backgroundColors: colors,

  modules: {
    appearance: false,
    backgroundAttachment: false,
    backgroundColors: [],
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderColors: false,
    borderRadius: false,
    borderStyle: false,
    borderWidths: false,
    cursor: false,
    display: false,
    flexbox: false,
    float: false,
    fonts: false,
    fontWeights: false,
    height: false,
    leading: false,
    lists: false,
    margin: false,
    maxHeight: false,
    maxWidth: false,
    minHeight: false,
    minWidth: false,
    negativeMargin: false,
    opacity: false,
    overflow: false,
    padding: false,
    pointerEvents: false,
    position: false,
    resize: false,
    shadows: false,
    svgFill: false,
    svgStroke: false,
    textAlign: false,
    textColors: [],
    textSizes: false,
    textStyle: false,
    tracking: false,
    userSelect: false,
    verticalAlign: false,
    visibility: false,
    whitespace: false,
    width: false,
    zIndex: false,
  },



  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */

  options: {
    prefix: '',
    important: false,
    separator: ':',
  },

}
