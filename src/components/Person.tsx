import { useState } from "react";
import { User as PersonProps } from "../interfaces";
import EditOrAddUser from "./EditOrAddUser";

const Person: React.FC<PersonProps> = ({
  email,
  location,
  uuid,
  name,
  picture,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <div>
        <div>{name}</div>
        <div>{email}</div>
        <img src={picture} alt="" />
        <div>{location}</div>
        <div>{uuid}</div>
        <button onClick={() => setOpenEditModal(true)}>Edit</button>
        <hr />
      </div>
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
    </>
  );
};

export default Person;
