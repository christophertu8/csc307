import express from "express";

const app = express();
const port = 8000;

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

// ---- HELPER FUNCTION ----
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
  
  

// ---- ROUTES ----

// GET /
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /users (optionally filter by name)
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
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).send(); // or res.send(userToAdd) if you want to return it
  });
  
  

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
