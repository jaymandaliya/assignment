import WidgetKit
import SwiftUI

// MARK: - Custom Color Extension
extension Color {
    static let brightCyan = Color(red: 0/255, green: 220/255, blue: 220/255)
}

// MARK: - Main Widget Bundle
@main
struct FoodOrderWidgets: WidgetBundle {
    var body: some Widget {
        if #available(iOS 16.1, *) {
            WidgetFoodOrder()
        }
    }
}

// MARK: - Lock Screen View
struct LockScreenView: View {
    let context: ActivityViewContext<FoodOrderAttributes>
    var body: some View {
        VStack(alignment: .center) {
            ContentView(context: context)
            ActionButtontView(context: context)
        }
        .padding()
    }
}

// MARK: - Main Content View
struct ContentView: View {
    let context: ActivityViewContext<FoodOrderAttributes>
    
    var body: some View {
        VStack(alignment: .leading) {
            Text(context.attributes.title)
                .foregroundColor(.white)
                .font(.headline)
            Text(context.state.mesage)
                .foregroundColor(.white)
                .font(.caption)
        }
    }
}

// MARK: - Icon View Example
struct IconPlayView: View {
    var body: some View {
        HStack {
            Image(systemName: "takeoutbag.and.cup.and.straw")
                .foregroundColor(.brightCyan)
        }
    }
}

// MARK: - Action Button View with Icon Left, Text Right
struct ActionButtontView: View {
    let context: ActivityViewContext<FoodOrderAttributes>

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: "takeoutbag.and.cup.and.straw")
                .foregroundColor(.brightCyan)
                .padding(8)
                .background(Color.black.opacity(0.2))
                .clipShape(Circle())
            
            VStack(alignment: .leading, spacing: 2) {
                Text(context.attributes.title)
                    .foregroundColor(.white)
                    .font(.headline)
                
                Text("8 min")
                    .foregroundColor(.gray)
                    .font(.caption)
            }
        }
    }
}

// MARK: - Compact Leading View
struct CompactLeadingView: View {
    let context: ActivityViewContext<FoodOrderAttributes>
    
    var body: some View {
        HStack {
            NetworkImage(url: URL(string: context.attributes.image))
                .frame(width: 30, height: 30)
                .cornerRadius(30)
            Text(context.attributes.title)
                .foregroundColor(.white)
                .font(.caption2)
        }
        .padding(.leading, 5)
    }
}

// MARK: - Compact Trailing View (only one icon, no red cancel)
struct CompactTrailingView: View {
    var body: some View {
        HStack {
            Link(destination: URL(string: "dynamicisland://order")!, label: {
                HStack {
                    Image(systemName: "takeoutbag.and.cup.and.straw")
                        .foregroundColor(.white)
                        .padding(5)
                }
                .background(Color.brightCyan)
                .clipShape(Capsule())
            })
        }
    }
}

// MARK: - Minimal View
struct MinimalView: View {
    let context: ActivityViewContext<FoodOrderAttributes>
    var body: some View {
        NetworkImage(url: URL(string: context.attributes.image))
            .frame(width: 30, height: 30)
            .cornerRadius(30)
    }
}

// MARK: - Leading View
struct LeadingView: View {
    let context: ActivityViewContext<FoodOrderAttributes>
    var body: some View {
        NetworkImage(url: URL(string: context.attributes.image))
            .frame(width: 90, height: 90)
            .cornerRadius(16)
    }
}

// MARK: - Image Loader
struct NetworkImage: View {
    let url: URL?
    
    var body: some View {
        Group {
            if let url = url,
               let imageData = try? Data(contentsOf: url),
               let uiImage = UIImage(data: imageData) {
                Image(uiImage: uiImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
            } else {
                Image("placeholder-image")
            }
        }
    }
}

// MARK: - Widget Config
struct WidgetFoodOrder: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FoodOrderAttributes.self) { context in
            LockScreenView(context: context)
        } dynamicIsland: { context in
    DynamicIsland {
        DynamicIslandExpandedRegion(.center) {
            VStack(alignment: .leading, spacing: 8) {
                // Top Row: Icon + Title + Price
                HStack {
                    HStack(spacing: 8) {
                        Image(systemName: "takeoutbag.and.cup.and.straw")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 20, height: 20)
                            .foregroundColor(.brightCyan)
                        VStack(alignment: .leading, spacing: 2) {
                            Text("BurgerHouse")
                                .foregroundColor(.white)
                                .font(.subheadline)
                            Text("Cheeseburger Menu x2")
                                .foregroundColor(.gray)
                                .font(.caption)
                        }
                    }

                    Spacer()

                    Text("$19.90")
                        .foregroundColor(.white)
                        .font(.headline)
                }

                // Progress Bar + Labels
                VStack(spacing: 6) {
                    ProgressView(value: 0.4)
                        .progressViewStyle(LinearProgressViewStyle(tint: .brightCyan))
                        .scaleEffect(x: 1, y: 2, anchor: .center)

                    HStack {
                        Text("Preparing")
                        Spacer()
                        Text("On the Way")
                        Spacer()
                        Text("At the Address")
                        Spacer()
                        Text("Delivered")
                    }
                    .foregroundColor(.gray)
                    .font(.caption2)
                }

                // Driver ETA Row
                HStack(spacing: 10) {
                    NetworkImage(url: URL(string: context.attributes.image))
                        .frame(width: 32, height: 32)
                        .clipShape(Circle())

                    VStack(alignment: .leading, spacing: 2) {
                        Text("Kadir’s ETA")
                            .foregroundColor(.white)
                            .font(.caption)
                        Text("8 min")
                            .foregroundColor(.brightCyan)
                            .font(.headline)
                    }

                    Spacer()

                    HStack(spacing: 12) {
                        Circle()
                            .fill(Color.white.opacity(0.1))
                            .frame(width: 32, height: 32)
                            .overlay(Image(systemName: "message.fill").foregroundColor(.white))

                        Circle()
                            .fill(Color.brightCyan)
                            .frame(width: 32, height: 32)
                            .overlay(Image(systemName: "phone.fill").foregroundColor(.white))
                    }
                }
            }
            .padding(.horizontal)
        }

        // Compact & Minimal can remain the same:
        DynamicIslandExpandedRegion(.leading) { EmptyView() }
        DynamicIslandExpandedRegion(.trailing) { EmptyView() }
    } compactLeading: {
        CompactLeadingView(context: context)
    } compactTrailing: {
        CompactTrailingView()
    } minimal: {
        MinimalView(context: context)
    }
    .keylineTint(.yellow)
}

    }
}

// MARK: - Preview
struct WidgetFoodOrder_Previews: PreviewProvider {
    static var previews: some View {
        IconPlayView()
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
