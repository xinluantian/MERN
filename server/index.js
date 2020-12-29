const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// mongodb+srv://Luna:<password>@cluster0.3atzx.mongodb.net/<dbname>?retryWrites=true&w=majority
// connect to database
mongoose.connect(
  "mongodb+srv://Luna:tian1210@cluster0.3atzx.mongodb.net/user?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// check database connection
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let app = express();
const PORT = 4000;
const User = require("./user.js");
const recordsPerPage = 3;

app.use(bodyParser.json());

app.get("/api/users/get/:page/:sortBy/:orderBy", (req, res) => {
  const info = {
    user: [],
    recordsPerPage,
    totalPage: 0,
    pageNum: 0,
    sortBy: "no",
    orderBy: 0,
  };
  info.pageNum = Number(req.params.page);
  info.sortBy = req.params.sortBy;
  info.orderBy = Number(req.params.orderBy);

  if (info.sortBy !== "no") {
    User.countDocuments({})
      .then((num) => {
        info.totalPage = Math.ceil(num / recordsPerPage);
      })
      .then(() => {
        User.find()
          .sort({ [info.sortBy]: info.orderBy })
          .skip(info.pageNum * recordsPerPage)
          .limit(recordsPerPage)
          .then((users) => {
            info.users = users;
            res.status(200).send(info);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    User.countDocuments({})
      .then((num) => {
        info.totalPage = Math.ceil(num / recordsPerPage);
      })
      .then(() => {
        User.find()
          .skip(info.pageNum * recordsPerPage)
          .limit(recordsPerPage)
          .then((users) => {
            info.users = users;
            res.status(200).send(info);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

app.get("/api/users/search/:query/:page/:sortBy/:orderBy", (req, res) => {
  const info = {
    user: [],
    recordsPerPage,
    totalPage: 0,
    pageNum: 0,
    sortBy: "no",
    orderBy: 0,
  };
  info.pageNum = Number(req.params.page);
  info.sortBy = req.params.sortBy;
  info.orderBy = Number(req.params.orderBy);

  let search = {};
  if (parseInt(req.params.query) >= 0) {
    search = {
      $or: [
        {
          age: new RegExp(req.params.query, "i"),
        },
      ],
    };
  } else {
    search = {
      $or: [
        {
          firstName: new RegExp(req.params.query, "i"),
        },
        {
          lastName: new RegExp(req.params.query, "i"),
        },
        {
          sex: new RegExp(req.params.query, "i"),
        },
      ],
    };
  }

  if (info.sortBy !== "no") {
    User.countDocuments(search)
      .then((num) => {
        info.totalPage = Math.ceil(num / recordsPerPage);
      })
      .then(() => {
        User.find(search)
          .sort({ [info.sortBy]: info.orderBy })
          .skip(info.pageNum * recordsPerPage)
          .limit(recordsPerPage)
          .then((users) => {
            info.users = users;
            res.status(200).send(info);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    User.countDocuments(search)
      .then((num) => {
        info.totalPage = Math.ceil(num / recordsPerPage);
      })
      .then(() => {
        User.find(search)
          .skip(info.pageNum * recordsPerPage)
          .limit(recordsPerPage)
          .then((users) => {
            info.users = users;
            res.status(200).send(info);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

app.post("/api/users/add/", (req, res) => {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    age: req.body.age,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      res.status(200).send({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        sex: user.sex,
        age: user.age,
        password: user.password,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/api/users/edit/:id", (req, res) => {
  let { firstName, lastName, sex, age, password } = req.body;
  let id = mongoose.Types.ObjectId(req.params.id);

  User.findById(id)
    .then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;
      user.sex = sex;
      user.age = age;
      user.password = password;
      user
        .save()
        .then((usr) => {
          res.status(200).send(`${usr.toString()}`);
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

app.delete("/api/users/delete/:id", (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  User.deleteOne({ _id: id })
    .then(() => {
      res.status(200).send("Delete Completed");
    })
    .catch((err) => res.status(500).send(err));
});

app.use((req, res) => {
  res.status(404).send(`404 not found ${req.url}`);
});
app.listen(PORT);
