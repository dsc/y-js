#! /bin/bash

# usage: bin/build.sh > y.js

CORE_FILES=$(cat<<-"FILES"
    intro
    preamble
    y.core
    y.type
    y.function
    y.collection
    y.object
    y.array
    y.string
    y.number
    y.boolean
    y.regexp
    y.generic
    outro
FILES
)

for name in $CORE_FILES; do
    cat src/core/$name.js
done
