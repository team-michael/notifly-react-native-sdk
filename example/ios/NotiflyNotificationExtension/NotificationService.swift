import notifly_sdk

class NotificationService: NotiflyNotificationServiceExtension {
    override init() {
        super.init()
        setup()
    }

    func setup() {
        register(projectId: "YOUR_PROJECT_ID", username: "USERNAME")
    }
}
