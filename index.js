const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT || 9000;

server.get("/api/hello", (req, res) => {
  res.json({ message: "The api is up!" });
});

server.use("*", (req, res, next) => {
  req.send(`<h1>Hello World!</h1>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
