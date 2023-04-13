import IndustriesService from "../services/industries.service.js";

class IndustryController {
  async getIndustries(req, res) {
    try {
      const data = await IndustriesService.getIndustries();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getIndustry(req, res) {
    try {
      const { id } = req.params;

      const data = await IndustriesService.getIndustry(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async createIndustry(req, res) {
    try {
      const data = await IndustriesService.createIndustry(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateIndustry(req, res) {
    try {
      const { id } = req.params;

      const data = await IndustriesService.updateIndustry(id, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteIndustry(req, res) {
    try {
      const { id } = req.params;

      const data = await IndustriesService.deleteIndustry(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new IndustryController();
