package tech.notifly.rn

import android.util.Log
import android.content.Context

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule

import tech.notifly.Notifly
import tech.notifly.NotiflyControlToken
import tech.notifly.NotiflySdkType
import tech.notifly.push.interfaces.INotificationClickEvent
import tech.notifly.push.interfaces.INotificationClickListener

var isNativeNotificationClickListenerRegistered = false

class NotiflyControlTokenImpl : NotiflyControlToken

class NotiflySdkModule internal constructor(private val reactContext: ReactApplicationContext) :
  NotiflySdkSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun initialize(projectId: String, username: String, password: String, promise: Promise) {
    try {
      val context: Context = reactContext.currentActivity ?: reactContext.applicationContext

      Notifly.setSdkType(NotiflyControlTokenImpl(), NotiflySdkType.REACT_NATIVE)
      Notifly.setSdkVersion(
        NotiflyControlTokenImpl(),
        "3.2.0"
      )

      Notifly.initialize(context, projectId, username, password)

      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun setUserId(userId: String?, promise: Promise) {
    try {
      Notifly.setUserId(reactContext, userId)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun setUserProperties(params: ReadableMap, promise: Promise) {
    try {
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
    params: ReadableMap?,
    segmentationEventParamKeys: ReadableArray?,
    promise: Promise
  ) {
    try {
      val mapParams = params?.toHashMap() ?: emptyMap<String, Any?>()
      val listKeys = segmentationEventParamKeys?.toArrayList()?.map { it.toString() }
      Notifly.trackEvent(
        reactContext,
        eventName,
        mapParams,
        listKeys,
      )
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }

  }

  @ReactMethod
  override fun setLogLevel(logLevel: Int, promise: Promise) {
    try {
      Notifly.setLogLevel(logLevel)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun disableInAppMessage(promise: Promise) {
    try {
      Notifly.disableInAppMessage()
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun addNotificationClickListener(promise: Promise) {
    if (isNativeNotificationClickListenerRegistered) {
      promise.resolve(null)
      return
    }
    try {
      Notifly.addNotificationClickListener(object : INotificationClickListener {
        override fun onClick(event: INotificationClickEvent) {
          Log.d("NotiflyRNSdk", "Notification clicked")
          sendEvent(
            "Notifly#NotificationClicked",
            NotiflySdkUtils.convertHashMapToWritableMap(
              NotiflySdkUtils.convertNotificationClickEventToMap(event)
            )
          )
        }
      })
      isNativeNotificationClickListenerRegistered = true
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  private fun sendEvent(eventName: String, params: Any) {
    Log.d("NotiflyRNSdk", "Sending event $eventName with params $params")
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  companion object {
    const val NAME = "NotiflyReactNativeSdk"
  }
}
