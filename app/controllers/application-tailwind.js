import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import colors from '../tailwind/colors';
import screens from '../tailwind/screens';
import fonts from '../tailwind/fonts';
import textSizes from '../tailwind/text-sizes';
import fontWeights from '../tailwind/font-weights';
import leading from '../tailwind/line-height';
import tracking from '../tailwind/letter-spacing';
import borderWidths from '../tailwind/border-widths';
import borderRadius from '../tailwind/border-radius';
import width from '../tailwind/width';
import height from '../tailwind/height';
import minWidth from '../tailwind/min-width';
import minHeight from '../tailwind/min-height';
import maxWidth from '../tailwind/max-width';
import maxHeight from '../tailwind/max-height';
import padding from '../tailwind/padding';
import margin from '../tailwind/margin';
import negativeMargin from '../tailwind/negative-margin';
import shadows from '../tailwind/shadows';
import zIndex from '../tailwind/z-index';
import opacity from '../tailwind/opacity';
import svgFill from '../tailwind/svg-fill';
import svgStroke from '../tailwind/svg-stroke';

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
