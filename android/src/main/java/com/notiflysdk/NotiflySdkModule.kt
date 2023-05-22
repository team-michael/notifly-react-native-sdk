package com.notiflysdk

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
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

  companion object {
    const val NAME = "NotiflySdk"
  }
}
