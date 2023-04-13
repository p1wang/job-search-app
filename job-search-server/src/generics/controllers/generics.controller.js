import GenericsService from "../services/generics.service.js";

class GenericController {
  async getGenerics(req, res) {
    try {
      const data = await GenericsService.getGenerics();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getGeneric(req, res) {
    try {
      const { id } = req.params;

      const data = await GenericsService.getGeneric(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async createGeneric(req, res) {
    try {
      const data = await GenericsService.createGeneric(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateGeneric(req, res) {
    try {
      const { id } = req.params;

      const data = await GenericsService.updateGeneric(id, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteGeneric(req, res) {
    try {
      const { id } = req.params;

      const data = await GenericsService.deleteGeneric(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new GenericController();
