const app = require('./app')

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Knock, knock");
  console.log("Who's there");
  console.log(`Your server is listening on port ${port}`);
})
