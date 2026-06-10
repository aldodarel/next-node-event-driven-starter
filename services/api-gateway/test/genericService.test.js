const test = require("node:test");
const assert = require("node:assert/strict");

const { GenericService } = require("../src/services/genericService");

test("GenericService creates and lists generic items", async () => {
  const service = new GenericService({
    logger: {
      info() {},
    },
    lockManager: {
      async acquireLock(resourceId) {
        return { resourceId, token: "test-lock" };
      },
      async releaseLock() {},
    },
  });

  const createdItem = await service.createItem({
    name: "sample-generic-item",
    metadata: {
      source: "test",
    },
  });

  const items = service.listItems();

  assert.equal(items.length, 1);
  assert.equal(items[0].id, createdItem.id);
  assert.equal(items[0].name, "sample-generic-item");
  assert.deepEqual(items[0].metadata, { source: "test" });
});
