# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.2] - 2025-12-01

### Changed

- Bump iOS SDK to 2.2.0 that resolves race conditions between APNs/FCM token publisher, promise, and timeout, preventing rare runtime crashes.
- Ensure consistent token state updates during APNs/FCM registration and eliminate duplicate completion paths.

## [4.0.1] - 2025-11-21

### Changed

- Bump Android SDK to 1.18.6 that forces software rendering for in-app message WebView to avoid hardware acceleration issues on Samsung Galaxy S25 Edge device family.

## [4.0.0] - 2025-11-06

### Added
- Support react native new architecture.

## [3.10.1] - 2025-07-16

### Added
- Add `templateName` event params to in_app_message_show

## [3.10.0] - 2025-06-10

### Added

- Force software rendering for in-app message WebView to avoid hardware acceleration issues on Samsung Galaxy S25 device family.
- Add event logs when push notification delivery is not successful.

## [3.9.0] - 2025-04-21

### Added

- Support in-app message template with transparent background.

## [3.8.0] - 2025-04-03

### Added

- Fix Cocoapods minimum deployment target mismatch issue.
- Change iOS deployment targets to 13.0.
- Disable hardware acceleration for NotiflyWebView on Android.
- Added timeout for image loading from FCMBroadcastReceiver on Android.

## [3.7.0] - 2025-01-20

- Add `getNotiflyUserId()` method to get Notifly user ID.
