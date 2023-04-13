import { Container } from "@mui/material";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <Container maxWidth="false" disableGutters>
      <Navbar />
      {children}
    </Container>
  );
}

export default Layout;
