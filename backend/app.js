const express = require("express");
const app = express();
require("dotenv").config();
require("./db/db");
const cors = require("cors");
const user = require("./routes/userRoute");
const books = require("./routes/bookRoute");
const favorites = require("./routes/favoritesRoute");
const cart = require("./routes/cartRoute");
const order = require("./routes/orderRoute");
const path = require("path");
const _dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use("/api/v1", user);
app.use("/api/v1", books);
app.use("/api/v1", favorites);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use(express.static("public"));

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
