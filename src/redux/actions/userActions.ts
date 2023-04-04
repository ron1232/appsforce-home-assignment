import { getAllUsers } from "../../services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async (thunkAPI) => {
  const users = await getAllUsers();
  return users;
});
