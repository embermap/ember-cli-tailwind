# Ember CLI Tailwind

[![npm version](https://img.shields.io/npm/v/ember-cli-tailwind.svg?style=flat-square)](http://badge.fury.io/js/ember-cli-tailwind)
[![Build Status](https://img.shields.io/travis/embermap/ember-cli-tailwind/master.svg?style=flat-square)](https://travis-ci.org/embermap/ember-cli-tailwind)

Ember CLI Tailwind adds [Tailwind CSS](https://tailwindcss.com) to your app or addon. It also lets you configure every aspect of Tailwind that's designed to be configured, from the configuration values driving the utility classes, to defining new utility classes or components.

It comes with a styleguide route (`/tailwind`) that displays all your configured styles:

![image](https://user-images.githubusercontent.com/2922250/39969009-f0886cf4-56a3-11e8-85a1-15ce38d1f45d.png)

## Installation

Install the addon with

```sh
ember install ember-cli-tailwind
```

**Apps**

The default blueprint will attempt to modify your application's main style file and add an `@import` line to include Tailwind, but if it doesn't, you can add it manually:

```
# CSS 
@import 'tailwind.css';

# SCSS
@import 'tailwind';

# Less 
@import (inline) 'tailwind.css';
```

**Addons**

Make sure `ember-cli-tailwind` is in your addon's `dependences` (NOT `devDependencies`).

## Usage

Once installed, all of [Tailwind's classes](https://tailwindcss.com/docs/what-is-tailwind/) should be available to you.

You can see the default values, and change them, by looking at the generated files under `/app/tailwind`.

**Styleguide**

If you serve your Ember app and visit `/tailwind`, you should see a styleguide showing a summary of all your configured classes. It will rebuild as you modify Tailwind's default configuration.

**Utilities**

You can [add new utilities](https://tailwindcss.com/docs/adding-new-utilities) of your own by adding them to files under `/app/tailwind/utilities`. You can either use one file or one per utility.

```
// app/tailwind/utilities/outline-none.css
.outline-none {
  outline: none;
}
```

The file will get automatically added to your build, and in the right order (so it will override other rules as you'd expect).

**Components**

You can define [Tailwind components](https://tailwindcss.com/docs/extracting-components) by adding files under `app/tailwind/components`.

```css
// app/tailwind/components/buttons.css
.btn-blue {
  @apply .bg-blue .text-white .font-bold .py-2 .px-4 .rounded;
}
.btn-blue:hover {
  @apply .bg-blue-dark;
}
```

Files added here will automatically be added to your build.

**Plugins**

You can add [Tailwind plugins](https://tailwindcss.com/docs/plugins) by using the `app/tailwind/config/tailwind.js` file, importing your plugin, and adding it to the `plugins` array:

```js
import myPlugin from 'some-neat-plugin';

// snip

plugins: [
  container({
    // center: true,
    // padding: '1rem',
  }),
  myPlugin(),
],
```

## Configuration

**shouldIncludeStyleguide**

Ember CLI Tailwind ships with a styleguide that can be added to the host application's router at the `/tailwind` URL.

The config option `ENV['ember-cli-tailwind'].shouldIncludeStyleguide` determines whether this styleguide is included. By default, it is `false` in the `production` environment, and `true` otherwise.

You can overwrite it to change this default behavior.

## Advanced addon usage

### `build-tailwind` and the `shouldBuildTailwind` option

Ember CLI Tailwind comes with a function you can use when you want more control over how to work with the built `tailwind.css` file.

The function is in the `lib` directory and can be `require`'d in node:

```js
const buildTailwind = require('ember-cli-tailwind/lib/build-tailwind');
```

To use the function, pass in your addon instance (usually `this` if you're working in a hook in `index.js`):

```js
let tailwind = buildTailwind(this);
```

The return value is a Broccoli tree, and thus can be used in different `treeFor` hooks to end up in your build.

If you're using this, you probably also want to disable Ember CLI Tailwind's default behavior, which will concat the built `tailwind.css` file into your addon's generated `vendor.css` file – otherwise you could end up with two versions of Tailwind in your CSS.

You can do that using the `shouldBuildTailwind` config option:

```js
// index.js
module.exports = {
  name: 'your-addon',
  
  options: {
    'ember-cli-tailwind': {
      shouldBuildTailwind: false
    }
  }
}
```

Now you are responsible for calling `buildTailwind` and ensuring the resulting tree ends up in your output.

As an example of how you might use this, say you're building a UI component library as an Ember Addon. You want your component library to use Ember CLI Tailwind, but you're using Sass, and you'd like to explicitly `@import` the built `tailwind.css` file in your component library so that you can write other CSS classes that `@extend` Tailwind's classes.

Here's what that would look like:

```js
// index.js
const buildTailwind = require('ember-cli-tailwind/lib/build-tailwind');

module.exports = {
  name: 'your-addon',
  
  options: {
    'ember-cli-tailwind': {
      shouldBuildTailwind: false
    }
  },

  treeForAddonStyles(tree) {
    let trees = tree ? [ tree ] : [];
  
    trees.push(buildTailwind(this));
  
    return new MergeTrees(trees);
  }
};
```

```scss
// addon/styles/addon.scss
@import 'tailwind';

body {
  @extend .antialiased;
  @extend .font-sans;
  @extend .text-grey-darkest;
}
```

You could now even pass Sass variables as Tailwind, since you can set those variables before `@import`'ing Tailwind:

```js
// tailwind/config/colors.js

export default {
  brand: '$brand'
}
```

```scss
$brand: '#3490DC';
@import 'tailwind';
```
