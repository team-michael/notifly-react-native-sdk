#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import "AppDelegate.h"
#import "notifly_sdk-Swift.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.moduleName = @"NotiflySdkExample";
  self.initialProps = @{};
  [FIRApp configure];
  
  /* Required */

  UNUserNotificationCenter *center =
      [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  // authorization - push
  dispatch_async(dispatch_get_main_queue(), ^{

  [center requestAuthorizationWithOptions:(UNNotificationPresentationOptionBanner |
                                           UNAuthorizationOptionAlert |
                                           UNAuthorizationOptionSound |
                                           UNAuthorizationOptionBadge)
                        completionHandler:^(BOOL granted,
                                            NSError *_Nullable error) {
        [[UIApplication sharedApplication] registerForRemoteNotifications];
                          [application registerForRemoteNotifications];
                        }];
  });

  /* Required */

  

  [Notifly initializeWithProjectID:@"b80c3f0e2fbd5eb986df4f1d32ea2871"
                          username:@"minyong"
                          password:@"000000"];
  [Notifly setUserIdWithUserId:@"daeseong-objc2"];
  [Notifly setUserPropertiesWithUserProperties:@{@"kim" : @"ds"}];
  [Notifly trackEventWithEventName:@"kimdaeseong"
                       eventParams:@{@"platform" : @"ios", @"source" : @"objc"}
        segmentationEventParamKeys:@[ @"source" ]];

  
//
  return [super application:application
      didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application
    didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [Notifly application:application
      didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
      NSLog(@"😋 deviceToken : %@", deviceToken);
  [Notifly application:application
      didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo
          fetchCompletionHandler:
              (void (^)(UIBackgroundFetchResult))completionHandler {
  [Notifly application:application didReceiveRemoteNotification:userInfo];
  completionHandler(UIBackgroundFetchResultNoData);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:
             (void (^)(UNNotificationPresentationOptions))completionHandler {
  NSLog(@"FOREGROUND PUSH😀");
  completionHandler((UNNotificationPresentationOptionList | UNNotificationPresentationOptionBanner | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound));

   [Notifly userNotificationCenter:center
                       willPresent:notification
             withCompletionHandler:completionHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
    didReceiveNotificationResponse:(UNNotificationResponse *)response
             withCompletionHandler:(void (^)(void))completionHandler {
  NSLog(@"PUSH PUSH CLICK😀");

  [Notifly userNotificationCenter:center didReceive:response];
//  completionHandler();
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
  return
      [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main"
                                 withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is
/// turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New
/// Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it
/// returns `false`.
- (BOOL)concurrentRootEnabled {
  return true;
}

@end


