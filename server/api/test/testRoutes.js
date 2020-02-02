const express = require("express");
const {
  getAllTests,
  createTest,
  updateTest,
  deleteTest,
  getOnePublicTest,
  getAllPublicTests,
  forkTest
} = require("./testController");

const router = express.Router();

router
  .route("/")
  .get(getAllTests)
  .post(createTest);
router
  .route("/:id")
  .delete(deleteTest)
  .patch(updateTest);
router.get("/fork/:id", forkTest, createTest);
router.get("/public", getAllPublicTests);
router.get("/public/:id", getOnePublicTest);

module.exports = router;
