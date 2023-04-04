import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../redux/store";
import { createUser, editUser } from "../redux/slices/userSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

interface FieldForState {
  name: string;
  email: string;
  location: string;
}

interface EditOrAddUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name?: string;
  email?: string;
  location?: string;
  uuid?: string;
}

const EditOrAddUser: React.FC<EditOrAddUserProps> = ({
  open,
  setOpen,
  name: givenName,
  email: givenEmail,
  location: givenLocation,
  uuid,
}) => {
  const [name, setName] = useState(givenName || "");
  const [nameError, setNameError] = useState(givenName || "");
  const [email, setEmail] = useState(givenEmail || "");
  const [emailError, setEmailError] = useState("");
  const [location, setLocation] = useState(givenLocation || "");
  const [locationError, setLocationError] = useState("");

  // New User
  const [picture, setPicture] = useState("");

  const dispatch = useAppDispatch();

  const setValue = (value: any, field: keyof FieldForState) => {
    const fieldForState = {
      name: { state: setName, error: setNameError },
      email: { state: setEmail, error: setEmailError },
      location: { state: setLocation, error: setLocationError },
    };

    fieldForState[field].state(value);
    fieldForState[field].error("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (name.length < 3) {
      setNameError("Name must have 3 characters or more");
      valid = false;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Incorrect email format");
      valid = false;
    }

    if (!valid) return;

    // edit mode
    if (uuid && name && location && email) {
      dispatch(editUser({ email, location, name, uuid }));
      return setOpen(false);
    }

    // create mode
    dispatch(createUser({ email, location, name, picture, uuid: uuidv4() }));
    return setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setValue(e.target.value, "name")}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setValue(e.target.value, "email")}
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setValue(e.target.value, "location")}
          />
          {/* Create Mode */}
          {!uuid && (
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          )}

          {/* Save Cancel Button */}
          <button>Save</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </form>
      </div>
    </Dialog>
  );
};

export default EditOrAddUser;
