import useJobs from "@/hooks/useJobs";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const initialValues = {
  title: "",
  description: "",
};

const schema = yup.object().shape({
  title: yup.string().label("Title"),
  description: yup.string().label("Description"),
});

function CreateJobForm() {
  const { createJob } = useJobs();
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) });

  const theme = useTheme();

  const onSubmit = async (data) => {
    // handling error here because mutateAsync onError rethrows the error
    try {
      await createJob(data);
      reset();
      router.push("/dashboard");
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
        Create job
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("title")}
            required
            margin="none"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
          />
          <Typography variant="caption">{errors.title?.message}</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register("description")}
            name="description"
            required
            margin="none"
            fullWidth
            id="description"
            label="Description"
            multiline
            rows={4}
          />
          <Typography variant="caption">
            {errors.description?.message}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateJobForm;
