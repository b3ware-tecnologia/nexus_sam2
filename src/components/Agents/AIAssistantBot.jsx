import React, { useState } from 'react';
import { useSAM } from '../../context/SAMContext';
import { Bot, X, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

const AIAssistantBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const { installations, harvestLicense } = useSAM();
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', type: 'text', text: "Hello Admin! I'm integrated directly to our physical Database now. Ask me to scan for harvesting!" }
  ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Enviar User Message
    const userMsg = { id: Date.now(), sender: 'user', type: 'text', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Chamar Bot no Servidor
    try {
      const response = await fetch('http://localhost:3000/api/ai-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userMsg.text })
      });
      const aiData = await response.json();
      
      const aiMsg = { id: Date.now() + 1, sender: 'ai', type: aiData.type, text: aiData.text, insightData: aiData.data };
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', type: 'text', text: 'Error: Cannot reach AI service on backend.' }]);
    }
  };

  const handleHarvestAll = () => {
    installations.filter(i => i.isIdle).forEach(inst => harvestLicense(inst.id));
    setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', type: 'text', text: "Harvesting global acionado. O Banco de Dados confirmou a remoção das instâncias ociosas!" }]);
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
            {m.type === 'insight' && m.insightData && (
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
                  <span style={{ fontSize: '12px' }}>Insight Type:</span>
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
          <input type="text" placeholder="Scan Database via API..." value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '13px' }} />
          <button type="submit" style={{ background: 'transparent', border: 'none', color: 'hsl(var(--color-accent-primary))', cursor: 'pointer', display: 'flex' }}>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantBot;
