const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Função de Seeding automático se o banco estiver vazio
async function seedDatabase() {
  const count = await prisma.softwareModel.count();
  if (count > 0) return;

  const m1 = await prisma.softwareModel.create({ data: { publisher: 'Microsoft', name: 'Office 365 E5', metric: 'Per User' } });
  const m2 = await prisma.softwareModel.create({ data: { publisher: 'Adobe', name: 'Creative Cloud All Apps', metric: 'Per User' } });
  const m3 = await prisma.softwareModel.create({ data: { publisher: 'Oracle', name: 'Database Standard', metric: 'Per Core' } });

  const dev1 = await prisma.device.create({ data: { hostName: 'LT-ADMIN-01', user: 'Admin User', os: 'Windows 11', cores: 4 } });
  const dev2 = await prisma.device.create({ data: { hostName: 'PC-MKT-05', user: 'Marketing Lead', os: 'macOS Sonoma', cores: 8 } });
  const dev3 = await prisma.device.create({ data: { hostName: 'SRV-DB-01', user: 'System', os: 'Linux Ubuntu', cores: 16 } });

  await prisma.entitlement.create({ data: { softwareId: m1.id, rightsPurchased: 1200, unitCost: 35, expiration: '2027-12-31' } });
  await prisma.entitlement.create({ data: { softwareId: m3.id, rightsPurchased: 16, unitCost: 1200, expiration: '2026-09-01' } });

  await prisma.installation.create({ data: { deviceId: dev1.id, softwareId: m1.id, lastUsed: '2026-07-09', isIdle: false } });
  await prisma.installation.create({ data: { deviceId: dev2.id, softwareId: m1.id, lastUsed: '2026-05-10', isIdle: true } });
  await prisma.installation.create({ data: { deviceId: dev3.id, softwareId: m3.id, lastUsed: '2026-07-10', isIdle: false } });
}
seedDatabase();

// --- ENDPOINTS CORE ---

// 1. Full Data Load (Hydration for Context API)
app.get('/api/sam-state', async (req, res) => {
  try {
    const devices = await prisma.device.findMany();
    const softwareModels = await prisma.softwareModel.findMany();
    const entitlements = await prisma.entitlement.findMany();
    const installations = await prisma.installation.findMany();
    res.json({ devices, softwareModels, entitlements, installations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Add Entitlement
app.post('/api/entitlements', async (req, res) => {
  try {
    const data = req.body;
    const result = await prisma.entitlement.create({ data });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Delete Entitlement
app.delete('/api/entitlements/:id', async (req, res) => {
  try {
    await prisma.entitlement.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Harvest License (Delete Installation)
app.post('/api/harvest', async (req, res) => {
  try {
    const { installationId } = req.body;
    await prisma.installation.delete({ where: { id: installationId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. AI Chat integration
app.post('/api/ai-chat', async (req, res) => {
  // LLM Simulado com Dados da Base real
  const { input } = req.body;
  const idleCount = await prisma.installation.count({ where: { isIdle: true } });
  
  // Real life this is where we call Google Gemini SDK injected with SQL results
  let type = 'text';
  let data = null;
  let text = "Auditoria Neural SAM concluída em 300ms... Banco de Licenças Estável.";

  if (input.toLowerCase().includes('custo') || input.toLowerCase().includes('harvest')) {
    if (idleCount > 0) {
      type = 'insight';
      data = {
        title: 'Actionable Optimization',
        msg: `Eu analisei o Banco de Dados físico e encontrei ${idleCount} instalações inativas por +45 dias.`,
        savings: 'Considere recuperar o investimento via Global Harvest.'
      };
    } else {
      text = 'O Banco de Dados aponta Otimização perfeita. Nenhuma instalação Ociosa encontrada.';
    }
  }

  res.json({ type, text, data });
});

app.listen(PORT, () => {
  console.log(`SAM Server API running on port ${PORT}`);
});
