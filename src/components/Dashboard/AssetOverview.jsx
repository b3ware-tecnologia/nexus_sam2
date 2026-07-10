import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, ShieldAlert, ArrowDownRight, TrendingUp } from 'lucide-react';

const mockData = [
  { name: 'Compliant', value: 85 },
  { name: 'At Risk', value: 15 },
];
const COLORS = ['hsl(var(--color-accent-success))', 'hsl(var(--color-accent-danger))'];

const AssetOverview = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)' }}>
      
      {/* Compliance Widget */}
      <div className="glass-panel" style={{ padding: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
        <div style={{ width: '80px', height: '80px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData}
                innerRadius={30}
                outerRadius={40}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {mockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 style={{ fontSize: '24px', margin: '0' }}>85%</h3>
          <p className="text-muted" style={{ fontSize: '14px', margin: '0' }}>Compliance Rate</p>
        </div>
      </div>

      <KpiWidget 
        icon={<DollarSign size={24} />}
        title="True-up Cost"
        value="$124,500"
        trend="+14%"
        trendColor="hsl(var(--color-accent-danger))"
        iconBg="hsla(var(--color-accent-danger), 0.15)"
        iconColor="hsl(var(--color-accent-danger))"
      />
      
      <KpiWidget 
        icon={<TrendingUp size={24} />}
        title="Potential Savings"
        value="$89,200"
        trend="+5%"
        trendColor="hsl(var(--color-accent-success))"
        iconBg="hsla(var(--color-accent-success), 0.15)"
        iconColor="hsl(var(--color-accent-success))"
      />

      <KpiWidget 
        icon={<ShieldAlert size={24} />}
        title="Audits at Risk"
        value="2"
        trend="-1"
        trendColor="hsl(var(--color-accent-success))"
        iconBg="hsla(var(--color-accent-warning), 0.15)"
        iconColor="hsl(var(--color-accent-warning))"
      />

    </div>
  );
};

const KpiWidget = ({ icon, title, value, trend, trendColor, iconBg, iconColor }) => (
  <div className="glass-panel" style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p className="text-muted" style={{ fontSize: '14px', margin: '0 0 8px 0' }}>{title}</p>
        <h3 style={{ fontSize: '28px', margin: '0' }}>{value}</h3>
      </div>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: 'var(--radius-md)', 
        background: iconBg,
        color: iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px' }}>
      <ArrowDownRight size={16} color={trendColor} />
      <span style={{ color: trendColor, fontSize: '14px', fontWeight: '500' }}>{trend}</span>
      <span className="text-muted" style={{ fontSize: '12px', marginLeft: '4px' }}>vs last month</span>
    </div>
  </div>
);

export default AssetOverview;
