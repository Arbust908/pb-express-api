const app = require('./app');

// *** Start Server
const port = 6969;
app.listen(port, () => {
  console.log(`App en puerto:_${port}...`);
});
