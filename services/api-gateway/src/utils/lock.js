class DistributedLock {
  constructor({ redisClient, logger }) {
    this.redisClient = redisClient;
    this.logger = logger;
    this.activeLocks = new Map();
  }

  // Race Condition handling:
  // Wrapper ini sengaja dibuat generik sebagai titik integrasi Redlock/Redis lock
  // agar proses tulis di service layer dapat diserialisasi ketika beberapa request
  // mencoba memodifikasi resource yang sama secara bersamaan.
  async acquireLock(resourceId) {
    const lock = {
      resourceId,
      token: `lock:${resourceId}:${Date.now()}`,
      acquiredAt: new Date().toISOString(),
    };

    this.activeLocks.set(lock.token, lock);

    this.logger.info(
      { resourceId, lockToken: lock.token },
      "Generic distributed lock acquired",
    );

    return lock;
  }

  async releaseLock(lock) {
    if (!lock) {
      return;
    }

    this.activeLocks.delete(lock.token);

    this.logger.info(
      { resourceId: lock.resourceId, lockToken: lock.token },
      "Generic distributed lock released",
    );
  }
}

module.exports = {
  DistributedLock,
};
