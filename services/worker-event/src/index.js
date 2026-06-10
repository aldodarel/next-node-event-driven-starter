const amqp = require("amqplib");
const pino = require("pino");

const { startGenericConsumer } = require("./consumers/genericConsumer");
const { processGenericEvent } = require("./processors/genericProcessor");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: {
    service: process.env.SERVICE_NAME || "worker-event",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

async function bootstrap() {
  const rabbitMqUrl =
    process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
  const queueName = process.env.GENERIC_QUEUE_NAME || "GENERIC_QUEUE";

  logger.info({ rabbitMqUrl, queueName }, "Connecting to RabbitMQ");

  const connection = await amqp.connect(rabbitMqUrl);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, {
    durable: true,
  });

  // Pola arsitektur: worker memisahkan concern consumer dan processor
  // agar alur event-driven tetap mudah diuji dan diperluas tanpa mengikat transport.
  await startGenericConsumer({
    channel,
    queueName,
    logger,
    processMessage: processGenericEvent,
  });

  async function shutdown(signal) {
    logger.info({ signal }, "Worker shutdown signal received");
    await channel.close();
    await connection.close();
    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  logger.fatal({ error }, "Worker failed to start");
  process.exit(1);
});
