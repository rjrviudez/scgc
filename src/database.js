const mongoose = require("mongoose");
const readLine = require("readline");
//if (process.platform === "win32") {
//  const rl = readLine.createInterface({
//    input: process.stdin,
//    output: process.stdout,
//  });
//  rl.on("SIGINT", () => {
//    process.emit("SIGINT");
//  });
// }

mongoose
  .connect("mongodb://localhost:27017/rt_system", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
