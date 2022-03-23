const API = "https://pokeapi.co/api/v2/pokemon/"
const cartas = document.querySelector(".contenedor")

const botonBuscar = document.getElementById("button-addon2")

async function buscarPK(){
    const valorInput = document.getElementById("inputPK").value
    if(valorInput == ""){
        cartas.innerHTML = 
        `
            <div class="alert alert-warning" role="alert">
                Ingrese algo
            </div>
        `
    }
    
    else{
        try {
            let pokemones = await fetch(`${API}${valorInput.toLowerCase()}`)
            let poke = await pokemones.json()
            let array = []
            poke.abilities.forEach((pk) => {
                array.push(pk.ability.name)
            })
            
            cartas.innerHTML = 
            `
            <div class="col-md-3 col-sm-12">
                <div style="max-width: 350px; background: transparent; width: 18rem; border-radius: 20px; box-shadow: 2px 2px 5px yellow;"" class="card col-4 text-white">
                    <img style="max-width: 150px;" src="${poke.sprites.other.home.front_default}" class="card-img-top" alt="imagenes de pokemons">
                    <div class="card-body">
                    <h5 class="card-title">Detalles del pokemon</h5>
                    <h6 class="card-text">Nombre: ${poke.name}</h6>
                    <h6 class="card-text">Habilidades: ${array.toString().split(",").join(", ")}</h6>
                    </div>
                </div>
            </div>
            `
        }
        catch(error){
            cartas.innerHTML = 
            `
                <div class="alert alert-warning" role="alert">
                    El pokemon que esta intentando buscar no existe
                </div>
            `
        }
    }
    document.getElementById("inputPK").value = ""
}