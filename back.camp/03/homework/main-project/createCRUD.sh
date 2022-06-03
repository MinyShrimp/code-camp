#! /bash/sh

FILENAME=$1

BASEDIR=./copy/base
APIDIR=./src/apis/$FILENAME
UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${FILENAME:0:1})${FILENAME:1}"

cp -R $BASEDIR $APIDIR
mv $APIDIR/base.module.ts $APIDIR/$FILENAME.module.ts
mv $APIDIR/base.resolver.ts $APIDIR/$FILENAME.resolver.ts
mv $APIDIR/base.service.ts $APIDIR/$FILENAME.service.ts

mv $APIDIR/entities/base.entity.ts $APIDIR/entities/$FILENAME.entity.ts

mv $APIDIR/dto/createBase.input.ts $APIDIR/dto/create$UPPER.input.ts
mv $APIDIR/dto/updateBase.input.ts $APIDIR/dto/update$UPPER.input.ts