// Textos da versão wellness. Os pilares vêm do posicionamento da própria Jacuzzi®
// ("bem-estar total: físico, mental, emocional, intelectual, social e espiritual").
// As frases de cada pilar e dos rituais são copy de estilo de vida, sem promessas de saúde.

export const pilares = [
  { nome: "Físico", texto: "Água aquecida e jatos que envolvem o corpo inteiro.", imagem: "/images/modelos/j-475.webp" },
  { nome: "Mental", texto: "Um intervalo de verdade no ritmo do dia.", imagem: "/images/spa-retrato.webp" },
  { nome: "Emocional", texto: "Momentos que desaceleram e acalmam.", imagem: "/images/modelos/j-355.webp" },
  { nome: "Intelectual", texto: "Silêncio e espaço para pensar com clareza.", imagem: "/images/modelos/mini-spa-vip.webp" },
  { nome: "Social", texto: "Encontros em volta da água, com quem importa.", imagem: "/images/modelos/meridian-plus.webp" },
  { nome: "Espiritual", texto: "Presença, céu aberto e tempo para si.", imagem: "/images/jardim-noite.webp" },
] as const;

export const rituais = [
  { momento: "Manhã", texto: "Água sempre pronta e aquecida para começar o dia com calma.", imagem: "/images/modelos/j-220.webp" },
  { momento: "Fim de tarde", texto: "Uma pausa ao ar livre entre a rotina e a casa.", imagem: "/images/modelos/j-185-vip.webp" },
  { momento: "Noite", texto: "Luz baixa, silêncio e o céu como teto.", imagem: "/images/spa-noite.webp" },
] as const;

export const agua = [
  {
    nome: "ClearRay®",
    titulo: "Água cristalina",
    texto: "Purificação por luz UV que neutraliza patógenos e reduz os produtos químicos na água.",
    imagem: "/images/tec-clearray.webp",
  },
  {
    nome: "ProClarity®",
    titulo: "Cuidado simples",
    texto: "Filtração exclusiva que diminui a manutenção e o uso de químicos, para um banho mais agradável.",
    imagem: "/images/tec-proclarity.webp",
  },
  {
    nome: "PowerPro®",
    titulo: "Massagem sob medida",
    texto: "Jatos ajustáveis às necessidades de cada pessoa, para uma terapia aquática personalizada.",
    imagem: "/images/tec-powerpro.webp",
  },
] as const;
