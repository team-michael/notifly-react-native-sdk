#import "NotiflySdk.h"

@implementation NotiflySdk
RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(double)a withB:(double)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(a * b);

    resolve(result);
}

RCT_REMAP_METHOD(initialize,
                 initializeWithProjectId:(NSString *)projectId 
                 username:(NSString *)username 
                 password:(NSString *)password 
                 withResolver:(RCTPromiseResolveBlock)resolve 
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    // Currently these parameters are not used
    // NSString *projectId = projectId;
    // NSString *username = username;
    // NSString *password = password;

    NSLog(@"[NotiflySdk] initializeWithProjectId: %@, username: %@, password: %@", projectId, username, password);
    // TODO(Notifly): Implement this method

    // Resolve the promise without any value
    resolve(nil);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeNotiflySdkSpecJSI>(params);
}
#endif

@end
