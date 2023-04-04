import { Typography } from "@mui/material";
import { ErrorDiv } from "./StyledComponents";

interface ErrorFieldProps {
  text: string;
}

const ErrorField: React.FC<ErrorFieldProps> = ({ text }) => {
  return (
    <ErrorDiv>
      <Typography>{text}</Typography>
    </ErrorDiv>
  );
};

export default ErrorField;
