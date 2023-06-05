import Foundation
import notifly_sdk

@objc(NotiflySdk)
class NotiflySdk: NSObject {
    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
    }
    


}
