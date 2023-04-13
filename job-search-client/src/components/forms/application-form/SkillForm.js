import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

function SkillForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "skills",
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
              <Grid item xs={6}>
                <TextField
                  {...register(`skills.${index}.title`)}
                  margin="none"
                  required
                  fullWidth
                  label="Title"
                />
                <Typography variant="caption">
                  {errors.skills?.[index]?.title?.message}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...register(`skills.${index}.level`)}
                  margin="none"
                  required
                  fullWidth
                  label="Level"
                />
                <Typography variant="caption">
                  {errors.skills?.[index]?.level?.message}
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
              level: "",
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
              level: "",
            })
          }
        >
          prepend
        </Button>
      </Grid>
    </>
  );
}

export default SkillForm;
