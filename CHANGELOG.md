# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.5.0] - 2026-09-21

### Added

- Support server-rendered in-app popup personalization through Android SDK `1.24.0` and iOS SDK `2.8.0`, including Liquid, catalogs, Connected Content, and render-abort handling.
- Forward existing tracked event context through the native SDKs for popup personalization. Static popups keep their existing URL-based behavior, and failed or aborted renders do not fall back to unrendered templates.

### Changed

- Upgrade Android SDK from `1.23.0` to `1.24.0` and iOS SDK from `2.7.0` to `2.8.0`; align the example push extension with iOS `2.8.0`.
- Adopt the native SDKs' shared KMP Core for user ID transitions, state synchronization, merging, and clearing, without adding React Native APIs.
- Inherit the native SDKs' five-second suppression of unchanged `setUserProperties` calls when local in-app messaging state is available. Changed values still send normally, skipped calls do not extend the window, and identity changes reset it.
- Align the package, npm lockfile, and Android/iOS reported wrapper SDK versions at stable `4.5.0`.
- Validate release input against the package version instead of modifying it during publication; build before creating the GitHub release, target the checked-out commit, and publish stable, alpha, beta, and snapshot versions under their respective npm tags.

## [4.5.0-alpha.1] - 2026-09-14

### Changed

- Bump Android SDK to 1.24.0-alpha.1 and iOS SDK to 2.8.0-alpha.1, which integrate the shared KMP Core. No React Native API changes are required.
- Publish alpha builds with the npm `alpha` tag and mark GitHub prereleases without promoting them to `latest`.

## [4.4.0] - 2026-09-07

### Fixed

- Bump Android SDK to 1.23.0: include the current local event in count targeting, generate unique event IDs, and reuse retry payloads.
- Bump iOS SDK to 2.7.0: track events before APNs token registration completes.

## [4.3.0] - 2026-09-02

### Fixed

- Bump Android SDK to 1.22.0: derive anonymous Notifly user IDs from the project ID and stable Android device ID instead of a nullable or rotating FCM token.

## [4.2.0] - 2026-06-15

### Changed

- Bump Android SDK to 1.21.0: ad push opt-out ("수신거부") area in expanded notifications.
- Bump iOS SDK to 2.6.0: ad push opt-out ("수신거부") action on notification long-press.

## [4.1.1] - 2026-06-10

### Fixed

- Bump iOS SDK to 2.5.1: fix an APNs → FCM token acquisition ordering race on cold start where the FCM token could be requested before the APNs token was associated, registering a stale/unassociated token and driving repeated token re-acquisition.

## [4.1.0] - 2026-06-02

### Changed

- Bump Android SDK to 1.20.0: real-time campaign sync via SSE channel.
- Bump iOS SDK to 2.5.0: real-time campaign sync via SSE channel.

## [4.0.4] - 2026-05-12

### Fixed

- Bump Android SDK to 1.19.3: fix pending commands remaining queued when `setUserId` is queued before `setUserProperties` on cold start.

## [4.0.3] - 2026-02-26

### Changed

- Bump Android SDK to 1.19.0: support cancellation conditions for in-app message campaigns.
- Bump iOS SDK to 2.3.0: support cancellation conditions for in-app message campaigns.

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
