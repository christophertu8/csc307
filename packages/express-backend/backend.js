import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// ---- USER DATA ----
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// ---- HELPER FUNCTIONS ----
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) => {
  return users["users_list"].find(
    (user) => user["id"] === id
  );
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex(user => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  }
  return false;
};

// ---- ROUTES ----

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const user = req.body;
  user.id = Math.floor(Math.random() * 1000000).toString(); // ensure string ID
  users["users_list"].push(user);
  res.status(201).json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users["users_list"].findIndex(user => user.id === id);

  if (index !== -1) {
    users["users_list"].splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
