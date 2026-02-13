const express = require("express");
const multer = require("multer");
const controller = require("../controllers/analyzerController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/", upload.single("resume"), controller.analyzeResume);

module.exports = router;
