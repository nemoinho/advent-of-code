#!/bin/bash
exec docker run \
    --rm \
    -it \
    -v $PWD:/work \
    -v $HOME/.vimrc:/home/node/.vimrc:ro \
    -v $HOME/.vim:/home/node/.vim:ro \
    -w /work \
    -u 1000:1000 \
    advent-of-code-runtime \
    bash
