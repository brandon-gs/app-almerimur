module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
            ".json",
          ],
          alias: {
            api: ["./src/api/"],
            assets: ["./assets/"],
            components: ["./src/components/"],
            containers: ["./src/containers/"],
            helpers: ["./src/helpers/"],
            hooks: ["./src/hooks/"],
            navigation: ["./src/navigation/"],
            screens: ["./src/screens/"],
            store: ["./src/store/"],
            theme: ["./src/theme/"],
          },
        },
      ],
    ],
  };
};
