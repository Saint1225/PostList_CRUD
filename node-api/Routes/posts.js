const express = require("express");
const postRoute = express.Router();
const fs = require("fs");
const verifyToken = require("./verifyUserToken");


const dataPath = "./Details/posts.json";


// GET /posts route with pagination
postRoute.get("/api/posts", verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);
    const posts = jsonData.posts;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedPosts = posts.slice(startIndex, endIndex);

    res.send({
      data: paginatedPosts,
      page: page,
      limit: limit,
      totalPages: Math.ceil(posts.length / limit),
      totalPosts: posts.length,
    });
  });
});


// User Post based on selected User

postRoute.post("/api/posts/myPost", verifyToken, (req, res) => {
  const page = parseInt(req.body.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.body.limit) || 10; // Default to limit 10 if not provided
  const userId = parseInt(req.user.userId); // Get userId from query parameters

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);
    let posts = jsonData.posts;

    // Filter posts based on userId if provided
    if (userId) {
      posts = posts.filter((post) => post.userId === userId);
    }

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Get posts for the requested page
    const paginatedPosts = posts.slice(startIndex, endIndex);

    res.send({
      page: page,
      limit: limit,
      totalPages: Math.ceil(posts.length / limit),
      totalPosts: posts.length,
      data: paginatedPosts,
    });
  });
});

// POST /posts route to create a new post
postRoute.post("/api/posts/create", verifyToken, (req, res) => {
  // Check if all required fields are present in the request body
  const requiredFields = ["title", "body", "tags"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ error: `Missing ${field} field in request body` });
    }
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }



    const jsonData = JSON.parse(data);
    const newPost = {
      id: jsonData.posts.length + 1, // Generate unique ID
      title: req.body.title,
      body: req.body.body,
      userId: req.user.userId,
      // userId: req.body.userId,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags], // Ensure tags is an array
    };

    // Add the new post to the posts array
    jsonData.posts.push(newPost);

    // Write the updated data back to the file
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        throw err;
      }
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    });
  });
});

postRoute.put("/api/posts/edit/:postId", verifyToken, (req, res) => {
  const postId = parseInt(req.params.postId);

  // Check if the postId is valid
  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid postId" });
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);
    const posts = jsonData.posts;

    // Find the post to edit
    const postIndex = posts.findIndex(post => post.id === postId);

    // Check if the post exists
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the authenticated user is the owner of the post or an admin
    if (req.user.role !== 'admin' && req.user.userId !== posts[postIndex].userId) {
      return res.status(403).json({ error: "Unauthorized to edit this post" });
    }

    // Update the post with the new data
    posts[postIndex] = {
      ...posts[postIndex],
      ...req.body
    };

    // Write the updated data back to the file
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ message: "Post updated successfully", post: posts[postIndex] });
    });
  });
});



// DELETE /posts/:postId route to delete a post by ID
postRoute.delete("/api/posts/delete/:postId", verifyToken, (req, res) => {
  console.log(req.params.postId);
  const postId = parseInt(req.params.postId);

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);
    const posts = jsonData.posts;
    
    // Find the index of the post to delete
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the authenticated user is the owner of the post or an admin
    if (req.user.role !== 'admin' && req.user.userId !== posts[postIndex].userId) {
      return res.status(403).json({ error: "Unauthorized to delete this post" });
    }

    // Remove the post from the array
    jsonData.posts.splice(postIndex, 1);

    // Write the updated data back to the file
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        throw err;
      }
      res.json({ message: "Post deleted successfully" });
    });
  });
});

postRoute.get("/api/posts/view/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const jsonData = JSON.parse(data);
      const post = jsonData.posts.find((post) => post.id === postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
});



module.exports = postRoute;
