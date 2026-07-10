import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="top-header" style={{ justifyContent: 'space-between' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="text-muted" style={{ fontSize: '14px' }}>Software Asset Management</span>
        <span style={{ color: 'hsl(var(--color-text-muted))' }}>/</span>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>Workspace Overview</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
        
        {/* Search */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-md)',
          padding: '6px 12px',
          width: '240px'
        }}>
          <Search size={16} className="text-muted" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search assets or users..." 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'hsl(var(--color-text-primary))',
              outline: 'none',
              width: '100%',
              fontSize: '14px'
            }} 
          />
        </div>

        {/* Notifications */}
        <button style={{ 
          background: 'transparent', 
          border: 'none', 
          color: 'hsl(var(--color-text-muted))',
          cursor: 'pointer',
          position: 'relative'
        }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            backgroundColor: 'hsl(var(--color-accent-danger))',
            borderRadius: '50%',
            boxShadow: '0 0 5px hsla(var(--color-accent-danger), 0.8)'
          }}></span>
        </button>

        {/* Profile */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '4px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-full)',
          cursor: 'pointer'
        }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'hsl(var(--color-bg-tertiary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={16} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500', paddingRight: '12px' }}>Admin</span>
        </div>

      </div>
    </header>
  );
};

export default Header;
