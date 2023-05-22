package com.notiflysdk

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import tech.notifly.Notifly

class NotiflySdkModule internal constructor(private val reactContext: ReactApplicationContext) :
  NotiflySdkSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  @ReactMethod
  override fun initialize(projectId: String, username: String, password: String, promise: Promise) {
    try {
      Log.d("NotiflySdkModule", "Notifly initialize call")
      Notifly.initialize(reactContext, projectId, username, password)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun setUserId(userId: String?, promise: Promise) {
    try {
      Log.d("NotiflySdkModule", "Notifly setUserId call")
      Notifly.setUserId(reactContext, userId)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun setUserProperties(params: ReadableMap, promise: Promise) {
    try {
      Log.d("NotiflySdkModule", "Notifly setUserProperties call")
      val mapParams = params.toHashMap()
      Notifly.setUserProperties(reactContext, mapParams)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun trackEvent(
    eventName: String,
    eventParams: ReadableMap?,
    segmentationEventParamKeys: ReadableArray?,
    isInternalEvent: Boolean,
    promise: Promise
  ) {
    try {
      Log.d("NotiflySdkModule", "Notifly trackEvent call")
      val mapParams = eventParams?.toHashMap() ?: emptyMap<String, Any?>()
      val listKeys = segmentationEventParamKeys?.toArrayList()?.map { it.toString() }
      Notifly.trackEvent(
        reactContext,
        eventName,
        mapParams,
        listKeys,
        isInternalEvent
      )
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }

  }

  companion object {
    const val NAME = "NotiflySdk"
  }
}
