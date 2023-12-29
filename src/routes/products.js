const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const productsController = require("../controllers/productsController");

router.get("/", productsController.index);

router.get("/create", productsController.create);
router.post("/agregalo", upload.single("images"), productsController.store);

router.get("/detail/:id", productsController.detail);

router.get("/edit/:id", productsController.edit);
router.put("/editar/:id", upload.single("images"), productsController.update);

router.delete("/:id", productsController.destroy);

module.exports = router;
