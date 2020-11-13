const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env',
});

// console.log(process.env);
// *** Start Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App en puerto:_${port}...`);
});
