import Foundation
import notifly_sdk

@objc(NotiflyReactNativeSdk)
class NotiflyReactNativeSdk: NSObject {
  @objc(initialize:withUsername:withPassword:withResolver:withRejecter:)
  func initialize(
    projectId: String, username: String, password: String, resolve: RCTPromiseResolveBlock,
    reject _: RCTPromiseRejectBlock
  ) {
    Notifly.setSdkType(type: "react_native")
    Notifly.setSdkVersion(version: "4.0.0-beta.2")  // TODO: get version from package.json
    Notifly.initialize(projectId: projectId, username: username, password: password)
    resolve(nil)
  }

  @objc(setUserId:withResolver:withRejecter:)
  func setUserId(userId: String?, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock)
  {
    Notifly.setUserId(userId: userId)
    resolve(nil)
  }

  @objc(getNotiflyUserId:withRejecter:)
  func getNotiflyUserId(resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
    let notiflyUserId = Notifly.getNotiflyUserId()

    if notiflyUserId != nil {
      resolve(notiflyUserId)
    } else {
      resolve(nil)
    }
  }

  @objc(setUserProperties:withResolver:withRejecter:)
  func setUserProperties(
    userProperties: String, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock
  ) {
    guard let parsedUserProperties = NotiflyAnyCodable.parseJsonString(userProperties) else {
      resolve(nil)
      return
    }
    Notifly.setUserProperties(userProperties: parsedUserProperties)
    resolve(nil)
  }

  @objc(setEmail:withResolver:withRejecter:)
  func setEmail(email: String, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock) {
    Notifly.setEmail(email)
    resolve(nil)
  }

  @objc(setPhoneNumber:withResolver:withRejecter:)
  func setPhoneNumber(
    phoneNumber: String, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock
  ) {
    Notifly.setPhoneNumber(phoneNumber)
    resolve(nil)
  }

  @objc(setTimezone:withResolver:withRejecter:)
  func setTimezone(
    timezone: String, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock
  ) {
    Notifly.setTimezone(timezone)
    resolve(nil)
  }

  @objc(trackEvent:withEventParams:withSegmentationEventParamKeys:withResolver:withRejecter:)
  func trackEvent(
    eventName: String,
    eventParams: String?, segmentationEventParamKeys: [String]?,
    resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock
  ) {
    if let stringfiedEventParams = eventParams {
      let parsedEventParams = NotiflyAnyCodable.parseJsonString(stringfiedEventParams)
      Notifly.trackEvent(
        eventName: eventName, eventParams: parsedEventParams,
        segmentationEventParamKeys: segmentationEventParamKeys)
      resolve(nil)
      return
    }

    Notifly.trackEvent(
      eventName: eventName, eventParams: nil,
      segmentationEventParamKeys: segmentationEventParamKeys)
    resolve(nil)
  }

  @objc(disableInAppMessage:rejecter:)
  func disableInAppMessage(
    _ resolve: RCTPromiseResolveBlock, rejecter _: RCTPromiseRejectBlock
  ) {
    Notifly.disableInAppMessage()
    resolve(nil)
  }

  @objc(registerFCMToken:withResolver:withRejecter:)
  func registerFCMToken(
    token: String, resolve: RCTPromiseResolveBlock, reject _: RCTPromiseRejectBlock
  ) {
    Notifly.registerFCMToken(token: token)
    resolve(nil)
  }
}
