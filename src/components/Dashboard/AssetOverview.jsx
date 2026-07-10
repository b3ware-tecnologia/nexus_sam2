import React from 'react';
import { useSAM } from '../../context/SAMContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, ShieldAlert, TrendingUp } from 'lucide-react';

const COLORS = ['hsl(var(--color-accent-success))', 'hsl(var(--color-accent-danger))'];

const AssetOverview = () => {
  const { getComplianceStatus, getWastedSpend, softwareModels, entitlements, installations, devices } = useSAM();
  
  const compliance = getComplianceStatus();
  const wasted = getWastedSpend();
  
  const mockData = [
    { name: 'Compliant', value: compliance },
    { name: 'At Risk', value: 100 - compliance },
  ];

  // Calcular numero dinâmico de Softwares em risco (Audits at Risk)
  let auditsAtRisk = 0;
  let totalTrueUp = 0;

  softwareModels.forEach(model => {
    const totalPurchased = entitlements
      .filter(e => e.softwareId === model.id)
      .reduce((sum, e) => sum + Number(e.rightsPurchased), 0);
      
    let totalUsed = 0;
    if (model.metric === 'Per Core') {
      const installs = installations.filter(i => i.softwareId === model.id);
      totalUsed = installs.reduce((sum, inst) => sum + (devices.find(d => d.id === inst.deviceId)?.cores || 1), 0);
    } else {
      totalUsed = installations.filter(i => i.softwareId === model.id).length;
    }
    
    if (totalUsed > totalPurchased) {
      auditsAtRisk++;
      const shortfall = totalUsed - totalPurchased;
      const cost = entitlements.find(e => e.softwareId === model.id)?.unitCost || 0;
      totalTrueUp += shortfall * cost;
    }
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)' }}>
      {/* Compliance Widget */}
      <div className="glass-panel" style={{ padding: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
        <div style={{ width: '80px', height: '80px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mockData} innerRadius={30} outerRadius={40} paddingAngle={5} dataKey="value" stroke="none">
                {mockData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 style={{ fontSize: '24px', margin: '0' }}>{compliance}%</h3>
          <p className="text-muted" style={{ fontSize: '14px', margin: '0' }}>Compliance Rate</p>
        </div>
      </div>

      <KpiWidget 
        icon={<DollarSign size={24} />}
        title="True-up Cost"
        value={`$${totalTrueUp.toLocaleString()}`}
        iconBg="hsla(var(--color-accent-danger), 0.15)"
        iconColor="hsl(var(--color-accent-danger))"
      />
      
      <KpiWidget 
        icon={<TrendingUp size={24} />}
        title="Potential Savings"
        value={`$${wasted.toLocaleString()}`}
        iconBg="hsla(var(--color-accent-success), 0.15)"
        iconColor="hsl(var(--color-accent-success))"
      />

      <KpiWidget 
        icon={<ShieldAlert size={24} />}
        title="Audits at Risk"
        value={auditsAtRisk}
        iconBg="hsla(var(--color-accent-warning), 0.15)"
        iconColor="hsl(var(--color-accent-warning))"
      />
    </div>
  );
};

const KpiWidget = ({ icon, title, value, iconBg, iconColor }) => (
  <div className="glass-panel" style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p className="text-muted" style={{ fontSize: '14px', margin: '0 0 8px 0' }}>{title}</p>
        <h3 style={{ fontSize: '28px', margin: '0' }}>{value}</h3>
      </div>
      <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
    </div>
  </div>
);

export default AssetOverview;
