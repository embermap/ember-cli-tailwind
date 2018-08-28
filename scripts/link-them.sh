#!/bin/bash
# Copied from https://github.com/ef4/ember-auto-import/blob/master/scripts/link-them.sh
set -e

# Scenario 1: Addon using Tailwind
# All packages get a node_modules directory and a .bin link
for package in "sample-app" "sample-addon"; do
    mkdir -p ./test-projects/scenario-1-addon-using-tailwind/$package/node_modules
    pushd ./test-projects/scenario-1-addon-using-tailwind/$package/node_modules > /dev/null
    rm -rf .bin
    ln -s ../../../../node_modules/.bin .bin
    popd > /dev/null
done

# These packages get to depend on ember-cli-tailwind
for package in "sample-addon"; do
    pushd ./test-projects/scenario-1-addon-using-tailwind/$package/node_modules > /dev/null
    rm -rf ./ember-cli-tailwind
    ln -s ../../../.. ./ember-cli-tailwind
    popd > /dev/null
done

# These packages get to depend on our sample-addon
for package in "sample-app"; do
    pushd ./test-projects/scenario-1-addon-using-tailwind/$package/node_modules > /dev/null
    rm -rf ./sample-addon
    ln -s ../../sample-addon ./sample-addon
    popd > /dev/null
done

# Scenario 2: Disabled styleguide
# All packages get a node_modules directory and a .bin link
for package in "sample-addon" "sample-addon-with-tailwind"; do
    mkdir -p ./test-projects/scenario-2-disabled-styleguide/$package/node_modules
    pushd ./test-projects/scenario-2-disabled-styleguide/$package/node_modules > /dev/null
    rm -rf .bin
    ln -s ../../../../node_modules/.bin .bin
    popd > /dev/null
done

# These packages get to depend on ember-cli-tailwind
for package in "sample-addon-with-tailwind"; do
    pushd ./test-projects/scenario-2-disabled-styleguide/$package/node_modules > /dev/null
    rm -rf ./ember-cli-tailwind
    ln -s ../../../.. ./ember-cli-tailwind
    popd > /dev/null
done

# These packages get to depend on sample-addon-with-tailwind
for package in "sample-addon"; do
    pushd ./test-projects/scenario-2-disabled-styleguide/$package/node_modules > /dev/null
    rm -rf ./sample-addon-with-tailwind
    ln -s ../../sample-addon-with-tailwind ./sample-addon-with-tailwind
    popd > /dev/null
done
