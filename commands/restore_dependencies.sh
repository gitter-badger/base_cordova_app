#!/bin/bash
echo '[Installing npm and bower dependencies]';
echo 'Installing npm dependencies …'
(cd ../toolbox && npm update)
echo 'Installing bower dependencies …'
(cd ../toolbox && bower update)
echo '[Complete]';