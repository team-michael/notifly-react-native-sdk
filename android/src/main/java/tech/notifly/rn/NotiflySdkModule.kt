package tech.notifly.rn

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import tech.notifly.Notifly
import tech.notifly.push.interfaces.INotificationClickEvent
import tech.notifly.push.interfaces.INotificationClickListener
import tech.notifly.sdk.NotiflySdkControlToken
import tech.notifly.sdk.NotiflySdkWrapperType

var isNativeNotificationClickListenerRegistered = false

class NotiflyControlTokenImpl : NotiflySdkControlToken

class NotiflySdkModule internal constructor(private val reactContext: ReactApplicationContext) :
        NotiflySdkSpec(reactContext) {

  private val moduleScope = CoroutineScope(Dispatchers.Default)

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun initialize(projectId: String, username: String, password: String, promise: Promise) {
    try {
      val context: Context = reactContext.currentActivity ?: reactContext.applicationContext

      Notifly.setSdkType(NotiflyControlTokenImpl(), NotiflySdkWrapperType.REACT_NATIVE)
      Notifly.setSdkVersion(NotiflyControlTokenImpl(), "4.0.0-beta.2")

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
  override fun getNotiflyUserId(promise: Promise) {
    moduleScope.launch {
      try {
        val notiflyUserId = withContext(Dispatchers.IO) { Notifly.getNotiflyUserId(reactContext) }
        promise.resolve(notiflyUserId)
      } catch (e: Exception) {
        promise.reject(e)
      }
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
  override fun setEmail(email: String, promise: Promise) {
    Notifly.setEmail(reactContext, email)
    promise.resolve(null)
  }

  @ReactMethod
  override fun setPhoneNumber(phoneNumber: String, promise: Promise) {
    Notifly.setPhoneNumber(reactContext, phoneNumber)
    promise.resolve(null)
  }

  @ReactMethod
  override fun setTimezone(timezone: String, promise: Promise) {
    Notifly.setTimezone(reactContext, timezone)
    promise.resolve(null)
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
  override fun setLogLevel(logLevel: Double, promise: Promise) {
    try {
      Notifly.setLogLevel(logLevel.toInt())
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
      Notifly.addNotificationClickListener(
              object : INotificationClickListener {
                override fun onClick(event: INotificationClickEvent) {
                  Log.d("NotiflyRNSdk", "Notification clicked")
                  sendEvent(
                          "Notifly#NotificationClicked",
                          NotiflySdkUtils.convertHashMapToWritableMap(
                                  NotiflySdkUtils.convertNotificationClickEventToMap(event)
                          )
                  )
                }
              }
      )
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
