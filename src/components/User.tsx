import { useState } from "react";
import { User as UserProps } from "../interfaces";
import EditOrAddUser from "./EditOrAddUser";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Label from "./Label";
import Text from "./Text";
import { Seperator, TopCard } from "./StyledComponents";
import DeleteUser from "./DeleteUser";

const User: React.FC<UserProps> = ({
  email,
  location,
  uuid,
  name,
  picture,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <Card sx={{ width: 400 }}>
        <CardActionArea>
          <TopCard>
            <CardMedia
              style={{ borderRadius: 20 }}
              component="img"
              image={picture}
              alt="green iguana"
            />
          </TopCard>
          <Seperator />
          <CardContent>
            <Label label="Name:" />
            <Text text={name} />
            <Label label="Email:" />
            <Text text={email} />
            <Label label="Location:" />
            <Text text={location} />
            <Label label="UUID:" />
            <Text text={uuid} />
          </CardContent>
        </CardActionArea>
        <Seperator />
        <CardActions>
          <Button
            size="small"
            color="info"
            onClick={() => setOpenEditModal(true)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="warning"
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      {openEditModal && (
        <EditOrAddUser
          setOpen={setOpenEditModal}
          open={openEditModal}
          email={email}
          location={location}
          name={name}
          uuid={uuid}
        />
      )}

      {openDeleteModal && (
        <DeleteUser
          setOpen={setOpenDeleteModal}
          open={openDeleteModal}
          uuid={uuid}
        />
      )}
    </>
  );
};

export default User;
