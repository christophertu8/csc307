// ---- IMPORTS ----
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

// ---- CONFIGURATION ----
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

// Connect mongoose
mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to the "users" database
  .catch((error) => console.log(error));

// ---- EXPRESS SETUP ----
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// ---- ROUTES ----

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /users
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    userService.findUserByName(name)
      .then(usersByName => {
        userService.findUserByJob(job)
          .then(usersByJob => {
            // Match users that appear in BOTH lists
            const matchingUsers = usersByName.filter(user1 =>
              usersByJob.some(user2 => user1._id.equals(user2._id))
            );
            res.send({ users_list: matchingUsers });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send("Error finding users by job");
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error finding users by name");
      });
  } else if (name) {
    userService.findUserByName(name)
      .then((users) => res.send({ users_list: users }))
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error finding users by name");
      });
  } else if (job) {
    userService.findUserByJob(job)
      .then((users) => res.send({ users_list: users }))
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error finding users by job");
      });
  } else {
    userService.getUsers()
      .then((users) => res.send({ users_list: users }))
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error getting all users");
      });
  }
});


// GET /users/:id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.findUserById(id)
    .then((user) => {
      if (user) res.send(user);
      else res.status(404).send("Resource not found.");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error finding user by ID");
    });
});

// POST /users
app.post("/users", (req, res) => {
  const user = req.body;
  userService.addUser(user)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error adding user");
    });
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        return user.deleteOne();
      }
    })
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error deleting user");
    });
});


// ---- START SERVER ----
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
