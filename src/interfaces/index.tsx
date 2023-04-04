interface UserCommon {
  email: string;
}

export interface User extends UserCommon {
  name: string;
  picture: string;
  location: string;
  uuid: string;
}

export interface UserAxios extends UserCommon {
  name: {
    title: string;
    first: string;
    last: string;
  };
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
  loading: boolean;
}

export interface GetAllUsersResponse {
  results: UserAxios[];
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
}
