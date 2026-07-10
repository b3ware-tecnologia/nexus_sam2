import React from 'react';
import { getStore } from '../mock/store';
import { Calendar as CalIcon, ShieldAlert } from 'lucide-react';

const Renewals = () => {
  const store = getStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Renewal Calendar & Compliance Risk</h2>
        <p className="text-muted" style={{ margin: 0, fontSize: '14px' }}>Previsão de vencimentos contratuais e motor de simulação True-Up.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-lg)' }}>
        <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
          <h3 className="text-accent" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalIcon size={20} /> Upcoming Renewals (90 Days)
          </h3>
          <div style={{ padding: '16px', borderLeft: '2px solid hsl(var(--color-accent-warning))', background: 'var(--glass-bg)', borderRadius: '0 4px 4px 0' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>Oracle Database Standard</h4>
            <div className="text-muted" style={{ fontSize: '13px' }}>Validade Expira: 2026-09-01</div>
            <div style={{ marginTop: '8px', fontSize: '14px', fontWeight: 'bold' }}>Custo Esperado de Renovação: $19,200</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
          <h3 className="text-accent" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} /> True-Up Engine (Simulated Risk)
          </h3>
          
          <div style={{ padding: '16px', background: 'hsla(var(--color-accent-danger), 0.1)', border: '1px solid hsla(var(--color-accent-danger), 0.3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: '500' }}>Software:</span>
              <span>Oracle Database Standard</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: '500' }}>Licenças Compradas (Cores):</span>
              <span>16</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: '500' }}>Aferição do Servidor SRV-DB-01:</span>
              <span style={{ color: 'hsl(var(--color-accent-danger))' }}>Requer 16 cores (Não ok, margem esgotada)</span>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Risco de Auditoria / Custo True-up Faltante</span>
              <span style={{ color: 'hsl(var(--color-accent-danger))', fontSize: '20px', fontWeight: 'bold' }}>$4,800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Renewals;
