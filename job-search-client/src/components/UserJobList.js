import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import JobCard from "./JobCard";

function UserJobList({ title, jobs }) {
  return (
    <List>
      <Typography variant="h5">{title}</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      {jobs?.map((item) => (
        <ListItem
          key={item.job.id}
          component={Link}
          href={`/jobs/${item.job.id}`}
        >
          {item.job.title}
        </ListItem>
      ))}
    </List>
  );
}

export default UserJobList;
