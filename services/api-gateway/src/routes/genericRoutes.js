const { Router } = require("express");

function createGenericRouter({ genericController }) {
  const router = Router();

  router.get("/health", genericController.getHealth);
  router.get("/api/items", genericController.listItems);
  router.post("/api/items", genericController.createItem);

  return router;
}

module.exports = {
  createGenericRouter,
};
