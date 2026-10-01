import React from 'react';

export default function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 4px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: '#CC0000',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Urbanist', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: '16px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          color: '#F7F6F2',
          whiteSpace: 'nowrap',
        }}
      >
        Grains <span style={{ color: '#B4232F' }}>of</span> Time
      </span>
    </div>
  );
}
