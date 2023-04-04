import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../async-actions/userAsyncActions";
import { User, UserState } from "../../interfaces";
import { deepClone } from "../../utils";

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

      state.search = searchTerm;

      if (!searchTerm)
        state.filteredUserIds = state.users.map((user) => user.uuid);

      state.filteredUserIds = getUserIdsBySearchTerm(state.users, searchTerm);
    },
    createUser: (state, action: PayloadAction<User>) => {
      state.users = [...deepClone(state.users), action.payload];

      if (state.search) {
        state.filteredUserIds = getUserIdsBySearchTerm(
          state.users,
          state.search
        );

        return;
      }

      state.filteredUserIds = state.users.map((user) => user.uuid);
    },
    editUser: (state, actions: PayloadAction<Omit<User, "picture">>) => {
      state.users = state.users.map((user) => {
        if (user.uuid === actions.payload.uuid) {
          user.name = actions.payload.name;
          user.email = actions.payload.email;
          user.location = actions.payload.location;
        }

        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.filteredUserIds = action.payload.map((user) => user.uuid);
    });
  },
});

export const { searchUser, createUser, editUser } = userSlice.actions;

export default userSlice.reducer;

const getUserIdsBySearchTerm = (users: User[], searchTerm: string) => {
  return users
    .filter((user) => {
      return (
        user.email.toLowerCase().includes(searchTerm) ||
        `${user.name}`.toLowerCase().includes(searchTerm) ||
        user.uuid.toLowerCase().includes(searchTerm)
      );
    })
    .map((user) => user.uuid);
};
