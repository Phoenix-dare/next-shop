export interface ErrorBoundaryProps<T> {

  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export interface ProductWithId {
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: [{ public_id: string }];
  stock: number;
  reviews: [
    {
      user: string;
      name: string;
      rating: string;
      comment: string;
    }
  ];
  user: string;
  category: string;
  subCategory: string;
  id: string;
}

export interface Props {
  products: ProductWithId[];
  categories: [];
  subCategories: [];
}


export type ProductInCart = ProductWithId  & { quantity:number}

export interface ICategory {
  name: string;
}
export type CategoryWithID = ICategory & { id: string };

export type PublicID = string;

export interface SubCategoryWithID {
  name: string;
  id: string;
  category: string;
  parent?: string;
  child?: string;
}
