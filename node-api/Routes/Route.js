const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./account.js')
const postsRoutes = require('./posts.js') 

router.use(accountRoutes)
router.use(postsRoutes)
module.exports = router;