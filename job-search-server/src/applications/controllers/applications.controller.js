import ApplicationsService from "../services/applications.service.js";

class ApplicationController {
  async getApplications(req, res) {
    try {
      const data = await ApplicationsService.getApplications();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getApplication(req, res) {
    try {
      const { id } = req.params;

      const data = await ApplicationsService.getApplication(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async createApplication(req, res) {
    const { id } = req.user;
    try {
      const data = await ApplicationsService.createApplication({
        ...req.body,
        userId: id,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  async updateApplication(req, res) {
    try {
      const { id } = req.params;

      const data = await ApplicationsService.updateApplication(id, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteApplication(req, res) {
    try {
      const { id } = req.params;

      const data = await ApplicationsService.deleteApplication(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new ApplicationController();
