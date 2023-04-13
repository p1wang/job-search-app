import JobService from "@/services/JobService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useJobs = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // get jobs
  function getJobs(query) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ["jobs", query], // { page, take } is the query params
      queryFn: () => JobService.getJobs(query),
      // refetchOnWindowFocus: false, // dev mode
      enabled: router.isReady, // wait for router to be ready before fetching
    });
  }

  // get job details
  function getJob(id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ["job", id],
      queryFn: () => JobService.getJob(id),
      // refetchOnWindowFocus: false,
      enabled: router.isReady,
    });
  }

  // get saved jobs by user
  function getSavedJobsByUser(id, userType) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ["savedJobs", id],
      queryFn: () => JobService.getSavedJobsByUser(id),
      // refetchOnWindowFocus: false,
      enabled: userType === "regular" && router.isReady,
    });
  }

  // get applications by user
  function getApplicationsByUser(id, userType) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ["appliedJobs", id],
      queryFn: () => JobService.getApplicationsByUser(id),
      // refetchOnWindowFocus: false,
      enabled: userType === "regular" && router.isReady,
    });
  }

  // get job posts by company
  function getJobPostsByCompany(id, userType) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ["jobPosts", id],
      queryFn: () => JobService.getJobPostsByCompany(id),
      // refetchOnWindowFocus: false,
      enabled: userType === "company" && router.isReady,
    });
  }

  // create job
  const createJobMutation = useMutation({
    mutationFn: JobService.createJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries("jobPosts");
    },
    onError: (error) => {
      alert(error.response.data.message);
      throw new Error(error.response.data.message);
    },
  });

  function createJob(job) {
    return createJobMutation.mutateAsync(job);
  }

  // delete job
  const deleteJobMutation = useMutation({
    mutationFn: JobService.deleteJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries("jobPosts");
    },
    onError: (error) => {
      alert(error.response.data.message);
      throw new Error(error.response.data.message);
    },
  });

  function deleteJob(id) {
    return deleteJobMutation.mutateAsync(id);
  }

  return {
    getJobs,
    getJob,
    deleteJob,
    createJob,
    getSavedJobsByUser,
    getApplicationsByUser,
    getJobPostsByCompany,
  };
};

export default useJobs;
