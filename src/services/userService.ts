import axios from "axios";
import { GetAllUsersResponse, User } from "../interfaces";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get<GetAllUsersResponse>(
      "https://randomuser.me/api/?results=10"
    );
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
