import React, { useState } from 'react';
import { Bot, X, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

const AIAssistantBot = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'hsl(var(--color-accent-primary))',
          color: '#fff',
          border: 'none',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100
        }}
        onClick={() => setIsOpen(true)}
      >
        <Bot size={28} />
      </button>
    );
  }

  return (
    <div className="glass-panel" style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      width: '380px',
      height: '500px',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      background: 'hsl(var(--color-bg-secondary) / 0.95)',
      boxShadow: 'var(--shadow-lg)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'hsla(var(--color-accent-primary), 0.1)',
        borderTopLeftRadius: 'var(--radius-lg)',
        borderTopRightRadius: 'var(--radius-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} className="text-accent" />
          <h3 style={{ margin: 0, fontSize: '16px' }}>Nexus AI Agent</h3>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-text-muted))', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Insight Card */}
        <div style={{
          background: 'var(--glass-bg)',
          border: '1px solid hsla(var(--color-accent-warning), 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <AlertCircle size={18} color="hsl(var(--color-accent-warning))" />
            <h4 style={{ margin: 0, fontSize: '14px', color: 'hsl(var(--color-text-primary))' }}>Cost Reduction Insight</h4>
          </div>
          <p className="text-muted" style={{ fontSize: '13px', margin: '0 0 12px 0' }}>
            I noticed <strong>350 licenses</strong> of Microsoft Office 365 E5 have been idle for over 45 days.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'hsl(var(--color-bg-primary))', padding: '8px 12px', borderRadius: '4px' }}>
            <span style={{ fontSize: '12px' }}>Potential Savings:</span>
            <span style={{ color: 'hsl(var(--color-accent-success))', fontWeight: 'bold' }}>$12,250/mo</span>
          </div>
          <button style={{
            width: '100%',
            marginTop: '12px',
            background: 'hsl(var(--color-accent-primary))',
            color: '#fff',
            border: 'none',
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500'
          }}>
            Initiate automated downgrade (Harvest)
          </button>
        </div>

        {/* Regular Message */}
        <div style={{
          background: 'hsla(var(--color-accent-primary), 0.1)',
          borderRadius: 'var(--radius-md)',
          borderTopLeftRadius: '0',
          padding: '12px',
          alignSelf: 'flex-start',
          maxWidth: '85%'
        }}>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>
            Hello Admin! I'm monitoring your renewals. You have an Oracle Database contract renewing in 60 days. Shall I run an audit simulation?
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--glass-border)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'hsl(var(--color-bg-primary))',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          border: '1px solid var(--glass-border)'
        }}>
          <input 
            type="text" 
            placeholder="Ask the AI agent..." 
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'hsl(var(--color-text-primary))',
              outline: 'none',
              fontSize: '13px'
            }}
          />
          <button style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-accent-primary))', cursor: 'pointer', display: 'flex' }}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantBot;
