import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useFieldArray, useFormContext } from "react-hook-form";

function ExperienceForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <>
      <List sx={{ width: "100%" }}>
        {fields.map((item, index) => (
          <ListItem
            key={item.id}
            sx={{
              paddingRight: 0,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register(`experiences.${index}.title`)}
                  margin="none"
                  required
                  fullWidth
                  label="Title"
                  autoFocus
                />
                <Typography>
                  {errors.experiences?.[index]?.title?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register(`experiences.${index}.company`)}
                  margin="none"
                  required
                  fullWidth
                  label="Company"
                />
                <Typography>
                  {errors.experiences?.[index]?.company?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register(`experiences.${index}.description`)}
                  margin="none"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                />
                <Typography>
                  {errors.experiences?.[index]?.description?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register(`experiences.${index}.startDate`)}
                  type="date"
                  margin="none"
                  required
                  fullWidth
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                />
                <Typography>
                  {errors.experiences?.[index]?.startDate?.message}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register(`experiences.${index}.endDate`)}
                  type="date"
                  margin="none"
                  required
                  fullWidth
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                />
                <Typography>
                  {errors.experiences?.[index]?.endDate?.message}
                </Typography>
              </Grid>

              {fields.length > 1 && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </Grid>
              )}
            </Grid>
          </ListItem>
        ))}
      </List>

      <Grid item xs={12} sx={{ display: "flex", gap: 5 }}>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          onClick={() => {
            append({
              title: "",
              company: "",
              description: "",
              startDate: moment().format("YYYY-MM-DD"),
              endDate: moment().format("YYYY-MM-DD"),
            });
          }}
        >
          append
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          onClick={() =>
            prepend({
              title: "",
              company: "",
              description: "",
              startDate: moment().format("YYYY-MM-DD"),
              endDate: moment().format("YYYY-MM-DD"),
            })
          }
        >
          prepend
        </Button>
      </Grid>
    </>
  );
}

export default ExperienceForm;
