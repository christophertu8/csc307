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

// ---- HELPER FUNCTION TO FILTER BY NAME ----
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

// ---- ROUTES ----

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Users route (with optional filtering)
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

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
