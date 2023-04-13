import CompaniesService from "../services/companies.service.js";

class CompanyController {
  async getCompanies(req, res) {
    try {
      const data = await CompaniesService.getCompanies();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getCompany(req, res) {
    try {
      const { id } = req.params;

      const data = await CompaniesService.getCompany(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async createCompany(req, res) {
    try {
      const data = await CompaniesService.createCompany(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateCompany(req, res) {
    try {
      const { id } = req.params;

      const data = await CompaniesService.updateCompany(id, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteCompany(req, res) {
    try {
      const { id } = req.params;

      const data = await CompaniesService.deleteCompany(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getJobPostsByCompany(req, res) {
    try {
      const { id } = req.params;

      const data = await CompaniesService.getJobPostsByCompany(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getApplicationsByJob(req, res) {
    try {
      const { jobId } = req.params;
      const { id } = req.user;

      const data = await CompaniesService.getApplicationsByJob(id, jobId);
      res.send(data?.applications);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async signUp(req, res) {
    try {
      await CompaniesService.signUp(req.body);
      res.send({ message: "Company created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new CompanyController();
