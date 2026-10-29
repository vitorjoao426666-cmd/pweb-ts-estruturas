// Exercício 04: Meta de economia
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
const formatarMeses = (meses) => {
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
function calcularMeses(meta, deposito, taxa = 0.5) {
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
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const meta = campoMeta.valueAsNumber;
    const deposito = campoDeposito.valueAsNumber;
    if (Number.isNaN(meta) || Number.isNaN(deposito) || meta <= 0 || deposito <= 0) {
        saida.textContent = 'Informe valores positivos';
        saida.className = 'erro';
        return;
    }
    const resultado = campoTaxa.value === ''
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
    }
    else {
        saida.textContent =
            'Meta inalcançável em 50 anos.\n' +
                exibirValor(`Saldo após ${resultado.meses} meses`, resultado.saldo, formatarReal);
        saida.className = 'erro';
    }
});
export { };
//# sourceMappingURL=ex04.js.map