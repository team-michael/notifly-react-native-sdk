#!/bin/bash
rm -rf build Pods Podfile.lock ~/Library/Caches/CocoaPods Pods ~/Library/Developer/Xcode/DerivedData/*
pod cache clean notifly_sdk --all
pod repo update
pod deintegrate
pod setup
bundle install && RCT_NEW_ARCH_ENABLED=0 bundle exec pod install --repo-update
