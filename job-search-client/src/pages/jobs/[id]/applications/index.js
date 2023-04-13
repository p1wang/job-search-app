import ApplicationsList from "@/components/ApplicationsList";
import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import useApplications from "@/hooks/useApplications";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

function ApplicationsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(AuthContext);
  const { getApplicationsByJob } = useApplications();

  const { data: applications, isLoading } = getApplicationsByJob({
    id: user?.id,
    jobId: id,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" sx={{ my: 10 }}>
      <ApplicationsList title="Applications" applications={applications} />
    </Container>
  );
}

export default ApplicationsPage;
