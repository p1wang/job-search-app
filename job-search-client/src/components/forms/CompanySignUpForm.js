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
  name: "",
  city: "",
  province: "",
  country: "",
  streetAddress: "",
  phone: "",
  postalCode: "",
  website: "",
  email: "",
  password: "",
  userType: "company",
};

const schema = yup.object().shape({
  name: yup.string().required().label("Company Name"),
  city: yup.string().required().label("City"),
  province: yup.string().required().label("Province"),
  country: yup.string().required().label("Country"),
  streetAddress: yup.string().required().label("Street Address"),
  phone: yup.string().required().label("Phone"),
  postalCode: yup.string().required().label("Postal Code"),
  website: yup.string().required().label("Website"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Password"),
});

function CompanySignUpForm() {
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

        <Grid item xs={6}>
          <TextField
            {...register("name")}
            name="name"
            required
            margin="none"
            fullWidth
            id="name"
            label="Company Name"
            autoFocus
            autoComplete="organization"
          />
          <Typography variant="caption">{errors.name?.message}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register("city")}
            required
            margin="none"
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="address-level2"
          />
          <Typography variant="caption">{errors.city?.message}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register("province")}
            required
            margin="none"
            fullWidth
            id="province"
            label="Province"
            name="province"
            autoComplete="address-level2"
          />
          <Typography variant="caption">{errors.province?.message}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register("country")}
            required
            margin="none"
            fullWidth
            id="country"
            label="Country"
            name="country"
            autoComplete="country"
          />
          <Typography variant="caption">{errors.country?.message}</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register("streetAddress")}
            required
            margin="none"
            fullWidth
            id="streetAddress"
            label="Street Address"
            name="streetAddress"
            autoComplete="street-address"
          />
          <Typography variant="caption">
            {errors.streetAddress?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register("phone")}
            required
            margin="none"
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="tel"
          />
          <Typography variant="caption">{errors.phone?.message}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register("postalCode")}
            required
            margin="none"
            fullWidth
            id="postalCode"
            label="Postal Code"
            name="postalCode"
            autoComplete="postal-code"
          />
          <Typography variant="caption">
            {errors.postalCode?.message}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register("website")}
            required
            margin="none"
            fullWidth
            id="website"
            label="Website"
            name="website"
            autoComplete="website"
          />
          <Typography variant="caption">{errors.website?.message}</Typography>
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
          <Link href="/signup">
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: theme.palette.text.secondary }}
            >
              Signing up for a personal account?
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CompanySignUpForm;
