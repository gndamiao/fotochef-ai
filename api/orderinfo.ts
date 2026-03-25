import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token obrigatório' });
  }

  const nocoUrl = process.env.NOCODB_URL;
  const nocoToken = process.env.NOCODB_TOKEN;
  const tableId = process.env.NOCODB_ORDERS_TABLE_ID;

  if (!nocoUrl || !nocoToken || !tableId) {
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  try {
    const response = await fetch(
      `${nocoUrl}/api/v1/db/data/noco/p5pdv0auw8u3x4x/mxyv0iodaygx9dz?where=(upload_token,eq,${token})`,
      { headers: { 'xc-auth': nocoToken } }
    );

    if (!response.ok) {
      return res.status(502).json({ error: 'Erro ao consultar banco' });
    }

    const data = await response.json();
    const pedido = data.list?.[0];

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    return res.status(200).json({
      photos_qty: pedido.photos_qty,
      status: pedido.status,
      restaurant: pedido.restaurant,
      package: pedido.package,
    });
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}