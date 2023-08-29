export interface ICategory {
  id: number;
  name: string;
  subcategories?: {
    id: number;
    categoryId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
  };
}
