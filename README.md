# Peer-to-Peer — Learn & Earn

A **React Native (Expo)** mobile application for students who want to **learn new skills** and **earn money** in a single place.

## Features

| Section | Description |
|---------|-------------|
| 🏠 **Home** | Dashboard with quick stats (courses, tasks, earnings) and quick-access shortcuts |
| 📚 **Learn** | Browse courses with progress tracking, level filters, and search |
| 💼 **Earn** | Find paid tasks (gigs) with reward amounts, urgency badges, and deadlines |
| 👤 **Profile** | View badges, skills, and personal stats |

## Tech Stack

- [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/) SDK 54
- [React Navigation](https://reactnavigation.org/) – bottom-tab navigation
- JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`) or just `npx`
- Expo Go app on your phone (for testing on a real device)

### Install

```bash
npm install
```

### Run

```bash
# Start the Expo dev server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in the browser
npm run web
```

## Project Structure

```
Peer-to-Peer/
├── App.js                  # Root: NavigationContainer + Bottom Tabs
├── app.json                # Expo config
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js   # Dashboard
│   │   ├── LearnScreen.js  # Courses listing
│   │   ├── EarnScreen.js   # Tasks/gigs listing
│   │   └── ProfileScreen.js# User profile
│   └── components/
│       ├── CourseCard.js   # Reusable course card
│       └── TaskCard.js     # Reusable task card
└── assets/                 # Icons and splash images
```
