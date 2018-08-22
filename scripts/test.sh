#!/bin/bash
 ./scripts/parallel --tag <<EOF
yarn test:browser
cd test-apps/basic-addon && yarn test
EOF
