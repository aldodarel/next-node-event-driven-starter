function processGenericEvent(payload, logger) {
  return new Promise((resolve) => {
    // Pola arsitektur: processor dipisahkan dari consumer untuk menjaga
    // lapisan transport event dan logika pemrosesan tetap independen.
    logger.info(
      { eventName: payload.eventName || "GENERIC_EVENT", payload },
      "Generic event is being processed",
    );

    setTimeout(() => {
      logger.info(
        { eventName: payload.eventName || "GENERIC_EVENT" },
        "Generic event processed",
      );
      resolve();
    }, 750);
  });
}

module.exports = {
  processGenericEvent,
};
