import Person from "./Person";
import { useEffect, useState } from "react";
import { fetchUsers } from "../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../redux/store";
import SearchFilter from "./SearchFilter";
import { searchUser } from "../redux/slices/userSlice";

const People = () => {
  const dispatch = useAppDispatch();

  const { filteredUserIds, users } = useAppSelector(
    (state) => state.userReducer
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
          return filteredUserIds.includes(user.login.uuid);
        })
        .map((user) => (
          <Person key={user.login.uuid} {...user} />
        ))}
    </>
  );
};

export default People;
