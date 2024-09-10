const express = require("express");
const app = express();
require("dotenv").config();
require("./db/db");
const user = require("./routes/userRoute");
const books = require("./routes/bookRoute");
const favorites = require("./routes/favoritesRoute");
const cart = require("./routes/cartRoute");
const order = require("./routes/orderRoute");

app.use(express.json());
app.use("/api/v1", user);
app.use("/api/v1", books);
app.use("/api/v1", favorites);
app.use("/api/v1", cart);
app.use("/api/v1", order);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
