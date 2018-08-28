#!/bin/bash
./scripts/parallel --tag <<EOF
yarn test:browser
cd test-projects/scenario-1-app-using-tailwind/sample-app && yarn test
cd test-projects/scenario-2-addon-using-tailwind/sample-addon && yarn test
cd test-projects/scenario-2-addon-using-tailwind/sample-app && yarn test
cd test-projects/scenario-3-disabled-styleguide/sample-addon && yarn test
cd test-projects/scenario-3-disabled-styleguide/sample-addon-with-tailwind && yarn test
EOF
