package tech.notifly.rn

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import org.json.JSONException

import tech.notifly.push.interfaces.INotificationClickEvent
import tech.notifly.push.interfaces.INotificationClickListener
import tech.notifly.push.interfaces.IPushNotification

object NotiflySdkUtils {
    @Throws(JSONException::class)
    fun convertHashMapToWritableMap(hashMap: HashMap<String, Any>): WritableMap {
        val writableMap: WritableMap = Arguments.createMap()

        for ((key, value) in hashMap) {
            when (value) {
                is String -> writableMap.putString(key, value)
                is Boolean -> writableMap.putBoolean(key, value)
                is Int -> writableMap.putInt(key, value)
                is Double -> writableMap.putDouble(key, value)
                is Float -> writableMap.putDouble(key, value.toDouble())
                is Long -> writableMap.putDouble(key, value.toDouble())
                is HashMap<*, *> -> {
                    @Suppress("UNCHECKED_CAST")
                    writableMap.putMap(key, convertHashMapToWritableMap(value as HashMap<String, Any>))
                }
                else -> writableMap.putNull(key)
            }
        }

        return writableMap
    }

    @Throws(JSONException::class)
    fun convertNotificationClickEventToMap(event: INotificationClickEvent): HashMap<String, Any> {
        val hash = HashMap<String, Any>()

        hash["notification"] = convertNotificationToMap(event.notification)

        return hash
    }

    @Throws(JSONException::class)
    fun convertNotificationToMap(notification: IPushNotification): HashMap<String, Any> {
        val hash = HashMap<String, Any>()

        if (notification.body != null) {
            hash["body"] = notification.body!!
        }
        if (notification.title != null) {
            hash["title"] = notification.title!!
        }
        if (notification.campaignId != null) {
            hash["campaignId"] = notification.campaignId!!
        }
        if (notification.androidNotificationId != null) {
            hash["androidNotificationId"] = notification.androidNotificationId!!
        }
        if (notification.notiflyMessageId != null) {
            hash["notiflyMessageId"] = notification.notiflyMessageId!!
        }
        if (notification.importance != null) {
            hash["importance"] = notification.importance!!.ordinal
        }
        if (notification.url != null) {
            hash["url"] = notification.url!!
        }
        if (notification.imageUrl != null) {
            hash["imageUrl"] = notification.imageUrl!!
        }
        hash["sentTime"] = notification.sentTime
        hash["ttl"] = notification.ttl
        hash["customData"] = notification.customData
        hash["rawPayload"] = notification.rawPayload

        return hash
    }
}
