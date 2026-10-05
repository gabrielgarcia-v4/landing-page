// Conteúdo da linha de SPAs (fonte: lp.jacuzzi.com.br/linhas). Substituir pelas fichas oficiais quando o cliente enviar.

export const modelos = [
  { slug: "j-475", nome: "J-475", pessoas: 6 },
  { slug: "meridian-plus", nome: "Meridian Plus", pessoas: 8 },
  { slug: "j-185-vip", nome: "J-185 VIP", pessoas: 7 },
  { slug: "j-220", nome: "J-220", pessoas: 7 },
  { slug: "j-355", nome: "J-355", pessoas: 6 },
  { slug: "j-185l", nome: "J-185L", pessoas: 5 },
  { slug: "mini-spa-vip", nome: "Mini Spa Vip", pessoas: 3 },
] as const;

export const tecnologias = [
  {
    nome: "PowerPro®",
    tipo: "Jatos",
    imagem: "/images/tec-powerpro.webp",
    texto:
      "Jatos com configurações ajustáveis às necessidades de cada usuário, para uma terapia aquática personalizada e altamente eficiente.",
  },
  {
    nome: "ClearRay®",
    tipo: "Purificação",
    imagem: "/images/tec-clearray.webp",
    texto:
      "Purificação por luz ultravioleta (UV) que neutraliza patógenos e reduz os produtos químicos necessários para manter a água cristalina.",
  },
  {
    nome: "ProClarity®",
    tipo: "Filtração",
    imagem: "/images/tec-proclarity.webp",
    texto:
      "Filtração exclusiva que reduz significativamente a manutenção e o uso de produtos químicos, para um banho mais agradável.",
  },
] as const;

export const passos = [
  { titulo: "Escolha seu modelo", texto: "Navegue pela seleção de SPAs e identifique o que melhor se adapta ao seu espaço e orçamento." },
  { titulo: "Preencha o formulário", texto: "Um especialista guia você no processo de compra e tira todas as suas dúvidas." },
  { titulo: "Adicione os opcionais", texto: "Inclua opcionais de acordo com o modelo escolhido." },
  { titulo: "Finalize sua compra", texto: "Realize o sonho do conforto e bem-estar de um SPA Jacuzzi®." },
] as const;

export const faq = [
  {
    q: "Como posso comprar um SPA Jacuzzi®?",
    a: "Entendemos suas necessidades para encontrar o SPA perfeito. Depois, encaminhamos seu contato para uma de nossas lojas autorizadas, onde você finaliza a compra.",
  },
  {
    q: "Quais recursos vêm de série?",
    a: "Todos os SPAs vêm equipados com sistema de hidromassagem, sistema de filtração, aquecimento e cobertura térmica.",
  },
  {
    q: "Posso personalizar os jatos e acessórios?",
    a: "Sim. Há opcionais conforme o modelo escolhido: purificação de água ClearRay®, escada, QuickVac e QuickDrain.",
  },
  {
    q: "Qual a diferença entre um SPA e uma banheira Jacuzzi®?",
    a: "A banheira é ideal para banhos relaxantes em espaços menores e precisa ser esvaziada após o uso. O SPA é preparado para uso contínuo, com água sempre pronta e aquecida, sistema de filtragem e uso social em áreas externas ou internas amplas.",
  },
  {
    q: "De qual material são feitos os SPAs?",
    a: "De acrílico de alta qualidade revestido de fibra de vidro: durável, resistente, fácil de limpar e com estética refinada.",
  },
  {
    q: "Os SPAs requerem instalação especial?",
    a: "Eles são projetados para fácil instalação em diversos ambientes, mas recomendamos instalação profissional para garantir eficiência energética e operacional.",
  },
  {
    q: "Quais são os prazos de entrega?",
    a: "Variam conforme o modelo e a sua localização. Durante a compra, nossa equipe informa os prazos de entrega e instalação.",
  },
  {
    q: "A Jacuzzi® oferece assistência técnica?",
    a: "Sim. Uma extensa rede de técnicos autorizados em todo o país oferece reparo, manutenção preventiva e suporte técnico.",
  },
] as const;

export const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];
