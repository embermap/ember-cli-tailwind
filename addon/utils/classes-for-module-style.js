const moduleStyles = {

  'border-radius'(moduleStyle) {
    let name = moduleStyle.name;
    let postfix = name === 'default' ? '' : `-${name}`;

    return [
      `rounded${postfix}`,
      `rounded-t${postfix}`,
      `rounded-r${postfix}`,
      `rounded-b${postfix}`,
      `rounded-l${postfix}`,
      `rounded-tl${postfix}`,
      `rounded-tr${postfix}`,
      `rounded-br${postfix}`,
      `rounded-bl${postfix}`,
    ];
  },

  'border-widths'(moduleStyle) {
    let name = moduleStyle.name;
    let postfix = name === 'default' ? '' : `-${name}`;

    return [
      `border${postfix}`,
      `border-t${postfix}`,
      `border-r${postfix}`,
      `border-b${postfix}`,
      `border-l${postfix}`,
    ];
  },

  'colors'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `text-${name}`,
      `bg-${name}`,
      `border-${name}`
    ]
  },

  'font-weights'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `font-${name}`,
    ]
  },

  'height'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `h-${name}`,
    ]
  },

  'letter-spacing'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `tracking-${name}`,
    ]
  },

  'line-height'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `leading-${name}`,
    ]
  },

  'margin'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `m-${name}`,
      `mt-${name}`,
      `mr-${name}`,
      `mb-${name}`,
      `ml-${name}`,
      `mx-${name}`,
      `my-${name}`,
    ]
  },

  'max-height'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `max-h-${name}`
    ]
  },

  'max-width'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `max-w-${name}`
    ]
  },

  'min-height'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `min-h-${name}`
    ]
  },

  'min-width'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `min-w-${name}`
    ]
  },

  'negative-margin'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `-m-${name}`,
      `-mt-${name}`,
      `-mr-${name}`,
      `-mb-${name}`,
      `-ml-${name}`,
      `-mx-${name}`,
      `-my-${name}`,
    ]
  },

  'opacity'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `opacity-${name}`
    ]
  },

  'padding'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `p-${name}`,
      `pt-${name}`,
      `pr-${name}`,
      `pb-${name}`,
      `pl-${name}`,
      `px-${name}`,
      `py-${name}`,
    ]
  },

  'shadows'(moduleStyle) {
    let name = moduleStyle.name;
    let postfix = name === 'default' ? '' : `-${name}`;

    return [
      `shadow${postfix}`
    ];
  },

  'svg-fill'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `fill-${name}`
    ]
  },

  'svg-stroke'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `stroke-${name}`
    ]
  },

  'text-sizes'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `text-${name}`
    ]
  },

  'width'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `w-${name}`,
    ]
  },

  'z-index'(moduleStyle) {
    let name = moduleStyle.name;

    return [
      `z-${name}`,
    ]
  },


}

export default function(moduleStyle) {
  return moduleStyles[moduleStyle.module](moduleStyle);
}
