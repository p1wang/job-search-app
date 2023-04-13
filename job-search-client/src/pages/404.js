import { Box, Container } from "@mui/material";
import Image from "next/image";

function Custom404() {
  return (
    <Container>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "80vh",
        }}
      >
        <Image
          src={"/404.svg"}
          alt="404 image"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Container>
  );
}

export default Custom404;