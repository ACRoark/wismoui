#!/usr/bin/env bash

## trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
        echo "** Trapped CTRL-C"
}

docker run --name=wismoui -v $(pwd)/:/app -p 81:8181 wismoui
