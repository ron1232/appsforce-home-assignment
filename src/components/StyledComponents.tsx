import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import styledComponents from "styled-components";
import { TextField } from "@mui/material";

export const TopCard = styledComponents.div`
  width: 70px;
  margin: 10px auto;
`;

export const Seperator = styledComponents.div`
  border: 1px solid #eee;
`;

export const ErrorDiv = styledComponents.div`
  color: red;
  text-align: left;
  width: 90%;
`;

export const CardsList = styledComponents.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: baseline;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const BottomSection = styledComponents.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-bottom: 2rem;
`;

export const TopTitle = styledComponents.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingWrapper = styledComponents.div`
    margin: 2rem 0;
    height: 1117px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Form = styledComponents.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: "1rem",
  width: "300px",
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15rem",
      "&:focus": {
        width: "20rem",
      },
    },
  },
}));
