🧭 Screen Walkthroughs
Products Screen

Product Details Screen

Cart

Track Order

Enjoy Order

Code Standards


✅ Used SVGs Instead of PNGs for Icons:
This approach ensures better memory efficiency and maintains high image clarity at all resolutions. SVGs are scalable and lightweight, making them ideal for UI icons in modern mobile applications.

📁 app/ Folder Overview
The app directory is the main source folder for your application code. Here's a breakdown of its structure:

📂 assets/
Contains images, icons, fonts, or other static files used across the app.

📂 components/
Houses reusable UI components.

📂 navigator/
Navigation setup including stack or tab navigators.

index.js: Main navigation entry point.

📂 reducers/
Redux reducers and slices (likely set up via Redux Toolkit).

Used for managing app-wide state (like cart handling).

📂 screens/
All screen components grouped by feature/module.

└── delivered/
Likely includes the "Enjoy Order" screen and related animations.

└── orderDetail/
Screens and logic related to viewing or tracking an order.

LiveActivityManager.js: Possibly for handling native iOS dynamic island or live activities.

└── productDetail/
Screen that shows product details.

Includes layout and style files.

└── products/
Home screen with product listing.

useDynamicsIsland.js: Custom hook likely related to native module handling for iOS.

└── trackOrder/
Track order screen with progress bar animation.

📂 store/
Likely contains Redux store setup and configuration.

📂 theme/
Centralized styling constants like colors, font families, sizes, etc.

