const express = require("express");
const router = express.Router();
const controller = require("../controllers/potrero.controller");

router.post("/", controller.crear);
router.get("/", controller.listar);


router.put("/mover-ganado", controller.moverGanado);

router.get("/:id", controller.obtener);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

module.exports = router;