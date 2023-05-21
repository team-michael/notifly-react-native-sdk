
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNNotiflySdkSpec.h"

@interface NotiflySdk : NSObject <NativeNotiflySdkSpec>
#else
#import <React/RCTBridgeModule.h>

@interface NotiflySdk : NSObject <RCTBridgeModule>
#endif

@end
