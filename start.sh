#!/bin/bash
# Script used as start script in cloud foundry
set -e -u
OIDC="$(echo $VCAP_SERVICES | jq '.[][] | select(.tags[] | contains("oauth2")) | .credentials')"
APP_CONFIG="{ "\"oidc"\":$OIDC, "\"serverUrl"\": "\"$SERVER_URL"\" }"

jq -n "{
oidc: $OIDC,
serverUrl: \"$SERVER_URL\"
}" > $HOME/public/conf.json

sh $HOME/boot.sh

