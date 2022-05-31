#! /bash/sh

FILENAME=$1

BASEDIR=./src/apis/$FILENAME

mkdir -p $BASEDIR
touch $BASEDIR/$FILENAME.module.ts
touch $BASEDIR/$FILENAME.service.ts
touch $BASEDIR/$FILENAME.resolver.ts

UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${FILENAME:0:1})${FILENAME:1}"
mkdir -p $BASEDIR/dto
touch $BASEDIR/dto/create$UPPER.input.ts
touch $BASEDIR/dto/update$UPPER.input.ts