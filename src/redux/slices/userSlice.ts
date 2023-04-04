import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/userActions";
import { UserState } from "../../interfaces";

const initialState: UserState = {
  users: [],
  filteredUserIds: [],
  search: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    searchUser: (state, actions) => {
      const searchTerm = actions.payload;

      if (!searchTerm)
        state.filteredUserIds = state.users.map((user) => user.login.uuid);

      state.filteredUserIds = state.users
        .filter((user) => {
          return (
            user.email.toLowerCase().includes(searchTerm) ||
            `${user.name.title} ${user.name.first} ${user.name.last}`
              .toLowerCase()
              .includes(searchTerm) ||
            user.login.uuid.toLowerCase().includes(searchTerm)
          );
        })
        .map((user) => user.login.uuid);
    },
    saveUser: (state, actions) => {
      // state.filter = actions.payload;
    },
    editUser: (state, actions) => {
      // state.filter = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.filteredUserIds = action.payload.map((user) => user.login.uuid);
    });
  },
});

export const { searchUser } = userSlice.actions;

export default userSlice.reducer;
