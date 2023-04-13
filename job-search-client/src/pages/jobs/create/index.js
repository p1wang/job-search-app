import CreateJobForm from "@/components/forms/CreateJobForm";
import { AuthContext } from "@/context/AuthContext";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

function CreateJobPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    !isAuthenticated && router.push("/signin");
  }, [isAuthenticated, router]);

  return (
    <Container maxWidth="md" sx={{ my: 10 }}>
      <CreateJobForm />
    </Container>
  );
}

export default CreateJobPage;
