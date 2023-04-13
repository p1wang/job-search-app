import JobsService from "../services/jobs.service.js";

class JobController {
  async getJobs(req, res) {
    try {
      const { page: clientPage, take: clientTake, search } = req.query;

      const page = parseInt(clientPage) || 1;
      const take = parseInt(clientTake) || 10;
      const skip = (page - 1) * take;

      const data = await JobsService.getJobs(page, take, skip, search);

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getJob(req, res) {
    try {
      const { id } = req.params;

      const data = await JobsService.getJob(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async createJob(req, res) {
    try {
      const { id, userType } = req.user;

      if (userType !== "company") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const data = await JobsService.createJob(id, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateJob(req, res) {
    try {
      const { id } = req.params;

      const data = await JobsService.updateJob(id, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteJob(req, res) {
    try {
      const { id } = req.params;

      const data = await JobsService.deleteJob(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new JobController();
