#!/bin/sh

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31mâœ˜ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "\e[32mâœ” ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

# ============================================== Functions

echo '[Installing]';
echo 'Node version:' `node -v`
echo 'Installing RAD.js command line tool …'
npm install -g rad-cli
echo 'Installing cordova …'
npm install -g cordova
echo 'Installing bower …'
npm install bower -g
echo 'Bower version:' `bower -v`
echo 'Installing gulp …'
npm install gulp -g
echo 'Gulp CLI version:' `bower -v`
echo 'Installing RAD.JS …'
npm install -g rad-cli
echo 'RAD.JS CLI version:' `rad -V`
echo 'Installing npm dependencies …'
(cd ../toolbox && npm update)
echo 'Installing bower dependencies …'
(cd ../toolbox && bower update)
echo '[Complete]';