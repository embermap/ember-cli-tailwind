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

## Configuration

**shouldIncludeStyleguide**

Ember CLI Tailwind ships with a styleguide that can be added to the host application's router at the `/tailwind` URL.

The config option `ENV['ember-cli-tailwind'].shouldIncludeStyleguide` determines whether this styleguide is included. By default, it is `false` in the `production` environment, and `true` otherwise.

You can overwrite it to change this default behavior.
