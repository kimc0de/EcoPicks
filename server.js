const app = require("./main");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-kim:ecopicks@ecopickscluster0.gdhlt9s.mongodb.net/ecopicks" ||
    "mongodb://localhost:27017/ecopicks",
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running at port ${app.get("port")}`);
});
