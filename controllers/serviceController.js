import Service from "../models/serviceModel.js";

// GET /services - retrieve all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /services/:id - retrieve a specific service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /services - create a new service
const createService = async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    status: req.body.status,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /services/:id - update a specific service by ID
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.title = req.body.title;
    service.description = req.body.description;
    service.image = req.body.image;
    service.status = req.body.status;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /services/:id - delete a specific service by ID
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.remove();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
