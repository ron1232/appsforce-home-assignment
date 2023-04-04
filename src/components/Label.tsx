import Typography from "@mui/material/Typography";

const Label = ({ label }: { label: string }) => {
  return (
    <Typography variant="body2" color="text.primary">
      {label}
    </Typography>
  );
};

export default Label;
