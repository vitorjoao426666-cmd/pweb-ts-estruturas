// Exercício 03: Simulador de parcelamento

function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  return valor * 1.02 ** parcelas;
}

function simularParcelamento(preco: number, entrada?: number): string {
  let financiado = preco;
  if (typeof entrada !== 'undefined') {
    financiado = preco - entrada;
  }

  let linhas = '';
  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
      continue;
    }

    const total = calcularTotal(financiado, parcelas);
    const valorParcela = total / parcelas;

    if (valorParcela < 50) {
      break;
    }

    const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
    linhas +=
      `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
      `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }
  return linhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

botao.addEventListener('click', () => {
  const preco = campoPreco.valueAsNumber;
  corpoTabela.innerHTML = '';
  saida.className = '';

  if (Number.isNaN(preco) || preco <= 0) {
    saida.textContent = 'Informe um preço válido';
    saida.className = 'erro';
    return;
  }

  let linhas: string;
  let financiado: number;

  if (campoEntrada.value === '') {
    financiado = preco;
    linhas = simularParcelamento(preco);
  } else {
    const entrada = campoEntrada.valueAsNumber;
    if (Number.isNaN(entrada) || entrada < 0) {
      saida.textContent = 'Informe uma entrada válida';
      saida.className = 'erro';
      return;
    }
    if (entrada >= preco) {
      saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
      saida.className = 'sucesso';
      return;
    }
    financiado = preco - entrada;
    linhas = simularParcelamento(preco, entrada);
  }

  saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  corpoTabela.innerHTML = linhas;
});
