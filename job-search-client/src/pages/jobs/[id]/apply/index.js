import ApplicationForm from "@/components/forms/application-form/ApplicationForm";
import { AuthContext } from "@/context/AuthContext";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

function ApplyJobPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="md" sx={{ my: 10 }}>
      <ApplicationForm jobId={id} />
    </Container>
  );
}

export default ApplyJobPage;
