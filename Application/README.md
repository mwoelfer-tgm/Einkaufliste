# Einkaufliste
Martin Wölfer 5BHIT TGM

--- 

A basic React Native App set up with [`react-native-firebase`](https://github.com/invertase/react-native-firebase) and [`React Native Firebase Starter`](https://github.com/invertase/react-native-firebase-starter) which simulates a shopping list. 

Of the many features that firebase offers, `Cloud Firestore` was used to not only save, but also synchronize data on all devices. 

---


### Usage

After opening the app you can enter any items you want to add to the list. These items will be automatically synced with any other devices. When tapping an item you indicate that you already bougth it for the others to see. When long pressing an item, it will get deleted from the list.

### Installation
Clone the repository

In order to correctly load this on your device, you have to make sure that it shows up when typing `adb devices` in the console.
#### 1) Release
The pre-built and signed apk can be found in the root directory. You can install it with `adb install <apk>`
#### 2) Debug
If you want the debug version or don't understand how apks work for some reason, you can load the application on your device by first starting the React Native package manager with `react-native start` and then building the application on your device with `react-native run-android`.


### Screenshot


![preview](https://i.imgur.com/FbDADf1.png)