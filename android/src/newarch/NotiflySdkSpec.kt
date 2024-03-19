package tech.notifly.rn

import com.facebook.react.bridge.ReactApplicationContext

abstract class NotiflySdkSpec internal constructor(context: ReactApplicationContext) :
  NativeNotiflySdkSpec(context) {
}
