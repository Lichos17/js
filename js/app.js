//Cotizador Constructor


function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

seguro.prototype.cotizarSeguro = function(informacion){
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }
    const diferencia = new Date().getFullYear() - this.anio;
    cantidad -= ((diferencia * 3)*cantidad) / 100;

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    } else{
        cantidad *= 1.50;
    }

}

//Todo lo que se muestra
function Interfaz(){};


//Mensaje que se imprime en el HTML
interfaz.prototype.mostrarError = function(mensaje, tipo){
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('mensaje', 'error');
    } else{
        div.classList.add('mensaje', 'error');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 3000);
}

Interfaz.prototype.mostrarResultado = function(seguro, total){
    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'Americano';
        case '2':
            marca = 'Asiatico';
        case '3':
            marca = 'Europeo';
    }
    const div = document.createElement('div');
    div.innerHTML = `
        <p>Tu Resumen:</p>
        <p>Marca: ${seguro.marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        <p>Total: $ ${total}</p>
    `;
    resultado.appendChild(div);
}



//Event Listeners
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //Leer la marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //leer el año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();

    //Revisamos que no este vacio
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        //Interfaz imprimiendo un error
        interfaz.mostrarError('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
    } else{
        //interfaz imprimiendo seguro
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        interfaz.mostrarResultado(seguro, cantidad);

    
    }

})

const max = new Date().getFullYear();
const min = max - 20;

const selectAnios = document.getElementById('anio');
for(let i = min; i < max; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}