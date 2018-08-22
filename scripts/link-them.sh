#!/bin/bash
 # Copied from https://github.com/ef4/ember-auto-import/blob/master/scripts/link-them.sh
 set -e
 # All packages get a node_modules directory and a .bin link
for package in "basic-addon"; do
    mkdir -p ./test-apps/$package/node_modules
    pushd ./test-apps/$package/node_modules > /dev/null
    rm -rf .bin
    ln -s ../../../node_modules/.bin .bin
    popd > /dev/null
done
 # These packages get to depend on ember-cli-tailwind
for package in "basic-addon"; do
    pushd ./test-apps/$package/node_modules > /dev/null
    rm -rf ./ember-cli-tailwind
    ln -s ../../.. ./ember-cli-tailwind
    popd > /dev/null
done
