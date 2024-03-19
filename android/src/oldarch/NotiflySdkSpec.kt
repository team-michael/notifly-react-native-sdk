package tech.notifly.rn

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise

abstract class NotiflySdkSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun initialize(projectId: String, username: String, password: String, promise: Promise)
  abstract fun setUserId(userId: String?, promise: Promise)
  abstract fun setUserProperties(params: ReadableMap, promise: Promise)
  abstract fun trackEvent(
    eventName: String,
    params: ReadableMap?,
    segmentationEventParamKeys: ReadableArray?,
    promise: Promise,
  )
  abstract fun setLogLevel(logLevel: Int, promise: Promise)
  abstract fun disableInAppMessage(promise: Promise)
  abstract fun addNotificationClickListener(promise: Promise)
}
