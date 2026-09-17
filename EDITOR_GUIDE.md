# Grains of Time — Non-Technical Editor Guide

Welcome to the content administration guide for **Grains of Time**. This handbook explains how officers and webmasters can update site content, manage rosters, announce concerts, and review booking inquiries without touching code.

---

## 1. Accessing Sanity Studio

1. Navigate to: `https://grainsoftime.com/studio` (or `http://localhost:3000/studio` in development).
2. Log in using your authorized Grains of Time email address (Google or GitHub authentication).
3. The Studio dashboard displays the left-hand navigation organizing all site records:
   - **Site Settings & Navigation**
   - **Current Ensemble & Alumni**
   - **Concerts & Events**
   - **Living Archive / Timeline**
   - **Photo Gallery**
   - **Repertoire & Setlists**
   - **Discography & Releases**
   - **Booking Inquiries**

---

## 2. Managing the Ensemble Roster

### Adding a New Member
1. Click **Current Ensemble & Alumni** → **Active Ensemble**.
2. Click the **+ Create** button in the top right.
3. Fill in the fields:
   - **Full Name**: e.g., *Johnathan Wolf*
   - **Slug**: Click **Generate** to automatically create the URL slug.
   - **Roster Status**: Set to `Current Active Member`.
   - **Vocal Part**: Select `Tenor 1`, `Tenor 2`, `Baritone`, `Bass`, or `Vocal Percussion`.
   - **Display Order**: Numbers dictate sort order (e.g. 10, 20, 30).
   - **Executive Role**: (Optional) e.g., *President*, *Music Director*, *Business Manager*.
   - **Portrait Image**: Upload portrait. **Important**: Click the crop icon to set the focal point on the member's face so mobile cropping never cuts off heads. Provide meaningful **Alt Text**.
   - **Graduation Year**, **Major**, **Hometown**, **Bio**, **Fun Fact**, and **Favorite Song**.
4. Click **Publish** (green button bottom right).

### Moving a Member to Alumni Status
When a member graduates:
1. Open the member's profile in the Studio.
2. Change **Roster Status** from `Current Active Member` to `Alumni / Former Member`.
3. Ensure their **Graduation Year** is populated.
4. Click **Publish**. They will seamlessly move from the active ensemble grid to the alumni records.

---

## 3. Managing Concerts & Performances

### Announcing a New Concert
1. Click **Concerts & Events** → **Upcoming & Active**.
2. Click **+ Create**.
3. Fill in:
   - **Event Title**: e.g., *Spring 2027 Finale Showcase*
   - **Start Date & Time**: Set exact date and local start time.
   - **Venue Name**: e.g., *Stewart Theatre, Talley Student Union*
   - **Category**: Concert, Campus Event, Auditions, etc.
   - **Short Summary**: 1–2 sentences explaining the event.
   - **Ticket / RSVP Link**: Direct link to university ticketing platform or free registration.
   - **Feature on Homepage**: Toggle **ON** to highlight this concert on the homepage banner card.
   - **Status**: Set to `Published (Active)`.
4. Click **Publish**.

### Updating Event Status (Sold Out / Cancelled)
- If a show sells out, change the status to `Sold Out`. A prominent badge will appear automatically.
- If weather forces a cancellation, change the status to `Cancelled`.

### Archiving a Concluded Concert
1. Open the event record.
2. Change **Event Status** to `Archived (Past Performance)`.
3. (Optional) Add the final **Concert Setlist** or a short **Recap**.
4. Click **Publish**. The event will move to the "Past Performances Archive" tab.

---

## 4. Repertoire & Setlists

1. Click **Repertoire & Setlists**.
2. To add a chart:
   - Enter **Song Title**, **Original Artist**, and **Arranger** (credit student arrangers!).
   - Set status to `Current Concert Setlist` or `Archived Setlist`.
   - Select Genre / Category (e.g., Contemporary Pop, NC State Tradition).
   - (Optional) Provide a link to an official audio or performance video.
3. Click **Publish**.

---

## 5. Photo Gallery & Archival Scans

1. Click **Photo Gallery** (or **Living Archive / Timeline**).
2. Upload high-resolution JPEG or PNG photographs.
3. **Always populate**:
   - **Alternative Text**: A brief description of the photo for accessibility (e.g., *"Grains of Time tenor section performing at Stewart Theatre"*).
   - **Photographer Credit**: Attribution for student media, university archives, or freelance photographers.
   - **Caption**: Context about the show or rehearsal.
   - **Tags**: Live Concerts, Rehearsals, Tours, or Archival.
4. Click **Publish**.

---

## 6. Reviewing Booking Inquiries

1. Click **Booking Inquiries** → **New / Unread**.
2. Client submissions through `/book` appear here with:
   - Client name, organization, contact email, and phone number.
   - Requested date, venue, event category, and budget range.
   - Full message detailing technical requirements.
3. After contacting the client, the Business Manager can change the status from `New / Unread` to `In Communication` or `Confirmed Booking`.

---

## 7. Site Settings & External Links

To update organization links, banner notices, or merch URLs:
1. Click **Site Settings & Navigation**.
2. Update:
   - **Announcement Banner**: Toggle ON/OFF and enter short text (e.g. *"Fall Auditions Saturday at Price Music Center"*).
   - **Social Links**: Enter verified URLs for Instagram, Spotify, YouTube, or GoFundMe.
   - **Merch URL**: Updates the destination for the "Visit Online Store" button.
3. Click **Publish**.

---

## 8. Offboarding Graduating Officers (Access Control)

To maintain security, access to Sanity Studio should be audited at the end of each academic year:
1. The Primary Admin logs into [sanity.io/manage](https://www.sanity.io/manage).
2. Navigate to your project → **Team / Members**.
3. Locate the graduating officer's account.
4. Click the options menu (`...`) next to their name and select **Remove Member**.
5. Invite incoming officers with the **Editor** role.
