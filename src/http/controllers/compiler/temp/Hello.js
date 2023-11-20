function buscaBinaria(arr, x) {
    let inicio = 0, fim = arr.length - 1;
  
    while (inicio <= fim) {
        let meio = Math.floor((inicio + fim) / 2);
  
        if (arr[meio] === x) {
            return meio;
        }
  
        if (arr[meio] < x) {
            inicio = meio + 1;
        }
  
        else {
            fim = meio - 1;
        }
    }
  
    return -1;
}

let arr = [2, 3, 4, 10, 40];
let x = 40;

let resultado = buscaBinaria(arr, x);

if(resultado != -1)
    console.log("Elemento encontrado no índice " + resultado);
else
    console.log("Elemento não encontrado no array");
