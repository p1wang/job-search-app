import { Box, LinearProgress, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Loader() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

export default Loader;
