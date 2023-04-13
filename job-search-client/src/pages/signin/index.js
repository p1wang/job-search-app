import SignInForm from "@/components/forms/SignInForm";
import { Container } from "@mui/material";

function SignInPage() {
  return (
    <Container sx={{ mt: 10 }}>
      <SignInForm />
    </Container>
  );
}

export default SignInPage;
