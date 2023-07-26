#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NotiflySdk, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(initialize:(NSString)projectId withUsername:(NSString)username withPassword:(NSString)password withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserId:(NSString _Nullable)userId withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserProperties:(NSDictionary)userProperties withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(trackEvent:(NSString)eventName withEventParams:(NSDictionary _Nullable)eventParams withSegmentationEventParamKeys:(NSArray _Nullable)segmentationEventParamKeys withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(disableInAppMessage:
    (RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)
    
+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
