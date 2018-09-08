import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import colors from '../tailwind/config/colors';
import screens from '../tailwind/config/screens';
import fonts from '../tailwind/config/fonts';
import textSizes from '../tailwind/config/text-sizes';
import fontWeights from '../tailwind/config/font-weights';
import leading from '../tailwind/config/line-height';
import tracking from '../tailwind/config/letter-spacing';
import borderWidths from '../tailwind/config/border-widths';
import borderRadius from '../tailwind/config/border-radius';
import width from '../tailwind/config/width';
import height from '../tailwind/config/height';
import minWidth from '../tailwind/config/min-width';
import minHeight from '../tailwind/config/min-height';
import maxWidth from '../tailwind/config/max-width';
import maxHeight from '../tailwind/config/max-height';
import padding from '../tailwind/config/padding';
import margin from '../tailwind/config/margin';
import negativeMargin from '../tailwind/config/negative-margin';
import shadows from '../tailwind/config/shadows';
import zIndex from '../tailwind/config/z-index';
import opacity from '../tailwind/config/opacity';
import svgFill from '../tailwind/config/svg-fill';
import svgStroke from '../tailwind/config/svg-stroke';

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
