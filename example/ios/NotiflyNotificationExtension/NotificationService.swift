import notifly_sdk_push_extension

class NotificationService: NotiflyNotificationServiceExtension {
    override init() {
        super.init()
        setup()
    }

    func setup() {
        register(projectId: "b80c3f0e2fbd5eb986df4f1d32ea2871", username: "minyong")
    }
    
}
