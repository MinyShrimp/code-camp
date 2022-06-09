#! /bash/sh

FILENAME=$1

BASEDIR=./src/apis/$FILENAME

mkdir -p $BASEDIR
touch $BASEDIR/$FILENAME.module.ts
touch $BASEDIR/$FILENAME.service.ts
touch $BASEDIR/$FILENAME.resolver.ts