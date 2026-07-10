import React from 'react';
import { useSAM } from '../context/SAMContext';
import { Calendar as CalIcon, ShieldAlert } from 'lucide-react';

const Renewals = () => {
  const { entitlements, softwareModels, installations, devices } = useSAM();

  // Função para pegar renovações criticas
  const upcomingRenewals = entitlements.filter(e => e.expiration.startsWith('2026') || e.expiration.startsWith('2027'));

  // Função TrueUp Dinâmico
  const trueUpRisks = softwareModels.map(model => {
    const totalPurchased = entitlements.filter(e => e.softwareId === model.id).reduce((sum, e) => sum + Number(e.rightsPurchased), 0);
    let totalUsed = 0;
    
    if (model.metric === 'Per Core') {
      const installs = installations.filter(i => i.softwareId === model.id);
      totalUsed = installs.reduce((sum, inst) => sum + (devices.find(d => d.id === inst.deviceId)?.cores || 1), 0);
    } else {
      totalUsed = installations.filter(i => i.softwareId === model.id).length;
    }

    const shortfall = totalUsed - totalPurchased;
    const isAtRisk = shortfall > 0;
    const cost = entitlements.find(e => e.softwareId === model.id)?.unitCost || 0;
    const trueUpCost = isAtRisk ? shortfall * cost : 0;

    return { ...model, totalPurchased, totalUsed, shortfall, isAtRisk, trueUpCost };
  }).filter(risk => risk.isAtRisk);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Renewal Calendar & Compliance Risk</h2>
        <p className="text-muted" style={{ margin: 0, fontSize: '14px' }}>Auditoria em tempo real contra as bases de *Entitlements* e *Discovery*.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-lg)' }}>
        <div className="glass-panel" style={{ padding: 'var(--space-lg)', minHeight: '400px' }}>
          <h3 className="text-accent" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalIcon size={20} /> Upcoming Renewals
          </h3>
          
          {upcomingRenewals.length === 0 ? (
            <p className="text-muted">Nenhuma renovação crítica encontrada.</p>
          ) : (
            upcomingRenewals.map(ent => {
              const sw = softwareModels.find(s => s.id === ent.softwareId);
              return (
                <div key={ent.id} style={{ marginBottom: '16px', padding: '16px', borderLeft: '2px solid hsl(var(--color-accent-warning))', background: 'var(--glass-bg)', borderRadius: '0 4px 4px 0' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{sw?.name}</h4>
                  <div className="text-muted" style={{ fontSize: '13px' }}>Validade: {ent.expiration}</div>
                  <div style={{ marginTop: '8px', fontSize: '14px', fontWeight: 'bold' }}>Custo Renovação: ${(ent.rightsPurchased * ent.unitCost).toLocaleString()}</div>
                </div>
              );
            })
          )}
        </div>

        <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
          <h3 className="text-accent" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} /> Motor True-Up (Real-time)
          </h3>
          
          {trueUpRisks.length === 0 ? (
            <div style={{ padding: '16px', background: 'hsla(var(--color-accent-success), 0.1)', color: 'hsl(var(--color-accent-success))', borderRadius: '4px' }}>
              Parabéns! Todos os softwares estão sob compliance legal de licenciamento.
            </div>
          ) : (
            trueUpRisks.map(risk => (
              <div key={risk.id} style={{ marginBottom: '16px', padding: '16px', background: 'hsla(var(--color-accent-danger), 0.1)', border: '1px solid hsla(var(--color-accent-danger), 0.3)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '500' }}>Software:</span>
                  <span>{risk.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '500' }}>Licenças Compradas:</span>
                  <span>{risk.totalPurchased}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '500' }}>Instalações Encontradas ({risk.metric}):</span>
                  <span style={{ color: 'hsl(var(--color-accent-danger))', fontWeight: 'bold' }}>{risk.totalUsed}</span>
                </div>
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold' }}>Risco de Auditoria Faltante:</span>
                  <span style={{ color: 'hsl(var(--color-accent-danger))', fontSize: '20px', fontWeight: 'bold' }}>${risk.trueUpCost.toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Renewals;
