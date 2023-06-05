#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <UserNotifications/uNUserNotificationCenter.h>
#import "AppDelegate.h"
#import "notifly_sdk-Swift.h"

#import <React/RCTLinkingManager.h> // for linking

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.moduleName = @"NotiflySdkExample";
  self.initialProps = @{};
  [FIRApp configure];
  
  /* Required */
  
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  [[UIApplication sharedApplication] registerForRemoteNotifications];
  
  /* Required */
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [Notifly application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [Notifly application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application
didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [Notifly application:application didReceiveRemoteNotification:userInfo];
  completionHandler(UIBackgroundFetchResultNoData);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler {
  [Notifly userNotificationCenter:center didReceive:response];
  completionHandler();
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
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


