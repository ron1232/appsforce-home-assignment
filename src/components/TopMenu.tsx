import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const TopMenu = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#2E3B55" }} position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Appsforce | Home Assignment
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopMenu;
