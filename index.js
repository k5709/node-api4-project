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

server.get("/api/users", async (req, res) => {
  const users = await User.findById(req.params.id);
  res.status(200).json(users);
});

server.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    User.insert(`username: ${username}, password: ${password}`);
  }
  res.json(User);
});

server.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      res.send(`Hello! ${username}`);
    }
  } catch (err) {
    console.log(err.message);
  }
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
