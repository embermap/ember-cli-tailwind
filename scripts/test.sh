#!/bin/bash
 ./scripts/parallel --tag <<EOF
yarn test:browser
cd test-projects/sample-addon && yarn test
EOF
