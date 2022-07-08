const app = require("./main");

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

mongoose.connect(uri ||
    "mongodb://localhost:27017/ecopicks",
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running at port ${app.get("port")}`);
});
