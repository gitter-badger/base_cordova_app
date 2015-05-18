#!/bin/sh

# update android sdk
android update sdk -u

# create cordova application
# See more at http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-Line%20Interface

cordova create base.cordova.com base.cordova.com BasicCordovaApplication

# create rad-js project
# See more at https://github.com/mobidevpublisher/RAD.JS/blob/master/docs/tutorial.md

rad create rad_project
rad update

#keysign android

(cd /cordova/ && cordova build android --release)

cd /cordova/platforms/android/ant-build/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1-keystore ../resources/my_app.keystore Cordova-release-unsigned.apk base.cordova.com
zipalign -v 4 Cordova-release-unsigned.apk base.cordova.com.apk