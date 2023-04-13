import api from "./configs/axiosConfig";

const AuthService = {
  signUp: async (user) => {
    const type = user.userType === "regular" ? "users" : "companies";
    const { userType, ...userWithoutType } = user;

    const response = await api.post(`/${type}/signup`, userWithoutType);
    return response.data;
  },

  signIn: async (user) => {
    const response = await api.post("/users/signin", user);
    return response.data;
  },
};

export default AuthService;
