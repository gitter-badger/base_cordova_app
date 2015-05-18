#!/bin/sh
sh compile_debug.sh &&
sh build_debug_ios.sh &&
(cd ../cordova && cordova emulate ios)