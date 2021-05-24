import "dotenv/config";

export default {
  expo: {
    name: "Almerimur",
    slug: "Almerimur",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    extra: {
      api_url: process.env.EXPO_API_URL,
    },
    packagerOpts: {
      config: "metro.config.js",
      sourceExts: [
        "expo.ts",
        "expo.tsx",
        "expo.js",
        "expo.jsx",
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "wasm",
        "svg",
      ],
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "app.almerimur",
      buildNumber: "1.0.0",
      supportsTablet: true,
    },
    android: {
      package: "app.almerimur",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};
