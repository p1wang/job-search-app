import { Link, List, ListItem, ListItemText } from "@mui/material";
import JobCard from "./JobCard";

function JobList({ jobs, savedJobs }) {
  return (
    <List>
      {jobs.map((item) => (
        <ListItem key={item.id}>
          <JobCard data={item} savedJobs={savedJobs} />
        </ListItem>
      ))}
    </List>
  );
}

export default JobList;
