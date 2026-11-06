/* ===== DADOS DA CLÍNICA (FICTÍCIOS) — SUBSTITUA AQUI ===== */
const CLINICA = {
  whatsapp: "5500000000000", // <-- TROQUE pelo número real (DDI+DDD+número, só dígitos)
  telefone: "+55 (00) 00000-0000",
  endereco: "Av. Exemplo, 1000 – Sala 101, Bairro Fictício, Cidade/UF, CEP 00000-000",
  horarios: "Seg a Sex: 08h às 19h<br>Sábado: 08h às 13h<br>Domingo: fechado",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/"
};
const MSG = {
  geral: "Olá! Conheci a clínica pelo site e gostaria de agendar uma avaliação.",
  clinica: "Olá! Conheci a clínica pelo site e gostaria de saber mais sobre a clínica e conhecer o espaço.",
  implantes: "Olá! Conheci a clínica pelo site e gostaria de saber mais sobre o tratamento de implantes dentários.",
  lentes: "Olá! Gostaria de saber mais sobre o tratamento de lentes de contato dental.",
  clareamento: "Olá! Gostaria de saber mais sobre o tratamento de clareamento dental.",
  orto: "Olá! Gostaria de saber mais sobre ortodontia e alinhadores invisíveis.",
  facetas: "Olá! Gostaria de saber mais sobre facetas em porcelana.",
  harmo: "Olá! Gostaria de saber mais sobre harmonização orofacial."
};
const TRAT = [
 {t:"Implantes dentários",d:"Reposição de dentes com planejamento digital e foco em função e naturalidade.",b:"Mastigação e confiança de volta",k:"implantes",i:"photo-1609840114035-3c981b782dfe"},
 {t:"Lentes de contato dental",d:"Lâminas ultrafinas de porcelana para refinar forma e cor do sorriso.",b:"Estética com mínimo desgaste",k:"lentes",i:"photo-1606811841689-23dfddce3e95"},
 {t:"Clareamento dental",d:"Protocolos supervisionados para um sorriso mais claro e uniforme.",b:"Sorriso mais luminoso",k:"clareamento",i:"photo-1606265752439-1f18756aa5fc"},
 {t:"Ortodontia e alinhadores invisíveis",d:"Alinhamento discreto, com acompanhamento digital durante todo o tratamento.",b:"Discrição e conforto",k:"orto",i:"photo-1598256989800-fe5f95da9787"},
 {t:"Facetas em porcelana",d:"Peças personalizadas para harmonizar formato, tamanho e cor dos dentes.",b:"Harmonia e durabilidade",k:"facetas",i:"photo-1629909613654-28e377c37b09"},
 {t:"Harmonização orofacial",d:"Procedimentos que equilibram sorriso e face, com abordagem sutil.",b:"Equilíbrio facial natural",k:"harmo",i:"photo-1588776814546-1ffcf47267a5"}
];
