#!/bin/bash

FILENAME=$1

BASEDIR=./copy/base/entities
APIDIR=./src/apis/$FILENAME/entities

cp -R $BASEDIR $APIDIR
mv $APIDIR/base.entity.ts $APIDIR/$FILENAME.entity.ts