import { AuthContext } from "@/context/AuthContext";
import AuthService from "@/services/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";

const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);

  // signUp
  const signUpMutation = useMutation({
    mutationFn: AuthService.signUp,
    onSuccess: () => {
      router.push("/signin");
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  function signUp(data) {
    return signUpMutation.mutateAsync(data);
  }

  // signIn
  const signInMutation = useMutation({
    mutationFn: AuthService.signIn,
    onSuccess: (data) => {
      Cookies.set("jwt", data.token);
      setIsAuthenticated(true);
      router.push("/jobs");
    },
    onError: (error) => {
      alert(error.response.data.message);
      throw new Error(error.response.data.message);
    },
  });

  function signIn(data) {
    return signInMutation.mutateAsync(data);
  }

  // signOut
  const signOut = () => {
    Cookies.remove("jwt");
    queryClient.clear();
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return { signUp, signIn, signOut };
};

export default useAuth;
