const { json } = require("express");
const express = require("express");
const fs = require("fs/promises");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/another-page", (req, res) => {
  res.sendFile(__dirname + "/another.html");
});

app.get("/jokes", async (req, res) => {
  const db = await fs.readFile("./db.json", "utf-8");
  res.json(JSON.parse(db));
});
app.post("/jokes", async (req, res) => {
  const db = await fs.readFile("./db.json", "utf-8");
  const jokeDb = JSON.parse(db);
  console.log(req.body);

  jokeDb.jokes.push(req.body.text);
  await fs.writeFile("./db.json", JSON.stringify(jokeDb), "utf-8");
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`on server http://localhost:${port}`);
});
