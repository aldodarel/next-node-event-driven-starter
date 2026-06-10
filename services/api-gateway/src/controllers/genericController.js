class GenericController {
  constructor({ genericService, logger }) {
    this.genericService = genericService;
    this.logger = logger;

    this.getHealth = this.getHealth.bind(this);
    this.listItems = this.listItems.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  // Pola arsitektur: controller bertugas menerjemahkan HTTP request/response
  // lalu mendelegasikan logika aplikasi ke service yang di-inject lewat constructor.
  async getHealth(_request, response, next) {
    try {
      const payload = this.genericService.getHealthSnapshot();
      response.status(200).json(payload);
    } catch (error) {
      next(error);
    }
  }

  async listItems(_request, response, next) {
    try {
      const items = this.genericService.listItems();
      response.status(200).json({
        data: items,
        total: items.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async createItem(request, response, next) {
    try {
      const item = await this.genericService.createItem(request.body);
      response.status(201).json({
        message: "Generic item accepted",
        data: item,
      });
    } catch (error) {
      this.logger.error({ error }, "Failed to create generic item");
      next(error);
    }
  }
}

module.exports = {
  GenericController,
};
