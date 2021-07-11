const express = require("express");
const CommentaireController = require("../../controllers/crud/commentaire.controller");
const router = express.Router();
const auth = require('../../middleware/auth');

router.post("/commentaire", CommentaireController.create);
router.get("/commentaires", CommentaireController.readAll);
router.get("/commentaire/:id", auth, CommentaireController.read);
router.put("/commentaire", auth, CommentaireController.update);
router.delete("/commentaire", auth, CommentaireController.deleted);

module.exports = router;