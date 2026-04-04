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
  availableForSale: boolean;
  productType: string;
  createdAt: string;
  featuredImage?: {
    url: string;
    altText: string | null;
  };
  extraBadge?: { value: string };
  promoLabel?: { value: string };
  material?: { value: string };
  dimensions?: { value: string };
  warranty?: { value: string };
  origin?: { value: string };
  assembly?: { value: string };
  highlights?: { value: string };
  video_url?: { value: string };
  ad_hook?: { value: string };
  reviews?: { value: string };
  collections?: {
    edges: {
      node: {
        handle: string;
        title: string;
      };
    }[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage;
  products: {
    pageInfo: PageInfo;
    edges: {
      node: Product;
    }[];
  };
}

/** Partial product shape returned inside cart line merchandise */
export interface CartLineProduct {
  id: string;
  title: string;
  handle: string;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    price: Money;
    product: CartLineProduct;
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

export interface Shop {
  name: string;
  description: string;
  brand?: {
    logo?: {
      image?: ShopifyImage;
    };
    slogan?: string;
    shortDescription?: string;
  };
}
