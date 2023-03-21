// Selecionando os elementos da página
const input = document.querySelector("input");
const main = document.querySelector("main");
const body = document.querySelector("body");
const result = document.querySelector("#resultado");

const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");
const copyButton = document.getElementById("clickCopiar");
const buttons = document.querySelectorAll(".buttonValue");
const themeButton = document.getElementById("mudarTemas");

const arrayTeclasPermitidas = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

// Função para kaydown(teclas do teclado)

const kaydownInput = (ev) => {
  ev.preventDefault();
  if (arrayTeclasPermitidas.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    calculate();
  }
};

// Função para mudar o tema da página
const mudarTema = () => {
  body.classList.toggle("dark");
};

// Função para adicionar valores na expressão
function addToExpression(value) {
  input.value += value;
}

// Função para limpar a expressão
function clearExpression() {
  input.value = "";
  result.value = "";
  input.focus();
  result.classList.remove("erro");
  copyButton.classList.remove("copiado");
}

// Função para calcular a expressão e exibir o resultado
function calculate() {
  try {
    const resultValue = eval(input.value);
    result.value = resultValue;
  } catch (error) {
    result.classList.add("erro");
    result.value = "Erro na expressão!";
  }
}

// Função para copiar o resultado para a área de transferência
function copyResult() {
  copyButton.classList.add("copiado");
  navigator.clipboard.writeText(result.value);
}

// Adicionando event listeners aos botões
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    addToExpression(button.dataset.value);
  });
});

clearButton.addEventListener("click", clearExpression);
equalButton.addEventListener("click", calculate);
copyButton.addEventListener("click", copyResult);
themeButton.addEventListener("click", mudarTema);
input.addEventListener("keydown", kaydownInput);
