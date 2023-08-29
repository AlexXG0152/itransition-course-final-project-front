export interface IUser {
  email: string;
  id: number;
  name: string;
  roles?: IRolesEntity[] | null;
  iat: number;
  exp: number;
}

export interface IRolesEntity {
  id: number;
  value: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  UserRoles: IUserRoles;
}

export interface IUserRoles {
  id: number;
  roleId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
}
