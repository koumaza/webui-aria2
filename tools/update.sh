#!/usr/bin/env bash

git rev-parse HEAD > docs/current-commit
git config --global user.email  "$(git log -1 --pretty=format:'%ae')"
git config --global user.name   "$(git log -1 --pretty=format:'%an')"
git add -A
#! git status -suno|tr -d '\n'|grep -E '^ M docs/current-commit$' || exit 0
BEFORE_EMAIL="$(git log -1 --pretty=format:'%ae')"
BEFORE_NAME="$(git log -1 --pretty=format:'%an')"
BEFORE_COMMITMSG=$(git log --format=%B -n 1)
HEADHASH=$(git rev-parse HEAD)
git reset --soft 'HEAD^'
git commit -F- <<EOF
$BEFORE_COMMITMSG

[DOCS UPDATED] $HEADHASH
$BEFORE_NAME <$BEFORE_EMAIL>
EOF
git remote set-url origin https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_ACTOR}/webui-aria2-electron.git
git push --force
