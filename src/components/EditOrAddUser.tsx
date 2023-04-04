import { Dialog } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { createUser, editUser } from "../redux/slices/userSlice";
import { v4 as uuidv4 } from "uuid";
import ErrorField from "./ErrorField";
import { Form, StyledTextField } from "./StyledComponents";

interface FieldForState {
  name: string;
  email: string;
  location: string;
  picture?: string;
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
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState(givenEmail || "");
  const [emailError, setEmailError] = useState("");
  const [location, setLocation] = useState(givenLocation || "");
  const [locationError, setLocationError] = useState("");

  // New User
  const [picture, setPicture] = useState("");
  const [pictureError, setPictureError] = useState("");

  const dispatch = useAppDispatch();

  const setValue = (value: any, field: keyof FieldForState) => {
    const fieldForState = {
      name: { state: setName, error: setNameError },
      email: { state: setEmail, error: setEmailError },
      location: { state: setLocation, error: setLocationError },
      // If Creating new user:
      ...(!uuid && { picture: { state: setPicture, error: setPictureError } }),
    };

    fieldForState[field]?.state(value);
    fieldForState[field]?.error("");
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

    if (!location.length) {
      setLocationError("Location field can't be empty");
      valid = false;
    }

    // If new user and picture is not an image url:
    if (!uuid && !/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(picture)) {
      setPictureError("Picture must be an image url");
      valid = false;
    }

    if (!valid) return;

    // Edit mode
    if (uuid && name && location && email) {
      try {
        dispatch(editUser({ email, location, name, uuid }));
        return setOpen(false);
      } catch (error) {
        setEmailError("Email already exists");
      }
    }

    // Create mode
    try {
      dispatch(createUser({ email, location, name, picture, uuid: uuidv4() }));
      return setOpen(false);
    } catch (error) {
      setEmailError("Email already exists");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Form noValidate onSubmit={handleSubmit}>
        {nameError && <ErrorField text={nameError} />}
        <StyledTextField
          label="Name"
          variant="filled"
          required
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value, "name")
          }
        />
        {emailError && <ErrorField text={emailError} />}
        <StyledTextField
          label="Email"
          type="email"
          variant="filled"
          required
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value, "email")
          }
        />
        {locationError && <ErrorField text={locationError} />}
        <StyledTextField
          label="Location"
          variant="filled"
          required
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value, "location")
          }
        />
        {pictureError && <ErrorField text={pictureError} />}

        {/* If Creating new user: */}
        {!uuid && (
          <StyledTextField
            label="Picture"
            variant="filled"
            required
            value={picture}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value, "picture")
            }
          />
        )}

        <div>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Dialog>
  );
};

export default EditOrAddUser;
