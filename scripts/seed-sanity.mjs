// scripts/seed-sanity.mjs
// Standalone seeding script for Grains of Time members and site settings
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6g0hypo7';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.log('ℹ️ SANITY_API_WRITE_TOKEN is not set in environment.');
  console.log('The Studio UI (/studio) automatically syncs the members using your browser login credentials.');
  console.log('If you want to run this CLI script directly, run:');
  console.log('  SANITY_API_WRITE_TOKEN=your_token node scripts/seed-sanity.mjs\n');
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-01',
  token,
  useCdn: false,
});

const members = [
  {
    _id: "member-jonathan-crocker",
    name: "Jonathan Crocker",
    slug: "jonathan-crocker",
    vocalPart: "Tenor 1",
    status: "active",
    order: 1,
    imageFile: "Johnathan.jpeg",
    graduationYear: "Senior",
    major: "Business Administration - Finance",
    hometown: "Gastonia, NC",
    bio: "Senior Tenor I from Gastonia, NC studying Business Administration with a concentration in Finance.",
  },
  {
    _id: "member-landon-finley",
    name: "Landon Finley",
    slug: "landon-finley",
    vocalPart: "Tenor 1",
    status: "active",
    order: 2,
    imageFile: "Landon.jpeg",
    graduationYear: "Freshman",
    major: "Political Science",
    hometown: "Greenville, SC",
    bio: "Freshman Tenor I from Greenville, SC studying Political Science.",
  },
  {
    _id: "member-caleb-hofheinz",
    name: "Caleb Hofheinz",
    slug: "caleb-hofheinz",
    vocalPart: "Tenor 1",
    status: "active",
    order: 3,
    imageFile: "Caleb.jpeg",
    graduationYear: "Junior",
    major: "Business Administration - Supply Chain & Operations",
    hometown: "Durham, NC",
    bio: "Junior Tenor I from Durham, NC studying Business Administration with a concentration in Supply Chain & Operations.",
  },
  {
    _id: "member-max-haugh",
    name: "Max Haugh",
    slug: "max-haugh",
    vocalPart: "Tenor 2",
    status: "active",
    order: 4,
    leadershipRole: "Music Director",
    imageFile: "Max.jpeg",
    graduationYear: "Junior",
    major: "Psychology",
    hometown: "Cary, NC",
    bio: "Junior Tenor II and Music Director from Cary, NC studying Psychology.",
  },
  {
    _id: "member-davis-churn",
    name: "Davis Churn",
    slug: "davis-churn",
    vocalPart: "Tenor 2",
    status: "active",
    order: 5,
    leadershipRole: "President",
    imageFile: "Davis.jpeg",
    graduationYear: "Junior",
    major: "Communications",
    hometown: "Winston-Salem, NC",
    bio: "Junior Tenor II and Ensemble President from Winston-Salem, NC studying Communications.",
  },
  {
    _id: "member-isaac-casazza",
    name: "Isaac Casazza",
    slug: "isaac-casazza",
    vocalPart: "Tenor 2 / Baritone 1",
    status: "active",
    order: 6,
    leadershipRole: "Choreographer & Assistant Music Director",
    imageFile: "Isaac.jpeg",
    graduationYear: "Sophomore",
    major: "Genetics",
    hometown: "Greenville, SC",
    bio: "Sophomore Tenor II / Baritone I, Choreographer & Assistant Music Director from Greenville, SC studying Genetics.",
  },
  {
    _id: "member-zeke-szilagyi",
    name: "Zeke Szilagyi",
    slug: "zeke-szilagyi",
    vocalPart: "Baritone",
    status: "active",
    order: 7,
    leadershipRole: "Business Manager",
    imageFile: "Zeke.jpeg",
    graduationYear: "Junior",
    major: "Economics",
    hometown: "Davidson, NC",
    bio: "Junior Baritone and Business Manager from Davidson, NC studying Economics.",
  },
  {
    _id: "member-brock-w-reece",
    name: "Brock W Reece",
    slug: "brock-w-reece",
    vocalPart: "Baritone",
    status: "active",
    order: 8,
    imageFile: "Brock.jpeg",
    graduationYear: "Junior",
    major: "Mathematics & Mathematics Education (x2)",
    hometown: "Elkin, NC",
    bio: "Junior Baritone from Elkin, NC pursuing a double major in Mathematics and Mathematics Education.",
  },
  {
    _id: "member-aaron-simpson",
    name: "Aaron Simpson",
    slug: "aaron-simpson",
    vocalPart: "Baritone",
    status: "active",
    order: 9,
    imageFile: null,
    graduationYear: "Senior",
    major: "Mechanical Engineering",
    hometown: "Montrose, CO",
    bio: "Senior Baritone from Montrose, CO studying Mechanical Engineering.",
  },
  {
    _id: "member-zackary-mendoza",
    name: "Zackary Mendoza",
    slug: "zackary-mendoza",
    vocalPart: "Baritone 2 / VP",
    status: "active",
    order: 10,
    imageFile: "Zackary.jpeg",
    graduationYear: "Junior",
    major: "Science Technology and Society",
    hometown: "Fayetteville, NC",
    bio: "Junior Baritone II and Vocal Percussionist from Fayetteville, NC studying Science, Technology and Society.",
  },
  {
    _id: "member-sid-zaveri",
    name: "Sid Zaveri",
    slug: "sid-zaveri",
    vocalPart: "Baritone",
    status: "active",
    order: 11,
    imageFile: "Sid.jpeg",
    graduationYear: "Freshman",
    major: "Biomedical Engineering",
    hometown: "Chapel Hill, NC",
    bio: "Freshman Baritone from Chapel Hill, NC studying Biomedical Engineering.",
  },
  {
    _id: "member-nikolai-nawrocki",
    name: "Nikolai Nawrocki",
    slug: "nikolai-nawrocki",
    vocalPart: "Baritone",
    status: "active",
    order: 12,
    imageFile: "Nikolai.jpeg",
    graduationYear: "Freshman",
    major: "Computer Science",
    hometown: "Wayne, PA",
    bio: "Freshman Baritone from Wayne, PA studying Computer Science.",
  },
  {
    _id: "member-noah-hamilton",
    name: "Noah Hamilton",
    slug: "noah-hamilton",
    vocalPart: "Bass",
    status: "active",
    order: 13,
    imageFile: "Noah.jpeg",
    graduationYear: "Freshman",
    major: "Engineering (First Year)",
    hometown: "Raleigh, NC",
    bio: "Freshman Bass with the Grains of Time pursuing Engineering at NC State.",
  },
  {
    _id: "member-jude-kasti",
    name: "Jude Kasti",
    slug: "jude-kasti",
    vocalPart: "Bass / VP",
    status: "active",
    order: 14,
    leadershipRole: "Publicist",
    imageFile: "Jude.jpeg",
    graduationYear: "Sophomore",
    major: "Architecture",
    hometown: "Tampa, FL",
    bio: "Sophomore Bass / Vocal Percussionist and Ensemble Publicist from Tampa, FL studying Architecture.",
  },
  {
    _id: "member-henry-mitchell",
    name: "Henry Mitchell",
    slug: "henry-mitchell",
    vocalPart: "Bass",
    status: "active",
    order: 15,
    leadershipRole: "Concert Coordinator",
    imageFile: "Henry.jpeg",
    graduationYear: "Senior",
    major: "Statistics",
    hometown: "Durham, NC",
    bio: "Senior Bass and Concert Coordinator from Durham, NC studying Statistics.",
  },
];

async function seed() {
  console.log(`Starting seed to Sanity project "${projectId}", dataset "${dataset}"...`);

  for (const m of members) {
    console.log(`Processing ${m.name}...`);
    let portraitAssetId = null;

    if (m.imageFile) {
      const imgPath = path.join(rootDir, 'public', 'headshots', m.imageFile);
      if (fs.existsSync(imgPath)) {
        try {
          const stream = fs.createReadStream(imgPath);
          const asset = await client.assets.upload('image', stream, {
            filename: `${m.slug}.jpeg`,
            contentType: 'image/jpeg',
          });
          portraitAssetId = asset._id;
          console.log(`  Uploaded image asset: ${asset._id}`);
        } catch (err) {
          console.warn(`  Warning: Failed to upload image for ${m.name}:`, err.message);
        }
      }
    }

    const doc = {
      _id: m._id,
      _type: 'member',
      name: m.name,
      slug: { _type: 'slug', current: m.slug },
      status: 'active',
      vocalPart: m.vocalPart,
      order: m.order,
      graduationYear: m.graduationYear,
      major: m.major,
      hometown: m.hometown,
      bio: m.bio,
    };

    if (m.leadershipRole) {
      doc.leadershipRole = m.leadershipRole;
    }

    if (portraitAssetId) {
      doc.portrait = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: portraitAssetId,
        },
        alt: `Portrait of ${m.name}`,
      };
    }

    await client.createOrReplace(doc);
    console.log(`  Created/updated document: ${m._id}`);
  }

  console.log('\nAll 15 members successfully seeded to Sanity!');

  console.log('\nSeeding Repertoire Setlist to Sanity...');
  const repertoireItems = [
    { _id: "rep-all-i-ask", title: "All I Ask", originalArtist: "Adele", category: "Ballad", yearPerformed: "2025–2026", status: "current", order: 10 },
    { _id: "rep-holding-out-for-a-hero", title: "Holding Out For a Hero", originalArtist: "Bonnie Tyler", category: "Classic Rock", yearPerformed: "2025–2026", status: "current", order: 20 },
    { _id: "rep-telephone", title: "Telephone", originalArtist: "Lady Gaga ft. Beyoncé", category: "Contemporary Pop", yearPerformed: "2025–2026", status: "current", order: 30 },
    { _id: "rep-the-call", title: "The Call", originalArtist: "Backstreet Boys", category: "Contemporary Pop", yearPerformed: "2025–2026", status: "current", order: 40 },
    { _id: "rep-take-it-easy", title: "Take It Easy", originalArtist: "Eagles", category: "Classic Rock", yearPerformed: "2025–2026", status: "current", order: 50 },
    { _id: "rep-4-minutes", title: "4 Minutes", originalArtist: "Justin Timberlake & Madonna", category: "Contemporary Pop", yearPerformed: "2025–2026", status: "current", order: 60 },
    { _id: "rep-because-of-you", title: "Because of You", originalArtist: "Kelly Clarkson", category: "Ballad", yearPerformed: "2025–2026", status: "current", order: 70 },
    { _id: "rep-perfect", title: "Perfect", originalArtist: "One Direction", category: "Contemporary Pop", yearPerformed: "2025–2026", status: "current", order: 80 },
    { _id: "rep-set-fire-to-the-rain", title: "Set Fire to the Rain", originalArtist: "Adele", category: "Contemporary Pop", yearPerformed: "2025–2026", status: "current", order: 90 },
    { _id: "rep-know-that-i-know", title: "Know That I Know", originalArtist: "Lake Street Dive", category: "Soul & R&B", yearPerformed: "2025–2026", status: "current", order: 100 },
    { _id: "rep-dive", title: "Dive", originalArtist: "Luke Combs", category: "Country", yearPerformed: "2025–2026", status: "current", order: 110 },
    { _id: "rep-drift-away", title: "Drift Away", originalArtist: "Uncle Kracker", category: "Soul & R&B", yearPerformed: "2025–2026", status: "current", order: 120 },
    { _id: "rep-my-girl", title: "My Girl", originalArtist: "The Temptations", category: "Soul & R&B", yearPerformed: "2025–2026", status: "current", order: 130 },
    { _id: "rep-aint-too-proud-to-beg", title: "Ain’t Too Proud to Beg", originalArtist: "The Temptations", category: "Soul & R&B", yearPerformed: "2025–2026", status: "current", order: 140 },
    { _id: "rep-keep-me-in-mind", title: "Keep Me in Mind", originalArtist: "Zac Brown Band", category: "Country", yearPerformed: "2025–2026", status: "current", order: 150 },
    { _id: "rep-7-bridges-road", title: "7 Bridges Road", originalArtist: "Eagles", category: "Classic Rock", yearPerformed: "2025–2026", status: "current", order: 160 },
    { _id: "rep-in-a-hurry", title: "In a Hurry", originalArtist: "Alabama", category: "Country", yearPerformed: "2025–2026", status: "current", order: 170 },
    { _id: "rep-so-hard-to-say-goodbye", title: "So Hard to Say Goodbye", originalArtist: "Boyz II Men", category: "Soul & R&B", yearPerformed: "2025–2026", status: "current", order: 180 },
    { _id: "rep-nc-state-alma-mater", title: "NC State Alma Mater", originalArtist: "Alvin M. Fountain & Bonnie Frank Norris", arranger: "Grains of Time", category: "NC State Tradition", yearPerformed: "Perennial", status: "current", notes: "Signature university anthem performed at convocations, graduations, and Wolfpack athletic events.", order: 190 },
    { _id: "rep-national-anthem", title: "The Star-Spangled Banner (National Anthem)", originalArtist: "Francis Scott Key", arranger: "Grains of Time", category: "NC State Tradition", yearPerformed: "Perennial", status: "current", notes: "Traditional vocal arrangement for ceremonial and athletic showcases across North Carolina.", order: 200 },
    { _id: "rep-signed-sealed-delivered", title: "Signed, Sealed, Delivered I'm Yours", originalArtist: "Stevie Wonder", category: "Soul & R&B", yearPerformed: "2023–2024", status: "archived", order: 210 },
    { _id: "rep-september", title: "September", originalArtist: "Earth, Wind & Fire", category: "Classic Rock", yearPerformed: "2022–2023", status: "archived", order: 220 },
  ];

  for (const song of repertoireItems) {
    const songDoc = {
      _id: song._id,
      _type: 'repertoireItem',
      title: song.title,
      originalArtist: song.originalArtist,
      category: song.category,
      status: song.status,
      yearPerformed: song.yearPerformed,
      order: song.order,
    };
    if (song.arranger) songDoc.arranger = song.arranger;
    if (song.notes) songDoc.notes = song.notes;

    await client.createOrReplace(songDoc);
    console.log(`  Created/updated song: ${song.title}`);
  }

  console.log(`\nAll ${repertoireItems.length} repertoire items successfully seeded to Sanity!`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
