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

function EducationForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "educations",
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
                  {...register(`educations.${index}.school`)}
                  margin="none"
                  required
                  fullWidth
                  label="School"
                />
                <Typography>
                  {errors.educations?.[index]?.school?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register(`educations.${index}.degree`)}
                  margin="none"
                  required
                  fullWidth
                  label="Degree"
                />
                <Typography>
                  {errors.educations?.[index]?.degree?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register(`educations.${index}.startDate`)}
                  type="date"
                  margin="none"
                  required
                  fullWidth
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                />
                <Typography>
                  {errors.educations?.[index]?.startDate?.message}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register(`educations.${index}.endDate`)}
                  type="date"
                  margin="none"
                  required
                  fullWidth
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                />
                <Typography>
                  {errors.educations?.[index]?.endDate?.message}
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
              school: "",
              degree: "",
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
              school: "",
              degree: "",
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

export default EducationForm;
