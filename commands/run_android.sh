#!/bin/sh
sh compile_debug.sh &&
sh build_debug_android.sh &&
adb uninstall base.cordova.com &&
(cd ../cordova && cordova run android)