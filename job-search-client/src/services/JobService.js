import api from "./configs/axiosConfig";

const JobService = {
  getJobs: async (query) => {
    const response = await api.get("/jobs", {
      // params are query parameters
      params: query,
    });
    return response.data;
  },

  getJob: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (job) => {
    const response = await api.post("/jobs", job);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  updateJob: async (id, job) => {
    const response = await api.put(`/jobs/${id}`, job);
    return response.data;
  },

  getSavedJobsByUser: async (id) => {
    const response = await api.get(`/users/${id}/saved-jobs`);
    return response.data;
  },

  getApplicationsByUser: async (id) => {
    const response = await api.get(`/users/${id}/applications`);
    return response.data;
  },

  getJobPostsByCompany: async (id) => {
    const response = await api.get(`/companies/${id}/job-posts`);
    return response.data;
  },
};

export default JobService;
