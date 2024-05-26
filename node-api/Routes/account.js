const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyUserToken");

const dataPath = "./Details/useraccount.json";

const secretKey = "TestAPIPWG";

// get all Account
accountRoutes.get("/api/accounts", verifyToken, (req, res) => {
  console.log(req.user.role);
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

accountRoutes.get("/api/users", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const users = JSON.parse(data).filter(user => user.role === "user");
    res.send(users);
  });
});


accountRoutes.post("/api/account/register", (req, res) => {
  // Check if all required fields are present in the request body
  const requiredFields = ["username", "email", "password", "role"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ error: `Missing ${field} field in request body` });
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password length
  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  // Validate role
  const validRoles = ["user", "admin"];
  if (!validRoles.includes(req.body.role)) {
    return res.status(400).json({ error: "Invalid role specified" });
  }

  // Check for any additional parameters
  const allowedParameters = ["username", "email", "password", "role"];
  for (const key in req.body) {
    if (!allowedParameters.includes(key)) {
      return res.status(400).json({ error: `Invalid parameter: ${key}` });
    }
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);

    // Check if the email already exists
    const emailExists = jsonData.accounts.some(
      (account) => account.email === req.body.email
    );
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" }); // Using 409 Conflict status code
    }

    const newAccount = {
      userId: jsonData.accounts.length + 1,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    jsonData.accounts.push(newAccount);

    // Write the updated data back to the file
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({
        message: "Account registered successfully",
        account: newAccount,
      });
    });
  });
});

// POST /account/login route to authenticate user and generate JWT token
accountRoutes.post("/api/account/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);

    // Find the user by email
    const user = jsonData.accounts.find((account) => account.email === email);

    // If user not found or password is incorrect, return error
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        userId: user.userId,
        role: user.role,
      },
      secretKey,
      { expiresIn: "12h" }
    );

    // Return token as response
    res.status(200).json({
      userId: user.userId,
      username: user.username,
      // email: user.email,
      // role: user.role,
      token,
      message: "Login successful",
    });
  });
});

module.exports = accountRoutes;
