import WidgetKit
import SwiftUI
import ActivityKit

struct DynamicIslandWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: DynamicIslandAttributes.self) { context in
            // Lock screen/banner UI when not on Dynamic Island
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Image(systemName: "music.note.circle.fill")
                        .foregroundColor(.blue)
                        .font(.title2)
                    
                    VStack(alignment: .leading) {
                        Text(context.state.title)
                            .font(.headline)
                            .fontWeight(.semibold)
                        Text(context.state.subtitle)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    Spacer()
                }
                
                if let progress = context.state.progress {
                    ProgressView(value: progress, total: 1.0)
                        .progressViewStyle(LinearProgressViewStyle(tint: .blue))
                        .scaleEffect(x: 1, y: 0.6)
                }
            }
            .padding(16)
            .background(Color(.systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 20))
            .shadow(radius: 8)
            
        } dynamicIsland: { context in
            DynamicIsland {
                // EXPANDED STATE - When user long presses
                DynamicIslandExpandedRegion(.leading) {
                    HStack(spacing: 8) {
                        Image(systemName: "music.note.circle.fill")
                            .foregroundColor(.blue)
                            .font(.title2)
                        
                        VStack(alignment: .leading, spacing: 2) {
                            Text(context.state.title)
                                .font(.caption)
                                .fontWeight(.semibold)
                                .foregroundColor(.white)
                            Text(context.state.subtitle)
                                .font(.caption2)
                                .foregroundColor(.gray)
                        }
                    }
                }
                
                DynamicIslandExpandedRegion(.trailing) {
                    HStack(spacing: 12) {
                        Button(action: {}) {
                            Image(systemName: "backward.fill")
                                .font(.caption)
                                .foregroundColor(.white)
                        }
                        Button(action: {}) {
                            Image(systemName: "pause.circle.fill")
                                .font(.title3)
                                .foregroundColor(.blue)
                        }
                        Button(action: {}) {
                            Image(systemName: "forward.fill")
                                .font(.caption)
                                .foregroundColor(.white)
                        }
                    }
                }
                
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(spacing: 8) {
                        if let progress = context.state.progress {
                            HStack {
                                Text("0:00")
                                    .font(.caption2)
                                    .foregroundColor(.gray)
                                Spacer()
                                Text("\(Int(progress * 100))%")
                                    .font(.caption2)
                                    .foregroundColor(.gray)
                                Spacer()
                                Text("3:45")
                                    .font(.caption2)
                                    .foregroundColor(.gray)
                            }
                            
                            ProgressView(value: progress, total: 1.0)
                                .progressViewStyle(LinearProgressViewStyle(tint: .blue))
                                .scaleEffect(x: 1, y: 0.8)
                        }
                    }
                    .padding(.horizontal)
                }
                
            } compactLeading: {
                // COMPACT LEADING - Left side when minimized
                Image(systemName: "music.note.circle.fill")
                    .foregroundColor(.blue)
                    .font(.body)
                
            } compactTrailing: {
                // COMPACT TRAILING - Right side when minimized  
                HStack(spacing: 4) {
                    if let progress = context.state.progress {
                        ProgressView(value: progress, total: 1.0)
                            .progressViewStyle(LinearProgressViewStyle(tint: .blue))
                            .frame(width: 20)
                            .scaleEffect(0.8)
                    }
                    Text(context.state.title.prefix(8))
                        .font(.caption2)
                        .fontWeight(.medium)
                        .foregroundColor(.white)
                }
            } minimal: {
                // MINIMAL STATE - Single dot when multiple activities
                Image(systemName: "music.note")
                    .foregroundColor(.blue)
                    .font(.caption)
            }
        }
    }
}

@main
struct DynamicIslandWidgetBundle: WidgetBundle {
    var body: some Widget {
        DynamicIslandWidget()
    }
}
