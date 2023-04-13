import JobList from "@/components/JobList";
import Loader from "@/components/Loader";
import PaginationComp from "@/components/PaginationComp";
import Search from "@/components/Search";
import { AuthContext } from "@/context/AuthContext";
import useJobs from "@/hooks/useJobs";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

function JobPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const { getJobs, getSavedJobsByUser } = useJobs();

  const {
    data: savedJobs, // for displaying saved jobs status in job card
    isLoading: isLoadingSavedJobs,
    isFetching: isFetchingSavedJobs, // for fetching only when userType is regular
  } = getSavedJobsByUser(user?.id, user?.userType);

  const { data: jobs, isLoading } = getJobs(router.query);

  if (isLoading || (isLoadingSavedJobs && isFetchingSavedJobs)) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" sx={{ my: 10 }}>
      <Box sx={{ mb: 12 }}>
        <Search />
      </Box>
      <JobList jobs={jobs.jobs} savedJobs={savedJobs} />
      <Box sx={{ mt: 4 }}>
        <PaginationComp pageCount={jobs.pageCount} />
      </Box>
    </Container>
  );
}

export default JobPage;
