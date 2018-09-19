var context = require.context('./src', true, /\.karma-test\.jsx?$/);
context.keys().forEach(context);
