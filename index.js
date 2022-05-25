const app = require('./App.js');

let port = process.env.PORT || 10888;

app.listen(port)

console.log('API is ready', port)