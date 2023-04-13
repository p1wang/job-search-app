import { AuthContext } from "@/context/AuthContext";
import useUsers from "@/hooks/useUsers";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

function Job({ data, savedJobs }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, isAuthenticated } = useContext(AuthContext);
  const { saveJob } = useUsers();
  const router = useRouter();
  const isSaved = savedJobs?.some((item) => item.job.id === data.id);

  const handleApply = () => {
    if (!isAuthenticated) {
      alert("Please sign in to apply for this job");
    } else if (user?.userType !== "regular") {
      alert("Please sign in as user to apply for this job");
    } else {
      router.push(`/jobs/${data.id}/apply`);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to save job");
    } else if (user?.userType !== "regular") {
      alert("Please sign in as user to save job");
    } else {
      try {
        await saveJob({ id: user.id, jobId: data.id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid
      container
      component={Paper}
      variant="outlined"
      sx={{ p: 2, height: 270 }}
    >
      <Grid
        item
        xs={12}
        sm={7}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          boxShadow: "none",
          pr: 2,
        }}
      >
        <Typography
          variant="h6"
          underline="hover"
          component={Link}
          href={`/jobs/${data.id}`}
        >
          {data.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip label="Full Time" size="small" />
          <Chip label="Permanent" size="small" />
        </Box>

        <Box
          sx={{
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          <Typography> {data.description}</Typography>
        </Box>

        {/* {user?.userType === "regular" && ( */}
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Link component="button" onClick={handleApply}>
            Apply
          </Link>
          <IconButton onClick={handleSave}>
            {isSaved ? <StarIcon color="primary" /> : <StarBorderIcon />}
          </IconButton>
        </Stack>
        {/* )} */}
      </Grid>

      {!isSmall && (
        <>
          <Divider
            orientation="vertical"
            sx={{
              height: "100%",
            }}
          />
          <Grid
            item
            xs={12}
            sm={4.9}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pl: 2,
            }}
          >
            <Stack direction="column" spacing={2} height="100%">
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ pr: 1 }}>
                  <Avatar />
                </Box>

                <Typography fontSize={theme.typography.subtitle2}>
                  {data.company.name}
                </Typography>
              </Stack>

              <Stack direction="column" spacing={2} flexGrow={1}>
                <Typography component={Link}>{data.company.website}</Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography fontSize={theme.typography.caption}>
                  {data.company.city}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Job;
