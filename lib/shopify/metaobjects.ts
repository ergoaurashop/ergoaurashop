import { shopifyFetch } from "./client";
import { GET_HOMEPAGE_METAOBJECTS } from "./queries";

export interface MetaobjectImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface HeroSlide {
  id: string;
  image: MetaobjectImage | null;
  title: string;
  button_link: string;
}

export interface PromoVideo {
  id: string;
  video_url: string | null;
  poster_image: MetaobjectImage | null;
}

export interface PromoImage {
  id: string;
  image: MetaobjectImage | null;
  link: string;
}

export interface HomepageMetaobjects {
  heroSlides: HeroSlide[];
  promoVideos: PromoVideo[];
  promoImages: PromoImage[];
}

export async function getHomepageMetaobjects(): Promise<HomepageMetaobjects> {
  try {
    const data = await shopifyFetch<any>({
      query: GET_HOMEPAGE_METAOBJECTS,
    });

    const heroSlides = data.heroSlides.edges.map((edge: any) => {
      const node = edge.node;
      const fields = node.fields;
      
      const imageField = fields.find((f: any) => f.key === "image");
      const titleField = fields.find((f: any) => f.key === "title");
      const linkField = fields.find((f: any) => f.key === "button_link");

      const reference = imageField?.reference;
      const image = reference?.image || (reference?.url ? {
        url: reference.url,
        altText: reference.altText || titleField?.value || "",
        width: 1920,
        height: 1080
      } : null);

      return {
        id: node.id,
        image,
        title: titleField?.value || "",
        button_link: linkField?.value || "#",
      };
    });

    const promoVideos = data.promoVideo.edges.map((edge: any) => {
      const node = edge.node;
      const fields = node.fields;
      const videoField = fields.find((f: any) => f.key === "video_file");
      const posterField = fields.find((f: any) => f.key === "poster_image");
      
      const posterRef = posterField?.reference;
      const poster_image = posterRef?.image || (posterRef?.url ? {
        url: posterRef.url,
        altText: posterRef.altText || "",
        width: 1280,
        height: 720
      } : null);

      return {
        id: node.id,
        video_url: videoField?.reference?.sources?.find((s: any) => s.mimeType === "video/mp4")?.url || videoField?.reference?.sources?.[0]?.url || null,
        poster_image,
      };
    });

    const promoImages = data.promoImage.edges.map((edge: any) => {
      const node = edge.node;
      const fields = node.fields;
      const imageField = fields.find((f: any) => f.key === "image");
      const linkField = fields.find((f: any) => f.key === "link");

      const imageRef = imageField?.reference;
      const image = imageRef?.image || (imageRef?.url ? {
        url: imageRef.url,
        altText: imageRef.altText || "",
        width: 1280,
        height: 720
      } : null);

      return {
        id: node.id,
        image,
        link: linkField?.value || "#",
      };
    });

    return {
      heroSlides,
      promoVideos,
      promoImages,
    };
  } catch (error) {
    console.error("[shopify] getHomepageMetaobjects() failed:", error);
    return {
      heroSlides: [],
      promoVideos: [],
      promoImages: [],
    };
  }
}
