export interface GetAllUsers {
  users: User[];
}

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  __v: number;
}

export interface GetUserRegister {
  token?: string;
  message?: string;
  userId: string;
}
export interface GetVerifyToken {
  userId: string;
}
