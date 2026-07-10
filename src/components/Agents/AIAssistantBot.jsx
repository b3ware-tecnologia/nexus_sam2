import React, { useState } from 'react';
import { useSAM } from '../../context/SAMContext';
import { Bot, X, Sparkles, AlertCircle, ArrowRight, User } from 'lucide-react';

const AIAssistantBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const { getComplianceStatus, getWastedSpend, installations, harvestLicense } = useSAM();
  
  // Local state for chat
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', type: 'text', text: "Hello Admin! I'm your Nexus AI. Type anything to trigger a real-time audit scan." }
  ]);

  const idleCount = installations.filter(i => i.isIdle).length;
  const wasted = getWastedSpend();
  const compliance = getComplianceStatus();

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add User Message
    const newMsg = { id: Date.now(), sender: 'user', type: 'text', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulate AI thinking and replying context-aware info
    setTimeout(() => {
      let aiResp = { id: Date.now() + 1, sender: 'ai', type: 'text' };
      
      if (idleCount > 0) {
        aiResp.type = 'insight';
        aiResp.insightData = {
          title: 'Actionable Insight',
          msg: `I noticed ${idleCount} underutilized installations.`,
          savings: `$${wasted.toLocaleString()}/mo`
        };
      } else if (compliance < 100) {
        aiResp.text = `Attention! The company's compliance stands at ${compliance}%. Check the True-Up Engine on the Renewals tab!`;
      } else {
        aiResp.text = `System is fully optimized! 100% Compliance and $0 wasted spend. Great job!`;
      }

      setMessages(prev => [...prev, aiResp]);
    }, 800);
  };

  const handleHarvestAll = () => {
    installations.filter(i => i.isIdle).forEach(inst => harvestLicense(inst.id));
    setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', type: 'text', text: "All idle licenses have been harvested successfully!" }]);
  };

  if (!isOpen) {
    return (
      <button 
        style={{
          position: 'fixed', bottom: '32px', right: '32px', width: '56px', height: '56px',
          borderRadius: '50%', background: 'hsl(var(--color-accent-primary))', color: '#fff',
          border: 'none', boxShadow: 'var(--shadow-lg), var(--shadow-glow)', cursor: 'pointer', zIndex: 100
        }}
        onClick={() => setIsOpen(true)}
      >
        <Bot size={28} />
      </button>
    );
  }

  return (
    <div className="glass-panel" style={{
      position: 'fixed', bottom: '32px', right: '32px', width: '380px', height: '500px',
      zIndex: 100, display: 'flex', flexDirection: 'column', background: 'hsl(var(--color-bg-secondary) / 0.95)',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <div style={{
        padding: '16px', borderBottom: '1px solid var(--glass-border)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', background: 'hsla(var(--color-accent-primary), 0.1)',
        borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} className="text-accent" />
          <h3 style={{ margin: 0, fontSize: '16px' }}>Nexus AI Agent</h3>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-text-muted))', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {m.type === 'text' && (
              <div style={{
                background: m.sender === 'user' ? 'hsl(var(--color-bg-tertiary))' : 'hsla(var(--color-accent-primary), 0.1)',
                borderRadius: 'var(--radius-md)', padding: '12px', border: m.sender === 'user' ? '1px solid var(--glass-border)' : 'none',
                borderBottomRightRadius: m.sender === 'user' ? '0' : 'var(--radius-md)', borderTopLeftRadius: m.sender === 'ai' ? '0' : 'var(--radius-md)'
              }}>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>{m.text}</p>
              </div>
            )}
            {m.type === 'insight' && (
              <div style={{
                background: 'var(--glass-bg)', border: '1px solid hsla(var(--color-accent-warning), 0.3)',
                borderRadius: 'var(--radius-md)', padding: '16px'
              }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <AlertCircle size={18} color="hsl(var(--color-accent-warning))" />
                  <h4 style={{ margin: 0, fontSize: '14px', color: 'hsl(var(--color-text-primary))' }}>{m.insightData.title}</h4>
                </div>
                <p className="text-muted" style={{ fontSize: '13px', margin: '0 0 12px 0' }}>{m.insightData.msg}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'hsl(var(--color-bg-primary))', padding: '8px 12px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '12px' }}>Potential Savings:</span>
                  <span style={{ color: 'hsl(var(--color-accent-success))', fontWeight: 'bold' }}>{m.insightData.savings}</span>
                </div>
                <button onClick={handleHarvestAll} style={{ width: '100%', marginTop: '12px', background: 'hsl(var(--color-accent-primary))', color: '#fff', border: 'none', padding: '8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
                  Initiate global harvest
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
        <form onSubmit={handleSend} style={{
          display: 'flex', alignItems: 'center', background: 'hsl(var(--color-bg-primary))',
          borderRadius: 'var(--radius-full)', padding: '8px 16px', border: '1px solid var(--glass-border)'
        }}>
          <input type="text" placeholder="Trigge AI scanning..." value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '13px' }} />
          <button type="submit" style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-accent-primary))', cursor: 'pointer', display: 'flex' }}>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantBot;
