let dataLocal = JSON.parse(localStorage.getItem("DATAUSERS"));
let total = dataLocal.length;


let lastData = dataLocal[total - 1]
localStorage.setItem('LASTDATA', JSON.stringify(lastData))

//Agrega la cantidad de datos
document.getElementById('container').innerHTML += `
<p class="total"> Total población: ${total} </p>`

//Agrega promedios a la tabla
function meanToHTML (atributte, id) {
    let data = dataLocal.map((item) => parseFloat(item[atributte]))
    let mean = data.reduce((a,b) => a+b)
    document.getElementById(id).innerHTML = `${(mean/total).toFixed(2)}` 
}
meanToHTML('imc', 'mean')
meanToHTML('age', 'age')
meanToHTML('weight', 'weight')
meanToHTML('height', 'height')

//Agrega los porcentajes de frecuencia para cada categoria
function insertPercentage(id, min, max){
    let totalCategorie = dataLocal.filter((item) => min < item['imc'] && item['imc'] <= max).length
    let dataToInsert = (totalCategorie * 100 / total).toFixed(1)
    document.getElementById(id).innerHTML = `${dataToInsert} %`
}
insertPercentage('1',0, 18.5)
insertPercentage('2',18.5, 24.9)
insertPercentage('3',24.9, 29.9)
insertPercentage('4',29.9, 39.9)
insertPercentage('5',39.9, 100)