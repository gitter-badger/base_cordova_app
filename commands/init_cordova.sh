#!/bin/sh
cd ../cordova

cordova platform add ios
cordova platform add android
cordova platform add browser --usegit

#cordova org.apache.cordova.battery-status
cordova org.apache.cordova.camera
cordova org.apache.cordova.console
cordova org.apache.cordova.device
#cordova org.apache.cordova.device-motion
#cordova org.apache.cordova.device-orientation
cordova org.apache.cordova.dialogs
#cordova org.apache.cordova.file
#cordova org.apache.cordova.file-transfer
#cordova org.apache.cordova.geolocation
#cordova org.apache.cordova.globalization
#cordova org.apache.cordova.inappbrowser
#cordova org.apache.cordova.media
#cordova org.apache.cordova.media-capture
cordova org.apache.cordova.network-information
#cordova org.apache.cordova.splashscreen
#cordova org.apache.cordova.statusbar
#cordova org.apache.cordova.vibration
