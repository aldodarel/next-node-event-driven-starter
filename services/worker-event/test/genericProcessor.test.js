const test = require("node:test");
const assert = require("node:assert/strict");

const { processGenericEvent } = require("../src/processors/genericProcessor");

test("processGenericEvent resolves after simulated processing", async () => {
  let infoCallCount = 0;

  await processGenericEvent(
    { eventName: "GENERIC_EVENT" },
    {
      info() {
        infoCallCount += 1;
      },
    },
  );

  assert.equal(infoCallCount, 2);
});
