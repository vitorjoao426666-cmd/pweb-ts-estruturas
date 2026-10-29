// Exercício 04: Meta de economia

type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

const formatarMeses = (meses: number): string => {
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;

  const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;

  if (anos === 0) {
    return textoMeses;
  }
  if (resto === 0) {
    return textoAnos;
  }
  return `${textoAnos} e ${textoMeses}`;
};

interface ResultadoMeta {
  meses: number;
  saldo: number;
  depositado: number;
}

function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): ResultadoMeta {
  let saldo = 0;
  let depositado = 0;
  let meses = 0;

  while (saldo < meta) {
    if (meses >= 600) {
      break; 
    }
    meses++;
    const valorDeposito = meses % 12 === 0 ? deposito * 2 : deposito;
    saldo = saldo * (1 + taxa / 100) + valorDeposito;
    depositado += valorDeposito;
  }

  return { meses, saldo, depositado };
}

function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const meta = campoMeta.valueAsNumber;
  const deposito = campoDeposito.valueAsNumber;

  if (Number.isNaN(meta) || Number.isNaN(deposito) || meta <= 0 || deposito <= 0) {
    saida.textContent = 'Informe valores positivos';
    saida.className = 'erro';
    return;
  }

  const resultado =
    campoTaxa.value === ''
      ? calcularMeses(meta, deposito)
      : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);

  if (resultado.saldo >= meta) {
    saida.textContent =
      `Você atinge a meta em ${resultado.meses} ${resultado.meses === 1 ? 'mês' : 'meses'} ` +
      `(${formatarMeses(resultado.meses)}).\n` +
      exibirValor('Saldo final', resultado.saldo, formatarReal) + '\n' +
      exibirValor('Total depositado', resultado.depositado, formatarReal) + '\n' +
      exibirValor('Rendimento', resultado.saldo - resultado.depositado, formatarReal);
    saida.className = 'sucesso';
  } else {
    saida.textContent =
      'Meta inalcançável em 50 anos.\n' +
      exibirValor(`Saldo após ${resultado.meses} meses`, resultado.saldo, formatarReal);
    saida.className = 'erro';
  }
});
