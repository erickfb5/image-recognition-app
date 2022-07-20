const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    // port: 5432,
    user: "postgres",
    password: "",
    database: "image-recognition-db",
  },
});

db.select("*")
  .from("users")
  .then((data) => console.log(data));
// console.log(db.select("*").from("users"))

const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "001",
      name: "Joe",
      email: "joe@gmail.com",
      password: "ball",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "002",
      name: "Jane",
      email: "jane@gmail.com",
      password: "fries",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "joe@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  //   res.send("This is working!");
  res.send(database.users);
});
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json("Unable to get user!"));
      } else {
        res.status(400).json("Wrong credentials!");
      }
    })
    .catch((err) => res.status(400).json("Wrong credentials!"));
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    // create a trx when doing more than two things at once
    trx
      .insert({
        hash,
        email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit) // you must commit so you can add the trx
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to register!"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id,
    })
    .then((user) =>
      user.length ? res.json(user[0]) : res.status(400).json("Not found!")
    )
    .catch((err) => res.status(400).json("Error getting user!"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json("Unable to get entries"));
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
