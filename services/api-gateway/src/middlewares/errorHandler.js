function createErrorHandler(logger) {
  return (error, _request, response, _next) => {
    logger.error({ error }, "Unhandled API gateway error");

    response.status(500).json({
      message: "Generic internal server error",
    });
  };
}

module.exports = {
  createErrorHandler,
};
