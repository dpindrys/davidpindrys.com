import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type Photo = { src: string; alt: string; width: number; height: number };
export type PhotoGroup = {
  id: string;
  label: string;
  title: string;
  description: string;
  noun?: string;
  photos: Photo[];
};

type GroupCopy = Omit<PhotoGroup, "id" | "photos">;

const PHOTO_DIR = path.join(process.cwd(), "public/images/photo");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const EXCLUDED = new Set(["profile.jpg"]);
const DEFAULT_ALT = "Photo by David Pindrys";

const groupCopy: Record<string, GroupCopy> = {
  drawings: {
    label: "Figure drawing",
    title: "Learning to see, one pose at a time",
    description: "Quick gesture studies and longer charcoal pieces from figure drawing sessions.",
    noun: "drawings",
  },
  fes: {
    label: "Fes, Morocco",
    title: "Getting lost in the medina",
    description: "Everyday moments from the streets and cafés of the old city.",
  },
  me: {
    label: "Along the way",
    title: "Good people, good conversations",
    description: "Hackathons, conferences, and family, a few of the people who shape how I work.",
  },
  misha: {
    label: "Portrait",
    title: "An afternoon with Misha",
    description: "Watching games at an outdoor chess table with a regular who had seen it all.",
  },
  oaxaca: {
    label: "Oaxaca, Mexico",
    title: "The small routines of home",
    description: "A family, a wedding, and the everyday moments in between.",
  },
  trotitlan: {
    label: "Teotitlán del Valle, Mexico",
    title: "Where the red comes from",
    description: "Weavers grinding and dyeing wool by hand in a Zapotec weaving village.",
  },
  uganda: {
    label: "Uganda",
    title: "Out on the savanna",
    description: "A few days watching wildlife cross the grasslands.",
  },
};

const folderOrder: Record<string, string[]> = {
  drawings: ["1.jpeg", "2.jpeg", "3.jpeg", "face.jpg", "boxer.jpg", "swing.jpg", "sad.jpg", "beauty.jpg"],
  me: ["sonsiel.jpg"],
  oaxaca: ["corn.jpg"],
  uganda: ["giraffes.jpeg"],
};

const photoAlts: Record<string, string> = {
  "1.jpeg": "Quick pencil gesture drawing of a seated nude figure, one arm raised over the head.",
  "2.jpeg": "Quick pencil gesture drawing of a standing nude figure with arms crossed over the chest.",
  "3.jpeg": "Quick pencil gesture drawing of a standing nude figure in profile, one hand resting on the hip.",
  "face.jpg": "Charcoal drawing of a close-cropped face emerging from heavy shading, one eye and the nose in sharp detail.",
  "boxer.jpg": "Charcoal drawing of a man with a shaved head in profile, his shoulder and hand outlined in bold strokes.",
  "swing.jpg": "Charcoal drawing of a seated woman with long hair, her figure framed by dark, smudged shadows.",
  "sad.jpg": "Charcoal drawing of a shirtless older man in profile with his eyes closed, set against dark shading.",
  "beauty.jpg": "Framed charcoal drawing of a sleeping face resting on a pillow, rendered in abstract shapes of light and dark.",
  "maui.jpeg": "Three people in matching green Startup Weekend Maui shirts smiling on a lawn, one giving a shaka sign.",
  "seattle.jpeg": "A man adjusting a tracker on the arm of a person wearing a VR headset, with the virtual scene on a monitor behind them.",
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
  const order = folderOrder[dir] ?? [];
  const rank = (name: string) => {
    const index = order.indexOf(path.posix.basename(name));
    return index === -1 ? order.length : index;
  };
  return fs
    .readdirSync(path.join(PHOTO_DIR, dir), { recursive: true, encoding: "utf8" })
    .map((entry) => `${dir}/${entry.split(path.sep).join("/")}`)
    .filter((name) => IMAGE_EXT.test(name) && !isHidden(name))
    .sort((a, b) => rank(a) - rank(b) || byName(a, b));
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
      if (photos.length === 0) return [];
      const copy = groupCopy[entry.name] ?? { label: entry.name, title: entry.name, description: "" };
      return [{ id: entry.name, ...copy, photos }];
    });
}
