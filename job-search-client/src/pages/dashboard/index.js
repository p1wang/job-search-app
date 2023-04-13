import CompanyJobList from "@/components/CompanyJobList";
import Loader from "@/components/Loader";
import UserJobList from "@/components/UserJobList";
import { AuthContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import { Box, Button, Container, Link, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

function Dashboard() {
  const { signOut } = useAuth();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { getSavedJobsByUser, getApplicationsByUser, getJobPostsByCompany } =
    useJobs();

  const {
    data: appliedJobs,
    isLoading: isLoadingAppliedJobs,
    isFetching: isFetchingAppliedJobs, // for fetching only when userType is regular
  } = getApplicationsByUser(user?.id, user?.userType);

  const {
    data: savedJobs,
    isLoading: isLoadingSavedJobs,
    isFetching: isFetchingSavedJobs, // for fetching only when userType is regular
  } = getSavedJobsByUser(user?.id, user?.userType);

  const {
    data: jobPosts,
    isLoading: isLoadingJobPosts,
    isFetching: isFetchingJobPosts, // for fetching only when userType is company
  } = getJobPostsByCompany(user?.id, user?.userType);

  const handleSignOut = () => {
    signOut();
  };

  if (
    (isLoadingSavedJobs && isFetchingSavedJobs) ||
    (isLoadingAppliedJobs && isFetchingAppliedJobs) ||
    (isLoadingJobPosts && isFetchingJobPosts)
  ) {
    return <Loader />;
  }

  return (
    <Container sx={{ maxWidth: "md", mt: 12 }}>
      {user?.userType === "company" && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button component={Link} href="/jobs/create" variant="contained">
            Create
          </Button>
        </Box>
      )}
      <Stack spacing={2}>
        {user?.userType === "regular" && (
          <>
            <UserJobList title="Saved jobs" jobs={savedJobs} />
            <UserJobList title="Applied jobs" jobs={appliedJobs} />
          </>
        )}

        {user?.userType === "company" && (
          <>
            <CompanyJobList title="Job Openings" jobs={jobPosts} />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default Dashboard;
