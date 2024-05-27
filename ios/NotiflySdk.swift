import Foundation
import notifly_sdk

@objc(NotiflyReactNativeSdk)
class NotiflyReactNativeSdk: NSObject {
    @objc(initialize:withUsername:withPassword:withResolver:withRejecter:)
    func initialize(projectId: String, username: String, password: String, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
        Notifly.setSdkType(type: "react_native")
        Notifly.setSdkVersion(version: "3.4.0") // TODO: get version from package.json
        Notifly.initialize(projectId: projectId, username: username, password: password)
        resolve(nil)
    }

    @objc(setUserId:withResolver:withRejecter:)
    func setUserId(userId: String?, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
        Notifly.setUserId(userId: userId)
        resolve(nil)
    }

    @objc(setUserProperties:withResolver:withRejecter:)
    func setUserProperties(userProperties: [String: Any], resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
        Notifly.setUserProperties(userProperties: userProperties)
        resolve(nil)
    }

    @objc(trackEvent:withEventParams:withSegmentationEventParamKeys:withResolver:withRejecter:)
    func trackEvent(eventName: String,
                    eventParams: [String: Any]?, segmentationEventParamKeys: [String]?,
                    resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock)
    {
        Notifly.trackEvent(eventName: eventName, eventParams: eventParams, segmentationEventParamKeys: segmentationEventParamKeys)
        resolve(nil)
    }

    @objc(disableInAppMessage:rejecter:)
    func disableInAppMessage(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        Notifly.disableInAppMessage()
        resolve(nil)
    }

    @objc(registerFCMToken:withResolver:withRejecter:)
    func registerFCMToken(token: String, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
        Notifly.registerFCMToken(token: token)
        resolve(nil)
    }
}
