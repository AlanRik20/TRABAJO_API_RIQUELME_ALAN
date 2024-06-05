const elContainer = document.getElementById("container")

const url = "https://digimon-api.vercel.app/api/digimon"

async function cargarDatosAsync() {
    // const url = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la red - La respuesta no fue ok');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        return data
    } catch (error) {
        console.error('Error capturado en try-catch:', error);
    }

}

cargarDatosAsync(url)
    .then((data) => {
        // inicializo un contador que lo utilizo para mostrar una cantidad de elementos de la API
        let cont = 0

        data.forEach(elemento => {
            // creo una condicional en la que mostrará los primeros 20 elementos de la api
            if (cont < 24) {

                elContainer.innerHTML += `
                <div class="personaje">
                    <img src="${elemento.img}">
                    <p>--------------------------</p>
                    <p>${elemento.name} </p>
                </div>
                `
                cont++
            }
        });

})

const buscar = document.getElementById("buscador");



function mostrarDatos(data) {
    elContainer.innerHTML = ''; // limpiamos la informacion del contenido principal
    let cont = 0;

    data.forEach(elemento => {
        if (cont < 24) {
            elContainer.innerHTML += `
                <div class="personaje">
                    <img src="${elemento.img}">
                    <p>--------------------------</p>
                    <p>${elemento.name}</p>
                </div>
            `;
            cont++;
        }
    });
}

// creamos una funcion buscarDigimon que se encargará del filtrado de elementos
function buscarDigimon(data, query) {
    // creo una constante que almacenará los datos filtrados
    const resultadosFiltrados = data.filter(digimon => digimon.name.toLowerCase().includes(query.toLowerCase()));
    mostrarDatos(resultadosFiltrados);
}


cargarDatosAsync()
    .then(data => {
    mostrarDatos(data);
    //se agrega un evento con la variable buscar que cuando se aprete una tecla y se de "enter" se guarda el valor en una 
    // variable aparte y se envia ese valor a la funcion buscarDigimon 
    buscar.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const query = buscar.value;
            buscarDigimon(data, query);
        }
    });
});




