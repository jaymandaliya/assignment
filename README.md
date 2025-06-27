# 🛒 Assignment - React Native

A feature-rich React Native grocery shopping application built as an interview task, implementing modern UI/UX patterns with smooth animations and state management.

## 📱 App Overview

This grocery app provides a complete shopping experience with product browsing, cart management, order tracking, and delivery status updates. Built with React Native and Redux Toolkit for optimal performance and user experience.

Screen recordings for both iOS and Android platforms are attached.
Link to screen recordings and screenshots: https://we.tl/t-Wott0PxgyK

Screen recording attached for both platform iOS. & Android.

## ✨ Key Features

### 🏠 **Home Screen**
- **Pixel-perfect UI** built according to Figma design specifications
- **Product highlight animation** on press with smooth transitions
- **Shared element transitions** to Product Detail screen
- **Mock data integration** for seamless product browsing

### 🛍️ **Product Detail Screen**
- **Comprehensive product information** display
- **Smart cart handling**: Add to Cart button when quantity is 0
- **Quantity controls**: Increment/decrement buttons after adding to cart
- **Smooth cart animations** for better user feedback

### 🛒 **Cart Management**
- **Redux Toolkit integration** for global state management
- **Real-time cart updates** reflected across the entire app
- **Business logic implementation**:
  - Minimum order amount validation
  - Free delivery threshold calculation
  - Dynamic cart total updates

### 📦 **Order Tracking**
- **Animated progress bar** showing real-time order status
- **Interactive tracking interface** with smooth transitions
- **Multiple order states** (Confirmed, Prepared, On the way, Delivered)

### 🎉 **Order Completion**
- **"Enjoy Your Order" screen** with rich animations
- **Celebration animations** for completed orders
- **Smooth transition flow** from tracking to completion

## 🏗️ Architecture & Code Standards

### 📂 **Project Structure**
```
app/
├── assets/              # Images, icons, fonts, and static files
├── components/          # Reusable UI components
├── navigator/           # Navigation configuration
│   └── index.js        # Main navigation entry point
├── reducers/           # Redux slices and reducers
├── screens/            # Screen components organized by feature
│   ├── delivered/      # Order completion screens
│   ├── orderDetail/    # Order viewing and tracking
│   ├── productDetail/  # Product information screens
│   ├── products/       # Home screen and product listing
│   └── trackOrder/     # Order tracking interface
├── store/              # Redux store configuration
└── theme/              # Centralized styling constants
```

### 🎨 **Design System**
- **SVG icons** instead of PNGs for better performance and scalability
- **Centralized theming** with consistent colors, fonts, and spacing
- **Responsive design** that works across different screen sizes
- **Accessibility considerations** built into components

### 💻 **Code Quality**
- ✅ **Clean architecture** with proper separation of concerns
- ✅ **Comprehensive commenting** for better code understanding
- ✅ **Reusable components** to minimize code duplication
- ✅ **Consistent naming conventions** throughout the project
- ✅ **No redundant code** - optimized for performance

## 🚀 Technical Implementation

### **Navigation**
- **Shared Element Transitions** between screens
- **Smooth animations** for better user experience
- **Proper navigation stack** management

### **State Management**
- **Redux Toolkit** for predictable state updates
- **Centralized cart logic** with proper action handling
- **Persistent state** across app navigation

### **Animations**
- **Custom animations** for cart interactions
- **Progress bar animations** for order tracking
- **Smooth transitions** between different app states

## 🔧 Getting Started

### **Prerequisites**
- Node.js >= 14
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/jaymandaliya/assignment
cd assignment
```

2. **Install dependencies**
```bash
npm install
```

3. **iOS Setup**
```bash
cd ios && pod install && cd ..
```

### **Running the Application**

**For Android:**
```bash
npx react-native run-android
```

**For iOS:**
```bash
npx react-native run-ios
```

## 📱 Screen Walkthroughs

### **1. Products Screen (Home)**
- Browse available grocery products
- Smooth product highlighting on interaction
- Quick access to product details

### **2. Product Details Screen**
- Detailed product information
- Add to cart functionality
- Quantity management controls

### **3. Cart Management**
- View selected items
- Update quantities
- Calculate totals and delivery charges

### **4. Order Tracking**
- Real-time order status updates
- Animated progress indicators
- Estimated delivery information

### **5. Order Completion**
- Celebration screen for successful orders
- Order summary and details
- Smooth completion animations

## 🚧 Future Enhancements

### **Pending Features**
- **Dynamic Island Integration (iOS)**: 
  - Native module bridging in progress
  - Will provide live order updates in Dynamic Island
  - Feasible implementation with additional development time

### **Potential Improvements**
- Push notifications for order updates
- User authentication and profiles
- Payment gateway integration
- Product search and filtering
- Favorites and wishlist functionality

## 🛠️ Tech Stack

- **Framework**: React Native
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation with Shared Elements
- **Animations**: React Native Reanimated
- **Icons**: SVG-based icon system
- **Architecture**: Clean Architecture principles

## 📈 Performance Optimizations

- **SVG icons** for better memory efficiency
- **Optimized images** and asset management
- **Efficient state updates** with Redux Toolkit
- **Smooth animations** with proper performance considerations
- **Clean component lifecycle** management

## 🎯 Assignment Completion Status

| Feature | Status | Notes |
|---------|---------|-------|
| Home Screen UI | ✅ Complete | Pixel-perfect Figma implementation |
| Product Detail Screen | ✅ Complete | Full functionality with animations |
| Shared Element Transitions | ✅ Complete | Smooth navigation animations |
| Redux Integration | ✅ Complete | Complete cart management |
| Order Tracking | ✅ Complete | Animated progress indicators |
| Order Completion | ✅ Complete | Rich completion animations |
| Dynamic Island | 🚧 In Progress | Native module setup pending - due to error |


*Built with ❤️ using React Native and modern development practices*