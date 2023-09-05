export interface IUser {
  id: number;
  email: string;
  name: string;
  banned: boolean;
  banreason?: null;
  unbanreason?: null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
}
