import {
  Button,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

function ApplicationsList({ title, applications }) {
  const router = useRouter();

  return (
    <List>
      <Typography variant="h5">{title}</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      {applications?.map((item) => (
        <ListItem key={item.id}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography>
              {item.user.firstName + " " + item.user.lastName}
            </Typography>

            <Button
              component={Link}
              href={`${router.asPath}/${item.id}`}
              variant="outlined"
            >
              View
            </Button>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

export default ApplicationsList;
