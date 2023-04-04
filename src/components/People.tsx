import Person from "./Person";
import { useEffect, useState } from "react";
import { fetchUsers } from "../redux/async-actions/userAsyncActions";
import { useAppDispatch, useAppSelector } from "../redux/store";
import SearchFilter from "./SearchFilter";
import { searchUser } from "../redux/slices/userSlice";
import EditOrAddUser from "./EditOrAddUser";

const People = () => {
  const dispatch = useAppDispatch();
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const users = useAppSelector((state) => state.userReducer.users);

  const filteredUserIds = useAppSelector(
    (state) => state.userReducer.filteredUserIds
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchTerm));
  }, [searchTerm]);

  useEffect(() => {
    // Fetch All Users
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <SearchFilter
        value={searchTerm}
        onChange={(value) => setSearchTerm(value.toLowerCase())}
      />
      {users
        .filter((user) => {
          return filteredUserIds.includes(user.uuid);
        })
        .map((user) => (
          <Person key={user.uuid} {...user} />
        ))}
      <button onClick={() => setOpenCreateUserModal(true)}>
        Create new user
      </button>
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
