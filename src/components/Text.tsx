import Typography from "@mui/material/Typography";

const Text = ({ text }: { text: string }) => {
  return (
    <Typography
      marginBottom={1}
      variant="body2"
      fontSize={13}
      noWrap
      color="text.secondary"
    >
      {text}
    </Typography>
  );
};

export default Text;
