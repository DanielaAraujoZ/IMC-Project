const server = "https://imc-project.herokuapp.com/infoUsers";

const buttonMale = document.getElementById("buttonMale");
const buttonWoman = document.getElementById("buttonWoman");
const buttonSend = document.getElementById("sendData");
const result = document.getElementById("result");
const form = document.getElementById("form");

//Funcion que agrega active a los iconos de genero.
function changeActive() {
  let valueSelect = parseInt(document.getElementById("options").value);
  if (valueSelect === 1) {
    buttonMale.classList.add("active");
    buttonWoman.classList.remove("active");
  } else if (valueSelect === 2) {
    buttonWoman.classList.add("active");
    buttonMale.classList.remove("active");
  }
}

//Evento de envio de datos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Captura valores de los inputs
  const dataAge = document.getElementById("age").value;
  const dataWeight = document.getElementById("weight").value;
  const dataHeight = document.getElementById("height").value / 100;

  //Se realizan calculos del IMC y se manda al espacio correspondiente del HTML.
  let IMCResult = dataWeight / Math.pow(dataHeight, 2);
  result.innerHTML = IMCResult.toFixed(2);

  //Se verifica el intervalo al que pertenece el dato arrojado para cambiar su clase y darle un estilo de css.
  if (IMCResult < 18.5) {
    result.className = "bajoPeso";
  } else if (18.5 < IMCResult && IMCResult < 24.9) {
    result.className = "saludable";
  } else if (24.9 < IMCResult && IMCResult <= 29.9) {
    result.className = "excesoPeso";
  } else if (29.9 < IMCResult && IMCResult < 39.9) {
    result.className = "obeso";
  } else {
    result.className = "obesoExtremo";
  }

  //Envio datos al servidor json
  fetch(server, {
    method: "POST",
    body: JSON.stringify({
      age: dataAge,
      weight: dataWeight,
      height: dataHeight,
      imc: IMCResult.toFixed(2),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((respond) => respond);

  // //Obtiene los datos del local Storage
  let dataServer = JSON.parse(localStorage.getItem("DATAUSERS"));

  //Permite visualizar los datos durante 5 segundos y recarga la pagina.
  setTimeout(() => {
    window.location.reload();
  }, 5000);
});

//Obtiene los datos del servidor de JSON para enviarlos al local Storage
fetch(server)
  .then((response) => response.json())
  .then((data) => localStorage.setItem("DATAUSERS", JSON.stringify(data)));

//Usar dato
let getData = JSON.parse(localStorage.getItem("DATAUSERS"));
