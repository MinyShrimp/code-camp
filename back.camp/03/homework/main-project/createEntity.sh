#!/bin/bash

FILENAME=$1

BASEDIR=./file/src/apis/base
APIDIR=./src/apis

cp -R $BASEDIR $APIDIR/$FILENAME
mv $APIDIR/$FILENAME/entities/base.entity.ts $APIDIR/$FILENAME/entities/$FILENAME.entity.ts
