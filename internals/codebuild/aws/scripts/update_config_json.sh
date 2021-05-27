#!/usr/bin/env bash

CLOUD_SHELL_DIR=$1

source ${CLOUD_SHELL_DIR}/aws/functions/functions.sh || exit 1

update_environment 
