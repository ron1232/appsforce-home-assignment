export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
  location: {
    city: string;
    country: string;
    street: {
      number: number;
      name: string;
    };
  };
  login: {
    uuid: string;
  };
}

export interface UserState {
  users: User[];
  filteredUserIds: string[];
  search: "";
}

export interface GetAllUsersResponse {
  results: User[];
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
}
