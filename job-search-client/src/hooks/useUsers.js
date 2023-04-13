import UserService from "@/services/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUsers = () => {
  const queryClient = useQueryClient();
  // apply to job
  const saveJobMutation = useMutation({
    mutationFn: UserService.saveJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries("savedJobs");
    },
    onError: (error) => {
      alert(error.response.data.message);
      throw new Error(error.response.data.message);
    },
  });

  function saveJob(data) {
    return saveJobMutation.mutateAsync(data);
  }

  return {
    saveJob,
  };
};

export default useUsers;
