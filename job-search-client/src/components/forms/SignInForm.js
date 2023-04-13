import useAuth from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useForm } from "react-hook-form";

import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
const schema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Password"),
});

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const { signIn } = useAuth();
  const theme = useTheme();

  const onSubmit = async (data) => {
    // handling error here because mutateAsync onError rethrows the error
    try {
      await signIn(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography component="h1" variant="h5" align="center" sx={{ mb: 5 }}>
        Sign in
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("email")}
            required
            margin="none"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Typography variant="caption">{errors.email?.message}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("password")}
            required
            margin="none"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Typography variant="caption">{errors.password?.message}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
        </Grid>

        <Grid item xs={12} textAlign="right">
          <Link href="/signup" variant="body2">
            Don&apos;t have an account? Sign up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignInForm;
