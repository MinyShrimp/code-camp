#!/bin/bash

FILENAME=$1
mkdir -p ./src/apis/$FILENAME/entities
touch ./src/apis/$FILENAME/entities/$FILENAME.entity.ts