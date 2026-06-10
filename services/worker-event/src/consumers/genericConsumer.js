async function startGenericConsumer({
  channel,
  queueName,
  logger,
  processMessage,
}) {
  await channel.prefetch(1);

  logger.info({ queueName }, "Worker is waiting for generic events");

  await channel.consume(queueName, async (message) => {
    if (!message) {
      return;
    }

    const rawContent = message.content.toString();
    let parsedContent;

    try {
      parsedContent = JSON.parse(rawContent);
    } catch (_error) {
      parsedContent = {
        rawContent,
      };
    }

    try {
      logger.info(
        { queueName, payload: parsedContent },
        "Generic event received",
      );

      await processMessage(parsedContent, logger);
      channel.ack(message);
    } catch (error) {
      logger.error({ error, payload: parsedContent }, "Generic event failed");
      channel.nack(message, false, false);
    }
  });
}

module.exports = {
  startGenericConsumer,
};
