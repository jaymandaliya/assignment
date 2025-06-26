import Foundation
import ActivityKit

struct DynamicIslandAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var title: String
        var subtitle: String
        var progress: Double?
        var timestamp: Date
        
        init(title: String, subtitle: String, progress: Double? = nil) {
            self.title = title
            self.subtitle = subtitle
            self.progress = progress
            self.timestamp = Date()
        }
    }
}
