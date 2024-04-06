// const express = require("express");
// const router = new express.Router();
// const controllers = require("../controllers/userControllers");



// router.post("/user/register",controllers.userregister);
// router.post("/user/sendotp",controllers.userOtpSend);

// module.exports = router;



const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");

router.post("/user/register", async (req, res) => {
  try {
    const result = await controllers.userregister(req.body); // Assuming userregister is an async function
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/user/sendotp", async (req, res) => {
  try {
    const result = await controllers.userOtpSend(req.body); // Assuming userOtpSend is an async function
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;