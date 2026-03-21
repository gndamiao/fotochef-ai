import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const PACOTES = [
  { id: 'basico', nome: 'Básico', preco: 97, fotos: 5 },
  { id: 'profissional', nome: 'Profissional', preco: 197, fotos: 15 },
  { id: 'premium', nome: 'Premium', preco: 347, fotos: 30 },
  { id: 'teste', nome: 'Teste', preco: 1, fotos: 1 },
] as const;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('MP_ACCESS_TOKEN não configurado');
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  try {
    const { pacote: pacoteId, nome, email, restaurante } = req.body;

    if (!pacoteId || !nome || !email || !restaurante) {
      return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
    }

    const pacote = PACOTES.find((p) => p.id === pacoteId);
    if (!pacote) {
      return res.status(400).json({ error: 'Pacote inválido' });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const baseUrl = process.env.SITE_URL || `https://${req.headers.host}`;

    const result = await preference.create({
      body: {
        items: [
          {
            id: pacote.id,
            title: `Pacote ${pacote.nome} – Belo Prato`,
            description: `${pacote.fotos} fotos profissionais para ${restaurante}`,
            quantity: 1,
            unit_price: pacote.preco,
            currency_id: 'BRL',
          },
        ],
        payer: {
          name: nome,
          email: email,
        },
        back_urls: {
          success: `${baseUrl}/obrigado?status=approved`,
          failure: `${baseUrl}/obrigado?status=failed`,
          pending: `${baseUrl}/obrigado?status=pending`,
        },
        auto_return: 'approved',
        notification_url: 'https://neight.tropico.me/webhook/mercadopago-webhook',
        external_reference: JSON.stringify({
          pacote: pacote.id,
          nome,
          email,
          restaurante,
          ts: Date.now(),
        }),
        statement_descriptor: 'BELOPRATO',
      },
    });

    return res.status(200).json({
      checkoutUrl: result.init_point,
      preferenceId: result.id,
    });
  } catch (error) {
    console.error('Erro ao criar preferência MP:', error);
    return res.status(500).json({ error: 'Erro ao processar pagamento' });
  }
}
