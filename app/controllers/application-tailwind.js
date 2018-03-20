import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import colors from '../styles/tailwind/colors';
import screens from '../styles/tailwind/screens';
import fonts from '../styles/tailwind/fonts';
import textSizes from '../styles/tailwind/text-sizes';
import fontWeights from '../styles/tailwind/font-weights';
import leading from '../styles/tailwind/line-height';
import tracking from '../styles/tailwind/letter-spacing';
import borderWidths from '../styles/tailwind/border-widths';
import borderRadius from '../styles/tailwind/border-radius';
import width from '../styles/tailwind/width';
import height from '../styles/tailwind/height';
import minWidth from '../styles/tailwind/min-width';
import minHeight from '../styles/tailwind/min-height';
import maxWidth from '../styles/tailwind/max-width';
import maxHeight from '../styles/tailwind/max-height';
import padding from '../styles/tailwind/padding';
import margin from '../styles/tailwind/margin';
import negativeMargin from '../styles/tailwind/negative-margin';
import shadows from '../styles/tailwind/shadows';
import zIndex from '../styles/tailwind/z-index';
import opacity from '../styles/tailwind/opacity';
import svgFill from '../styles/tailwind/svg-fill';
import svgStroke from '../styles/tailwind/svg-stroke';

const modules = {
  colors,
  screens,
  fonts,
  textSizes,
  fontWeights,
  leading,
  tracking,
  borderWidths,
  borderRadius,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  margin,
  negativeMargin,
  shadows,
  zIndex,
  opacity,
  svgFill,
  svgStroke
};

export default Controller.extend({

  /*
    A module style is an object that looks like

    {
      module: 'border-radius',
      name: 'lg',
      value: '.5rem'
    }
  */
  moduleStyles: computed(function() {
    return Object.keys(modules).reduce((allModules, moduleName) => {
      let hash = modules[moduleName];
      allModules[moduleName] = Object.keys(hash).map(key => {
        return {
          module: dasherize(moduleName),
          name: key,
          value: hash[key]
        };
      });

      return allModules;
    }, {});
  })

});
