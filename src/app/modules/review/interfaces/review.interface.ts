export interface IReview {
  id?: number;
  title?: string;
  category?: string;
  tags?: string;
  content?: string;
  imageslinks?: string[] | string;
  reviewRating?: number;
  productTitle?: string;
  productId?: number;
  categoryId?: number;
  subcategoryId?: number;
}
