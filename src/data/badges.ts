import CKA from "@assets/images/badges/cka-certified-kubernetes-administrator.png";
import type { ImageMetadata } from "astro";

export interface Badge {
  image: ImageMetadata;
  imageAlt: string;
  link: string;
}

export const badges: Badge[] = [
  {
    image: CKA,
    imageAlt: "CKA certificate badge",
    link: "https://www.credly.com/badges/cb9770f2-39b2-4bdc-bc38-3815c34724cb/public_url",
  },
];
