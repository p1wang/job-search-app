import useAuth from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userType: "regular",
};

const schema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Password"),
});

function SignUpForm() {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) });

  const theme = useTheme();

  const onSubmit = async (data) => {
    // handling error here because mutateAsync onError rethrows the error
    try {
      await signUp(data);
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
        Sign up
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("firstName")}
            name="firstName"
            required
            margin="none"
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            autoComplete="given-name"
          />
          <Typography variant="caption">{errors.firstName?.message}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("lastName")}
            required
            margin="none"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
          <Typography variant="caption">{errors.lastName?.message}</Typography>
        </Grid>
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
            Sign Up
          </Button>
        </Grid>

        <Grid item xs={12} textAlign="right">
          <Link href="/signin" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 5 }} />
        </Grid>

        <Grid item xs={12}>
          <Link href="/signup/company">
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: theme.palette.text.secondary }}
            >
              Signing up for a company account?
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpForm;
