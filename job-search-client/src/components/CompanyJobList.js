import {
  Box,
  Button,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import JobCard from "./JobCard";
import { useRouter } from "next/router";
import useJobs from "@/hooks/useJobs";

function CompanyJobList({ title, jobs }) {
  const router = useRouter();
  const { deleteJob } = useJobs();

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List>
      <Typography variant="h5">{title}</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      {jobs?.map((item) => (
        <ListItem key={item.id}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography
              component={Link}
              href={`/jobs/${item.id}`}
              underline="hover"
            >
              {item.title}
            </Typography>
            <Stack direction="row" gap={2}>
              <Button
                component={Link}
                href={`/jobs/${item.id}/applications`}
                variant="outlined"
              >
                Applications
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteJob(item.id)}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

export default CompanyJobList;
