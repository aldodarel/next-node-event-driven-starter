const { randomUUID } = require("crypto");

class GenericService {
  constructor({ logger, lockManager }) {
    this.logger = logger;
    this.lockManager = lockManager;
    this.items = new Map();
  }

  getHealthSnapshot() {
    return {
      status: "ok",
      service: "api-gateway",
      timestamp: new Date().toISOString(),
    };
  }

  listItems() {
    return Array.from(this.items.values());
  }

  // Pola arsitektur: service layer memegang aturan aplikasi generik
  // dan tidak bergantung langsung pada detail HTTP agar tetap sesuai prinsip SOLID.
  async createItem(payload = {}) {
    const resourceId = payload.resourceId || "generic-item-collection";
    const lock = await this.lockManager.acquireLock(resourceId);

    try {
      const item = {
        id: randomUUID(),
        name: payload.name || "generic-item",
        metadata: payload.metadata || {},
        createdAt: new Date().toISOString(),
      };

      this.items.set(item.id, item);

      this.logger.info({ itemId: item.id }, "Generic item created");

      return item;
    } finally {
      await this.lockManager.releaseLock(lock);
    }
  }
}

module.exports = {
  GenericService,
};
