const express = require("express");
const { createClient } = require("redis");
const pinoHttp = require("pino-http");

const { createGenericRouter } = require("./routes/genericRoutes");
const { GenericController } = require("./controllers/genericController");
const { GenericService } = require("./services/genericService");
const logger = require("./utils/logger");
const { DistributedLock } = require("./utils/lock");
const { createErrorHandler } = require("./middlewares/errorHandler");

async function bootstrap() {
  const app = express();
  const port = Number(process.env.PORT || 3001);
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

  const redisClient = createClient({ url: redisUrl });

  redisClient.on("error", (error) => {
    logger.error({ error }, "Redis client emitted an error");
  });

  try {
    await redisClient.connect();
    logger.info({ redisUrl }, "Redis client connected");
  } catch (error) {
    logger.warn(
      { error, redisUrl },
      "Redis client connection failed, service will continue with dummy lock state",
    );
  }

  const lockManager = new DistributedLock({ redisClient, logger });
  const genericService = new GenericService({ logger, lockManager });
  const genericController = new GenericController({ genericService, logger });

  app.use(express.json());
  app.use(
    pinoHttp({
      logger,
      autoLogging: true,
    }),
  );

  // Pola arsitektur: router hanya melakukan wiring, sedangkan orkestrasi use case tetap di service layer.
  app.use(createGenericRouter({ genericController }));
  app.use(createErrorHandler(logger));

  const server = app.listen(port, () => {
    logger.info({ port }, "API gateway is listening");
  });

  async function shutdown(signal) {
    logger.info({ signal }, "Shutdown signal received");

    await new Promise((resolve) => {
      server.close(() => resolve());
    });

    if (redisClient.isOpen) {
      await redisClient.quit();
    }

    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  logger.fatal({ error }, "API gateway failed to start");
  process.exit(1);
});
