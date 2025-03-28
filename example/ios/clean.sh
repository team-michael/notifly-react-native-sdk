#!/bin/bash
#pod cache clean notifly_sdk --all
#rm -rf ~/Library/Caches/CocoaPods
#rm -rf Pods
#rm -rf Podfile.lock
#sudo rm -rf ~/Library/Developer/Xcode/DerivedData/*
#pod repo update
rm -rf ~/Library/Caches/CocoaPods Pods ~/Library/Developer/Xcode/DerivedData/*; pod deintegrate; pod setup;
bundle install && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install --repo-update
