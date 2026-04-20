const router = require("express").Router();
const { analizar } = require("../controllers/inventarioAI.controller");
const { authJwt } = require("../middlewares/authJwt");

router.post("/analisis-ia", authJwt, analizar);

module.exports = router;