#!/bin/bash

# 移除dist
rm -rf dist

# js打包
webpack -p --progress --color

# 复制静态资源目录
cp -rf src/public dist/public