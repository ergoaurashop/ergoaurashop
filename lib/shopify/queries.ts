const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    vendor
    availableForSale
    productType
    createdAt
    featuredImage {
      url(transform: { maxWidth: 400, maxHeight: 400 })
      altText
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    extraBadge: metafield(namespace: "custom", key: "extra_badge") { value }
    promoLabel: metafield(namespace: "custom", key: "promo_label") { value }
    material: metafield(namespace: "custom", key: "material") { value }
    dimensions: metafield(namespace: "custom", key: "dimensions") { value }
    warranty: metafield(namespace: "custom", key: "warranty") { value }
    origin: metafield(namespace: "custom", key: "origin") { value }
    assembly: metafield(namespace: "custom", key: "assembly") { value }
    highlights: metafield(namespace: "custom", key: "highlights") { value }
    video_url: metafield(namespace: "custom", key: "video_url") { value }
    ad_hook: metafield(namespace: "custom", key: "ad_hook") { value }
    reviews: metafield(namespace: "custom", key: "reviews") { value }
    collections(first: 5) {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTION_BY_HANDLE = `
  query getCollectionByHandle($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      products(first: 24, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_ALL_COLLECTIONS = `
  query getAllCollections {
    collections(first: 100) {
      edges {
        node {
          id
          handle
          title
          image { url altText }
          products(first: 10) {
            edges {
              node {
                ...ProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const PREDICTIVE_SEARCH = `
  query predictiveSearch($query: String!) {
    predictiveSearch(query: $query, limit: 6) {
      products {
        id
        handle
        title
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_DATA = `
  query getHomepageData {
    flashSale: collection(handle: "flash-sale") {
      products(first: 8) { edges { node { ...ProductFragment } } }
    }
    todaysOffers: collection(handle: "todays-offers") {
      products(first: 8) { edges { node { ...ProductFragment } } }
    }
    newArrivals: collection(handle: "new-arrivals") {
      products(first: 8) { edges { node { ...ProductFragment } } }
    }
    bestSellers: collection(handle: "best-sellers") {
      products(first: 8) { edges { node { ...ProductFragment } } }
    }
    specialOffers: collection(handle: "special-offers") {
      products(first: 8) { edges { node { ...ProductFragment } } }
    }
    extraOffers: collection(handle: "extra-offers") {
      products(first: 8) { edges { node { ...ProductFragment } } }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                id
                title
                handle
                images(first: 1) {
                  edges { node { url altText width height } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART = `
  mutation createCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const ADD_TO_CART = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const REMOVE_FROM_CART = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UPDATE_CART = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;
export const GET_HOMEPAGE_METAOBJECTS = `
  query getHomepageMetaobjects {
    heroSlides: metaobjects(type: "hero_slide", first: 10) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on MediaImage {
                image { url altText width height }
              }
              ... on GenericFile {
                url
              }
            }
          }
        }
      }
    }
    promoVideo: metaobjects(type: "promo_video", first: 10) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on Video {
                sources { url mimeType format }
                previewImage { url }
              }
              ... on MediaImage {
                image { url altText width height }
              }
              ... on GenericFile {
                url
              }
            }
          }
        }
      }
    }
    promoImage: metaobjects(type: "promo_image", first: 10) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on MediaImage {
                image { url altText width height }
              }
              ... on GenericFile {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_RECENT_PRODUCTS = `
  query getRecentProducts {
    products(first: 10, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
export const GET_ALL_PRODUCT_HANDLES = `
  query getAllProductHandles {
    products(first: 250) {
      edges {
        node {
          handle
          updatedAt
        }
      }
    }
  }
`;

export const GET_SHOP_INFO = `
  query getShopInfo {
    shop {
      name
      description
      brand {
        logo {
          image {
            url
            altText
            width
            height
          }
        }
        slogan
        shortDescription
      }
    }
  }
`;

export const GET_SHOPIFY_PAGE = `
  query getShopifyPage($handle: String!) {
    page(handle: $handle) {
      id
      title
      handle
      body
      bodySummary
      seo {
        title
        description
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_PAGES = `
  query getAllPages {
    pages(first: 100) {
      edges {
        node {
          handle
          title
          updatedAt
        }
      }
    }
  }
`;

export const GET_SEARCH_RESULTS = `
  query getSearchResults($query: String!, $cursor: String, $sortKey: SearchSortKeys, $reverse: Boolean) {
    search(
      query: $query
      first: 24
      after: $cursor
      sortKey: $sortKey
      reverse: $reverse
      types: PRODUCT
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Product {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTION_PAGE = `
  query getCollectionPage($handle: String!, $cursor: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      products(first: 24, after: $cursor, sortKey: $sortKey, reverse: $reverse) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
export const GET_CUSTOMER_QUERY = `
  query getCustomer {
    customer {
      id
      firstName
      lastName
      emailAddress {
        emailAddress
      }
    }
  }
`;
