🛒 Grocery App - Interview Task
This is a React Native project developed as part of an interview task. The app simulates a simple grocery shopping experience, implementing key features from the assignment document and Figma design.

📱 Features Implemented
✅ Home Screen
UI built exactly as per Figma design.

Product highlight animation on press using mock data.

Shared element transition animation to Product Detail screen.

✅ Product Detail Screen
Displays selected product details.

Handles Add to Cart when quantity is 0.

Quantity increment and decrement buttons once added to cart.

Cart animations handled gracefully.

✅ Shared Element Navigation
Seamless transition animation from product on Home Screen to Product Detail.

✅ Redux Toolkit Integration
Cart managed with Redux Toolkit slice.

All cart operations (add, remove, update quantity) handled via slice.

Implemented the assignment logic:

Minimum order amount

Free delivery threshold

Global cart state updates reflected across app.

✅ Add to Cart Animation
Smooth animations for cart icon update and product quantity change.

✅ Track Order Screen
Animated progress bar showing order tracking status.

Clean and interactive animation-based UI.

✅ Enjoy Your Order Screen
Animation-rich "Enjoy Order" screen once the order is completed.

🚧 Pending Feature
❌ Dynamic Island (iOS Only)
Attempted to integrate Dynamic Island with native iOS module bridging, but encountered issues with native module setup within the given time frame.

✅ Feasibility: The integration is definitely possible and I’m confident about completing it with some additional time for proper native module bridging and setup.

📁 Clean Code Standards
Neatly structured folders.

Fully commented for clarity.

Proper componentization and reusable components.

No redundant code.

▶️ Getting Started
🔧 Prerequisites
Node.js >= 14

React Native CLI

Android Studio / Xcode

CocoaPods (for iOS)

npm

🛠️ Installation
git clone https://github.com/jaymandaliya/assignment
cd assignment
npm install
cd ios && pod install
🚀 Running the App

For Android:
npx react-native run-android

For iOS:
npx react-native run-ios
