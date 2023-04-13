import UsersService from "../services/users.service.js";

class UsersController {
  async getUsers(req, res) {
    try {
      const data = await UsersService.getUsers();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;

      const data = await UsersService.getUser(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async createUser(req, res) {
    try {
      const data = await UsersService.createUser(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;

      const data = await UsersService.updateUser(id, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const data = await UsersService.deleteUser(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async saveJob(req, res) {
    try {
      const { jobId } = req.body;
      const { id } = req.user;

      const data = await UsersService.saveJob(id, jobId);
      res.send({ message: "Job saved" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getApplicationsByUser(req, res) {
    try {
      const { id } = req.params;

      const data = await UsersService.getApplicationsByUser(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getSavedJobsByUser(req, res) {
    try {
      const { id } = req.params;

      const data = await UsersService.getSavedJobsByUser(id);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async signUp(req, res) {
    try {
      await UsersService.signUp(req.body);
      res.send({ message: "User created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;

    console.log(email, password);

    try {
      const data = await UsersService.signIn(email, password);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
export default new UsersController();
