import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../async-actions/userAsyncActions";
import { User, UserState } from "../../interfaces";
import { deepClone } from "../../utils";

const initialState: UserState = {
  users: [],
  filteredUserIds: [],
  search: "",
  loading: true,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    searchUser: (state, actions) => {
      const searchTerm = actions.payload;

      if (!searchTerm)
        state.filteredUserIds = state.users.map((user) => user.uuid);

      state.filteredUserIds = getUserIdsBySearchTerm(
        state.users,
        searchTerm.toLowerCase()
      );

      state.search = searchTerm;
    },
    createUser: (state, action: PayloadAction<User>) => {
      checkEmail(state.users, action.payload.email);

      state.users = [...deepClone(state.users), action.payload];

      if (state.search) {
        state.filteredUserIds = getUserIdsBySearchTerm(
          state.users,
          state.search.toLowerCase()
        );

        return;
      }

      state.filteredUserIds = state.users.map((user) => user.uuid);
    },
    editUser: (state, action: PayloadAction<Omit<User, "picture">>) => {
      checkEmail(state.users, action.payload.email, action.payload.uuid);

      state.users = state.users.map((user) => {
        if (user.uuid === action.payload.uuid) {
          user.name = action.payload.name;
          user.email = action.payload.email;
          user.location = action.payload.location;
        }

        return user;
      });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.uuid !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.filteredUserIds = action.payload.map((user) => user.uuid);
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { searchUser, createUser, editUser, deleteUser } =
  userSlice.actions;

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

const checkEmail = (users: User[], email: string, uuid?: string) => {
  const foundUser = users.find((user) => user.email === email);
  if (foundUser?.uuid === uuid) return true;

  if (foundUser) throw Error("Email already exists");
};
