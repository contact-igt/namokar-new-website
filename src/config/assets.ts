/**
 * Single source of truth for every photograph and video on the site.
 *
 * Rules
 *  - `approved: false` means publication has NOT been authorised. Such an asset is
 *    never rendered and is never served in a normal build, in development or in production.
 *  - Do not change `approved` to true without the sign-off named in `approval`
 *    and a matching update to docs/NAMOKAR_CONTENT_VERIFICATION.md.
 *  - Files live in /private-assets (not /public). They are served only through
 *    /media/<file> (src/app/media/[file]/route.ts), which answers 404 unless the asset
 *    is approved or the review preview below is switched on.
 *
 * Review preview (never part of a production release)
 *  Set the SERVER variable ASSET_PREVIEW=on (it is deliberately not NEXT_PUBLIC_) to
 *  show pending assets for client review. Every pending asset then carries a visible
 *  "Preview only" tag. Running `next dev` alone does NOT show them. Never set
 *  ASSET_PREVIEW in the production environment.
 */

export type Asset = {
  file: string;
  kind: "image" | "video";
  width: number;
  height: number;
  alt: string;
  approved: boolean;
  /** Who is identifiable in it. */
  people:
    | "none"
    | "doctor"
    | "staff"
    | "doctor and staff"
    | "doctor and patient"
    | "staff and patient"
    | "doctor, staff and patient";
  /** Where it came from. Originals are never edited in place. */
  source: string;
  /** What sign-off is outstanding (or who gave it). */
  approval: string;
};

/**
 * Review preview switch (server-only). Forced off when the platform says this is a production
 * deployment, and /media additionally serves preview-only files to loopback hosts only
 * (see src/app/media/[file]/route.ts), so setting it on a public host cannot publish pending media.
 */
export const ASSET_PREVIEW =
  process.env.ASSET_PREVIEW === "on" && process.env.VERCEL_ENV !== "production";

/**
 * Release authorization (20 Oct 2026): the project owner stated that the client's medical and legal
 * teams have reviewed and approved the website's content and the selected photographs and the clinic
 * walkthrough, and authorized publication. It applies ONLY to media placed on a page, i.e. entries
 * with `approved: true`; an entry with `approved: false` was not selected for the website and stays
 * unpublished. The owner's statement is the source: no approval document, signatory or date was seen.
 * See docs/NAMOKAR_CONTENT_VERIFICATION.md and docs/launch/FINAL_RELEASE_STATUS.md.
 */
const OWNER_APPROVAL =
  "Release authorization of 20 Oct 2026 (the project owner's statement that the client's medical and legal teams approved the selected media). Applies only where approved is true.";

export const ASSETS = {
  logo: {
    file: "namokar-logo.webp",
    kind: "image",
    width: 819,
    height: 230,
    alt: "Namokar Eye & Oculoplasty Centre",
    approved: true,
    people: "none",
    source: "Live site Untitled-design-9.png, cropped to remove the NABH mark. Not altered otherwise.",
    approval: "Described by the project owner as the approved official logo.",
  },
  reception: {
    file: "hospital-reception.webp",
    kind: "image",
    width: 2000,
    height: 1440,
    alt: "The reception area at Namokar Eye & Oculoplasty Centre, with the Namokar logo on the wall behind the desk",
    approved: true,
    people: "staff",
    source: "July 2026 shoot, IMG_4308.heic, cropped on the right to remove a wall QR code.",
    approval: OWNER_APPROVAL,
  },
  consultation: {
    file: "hospital-consultation-room.webp",
    kind: "image",
    width: 2400,
    height: 1600,
    alt: "Dr. Poonam Jain beside a slit-lamp examination unit in a consultation room",
    approved: false,
    people: "doctor",
    source: "July 2026 shoot, IMG_0026.JPG.",
    approval: OWNER_APPROVAL,
  },
  theatre: {
    file: "hospital-operation-theatre.webp",
    kind: "image",
    width: 2400,
    height: 1600,
    alt: "An operation theatre with an operating microscope, instrument tables and an operating couch",
    approved: false,
    people: "none",
    source: "July 2026 shoot, IMG_0037.JPG.",
    approval: OWNER_APPROVAL,
  },
  equipment: {
    file: "hospital-equipment.webp",
    kind: "image",
    width: 1600,
    height: 900,
    alt: "A surgical console with a touchscreen on a trolley in the operation theatre",
    approved: true,
    people: "none",
    source: "Frame from July 2026 clip IMG_4266.MOV. The console's own brand name and a profile label are visible on screen.",
    approval: OWNER_APPROVAL,
  },
  portrait: {
    file: "dr-poonam-jain-portrait.webp",
    kind: "image",
    width: 1334,
    height: 2000,
    alt: "Dr. Poonam Jain in a white coat, standing beside a chair in a consultation room",
    approved: true,
    people: "doctor",
    source: "July 2026 shoot, IMG_0033.JPG.",
    approval: OWNER_APPROVAL,
  },
  clinicWalkthrough: {
    file: "clinic-walkthrough.mp4",
    kind: "video",
    width: 1920,
    height: 1094,
    alt: "A walk through Namokar Eye & Oculoplasty Centre: the street entrance, reception and examinations with diagnostic instruments, with sound",
    approved: true,
    people: "doctor, staff and patient",
    source:
      'Project root "namokar .mp4" (84,568,275 bytes, 30.4 s, 2528x1440, HEVC, 60 fps, AAC stereo), kept untouched and git-ignored. Web derivative: H.264 High, 1920x1094, 30 fps, about 3.2 Mbps, AAC 128k, fast-start, 12.3 MB.',
    approval: OWNER_APPROVAL,
  },
  clinicWalkthroughPoster: {
    file: "clinic-walkthrough-poster.webp",
    kind: "image",
    width: 1920,
    height: 1094,
    alt: "The street entrance of Namokar Eye & Oculoplasty Centre, with its name on the sign above the door",
    approved: true,
    people: "none",
    source: "Frame at 3.2 s of the walkthrough (street entrance, no caption overlay, no patient). A passer-by is very small in the distance.",
    approval: OWNER_APPROVAL,
  },
  walkthroughVideo: {
    file: "namokar-walkthrough.mp4",
    kind: "video",
    width: 1280,
    height: 720,
    alt: "Walkthrough of Namokar Eye & Oculoplasty Centre, without sound",
    approved: false,
    people: "none",
    source: "33-second silent cut from July 2026 clips IMG_4306, 4228, 4251, 4259, 4260, 4274, 4266, 4262, 4273. A gloved hand touches the frame edge in two clips.",
    approval: OWNER_APPROVAL,
  },
  walkthroughPoster: {
    file: "walkthrough-poster.webp",
    kind: "image",
    width: 1920,
    height: 1080,
    alt: "An operation theatre at Namokar Eye & Oculoplasty Centre",
    approved: false,
    people: "none",
    source: "Frame from July 2026 clip IMG_4260.MOV.",
    approval: OWNER_APPROVAL,
  },
  artIris: {
    file: "art-iris-macro.webp",
    kind: "image",
    width: 1920,
    height: 1072,
    alt: "Close-up of a brown iris lit with warm amber light",
    approved: false,
    people: "none",
    source: "AI-generated conceptual image, 15 Oct 2026 (assets-src/ai-generated/PROVENANCE.md). Not a photograph of any patient.",
    approval: OWNER_APPROVAL,
  },
  artLens: {
    file: "art-optical-lens.webp",
    kind: "image",
    width: 1600,
    height: 893,
    alt: "Transparent optical lenses on a light surface with warm light reflections",
    approved: false,
    people: "none",
    source: "AI-generated conceptual image, 15 Oct 2026 (assets-src/ai-generated/PROVENANCE.md).",
    approval: OWNER_APPROVAL,
  },
  exterior: {
    file: "hospital-exterior.webp",
    kind: "image",
    width: 2400,
    height: 1350,
    alt: "The street front of Namokar Eye & Oculoplasty Centre, with its signboard above the entrance",
    approved: true,
    people: "none",
    source: "Frame from July 2026 clip IMG_4217.MOV (about 1.8 s). The sign shows the legal entity line \"A unit of Kalos Health Care Pvt. Ltd.\" and a partly visible telephone block that is cropped out of this frame.",
    approval: OWNER_APPROVAL,
  },
  signboardOlder: {
    file: "hospital-signboard-older.webp",
    kind: "image",
    width: 360,
    height: 360,
    alt: "The older signboard above the entrance of Namokar Eye & Oculoplasty Centre",
    approved: true,
    people: "none",
    source: "Supplied by the project owner as public/images/hospital.webp (20 Oct 2026), 360x360 web copy; copied here, the original left in place. The board shows four telephone numbers, \"Residence Cum Clinic\", \"Sr. Consultant Max Hospital\" and the doctor's name with MS.",
    approval: "Selected by the project owner for the homepage centre carousel, 20 Oct 2026. The older signboard retains its visible phone numbers and affiliation line.",
  },
  otWide: {
    file: "hospital-ot-wide.webp",
    kind: "image",
    width: 2400,
    height: 1350,
    alt: "An operation theatre at the centre, with an operating microscope, equipment stand and operating couch",
    approved: false,
    people: "none",
    source: "Frame from July 2026 clip IMG_4274.MOV (about 1.0 s).",
    approval: OWNER_APPROVAL,
  },
  otScope: {
    file: "hospital-ot-scope.webp",
    kind: "image",
    width: 2400,
    height: 1350,
    alt: "An operating microscope and equipment in an operation theatre at the centre",
    approved: true,
    people: "none",
    source: "Frame from July 2026 clip IMG_4259.MOV (about 6.0 s).",
    approval: OWNER_APPROVAL,
  },
  consoleWide: {
    file: "hospital-console-wide.webp",
    kind: "image",
    width: 2400,
    height: 1350,
    alt: "A surgical console with a touchscreen beside an operating microscope in an operation theatre",
    approved: true,
    people: "none",
    source: "Frame from July 2026 clip IMG_4272.MOV (about 2.0 s). The microscope and console brand names are visible.",
    approval: OWNER_APPROVAL,
  },
  otEntrance: {
    file: "hospital-ot-entrance.webp",
    kind: "image",
    width: 2400,
    height: 1350,
    alt: "The glass entrance to the operation theatre complex, with a restricted-area sign",
    approved: true,
    people: "none",
    source: "Frame from July 2026 clip IMG_4251.MOV (about 2.0 s).",
    approval: OWNER_APPROVAL,
  },
  chartDoor: {
    file: "hospital-chart-door.webp",
    kind: "image",
    width: 1100,
    height: 1584,
    alt: "A wooden examination-room door with an eye-chart screen beside it",
    approved: true,
    people: "none",
    source: "Crop of a frame from July 2026 clip IMG_4228.MOV (about 1.5 s).",
    approval: OWNER_APPROVAL,
  },
  docDesk: {
    file: "dr-poonam-jain-desk.webp",
    kind: "image",
    width: 2400,
    height: 1600,
    alt: "Dr. Poonam Jain seated at her consultation desk, with a computer and a slit-lamp unit behind",
    approved: true,
    people: "doctor",
    source: "July 2026 shoot, IMG_0024.JPG.",
    approval: OWNER_APPROVAL,
  },
  docSlit: {
    file: "dr-poonam-jain-slit.webp",
    kind: "image",
    width: 2400,
    height: 1600,
    alt: "Dr. Poonam Jain seated beside a slit-lamp examination unit in a consultation room",
    approved: true,
    people: "doctor",
    source: "July 2026 shoot, IMG_0025.JPG.",
    approval: OWNER_APPROVAL,
  },
  docStanding: {
    file: "dr-poonam-jain-standing.webp",
    kind: "image",
    width: 2400,
    height: 1600,
    alt: "Dr. Poonam Jain standing in her consultation room with her arms folded",
    approved: false,
    people: "doctor",
    source: "July 2026 shoot, IMG_0027.JPG.",
    approval: OWNER_APPROVAL,
  },
  docBlazer: {
    file: "dr-poonam-jain-blazer.webp",
    kind: "image",
    width: 1334,
    height: 2000,
    alt: "Dr. Poonam Jain in a grey jacket standing in a consultation room",
    approved: true,
    people: "doctor",
    source: "July 2026 shoot, IMG_0032.JPG.",
    approval: OWNER_APPROVAL,
  },
  otModernA: {
    file: "hospital-ot-modern-a.webp",
    kind: "image",
    width: 2400,
    height: 1146,
    alt: "An operation theatre with an operating table, operating microscope, surgical console and a clock panel on the wall",
    approved: true,
    people: "none",
    source: "IMG_7483.HEIC. October 2026 file; the original is kept untouched outside the project, in a private media folder. Derivative: sRGB WebP, location and camera metadata stripped, cropped below a ceiling air-handling unit that carries its manufacturer's ISO/CE/QR label (a supplier's marks, not the centre's).",
    approval: OWNER_APPROVAL,
  },
  otModernB: {
    file: "hospital-ot-modern-b.webp",
    kind: "image",
    width: 2400,
    height: 1086,
    alt: "The same operation theatre from the door side, showing the operating table, operating microscope and a console on a stand",
    approved: true,
    people: "none",
    source: "IMG_7485.HEIC. October 2026 file; the original is kept untouched outside the project, in a private media folder. Derivative: sRGB WebP, location and camera metadata stripped, cropped below a ceiling air-handling unit that carries its manufacturer's ISO/CE/QR label (a supplier's marks, not the centre's).",
    approval: OWNER_APPROVAL,
  },
  otModernC: {
    file: "hospital-ot-modern-c.webp",
    kind: "image",
    width: 2400,
    height: 1336,
    alt: "An operation theatre from a corner, with shelving, a trolley, the operating table and the microscope",
    approved: true,
    people: "none",
    source: "IMG_7487.HEIC. October 2026 file; the original is kept untouched outside the project, in a private media folder. Derivative: sRGB WebP, location and camera metadata stripped, cropped below a ceiling air-handling unit that carries its manufacturer's ISO/CE/QR label (a supplier's marks, not the centre's).",
    approval: OWNER_APPROVAL,
  },
  vidOtTour: {
    file: "video-ot-tour.mp4",
    kind: "video",
    width: 720,
    height: 1280,
    alt: "A walk-through of the operation theatre area, without sound",
    approved: false,
    people: "none",
    source: "IMG_7326 (1).MOV (43 s, vertical 4K HEVC, 24 Mbps) re-encoded to 720x1280 H.264, no audio (original has only faint room noise). A masked surgeon is briefly visible through a window and in one room view; a hand opens a door.",
    approval: OWNER_APPROVAL,
  },
  vidOtTourPoster: {
    file: "video-ot-tour-poster.webp",
    kind: "image",
    width: 720,
    height: 1280,
    alt: "Shelves and a trolley in the operation theatre area",
    approved: false,
    people: "none",
    source: "Frame at 23 s of IMG_7326 (1).MOV.",
    approval: OWNER_APPROVAL,
  },
  vidDoctorScrubs: {
    file: "video-doctor-scrubs.mp4",
    kind: "video",
    width: 720,
    height: 1280,
    alt: "Dr. Poonam Jain in scrubs beside an examination instrument, turning to face the camera, without sound",
    approved: true,
    people: "doctor",
    source: "IMG_7441.MOV (5.8 s, 1080p, rotated) re-encoded to 720x1280 H.264, no audio (room noise only). Her name is on the scrubs.",
    approval: OWNER_APPROVAL,
  },
  vidDoctorScrubsPoster: {
    file: "video-doctor-scrubs-poster.webp",
    kind: "image",
    width: 720,
    height: 1280,
    alt: "Dr. Poonam Jain in scrubs beside an examination instrument",
    approved: true,
    people: "doctor",
    source: "Frame at 4.5 s of IMG_7441.MOV.",
    approval: OWNER_APPROVAL,
  },
  vidCataractExercise: {
    file: "video-post-cataract-exercise.mp4",
    kind: "video",
    width: 720,
    height: 1280,
    alt: "Dr. Poonam Jain explains when exercise can resume after cataract surgery",
    approved: true,
    people: "doctor",
    source: "Catract Excercise.m4v (77 s, 1080x1920 H.264, 9.8 Mbps) re-encoded to 720x1280 H.264 with AAC audio (speech). Branded with the Namokar logo; includes on-screen text, a patient wearing an eye shield and exercise illustrations that appear to be stock or generated footage (rights unknown). No captions or transcript yet.",
    approval: OWNER_APPROVAL,
  },
  vidCataractExercisePoster: {
    file: "video-post-cataract-exercise-poster.webp",
    kind: "image",
    width: 720,
    height: 1280,
    alt: "Title frame: Cataract surgery? When can you exercise?",
    approved: true,
    people: "doctor",
    source: "Frame at 0.8 s of Catract Excercise.m4v.",
    approval: OWNER_APPROVAL,
  },
  archCataractExam: {
    file: "archive-cataract-exam.webp",
    kind: "image",
    width: 2400,
    height: 1600,
    alt: "Dr. Poonam Jain examining a patient at a slit-lamp unit in a consultation room",
    approved: true,
    people: "doctor and patient",
    source: "Archive ZIP namokareyecare-website-frontend-main.zip (Oct 2026), public/assets/cataract/cataract-stitchless.JPG (6000x4000). Resized, metadata removed.",
    approval: OWNER_APPROVAL,
  },
  archExamOverhead: {
    file: "archive-exam-overhead.webp",
    kind: "image",
    width: 1600,
    height: 2400,
    alt: "Dr. Poonam Jain examining a patient at a slit-lamp unit; the patient is seen from behind",
    approved: true,
    people: "doctor and patient",
    source: "Archive ZIP namokareyecare-website-frontend-main.zip (Oct 2026), public/assets/Aesthetic/expected_approach_doctor.JPG (6000x4000, duplicate of cataract/why_choose_namokar_doctor.JPG). Rotated upright, resized, metadata removed.",
    approval: OWNER_APPROVAL,
  },
  archGlaucomaTest: {
    file: "archive-glaucoma-test.webp",
    kind: "image",
    width: 1059,
    height: 1590,
    alt: "A staff member and a patient at a pre-examination eye-testing instrument",
    approved: true,
    people: "staff and patient",
    source: "Archive ZIP namokareyecare-website-frontend-main.zip (Oct 2026), public/assets/Gallery/IMG_0009.JPG (1059x1590, web copy: no larger original supplied). Metadata removed.",
    approval: OWNER_APPROVAL,
  },
  archStaffEquipment: {
    file: "archive-staff-equipment.webp",
    kind: "image",
    width: 1059,
    height: 1590,
    alt: "A staff member seated beside an eye-testing instrument in an examination room",
    approved: true,
    people: "staff",
    source: "Archive ZIP namokareyecare-website-frontend-main.zip (Oct 2026), public/assets/Gallery/IMG_0062.JPG (1059x1590, web copy). Metadata removed.",
    approval: OWNER_APPROVAL,
  },
  archDoctorPortrait: {
    file: "archive-doctor-portrait.webp",
    kind: "image",
    width: 1200,
    height: 1200,
    alt: "Portrait of Dr. Poonam Jain in a white coat",
    approved: false,
    people: "doctor",
    source: "Archive ZIP namokareyecare-website-frontend-main.zip (Oct 2026), public/assets/Doctors/Main_doctor.png (1200x1200). The image looks retouched: confirm it is her approved portrait. Metadata removed.",
    approval: OWNER_APPROVAL,
  },
  archDoctorScrubs: {
    file: "archive-doctor-scrubs.webp",
    kind: "image",
    width: 1306,
    height: 1800,
    alt: "Dr. Poonam Jain smiling, seated at her desk in navy scrubs",
    approved: true,
    people: "doctor",
    source: "Archive ZIP namokareyecare-website-frontend-main.zip (Oct 2026), public/assets/about/about_doctor.png (1306x1800). Metadata removed.",
    approval: OWNER_APPROVAL,
  },
  archTeamDoctor: {
    file: "archive-team-doctor.webp",
    kind: "image",
    width: 1500,
    height: 1000,
    alt: "Dr. Poonam Jain with members of the centre's team in the waiting area",
    approved: true,
    people: "doctor and staff",
    source: "Archive ZIP namokareyecare-website-frontend-main.zip (Oct 2026), public/assets/Gallery/IMG_0053.JPG (1500x1000, web copy). Metadata removed.",
    approval: "Selected by the project owner for the homepage centre carousel, 20 Oct 2026.",
  },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof ASSETS;

/** Whether an asset may be shown right now (in page markup). */
export const usable = (a: Asset): boolean => a.approved || ASSET_PREVIEW;

/** Hosts for which preview-only media may be served: this machine only. */
export const isLoopbackHost = (host: string | null): boolean => {
  const h = (host ?? "").toLowerCase().replace(/:\d+$/, "");
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
};

/**
 * Did this request reach the server through a proxy or from another machine? A direct local
 * request carries no forwarding header; a hosted platform, a tunnel or a reverse proxy adds
 * X-Forwarded-For with the real client. Any non-loopback entry means "not this computer".
 */
export const forwardedFromElsewhere = (h: Headers): boolean => {
  const xff = h.get("x-forwarded-for");
  if (!xff) return false;
  return xff
    .split(",")
    .map((s) => s.trim().toLowerCase().replace(/^::ffff:/, ""))
    .some((ip) => ip && ip !== "127.0.0.1" && ip !== "::1");
};

/**
 * May the private review (pending media, the /review index) answer this request? Only when the
 * review preview is on, the Host is loopback and nothing says the request came from elsewhere.
 * A Host header is easy to forge, so this is NOT the main control: the review servers also listen
 * on 127.0.0.1 only (npm scripts dev:preview and start:preview), so another device cannot connect.
 */
export const previewRequestAllowed = (h: Headers): boolean =>
  ASSET_PREVIEW && isLoopbackHost(h.get("host")) && !forwardedFromElsewhere(h);

/** True when the asset is visible only because the review preview is on. */
export const previewOnly = (a: Asset): boolean => !a.approved && ASSET_PREVIEW;

/** Public URL. The logo is a normal public file; everything else goes through /media. */
export const srcOf = (a: Asset): string =>
  a === ASSETS.logo ? `/images/${a.file}` : `/media/${a.file}`;

export const assetByFile = (file: string): Asset | undefined =>
  Object.values(ASSETS).find((a) => a.file === file && a !== ASSETS.logo);
