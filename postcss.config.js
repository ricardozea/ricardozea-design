module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    "autoprefixer": {
      overrideBrowserslist: [
        "last 2 Chrome versions",
        "last 2 Safari versions",
        "last 2 iOS versions",
        "last 1 Firefox versions",
        "not dead"
      ],
      grid: true,
      supports: false
    },
  },
};
