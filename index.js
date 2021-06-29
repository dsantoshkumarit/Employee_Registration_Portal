require("dotenv").config();
const express = require("express");
const app = express();

app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connection to mongodb server
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) =>
    console.log("Mongoose Connection Error (index.js) : ", err.message)
  );

//creating server to listen to reqs
app.listen(process.env.PORT, () =>
  console.log(`Server running at port : ${process.env.PORT}`)
);

//routing the requests to specific routes
app.use("/employee", require("./routes/Employee"));
