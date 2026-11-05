import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type Photo = { src: string; alt: string; width: number; height: number };
export type PhotoGroup = { id: string; photos: Photo[] };

const PHOTO_DIR = path.join(process.cwd(), "public/images/photo");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const EXCLUDED = new Set(["profile.jpg"]);
const DEFAULT_ALT = "Photo by David Pindrys";

const photoAlts: Record<string, string> = {
  "fes1.jpg": "A young man walking past others on a cobblestone street beside an ochre wall painted with a shop sign.",
  "fes2.jpg": "A man reading a newspaper at a café table, seen through a doorway beside a Coca-Cola fridge.",
  "fes3.jpg": "A vintage pinball machine in the foreground while a young man plays pool in the room behind it.",
  "misha1.jpg": "An older man in glasses and a brown jacket seated behind an outdoor chessboard, looking at the camera.",
  "misha2.jpg": "An older man counting cash at an outdoor chess table, with pieces scattered on the board.",
  "misha3.jpg": "A young man smiling as he watches an older man play chess at an outdoor table.",
  "clean.jpg": "A young boy packing mud into a plastic bottle while a woman sweeps a porch behind him.",
  "corn.jpg": "A woman pouring dried corn kernels into the wind as a girl and a young child look on.",
  "doll.jpg": "A girl in a pink sweater running past a sunlit wall, carrying a baby doll, her shadow cast beside her.",
  "fingers.jpg": "A family at a table, a young woman gesturing with her hands while a small boy drinks from a cup.",
  "wedding.jpg": "A woman placing a lazo rosary around a smiling bride and groom during a church wedding.",
  "poland.jpg": "Five people smiling in front of a stucco house in Poland, one giving bunny ears to two of the others.",
  "sonsiel.jpg": "Five people, most wearing name badges, posing in front of a SONSIEL banner at a conference.",
  "grind.jpg": "A woman in an apron grinding red pigment on a stone metate, surrounded by woven baskets.",
  "loom.jpg": "Weavers working at large wooden floor looms in a workshop.",
  "mariano.jpg": "A man standing on a hillside among prickly pear cactus, with green mountains behind him.",
  "pouring.jpg": "Two people pouring deep red dye from a metal pot through a cloth into a concrete basin.",
  "gazelle.jpg": "Antelope grazing in tall golden grass on an open savanna dotted with acacia trees.",
  "giraffes.jpeg": "Several giraffes walking across a wide grassy savanna under a cloudy sky.",
  "lions.jpeg": "A lioness and her cub standing on a path through tall golden grass.",
  "workshop.jpg": "A facilitator pointing at a wall of sticky notes as a group looks on during a research workshop.",
};

function readDimensions(buf: Buffer): { width: number; height: number } | null {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

const byName = (a: string, b: string) => a.localeCompare(b, "en", { sensitivity: "base", numeric: true });
const isHidden = (name: string) => name.split("/").some((part) => part.startsWith("."));

function listImages(dir: string): string[] {
  return fs
    .readdirSync(path.join(PHOTO_DIR, dir), { recursive: true, encoding: "utf8" })
    .map((entry) => `${dir}/${entry.split(path.sep).join("/")}`)
    .filter((name) => IMAGE_EXT.test(name) && !isHidden(name))
    .sort(byName);
}

export function getPhotoGroups(): PhotoGroup[] {
  if (!fs.existsSync(PHOTO_DIR)) return [];
  const seen = new Set<string>();

  const toPhoto = (name: string): Photo | null => {
    const fileName = path.posix.basename(name);
    if (EXCLUDED.has(fileName.toLowerCase())) return null;
    const buf = fs.readFileSync(path.join(PHOTO_DIR, name));
    const hash = createHash("sha1").update(buf).digest("hex");
    if (seen.has(hash)) return null;
    seen.add(hash);
    const size = readDimensions(buf) ?? { width: 4, height: 3 };
    const urlPath = name.split("/").map(encodeURIComponent).join("/");
    return {
      src: `/images/photo/${urlPath}?v=${hash.slice(0, 10)}`,
      alt: photoAlts[fileName] ?? DEFAULT_ALT,
      ...size,
    };
  };

  return fs
    .readdirSync(PHOTO_DIR, { withFileTypes: true })
    .filter((entry) => !isHidden(entry.name) && (entry.isDirectory() || IMAGE_EXT.test(entry.name)))
    .sort((a, b) => byName(a.name, b.name))
    .flatMap((entry) => {
      const names = entry.isDirectory() ? listImages(entry.name) : [entry.name];
      const photos = names.map(toPhoto).filter((photo): photo is Photo => photo !== null);
      return photos.length > 0 ? [{ id: entry.name, photos }] : [];
    });
}
