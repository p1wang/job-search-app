import ApplicationService from "@/services/ApplicationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useApplications = () => {
  const router = useRouter();

  // get application by id
  function getApplicationById(id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ["application", id],
      queryFn: () => ApplicationService.getApplicationById(id),
      enabled: router.isReady,
    });
  }

  // get applications by job
  function getApplicationsByJob(data) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ["applications", data],
      queryFn: () => ApplicationService.getApplicationsByJob(data),
      enabled: router.isReady,
    });
  }

  // apply for job
  const createApplicationMutation = useMutation({
    mutationFn: ApplicationService.createApplication,
    onSuccess: () => {
      // router.push("/jobs");
    },
    onError: (error) => {
      alert(error.response.data.message);
      throw new Error(error.response.data.message);
    },
  });

  function createApplication(data) {
    return createApplicationMutation.mutateAsync(data);
  }

  const createApplicationIsLoading = createApplicationMutation.isLoading;

  return {
    createApplication,
    createApplicationIsLoading,
    getApplicationsByJob,
    getApplicationById,
  };
};

export default useApplications;
