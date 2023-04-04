import Person from "./Person";
import { useEffect, useState } from "react";
import { fetchUsers } from "../redux/async-actions/userAsyncActions";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { searchUser } from "../redux/slices/userSlice";
import Button from "@mui/material/Button";
import TopMenu from "./TopMenu";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import EditOrAddUser from "./EditOrAddUser";
import {
  BottomSection,
  CardsList,
  LoadingWrapper,
  Search,
  StyledInputBase,
  TopTitle,
} from "./StyledComponents";

const People = () => {
  const dispatch = useAppDispatch();
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const { filteredUserIds, loading, users } = useAppSelector(
    (state) => state.userReducer
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchTerm));
  }, [searchTerm]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <TopMenu>
        <Search>
          <StyledInputBase
            placeholder="Search User…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </TopMenu>
      <TopTitle>
        <Typography fontSize={35}>List Of Users:</Typography>
      </TopTitle>
      <CardsList>
        {loading ? (
          <LoadingWrapper>
            <CircularProgress size={100} disableShrink />
          </LoadingWrapper>
        ) : (
          <>
            {users
              .filter((user) => {
                return filteredUserIds.includes(user.uuid);
              })
              .map((user) => (
                <Person key={user.uuid} {...user} />
              ))}
          </>
        )}
      </CardsList>
      {!loading && (
        <BottomSection>
          <Button
            onClick={() => setOpenCreateUserModal(true)}
            variant="contained"
            color="primary"
          >
            Add User
          </Button>
        </BottomSection>
      )}
      {openCreateUserModal && (
        <EditOrAddUser
          setOpen={setOpenCreateUserModal}
          open={openCreateUserModal}
        />
      )}
    </>
  );
};

export default People;
