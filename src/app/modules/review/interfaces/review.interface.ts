export interface IReview {
  id?: number;
  title?: string;
  category?: string;
  tags?: string[];
  like?: number;
  content?: string;
  imageslinks?: any;
  reviewRating?: number;
  productTitle?: string;
  productId?: number;
  categoryId?: number;
  categoryID?: { name: string };
  subcategoryID?: { name: string };
  subcategoryId?: number;
  createdAt?: string;
  updatedAt?: string;
  product: any
}
