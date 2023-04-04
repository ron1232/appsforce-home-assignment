import axios from "axios";
import { GetAllUsersResponse, User, UserAxios } from "../interfaces";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get<GetAllUsersResponse>(
      `https://randomuser.me/api/?results=10`
    );

    const users: User[] = mapAxiosDataToUsers(data.results);

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const mapAxiosDataToUsers = (usersAxios: UserAxios[]) => {
  const users: User[] = usersAxios.map((userAxios) => ({
    email: userAxios.email,
    location: `${userAxios.location.country}, ${userAxios.location.city}, ${userAxios.location.street.name}, ${userAxios.location.street.number}`,
    name: `${userAxios.name.title}. ${userAxios.name.first} ${userAxios.name.last}`,
    picture: userAxios.picture.medium,
    uuid: userAxios.login.uuid,
  }));

  return users;
};
