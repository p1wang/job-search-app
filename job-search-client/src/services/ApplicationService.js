import api from "./configs/axiosConfig";

const ApplicationService = {
  getApplications: async () => {
    const response = await api.get("/applications");
    return response.data;
  },

  getApplication: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  createApplication: async (application) => {
    const response = await api.post("/applications", application);
    return response.data;
  },

  updateApplication: async (id, application) => {
    const response = await api.put("/applications", application);
    return response.data;
  },

  deleteApplication: async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  },

  getApplicationsByJob: async ({ id, jobId }) => {
    const response = await api.get(
      `/companies/${id}/jobs/${jobId}/applications`
    );
    return response.data;
  },

  getApplicationById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },
};

export default ApplicationService;
