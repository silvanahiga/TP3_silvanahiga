const input = document.getElementById('input');
const apiKey = 'be36e3463f0e1cbecbb306f6e2bae074';
const container = document.getElementsByClassName('container')[0];
const modal = document.getElementById('modal');
const traerModal = document.getElementById('traerModal')
const popular = document.getElementsByClassName('nav popular')[0];
const toprated = document.getElementsByClassName('nav top')[0];
const upcoming = document.getElementsByClassName('nav upcoming')[0];
const nowplaying = document.getElementsByClassName('nav nowplaying')[0];
const tipo = document.getElementsByClassName('searchTipo')[0];
const board = document.getElementsByClassName('board')[0]


function sacarHome() { //saca el panel que muestra las peliculas predetermidas del home
    document.getElementById('boardHome').classList.add('displayNone'); //saca peliculas del panel
    document.getElementsByClassName('poster')[0].classList.add('displayNone'); //oculta poster
    document.getElementsByClassName('busqueda')[0].classList.add('margen') //da margen top cuando desaparece el poster
}

document.getElementById('loadMore').classList.add('displayNone') //para sacar boton load more en home

const loadMore= document.getElementById('loadMore'); //esto es para modificar paginaActual sumando uno cada vez que se aprieta boton
let paginaActual=1;

    loadMore.addEventListener('click', function (e) {        
        console.log(e)
        paginaActual++
       
    fetchInput();
  
});



function fetchInput() { // FETCH DE INPUT, TMB SIRVE PARA CARGAR MAS PELICULAS
     document.getElementsByClassName('busqueda')[0].classList.remove('displayNone')
     document.getElementById('loadMore').classList.remove('displayNone')
     
    const dato = input.value;
    const buscar = fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${dato}&page=${paginaActual}`);
    console.log(buscar)
    buscar
        .then( res => res.json())  
        .then(movie => { 
            // para que muestre el resultado total de la busqueda
             document.getElementsByClassName('searchTotal')[0].innerText= movie.total_results +' results';
             document.getElementsByClassName('searchTipo')[0].innerText = 'Search Results';
            console.log(movie)
            
            const data = movie.results.map(m=> {
                return `
                <div class='box' id=${m.id}>
                <img class='p' src="https://image.tmdb.org/t/p/original${m.poster_path}" id=${m.id}>
                <span id='titulo'>${m.title}</span>
                </div>
                `  
            
            });

            document
            .getElementById('peliculas')
            .innerHTML += data.join('');
    
            sacarHome();
            
            // click en poster que abre modal
            const pelicula = document.querySelectorAll('.box');
            pelicula.forEach(function (p) {
                p.addEventListener('click', function (e) {
                    e.preventDefault();
               
                container.classList.add('displayNone');
                modal.classList.remove('displayNone');  
                traerModal.classList.remove('displayNone')

                const target = e.currentTarget.id //para ver sobre qué clickeamos
             
            const buscarInfo = fetch (`https://api.themoviedb.org/3/movie/${target}?api_key=${apiKey}`);
                // aca pude traer genero de pelicula///////////
                buscarInfo
                .then( res => res.json())  
                .then(movie => { 
                    // console.log(movie);
                document.getElementById('text1').innerHTML = movie.title;
                document.getElementById('text2').innerHTML = movie.tagline;
                document.getElementById('info1').innerHTML = movie.overview;
                document.getElementById('info3').innerHTML = movie.release_date;
                
                
                date = movie.genres.map(g =>`<span>${g.name}</span>`)              
                if(!movie.poster_path){
                    document.getElementById('p2').src = './no-image.png'
                }else{
                    document.getElementById('p2').src =`https://image.tmdb.org/t/p/original${movie.poster_path}`;
                }
                if(!movie.backdrop_path){
                    
                    document.getElementById('b2').src = './azul.jpg'
                }else{
                    document.getElementById('b2').src =`https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
                }
            
                
                document
                .getElementById('c')
                .innerHTML = date.join(', ')
    
            })

                // cerrar modal click afuera
                modal.addEventListener('click', clickOutside)
                function clickOutside(e) {
                console.log(e)
                console.log(e.target.id)
                    if(e.target.id =="modal"){
                        modal.classList.add('displayNone')
                        container.classList.remove('displayNone')
                    }
                    
                }
       
        
            })
          
        })

    
    });
}




// PARA EL HOME
function fetchHome(params) {
    document.getElementsByClassName('busqueda')[0].classList.add('displayNone');

        fetch(`https://api.themoviedb.org/3/movie/${params}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(movieHome => {

        const datosHome = movieHome.results.slice(0,5);
        const data =  datosHome.map(m=> {
            return `
            
            <div class='box' id=${m.id}>
            <img class='p' src="https://image.tmdb.org/t/p/original${m.poster_path}" id=${m.id}>
            <span>${m.title}</span>
            </div>
            `
        });

        document
        .getElementById(`${params}`)
        .innerHTML = data.join('');

        pelicula = document.querySelectorAll('.box');
        // click en poster que abre modal
        pelicula.forEach(function (p) {
        p.addEventListener('click', function (e) {
            e.preventDefault();
            container.classList.add('displayNone');
            modal.classList.remove('displayNone'); 
            traerModal.classList.remove('displayNone')

            
            const target = e.currentTarget.id //para ver sobre qué clickeamos
          

            const buscarInfo = fetch (`https://api.themoviedb.org/3/movie/${target}?api_key=${apiKey}`);
                // aca pude traer genero de pelicula///////////
                buscarInfo
                .then( res => res.json())  
                .then(movie => { 
                   
                document.getElementById('text1').innerHTML = movie.title;
                document.getElementById('text2').innerHTML = movie.tagline;
                document.getElementById('info1').innerHTML = movie.overview;
                document.getElementById('info3').innerHTML = movie.release_date;
                 
                if(!movie.poster_path){
                    document.getElementById('p2').src = './no-image.png'
                }else{
                    document.getElementById('p2').src =`https://image.tmdb.org/t/p/original${movie.poster_path}`;
                }

                if(!movie.backdrop_path){       
                    document.getElementById('b2').src = './azul.jpg'
                }else{
                    document.getElementById('b2').src =`https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
                }

                date = movie.genres.map(g =>`<span>${g.name}</span>`)

                document
                .getElementById('c')
                .innerHTML = date.join(', ')

                })

                // cerrar modal click afuera
                modal.addEventListener('click', clickOutside)
                function clickOutside(e) {
                    console.log(e)
                    console.log(e.target.id)
                    if(e.target.id =="modal"){
                        modal.classList.add('displayNone')
                        container.classList.remove('displayNone')
                    }
                    
                }
           
            })
        })
    });    
  
};

fetchHome('popular')
fetchHome('top_rated')
fetchHome('now_playing')
fetchHome('upcoming')




//PARA BUSCAR PELICULA DESDE EL INPUT
const valor = input.addEventListener('keypress', function (e) {
    if(e.keyCode === 13){
        document.getElementById('peliculas').innerHTML = '';
        fetchInput()

    }
})


let pageA=1;
// PARA BUSCAR PELICULA DESDE LOS BOTONES DEL NAVEGADOR
function fetchNav(url) {
    document.getElementsByClassName('busqueda')[0].classList.remove('displayNone')
    document.getElementById('loadMore').classList.remove('displayNone')
    document.getElementById('loadMore').classList.add('displayNone') 
    document.getElementById('loadMoreUrl').classList.remove('displayNone')
     
    fetch(`https://api.themoviedb.org/3/movie/${url}?api_key=${apiKey}&page=${pageA}`)
        .then(res => res.json()) 
        .then(movie => {
        document.getElementsByClassName('searchTotal')[0].innerText = movie.total_results +' results';
         
        const data = movie.results.map(m=> {
            return `
            <div class='box' id=${m.id}>
            <img class='p' src="https://image.tmdb.org/t/p/original${m.poster_path}" id=${m.id}>
            <span id='titulo'>${m.title}</span>
            </div>
            `
        });

        document
        .getElementById('peliculas')
        .innerHTML += data.join('');

        sacarHome()
        
            const loadMoreUrl= document.getElementById('loadMoreUrl'); //esto es para modificar paginaActual sumando uno cada vez que se aprieta boton
                loadMoreUrl.addEventListener('click', function (e) {        
                    console.log(e)
                    pageA++
                fetchNav(`${url}`)
            });

        pelicula = document.querySelectorAll('.box');
        // click en poster que abre modal
        pelicula.forEach(function (p) {
            p.addEventListener('click', function (e) {
                e.preventDefault();
                container.classList.add('displayNone');
                modal.classList.remove('displayNone'); 
                traerModal.classList.remove('displayNone')
                
                const target = e.currentTarget.id //para ver sobre qué clickeamos
            
                const buscarInfo = fetch (`https://api.themoviedb.org/3/movie/${target}?api_key=${apiKey}`);
                // aca pude traer genero de pelicula///////////
                buscarInfo
                .then( res => res.json())  
                .then(movie => { 
             
                document.getElementById('text1').innerHTML = movie.title;
                document.getElementById('text2').innerHTML = movie.tagline;
                document.getElementById('info1').innerHTML = movie.overview;
                document.getElementById('info3').innerHTML = movie.release_date;
               
                if(!movie.poster_path){
                    document.getElementById('p2').src = './no-image.png'
                }else{
                    document.getElementById('p2').src =`https://image.tmdb.org/t/p/original${movie.poster_path}`;
                }

                if(!movie.backdrop_path){       
                    document.getElementById('b2').src = './azul.jpg'
                }else{
                    document.getElementById('b2').src =`https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
                }

                date = movie.genres.map(g =>`<span>${g.name}</span>`)
                document
                .getElementById('c')
                .innerHTML = date.join(', ')
        
                });

                // cerrar modal click afuera
                modal.addEventListener('click', clickOutside)
                function clickOutside(e) {
                    console.log(e)
                    console.log(e.target.id)
                    if(e.target.id =="modal"){
                        modal.classList.add('displayNone')
                        container.classList.remove('displayNone')
                    }
                    
                }
                    
            })
        })

       
    });
};



popular.onclick = function (e) {
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('popular');
    e.preventDefault();
    // titulo de busqueda
    tipo.innerText = 'Popular';
     
}

toprated.onclick = function (e) {
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('top_rated');
    e.preventDefault();
    // titulo de busqueda
    tipo.innerText = 'Top Rated'
}

nowplaying.onclick = function (e) {
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('now_playing');
    e.preventDefault();
    // titulo de busqueda
    tipo.innerText = 'Now Playing'
}
upcoming.onclick = function (e) {
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('upcoming');
    e.preventDefault();
    // titulo de busqueda
    tipo.innerText = 'Up Coming';
}



//  MODAL CERRAR
const boton = document.getElementById('boton');
boton.onclick = function (e) {  
    e.preventDefault();
    modal.classList.add('displayNone');  
    container.classList.remove('displayNone');

};


// HAMBURGUESA
const burger = document.getElementById('burger')
const botonBurger = document.getElementById('hamb');
const botonPop = document.querySelector('.info6')
const botonTop = document.querySelector('.info7')
const botonNow = document.querySelector('.info8')
const botonUp = document.querySelector('.info9')

botonBurger.onclick = function (e) {  
    e.preventDefault();
    console.log(e) 
    burger.classList.remove('displayNone');
    modal.classList.add('displayNone')
    

};

botonPop.onclick = function (e) {
    e.preventDefault()
    console.log(e)
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('popular');
    burger.classList.add('displayNone')
  
}


botonTop.onclick = function (e) {
    e.preventDefault()
    console.log(e)
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('top_rated');
    burger.classList.add('displayNone')
    
}

botonNow.onclick = function (e) {
    e.preventDefault()
    console.log(e)
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('now_playing');
    burger.classList.add('displayNone')
    
}
botonUp.onclick = function (e) {
    e.preventDefault()
    console.log(e)
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('upcoming');
    burger.classList.add('displayNone')

    
}



// BOTON VIEW ALL
const botonViewPop = document.getElementById('pop');
const botonViewTop = document.getElementById('top');
const botonViewNow = document.getElementById('now');
const botonViewUp = document.getElementById('up');

botonViewPop.onclick = function(){
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('popular')

}
botonViewTop.onclick = function(){
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('top_rated')

}

botonViewNow.onclick = function(){
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('now_playing');

}
botonViewUp.onclick = function(){
    document.getElementById('peliculas').innerHTML = '';
    fetchNav('upcoming');

}

