# Grains of Time — Account Ownership & Handoff Checklist

This document ensures that all digital assets, hosting environments, and content databases belong to the official **Grains of Time** organization rather than an individual student's personal account.

---

## 1. Core Accounts Checklist

| Service | Recommended Account Type | Primary Organization Email | Multi-Admin Configured? |
|---|---|---|---|
| **Domain Registrar** | Cloudflare / Namecheap | `grainsoftimencsu@gmail.com` | [ ] Yes (2+ Officers) |
| **GitHub** | Organization (`github.com/grainsoftime`) | Group Admin Account | [ ] Yes (2+ Admins) |
| **Vercel** | Team Account (Hobby or Pro) | Group Admin Account | [ ] Yes |
| **Sanity CMS** | Organization Account | Group Admin Account | [ ] Yes |
| **Email Service (Resend)** | Standard Account | `booking@grainsoftime.org` | [ ] Yes |
| **Shopify Partner** | Ladies in Red Collaboration | Affiliated Store Admin | [ ] Linked |

---

## 2. Transfer Procedures for Graduating Officers

### Step 1: GitHub Repository
1. Ensure the repository is located inside the `grainsoftime` GitHub organization, not a personal user profile.
2. Grant `Admin` rights to the incoming Business Manager and Webmaster.
3. Remove former officers from the GitHub organization at the end of the spring semester.

### Step 2: Vercel Hosting
1. In Vercel Project Settings → **Members**, invite the incoming webmaster.
2. Transfer project ownership to the Grains of Time team.
3. Review Environment Variables to ensure no personal email addresses are hardcoded.

### Step 3: Sanity Studio & Dataset
1. In [sanity.io/manage](https://www.sanity.io/manage), navigate to the Grains of Time project.
2. Invite incoming officers under **Project Members** with the `Editor` role.
3. Assign the incoming President/Webmaster as `Administrator`.
4. To export an archival backup of all site data and media:
   ```bash
   npx sanity dataset export production ./grains-backup-$(date +%F).tar.gz
   ```
   Store this backup on the group's Google Drive.

### Step 4: Domain & Cloudflare DNS
1. Ensure the domain renewal is set to **Auto-Renew** with an active student group credit/debit card.
2. Add the incoming treasurer/president as an account administrator in Cloudflare.
3. Verify that Two-Factor Authentication (2FA) recovery codes are stored in the executive password vault.

---

## 3. Meta / Instagram Graph API Configuration (Optional Live Feed)

If the ensemble wishes to connect the live Instagram feed in addition to the curated fallback showcase:
1. Ensure `@grainsoftime` is converted to a **Professional / Creator** account on Instagram.
2. Link the Instagram account to a Facebook Page managed by the organization.
3. In [developers.facebook.com](https://developers.facebook.com):
   - Create a Meta App with the **Instagram Graph API** product.
   - Generate a Long-Lived User Access Token with `instagram_basic` permissions.
4. Add the token and user ID to the Vercel Environment Variables:
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_USER_ID`
5. Note: Meta tokens expire every 60 days unless refreshed automatically via a cron trigger. If the token expires, the site automatically and gracefully falls back to the curated CMS showcase without breaking.
