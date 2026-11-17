import manifest from "./photo-manifest.json";

export type Photo = { src: string; alt: string; width: number; height: number };
export type PhotoGroup = {
  id: string;
  label: string;
  title: string;
  description: string;
  noun?: string;
  wide?: boolean;
  photos: Photo[];
};

/**
 * Photo groups for the homepage. Backed by a static JSON manifest so the
 * serverless function never filesystem-reads `public/images/photo` (which
 * would file-trace binaries into the Vercel function bundle).
 *
 * Regenerate after adding/removing photos:
 *   node --experimental-strip-types scripts/generate-photo-manifest.ts
 */
export function getPhotoGroups(): PhotoGroup[] {
  return manifest as PhotoGroup[];
}
