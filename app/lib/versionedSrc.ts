import { statSync } from "node:fs";
import path from "node:path";

/** Appends the file's modified time so replaced images bypass cached copies. Server components only. */
export function versionedSrc(src: string) {
  const { mtimeMs } = statSync(path.join(process.cwd(), "public", src));
  return `${src}?v=${Math.round(mtimeMs)}`;
}
