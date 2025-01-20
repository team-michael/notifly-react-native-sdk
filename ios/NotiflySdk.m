#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NotiflyReactNativeSdk, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString)projectId withUsername:(NSString)username withPassword:(NSString)password withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserId:(NSString _Nullable)userId withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserProperties:(NSString)userProperties withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setEmail:(NSString)email withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setPhoneNumber:(NSString)phoneNumber withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setTimezone:(NSString)timezone withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(trackEvent:(NSString)eventName withEventParams:(NSString _Nullable)eventParams withSegmentationEventParamKeys:(NSArray _Nullable)segmentationEventParamKeys withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getNotiflyUserId:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(disableInAppMessage:
    (RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(registerFCMToken:(NSString)token withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)  
    
+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
