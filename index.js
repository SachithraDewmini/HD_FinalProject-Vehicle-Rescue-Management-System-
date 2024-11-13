/**
 * @format
 */

import 'react-native-gesture-handler'; // Import gesture handler at the top
import 'react-native-reanimated'; // Import reanimated for animation support
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Uncomment this if you need to wrap the App component with Reanimated’s GestureHandlerRootView
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Enhanced error handling (useful during development)
if (__DEV__) {
  import('react-native').then(({ LogBox }) => {
    LogBox.ignoreAllLogs(); // Ignore all log notifications (or customize as needed)
  });
}

// Wrapping App with GestureHandlerRootView (if required by reanimated or gesture handler setup)
// const WrappedApp = () => (
//   <GestureHandlerRootView style={{ flex: 1 }}>
//     <App />
//   </GestureHandlerRootView>
// );

// Register the component (choose WrappedApp if you need GestureHandlerRootView)
AppRegistry.registerComponent(appName, () => App);

// Or, if you need to use GestureHandlerRootView:
// AppRegistry.registerComponent(appName, () => WrappedApp);
