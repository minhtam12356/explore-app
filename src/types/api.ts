export interface IProduct {
  id: string;
  name: string;
  avatar: string;
  description: string;
  bookmark: boolean;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  token: string;
}
