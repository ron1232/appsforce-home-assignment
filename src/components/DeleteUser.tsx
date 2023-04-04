import { Dialog } from "@mui/material";
import { Button } from "@mui/material";
import { TopTitle } from "./StyledComponents";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../redux/store";
import { deleteUser } from "../redux/slices/userSlice";

interface DeleteUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  uuid: string;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ open, setOpen, uuid }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(uuid));
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <TopTitle>
        <Typography fontSize={18}>Delete User?</Typography>
      </TopTitle>
      <div>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          sx={{ margin: "1rem" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleDelete()}
          variant="contained"
          color="warning"
          type="submit"
          sx={{ margin: "1rem" }}
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
};

export default DeleteUser;
