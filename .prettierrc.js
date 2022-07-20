module.exports = {
    singleQuote: true,
    printWidth: 120,
    overrides: [
      {
        files: '*.css',
        options: {
          singleQuote: false,
        },
      },
    ],
  };