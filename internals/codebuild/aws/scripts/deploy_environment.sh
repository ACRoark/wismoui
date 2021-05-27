#!/usr/bin/env bash

CLOUD_SHELL_DIR=$1
SRC_DIR=$2

source ${CLOUD_SHELL_DIR}/aws/functions/functions.sh || exit 1

deploy_environment $SRC_DIR

