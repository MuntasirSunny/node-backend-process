//Core Options
// Use Cores With Options
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    // For Developing testing add ||!origin with the following statement.
    if (whitelist.indexOf(origin) !== -1) {
    console.log(whitelist.indexOf(origin))
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Exporting CoresOptions
module.exports = corsOptions;
