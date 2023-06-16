import Foundation
import notifly_sdk

@objc(NotiflySdk)
class NotiflySdk: NSObject {
    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
    }
    
    
    @objc(initialize:withUsername:withPassword:withResolver:withRejecter:)
    func initialize(projectId: String, username: String, password: String, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        Notifly.setSdkType(type: "react_native")
        Notifly.setSdkVersion(version: "2.3.4") // TODO: get version from package.json
        Notifly.initialize(projectId: projectId, username: username, password: password)
        resolve(nil)
    }

    @objc(setUserId:withResolver:withRejecter:)
    func setUserId(userId: String?, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        Notifly.setUserId(userId: userId)
        resolve(nil)
    }

    @objc(setUserProperties:withResolver:withRejecter:)
    func setUserProperties(userProperties: [String: Any], resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        Notifly.setUserProperties(userProperties: userProperties)
        resolve(nil)
    }

    @objc(trackEvent:withEventParams:withSegmentationEventParamKeys:withResolver:withRejecter:)
    func trackEvent(eventName: String,
                    eventParams: [String: Any]?, segmentationEventParamKeys: [String]?,
                    resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        Notifly.trackEvent(eventName: eventName, eventParams: eventParams, segmentationEventParamKeys: segmentationEventParamKeys)
        resolve(nil)
    }
}
