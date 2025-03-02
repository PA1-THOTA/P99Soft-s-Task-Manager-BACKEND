const User = require("../models/users").usersSchema;
const bcrypt = require("bcryptjs");

exports.getusers = (req, res, next) => {
  User.find({}, { username: 1, gmail: 1, designation: 1 })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

// exports.postuser = (req, res, next) => {
//   User.find({ gmail: req.body.gmail })
//     .then((result) => {
//       if (result.length) {
//         res.json("user Exists");
//       } else {
//         User.find({ username: req.body.username }).then((result) => {
//           if (result.length) {
//             res.json("username Exists,Please try another name");
//           } else {
//             const user = new User({
//               username: req.body.username,
//               gmail: req.body.gmail,
//               password: req.body.password,
//               designation: req.body.designation,
//             });
//             user.save().then((result) =>
//               res.json({
//                 msg: "success",
//                 result: result,
//               })
//             );
//           }
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// };

exports.postuser = (req, res, next) => {
  User.find({ gmail: req.body.gmail })
    .then((result) => {
      if (result.length) {
        res.json("user Exists");
      } else {
        User.find({ username: req.body.username }).then((result) => {
          if (result.length) {
            res.json("username Exists,Please try another name");
          } else {
            bcrypt.hash(req.body.password, 12).then((hashedpassword) => {
              const user = new User({
                username: req.body.username,
                gmail: req.body.gmail,
                password: hashedpassword,
                designation: req.body.designation,
              });
              user.save().then((result) =>
                res.json({
                  msg: "success",
                  result: result,
                })
              );
            });
          }
        });
      }
    })
    .catch((err) => console.log(err));
};

// exports.finduser = (req, res, next) => {
//   User.find(
//     { $and: [{ gmail: req.body.gmail }, { password: req.body.password }] },
//     { username: 1, designation: 1 }
//   )
//     .then((result) => {
//       if (result.length) {
//         console.log("user found");
//         res.json(result);
//       } else {
//         res.json("no user found");
//       }
//     })
//     .catch((err) => console.log(err));
// };

exports.finduser = (req, res, next) => {
  // bcrypt.compare()
  // User.find(
  //   { $and: [{ gmail: req.body.gmail }, { password: req.body.password }] },
  //   { username: 1, designation: 1 }
  // )
  User.find({ gmail: req.body.gmail })
    .then((result) => {
      if (result.length) {
        bcrypt
          .compare(req.body.password, result[0].password)
          .then((domatch) => {
            if (domatch) {
              console.log("user found");
              res.json(result);
            } else {
              res.json("invalid email or password");
            }
          });
      } else {
        res.json("no user found");
      }
    })
    .catch((err) => console.log(err));
};

exports.edituser = (req, res, next) => {
  User.updateOne(
    { gmail: req.body.gmail },
    {
      $set: {
        password: req.body.password,
        designation: req.body.designation,
      },
    }
  )
    .then((result) => res.json({message:"User details edited successfully",result:result}))
    .catch((err) => console.log(err));
};

exports.deleteuser = (req, res, next) => {
  User.deleteMany({
    $and: [{ gmail: req.body.gmail }, { password: req.body.password }],
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
