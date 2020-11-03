module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    UrlFetchApp: {
      fetch: (url, params) => {}
    }
  }
};
