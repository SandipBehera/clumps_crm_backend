const { parse } = require("path");
const { db } = require("../database");
const crypto = require("crypto");
const { log } = require("console");

function generateMD5Hash(password) {
  const md5Hash = crypto.createHash("md5").update(password).digest("hex");
  return md5Hash;
}

exports.login = (req, res) => {
  const { email, password } = req.body;
  const convert_password = generateMD5Hash(password);
  console.log("Got incomming request");
  const query = `SELECT * FROM public."user" WHERE email='${email}' AND password='${convert_password}'`;
  const fetchUser = db.query(query, (err, result) => {
    if (err) {
      res.status(500).json("Something went wrong");
    } else {
      if (result.rows.length === 0) {
        const data = {
          status: "failed",
          message: "Invalid Credentials",
        };
        res.status(200).json(data);
      } else {
        const data = {
          status: "success",
          data: result.rows,
          message: "User logged in successfully",
        };
        res.status(200).json(data);
      }
    }
  });
  return fetchUser;
};

exports.register = (req, res) => {
  const {
    user_name,
    email,
    phone,
    empid,
    usertype,
    permission,
    project,
    password,
  } = req.body;

  const convert_password = generateMD5Hash(password);

  const query = `INSERT INTO public."user" (user_name, email, phone, empid, usertype, permission, project, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  // Convert the permission and project arrays to JSON
  const permissionJson = [permission];
  const projectJson = [project];
  const values = [
    user_name,
    email,
    phone,
    empid,
    usertype,
    permissionJson, // Convert the permission array to a JSON-formatted string
    projectJson, // Convert the project array to a JSON-formatted string
    convert_password,
  ];
  const registerUser = db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json("User Created successfully");
    }
  });
  return registerUser;
};

exports.updateUserPassword = (req, res) => {
  const id = parseInt(req.params.id);
  const { password } = req.body;
  const query = `UPDATE public."user" SET password='${generateMD5Hash(
    password
  )}'  WHERE id='${id}'`;
  // Convert the permission and project arrays to JSON
  const updateUser = db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json("Password updated successfully");
    }
  });
  return updateUser;
};

exports.createDesignation = (req, res) => {};
