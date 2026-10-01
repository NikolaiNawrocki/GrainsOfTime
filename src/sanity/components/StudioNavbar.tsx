import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavbarProps, useClient } from 'sanity';
import { fallbackMembers, fallbackRepertoire, fallbackSiteSettings, fallbackAboutPage } from '@/lib/data/fallbackContent';

export default function StudioNavbar(props: NavbarProps) {
  const client = useClient({ apiVersion: '2024-03-01' });
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [repertoireCount, setRepertoireCount] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [syncError, setSyncError] = useState<string | null>(null);
  const hasAutoSynced = useRef<boolean>(false);

  const fetchMemberCount = useCallback(async () => {
    try {
      const count = await client.fetch('count(*[_type == "member" && status == "active"])');
      setMemberCount(count);
      return count;
    } catch (err) {
      console.warn('Could not fetch active member count:', err);
      return null;
    }
  }, [client]);

  const fetchRepertoireCount = useCallback(async () => {
    try {
      const count = await client.fetch('count(*[_type == "repertoireItem"])');
      setRepertoireCount(count);
      return count;
    } catch (err) {
      console.warn('Could not fetch repertoire count:', err);
      return null;
    }
  }, [client]);

  const syncRepertoire = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncError(null);
    setStatusText('Syncing 20 setlist songs into Sanity Studio...');

    try {
      for (let i = 0; i < fallbackRepertoire.length; i++) {
        const item = fallbackRepertoire[i];
        setStatusText(`Creating song ${i + 1}/${fallbackRepertoire.length}: ${item.title}...`);

        const doc: { _id: string; _type: string; [key: string]: unknown } = {
          _id: item._id,
          _type: 'repertoireItem',
          title: item.title,
          originalArtist: item.originalArtist,
          category: item.category,
          status: item.status,
          yearPerformed: item.yearPerformed,
          order: item.order,
        };

        if (item.arranger) doc.arranger = item.arranger;
        if (item.notes) doc.notes = item.notes;

        await client.createOrReplace(doc);
      }

      const finalCount = await fetchRepertoireCount();
      setStatusText(`✅ All ${finalCount || fallbackRepertoire.length} setlist songs synced to Studio!`);
      setTimeout(() => {
        setStatusText('');
      }, 5000);
    } catch (err: unknown) {
      console.error('Failed to sync repertoire:', err);
      const message = err instanceof Error ? err.message : 'Sync failed';
      setSyncError(message);
    } finally {
      setIsSyncing(false);
    }
  }, [client, isSyncing, fetchRepertoireCount]);

  const syncRoster = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncError(null);
    setStatusText('Creating member records...');

    try {
      // 1. Create or update all active member records first so they appear instantly
      for (let i = 0; i < fallbackMembers.length; i++) {
        const m = fallbackMembers[i];
        setStatusText(`Creating record ${i + 1}/${fallbackMembers.length}: ${m.name}...`);

        const cleanMajor =
          m.major && !m.major.includes('Pending')
            ? m.major
            : 'Engineering (First Year)';
        const cleanHometown =
          m.hometown && !m.hometown.includes('Pending')
            ? m.hometown
            : 'Raleigh, NC';

        const doc: { _id: string; _type: string; [key: string]: unknown } = {
          _id: m._id,
          _type: 'member',
          name: m.name,
          slug: { _type: 'slug', current: m.slug },
          status: 'active',
          vocalPart: m.vocalPart,
          order: m.order,
          graduationYear: m.graduationYear ? String(m.graduationYear) : 'Freshman',
          major: cleanMajor,
          hometown: cleanHometown,
          bio: m.bio || `${m.vocalPart} with Grains of Time.`,
        };

        if (m.leadershipRole) {
          doc.leadershipRole = m.leadershipRole;
        }

        await client.createOrReplace(doc);
      }

      setMemberCount(fallbackMembers.length);
      setStatusText('Member records created! Uploading official headshots...');

      // 2. Upload and attach portrait headshots asynchronously
      for (let i = 0; i < fallbackMembers.length; i++) {
        const m = fallbackMembers[i];
        if (!m.imageUrl) continue;

        setStatusText(`Uploading portrait ${i + 1}/${fallbackMembers.length}: ${m.name}...`);

        try {
          const res = await fetch(m.imageUrl);
          if (res.ok) {
            const blob = await res.blob();
            const asset = await client.assets.upload('image', blob, {
              filename: `${m.slug}.jpeg`,
              contentType: 'image/jpeg',
            });

            if (asset?._id) {
              await client
                .patch(m._id)
                .set({
                  portrait: {
                    _type: 'image',
                    asset: {
                      _type: 'reference',
                      _ref: asset._id,
                    },
                    alt: `Portrait of ${m.name}`,
                  },
                })
                .commit();
            }
          }
        } catch (uploadErr) {
          console.warn(`Could not upload photo for ${m.name}:`, uploadErr);
        }
      }

      // 3. Sync Repertoire Setlist
      setStatusText('Syncing active setlist songs...');
      for (let i = 0; i < fallbackRepertoire.length; i++) {
        const item = fallbackRepertoire[i];
        const doc: { _id: string; _type: string; [key: string]: unknown } = {
          _id: item._id,
          _type: 'repertoireItem',
          title: item.title,
          originalArtist: item.originalArtist,
          category: item.category,
          status: item.status,
          yearPerformed: item.yearPerformed,
          order: item.order,
        };
        if (item.arranger) doc.arranger = item.arranger;
        if (item.notes) doc.notes = item.notes;

        await client.createOrReplace(doc);
      }

      // 4. Optional: Seed siteSettings and aboutPage if empty
      try {
        const settingsCount = await client.fetch('count(*[_id == "siteSettings"])');
        if (settingsCount === 0) {
          await client.createIfNotExists({
            _id: 'siteSettings',
            _type: 'siteSettings',
            title: fallbackSiteSettings.title,
            description: fallbackSiteSettings.description,
            contactEmail: fallbackSiteSettings.contactEmail,
            bookingEmail: fallbackSiteSettings.bookingEmail,
            locationAffiliation: fallbackSiteSettings.locationAffiliation,
            foundedYear: fallbackSiteSettings.foundedYear,
            announcement: fallbackSiteSettings.announcement,
            socialLinks: fallbackSiteSettings.socialLinks,
          });
        }

        const aboutCount = await client.fetch('count(*[_id == "aboutPage"])');
        if (aboutCount === 0) {
          await client.createIfNotExists({
            _id: 'aboutPage',
            _type: 'aboutPage',
            heading: fallbackAboutPage.heading,
            subtitle: fallbackAboutPage.subtitle,
            storyEyebrow: fallbackAboutPage.storyEyebrow,
            pullQuote: fallbackAboutPage.pullQuote,
            missionHeading: fallbackAboutPage.missionHeading,
            missionText: fallbackAboutPage.missionText,
            valuesItems: fallbackAboutPage.valuesItems,
          });
        }
      } catch (extraErr) {
        console.warn('Could not seed singleton pages:', extraErr);
      }

      const finalCount = await fetchMemberCount();
      await fetchRepertoireCount();
      setStatusText(`✅ All ${finalCount || fallbackMembers.length} members and ${fallbackRepertoire.length} setlist songs synced!`);
      setTimeout(() => {
        setStatusText('');
      }, 5000);
    } catch (err: unknown) {
      console.error('Failed to sync members:', err);
      const message = err instanceof Error ? err.message : 'Sync failed';
      setSyncError(message);
    } finally {
      setIsSyncing(false);
    }
  }, [client, isSyncing, fetchMemberCount, fetchRepertoireCount]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const [mCount, rCount] = await Promise.all([
        fetchMemberCount(),
        fetchRepertoireCount(),
      ]);
      if (!isMounted) return;
      if (!hasAutoSynced.current) {
        if (mCount === 0) {
          hasAutoSynced.current = true;
          await syncRoster();
        } else if (rCount === 0) {
          hasAutoSynced.current = true;
          await syncRepertoire();
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [fetchMemberCount, fetchRepertoireCount, syncRoster, syncRepertoire]);

  return (
    <div>
      {props.renderDefault(props)}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '8px 16px',
          backgroundColor: '#141418',
          borderBottom: '1px solid #26262D',
          fontSize: '12px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ color: '#E4E3DD', fontWeight: 600, letterSpacing: '0.04em' }}>
            Website Content Manager
          </span>

          <span style={{ color: '#4B4B55' }}>|</span>

          {/* Member Roster Sync Status */}
          {isSyncing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#F59E0B',
                  animation: 'pulse 1.5s infinite',
                }}
              />
              <span style={{ fontSize: '11px', color: '#FDE68A' }}>{statusText}</span>
            </div>
          ) : syncError ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#EF4444', fontSize: '11px' }}>⚠️ Sync error: {syncError}</span>
              <button
                type="button"
                onClick={syncRoster}
                style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Retry Sync
              </button>
            </div>
          ) : memberCount === 0 || repertoireCount === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#F59E0B', fontSize: '11px' }}>
                ⚠️ {memberCount === 0 ? 'Members' : ''} {repertoireCount === 0 ? 'Setlist' : ''} not yet in database
              </span>
              <button
                type="button"
                onClick={syncRoster}
                style={{
                  background: '#CC0000',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ⚡ Sync 20 Setlist Songs & Roster
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span
                style={{
                  color: '#10B981',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                  }}
                />
                {memberCount !== null ? `${memberCount} Members` : 'Roster Synced'}
              </span>

              <span style={{ color: '#4B4B55' }}>•</span>

              <span
                style={{
                  color: '#10B981',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                  }}
                />
                {repertoireCount !== null ? `${repertoireCount} Songs in Setlist` : 'Setlist Synced'}
              </span>

              {statusText && (
                <span style={{ color: '#9CA3AF', fontSize: '11px' }}>{statusText}</span>
              )}

              <button
                type="button"
                onClick={syncRepertoire}
                title="Re-sync 20 setlist songs to Sanity Studio"
                style={{
                  background: 'transparent',
                  color: '#9CA3AF',
                  border: '1px solid #374151',
                  borderRadius: '3px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                ↺ Re-sync Setlist
              </button>

              <button
                type="button"
                onClick={syncRoster}
                title="Re-sync initial member profiles and portraits to Sanity"
                style={{
                  background: 'transparent',
                  color: '#9CA3AF',
                  border: '1px solid #374151',
                  borderRadius: '3px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                ↺ Re-sync All
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#CC0000',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '11px',
              padding: '4px 8px',
              borderRadius: '3px',
              backgroundColor: 'rgba(204, 0, 0, 0.08)',
              border: '1px solid rgba(204, 0, 0, 0.25)',
            }}
          >
            ↗ View Live Website
          </a>
        </div>
      </div>
    </div>
  );
}
