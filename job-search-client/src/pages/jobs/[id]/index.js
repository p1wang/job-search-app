import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import useJobs from "@/hooks/useJobs";
import { Button, Container, Divider, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext } from "react";

function JobPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useContext(AuthContext);

  const { getJob } = useJobs();

  const { data, isLoading } = getJob(id);

  if (isLoading) {
    return <Loader />;
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      alert("Please sign in to apply for this job");
    } else if (user?.userType !== "regular") {
      alert("Please sign in as user to apply for this job");
    } else {
      router.push(`/jobs/${data.id}/apply`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 10 }}>
      <Typography color="primary" sx={{ mb: 1 }}>
        {data.company?.name}
      </Typography>
      <Typography variant="h5">{data.title}</Typography>
      <Divider sx={{ tb: 5 }} />
      <Typography variant="caption">
        {moment(data.createdAt).format("MMMM Do YYYY")}
      </Typography>
      <Typography sx={{ mt: 5 }}>{data.description}</Typography>

      <Button variant="contained" onClick={handleApply} sx={{ mt: 5 }}>
        Apply
      </Button>
    </Container>
  );
}

export default JobPage;
