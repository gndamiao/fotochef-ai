export const PACOTES = [
  {
    id: 'basico',
    nome: 'Básico',
    preco: 97,
    fotos: 5,
    descricao: 'Ideal para testar o serviço com os pratos principais do cardápio.',
    itens: [
      '5 fotos profissionais',
      'Entrega em até 24h',
      'Alta resolução (print + digital)',
      'Uso comercial incluído',
    ],
    destaque: false,
  },
  {
    id: 'profissional',
    nome: 'Profissional',
    preco: 197,
    fotos: 15,
    descricao: 'O mais escolhido. Cobre todo o cardápio de um restaurante pequeno.',
    itens: [
      '15 fotos profissionais',
      'Entrega em até 24h',
      'Alta resolução (print + digital)',
      'Uso comercial incluído',
      '2 revisões gratuitas',
    ],
    destaque: true,
  },
  {
    id: 'premium',
    nome: 'Premium',
    preco: 347,
    fotos: 30,
    descricao: 'Para cardápios completos e campanhas de redes sociais.',
    itens: [
      '30 fotos profissionais',
      'Entrega em até 24h',
      'Alta resolução (print + digital)',
      'Uso comercial incluído',
      'Revisões ilimitadas',
      'Suporte prioritário',
    ],
    destaque: false,
  },
  {
    id: 'teste',
    nome: 'Teste',
    preco: 1,
    fotos: 1,
    descricao: 'Pacote de teste',
    itens: [
      '1 foto profissional',
      'Entrega em até 24h',
      'Alta resolução (print + digital)',
    ],
    destaque: false,
  },
] as const;

export type Pacote = typeof PACOTES[number];
