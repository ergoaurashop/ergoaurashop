export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ProductMetafields {
  material?: string;
  dimensions?: string;
  warranty?: string;
  origin?: string;
  assembly?: string;
  highlights?: string;
  video_url?: string;
  ad_hook?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ProductVariant;
    }[];
  };
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  compareAtPriceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  } | null;
  tags: string[];
  vendor: string;
  productType: string;
  createdAt: string;
  metafields: ProductMetafields;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage;
  products: {
    edges: {
      node: Product;
    }[];
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: Product;
    price: Money;
  };
}

export interface CartCost {
  totalAmount: Money;
  subtotalAmount: Money;
  totalTaxAmount: Money | null;
}

export interface Cart {
  id: string;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
  cost: CartCost;
  checkoutUrl: string;
  totalQuantity: number;
}

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
}

export interface ShopifyResponse<T> {
  data: T;
  errors?: { message: string }[];
}
