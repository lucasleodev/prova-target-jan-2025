import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private httpService: HttpClient) {}
  title = 'prova-target';

  ngOnInit() {
    console.log('PROVA TARGET');
    this.questao01(13);
    this.questao02(8);
    this.questao03();
    this.questao04();
    this.questao05();
  }

  /**
   * 1)	Observe o trecho de código abaixo: int INDICE = 13, SOMA = 0, K = 0; 
  Enquanto K < INDICE faça { K = K + 1; SOMA = SOMA + K; }
  Imprimir(SOMA); 
  Ao final do processamento, qual será o valor da variável SOMA? 
   */
  questao01(indice = 1) {
    let k = 0;
    let soma = 0;
    while (k < indice) {
      k += 1;
      soma += k;
    }
    console.log(`-- QUESTÃO 01 --
Índice => ${indice}\n
Soma => ${soma}
      `);
  }
  /**
   * 2) Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores
   * (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde,
   * informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência.
   * IMPORTANTE: Esse número pode ser informado através de qualquer entrada de sua preferência ou pode ser previamente definido no código;
   */
  questao02(numToFind = 0) {
    let arrFibonnaci = [0, 1];
    for (let i = 2; i < 16; i++) {
      arrFibonnaci[i] = arrFibonnaci[i - 2] + arrFibonnaci[i - 1];
    }
    console.log(`-- QUESTÃO 02 --
Número a ser achado => ${numToFind}\n
Lista Fibonacci => ${arrFibonnaci}\n
Número existe na lista? ${arrFibonnaci.some(numero=>numero==numToFind) ? 'SIM' : 'NÃO'}`);
  }
  /**
   * 3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne: 
  • O menor valor de faturamento ocorrido em um dia do mês; 
  • O maior valor de faturamento ocorrido em um dia do mês; 
  • Número de dias no mês em que o valor de faturamento diário foi superior à média mensal. 

  IMPORTANTE: 
  a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal; 
  b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média; 
   */
  questao03() {
    let menorFaturamento = 0;
    let maiorFaturamento = 0;
    let numDias = 0;
    let sumFaturamento = 0;
    let mediaFaturamento = 0;
    let numMediaMaiorFaturamento = 0;
    let dados: any = [];
    this.httpService.get(`assets/dados.json`).subscribe((res) => {
      dados = res;
      sumFaturamento = dados.reduce((acc: any, cur: { valor: any }) => {
        if (cur.valor > 0) numDias += 1;
        return acc + cur.valor;
      }, 0);
      mediaFaturamento = sumFaturamento/numDias;
      let newDados = dados.filter((dadoArr:{valor: any})=>dadoArr.valor>0);
      menorFaturamento = Math.min.apply(null,newDados.map((item:{valor:any})=>item.valor));
      maiorFaturamento = Math.max.apply(null,newDados.map((item:{valor:any})=>item.valor));
      newDados.forEach((dado:{valor:any})=>{
        if(dado.valor > mediaFaturamento){
          numMediaMaiorFaturamento += 1;
        }
      })
      console.log(`-- QUESTÃO 03 --
• O menor valor de faturamento ocorrido em um dia do mês;\n=> ${menorFaturamento}
• O maior valor de faturamento ocorrido em um dia do mês;\n=> ${maiorFaturamento}
• Média do faturamento do mês;\n=> ${mediaFaturamento}
• Dias válidos para o cálculo da média;\n=> ${numDias} de ${dados.length} dias
• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal;\n=> ${numMediaMaiorFaturamento}`);
    });
  }
  /**
   * 4) Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado: 
  •	SP – R$67.836,43 
  •	RJ – R$36.678,66 
  •	MG – R$29.229,88 
  •	ES – R$27.165,48 
  •	Outros – R$19.849,53 

  Escreva um programa na linguagem que desejar onde calcule o percentual de representação que cada estado teve dentro do valor total mensal da distribuidora.  
   */
  questao04() {
    let faturamentoEstado = {
      sp: 67836.43,
      rj: 36678.66,
      mg: 29229.88,
      es: 27165.48,
      outros: 19849.53,
    };
    let somaFaturamento = faturamentoEstado;
    //let arrFaturamento = []
    console.log(`-- QUESTÃO 04 --`)
  }
  /**
   * 5) Escreva um programa que inverta os caracteres de um string. 

  IMPORTANTE: 
  a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código; 
  b) Evite usar funções prontas, como, por exemplo, reverse; 
   */
  questao05(stringToMirror = 'Teste') {
    let wordSize = stringToMirror.length;
    let newWord = '';
    for (let i = wordSize - 1; i >= 0; i--) {
      newWord += stringToMirror[i];
    }
    console.log(
      `-- QUESTÃO 05 --
Palavra original => ${stringToMirror} \nPalavra invertida => ${newWord}`
    );
  }
}
