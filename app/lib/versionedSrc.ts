/**
 * Optional cache-bust for public asset URLs.
 * Do not use fs/stat here: dynamic `path.join(process.cwd(), "public", src)`
 * causes Next file tracing to pull the entire `public/` tree (~290MB) into
 * the homepage serverless function and exceed Vercel's 250MB limit.
 */
export function versionedSrc(src: string) {
  return src;
}
