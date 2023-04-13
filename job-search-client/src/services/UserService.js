import api from "./configs/axiosConfig";

const UserService = {
  getUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (user) => {
    const response = await api.post("/users", user);
    return response.data;
  },

  updateUser: async (id, user) => {
    const response = await api.put("/users", user);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  saveJob: async ({ id, jobId }) => {
    const response = await api.post(`/users/${id}/saved-jobs`, { jobId });
    return response.data;
  },
};

export default UserService;
