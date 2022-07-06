const mySql = require("mysql2");
const db = mySql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
});

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render("index", {
      message: "Please enter your Email and Password",
    });
  } else {
    db.query(
      "SELECT students.student_id, students.first_name, students.last_name, students.email, courses.course_name from students INNER JOIN Courses ON courses.course_id = students.course_id",
      (err, results) => {
        // console.log(results);
        if (err) {
          console.log(err.message);
        } else {
          res.render("dashboard", {
            students: results,
            title: "List of Students",
          });
        }
      }
    );
  }
};

exports.register = (req, res) => {
  // console.log(req.body);
  const { first_name, last_name, email, course_id } = req.body;
  db.query(
    "select email from students where email = ?",
    [email],
    async (err, results) => {
      if (err) {
        throw err;
      } else if (results.length > 0) {
        return res.render("registration", {
          message: "Email entered is already in use",
        });
      } else if (
        first_name === "" ||
        last_name === "" ||
        email === "" ||
        course_id === ""
      ) {
        return res.render("registration", {
          message: "Please Complete the Form",
        });
      } else {
        db.query(
          "insert into students set ?",
          {
            first_name: first_name,
            last_name: last_name,
            email: email,
            course_id: course_id,
          },
          (err) => {
            if (err) {
              console.log(err.message);
            } else {
              db.query("SELECT * from students", (err, results) => {
                if (err) {
                  console.log(err.message);
                } else {
                  res.render("dashboard", {
                    students: results,
                    title: "List of Students",
                    message: "Student has been registered!",
                  });
                }
              });
            }
          }
        );
      }
    }
  );
};

exports.update = (req, res) => {
  const email = req.params.email;
  db.query(
    "SELECT students.student_id, students.first_name, students.last_name, students.email, courses.course_name, courses.course_id from students INNER JOIN Courses ON courses.course_id = students.course_id where students.email = ?",
    email,
    (err, results) => {
      if (err) {
        console.log(err.message);
      } else {
        res.render("update-form", {
          students: results,
          title: "Edit Student Info",
        });
      }
    }
  );
};

exports.updateStudent = (req, res) => {
  console.log(req.body);
  db.query(
    "UPDATE students SET first_name = ?, last_name = ?, course_id = ? where email = ?",
    [
      req.body.first_name,
      req.body.last_name,
      req.body.course_id,
      req.body.email,
    ],
    (err, results) => {
      db.query(
        "SELECT students.student_id, students.first_name, students.last_name, students.email, courses.course_name, courses.course_id from students INNER JOIN Courses ON courses.course_id = students.course_id",
        (err, results) => {
          if (err) {
            console.log(err.message);
          } else {
            res.render("dashboard", {
              students: results,
              title: "List of Students",
              message: "Student has been updated!",
            });
          }
        }
      );
    }
  );
};

exports.delete = (req, res) => {
  const email = req.params.email;
  // console.log(email);
  db.query("DELETE from students where email = ?", email, (err, results) => {
    db.query("SELECT * from students", (err, results) => {
      if (err) {
        console.log(err.message);
      } else {
        res.render("dashboard", {
          students: results,
          title: "List of Students",
        });
      }
    });
  });
};
