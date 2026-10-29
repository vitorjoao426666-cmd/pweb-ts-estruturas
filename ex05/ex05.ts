// Exercício 05: Caixa do mercado (projeto integrador)

type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const precos: number[] = [];
  let ignorados = 0;
  const linhas = texto.split('\n');

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    if (linha === '') {
      continue; 
    }

    const valor = Number(linha.replace(',', '.'));
    if (Number.isNaN(valor) || valor <= 0) {
      ignorados++;
      continue;
    }

    precos.push(valor);
    if (precos.length === 20) {
      break; 
    }
  }

  return { precos, ignorados };
}

function somarItens(...precos: number[]): number {
  let soma = 0;
  for (const preco of precos) {
    soma += preco;
  }
  return soma;
}

function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, regra: number | string): number {
  if (typeof regra === 'number') {
    return (total * regra) / 100;
  }

  switch (regra.toUpperCase()) {
    case 'BEMVINDO':
      return (total * 10) / 100;
    case 'PROMO20':
      return (total * 20) / 100;
    case 'MENOS15':
      return total >= 100 ? 15 : 0;
    default:
      return 0;
  }
}

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const campoFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botao = document.getElementById('fechar') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const { precos, ignorados } = lerPrecos(campoItens.value);

  if (precos.length === 0) {
    saida.textContent = 'Nenhum item válido';
    saida.className = 'erro';
    return;
  }

  const subtotal = somarItens(...precos);
  const cupom = campoCupom.value.trim();

  const descontoCupom = cupom !== '' ? calcularDesconto(subtotal, cupom) : 0;
  const aposCupom = subtotal - descontoCupom;
  const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
  const total = aposCupom - descontoFidelidade;

  let texto = `Itens: ${precos.length}`;
  if (ignorados > 0) {
    texto += ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
  }
  texto += `\nSubtotal: ${formatarReal(subtotal)}`;

  if (cupom !== '') {
    texto += descontoCupom > 0
      ? `\nCupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`
      : '\nCupom inválido ou não aplicável';
  }
  if (campoFidelidade.checked) {
    texto += `\nFidelidade (5%): - ${formatarReal(descontoFidelidade)}`;
  }
  texto += `\nTotal a pagar: ${formatarReal(total)}`;

  saida.textContent = texto;
  saida.className = 'sucesso';
});
