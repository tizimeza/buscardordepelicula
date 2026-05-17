
const series = [
  { titulo: "The Chosen (Los Elegidos)", imagen: "https://image.tmdb.org/t/p/w500/dqVUFuNrMFWt7uGNWlpo91VKYOI.jpg" },
  { titulo: "El Mentalista", imagen: "https://image.tmdb.org/t/p/w500/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg" },
  { titulo: "Bones", imagen: "https://image.tmdb.org/t/p/w500/eyTu5c8LniVciRZIOSHTvvkkgJa.jpg" },
  { titulo: "Moisés y los 10 mandamientos", imagen: "https://image.tmdb.org/t/p/w500/yAnTu7sdw77n15fj3EmF3do5F5V.jpg" },
  { titulo: "The Good Doctor", imagen: "https://image.tmdb.org/t/p/w500/luhKkdD80qe62fwop6sdrXK9jUT.jpg" },
  { titulo: "Dr. House", imagen: "https://image.tmdb.org/t/p/w500/3Cz7ySOQJmqiuTdrc6CY0r65yDI.jpg" },
  { titulo: "The Playlist (Spotify)", imagen: "https://image.tmdb.org/t/p/w500/rwH3duWAhZBspeFGcftWjQL4Nal.jpg" }
];


const pantallaLogin = document.getElementById('pantalla-login');
const pantallaPrincipal = document.getElementById('pantalla-principal');
const formLogin = document.getElementById('form-login');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const errorEmail = document.getElementById('error-email');
const errorPassword = document.getElementById('error-password');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const btnPokemon = document.getElementById('btn-pokemon');
const contenedorPokemon = document.getElementById('contenedor-pokemon');

inputEmail.addEventListener('input', () => {
  errorEmail.textContent = "";
  inputEmail.classList.remove('invalido');
});

inputPassword.addEventListener('input', () => {
  errorPassword.textContent = "";
  inputPassword.classList.remove('invalido');
});

// 3. Lógica de Login (Parte 1)
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  let esValido = true;
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // Validación Email
  if (!email.includes('@')) {
    errorEmail.textContent = "El email debe contener '@'";
    inputEmail.classList.add('invalido');
    esValido = false;
  }


  if (password.length < 4) {
    errorPassword.textContent = "La contraseña debe tener al menos 4 caracteres";
    inputPassword.classList.add('invalid');
    inputPassword.classList.add('invalido');
    esValido = false;
  }


  if (esValido) {
    pantallaLogin.classList.add('oculta');
    pantallaPrincipal.classList.remove('oculta');
    mostrarSeries();
  }
});


function mostrarSeries() {
  contenedorTarjetas.innerHTML = "";

  series.forEach(serie => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-serie');

    tarjeta.innerHTML = `
      <img src="${serie.imagen}" alt="${serie.titulo}">
      <div class="info">
        <h3>${serie.titulo}</h3>
      </div>
    `;

    contenedorTarjetas.appendChild(tarjeta);
  });
}

btnPokemon.addEventListener('click', async () => {
  const idAleatorio = Math.floor(Math.random() * 150) + 1;

  btnPokemon.disabled = true;
  btnPokemon.textContent = "Buscando Pokémon...";
  contenedorPokemon.innerHTML = '<div class="cargando-spinner"></div>';

  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}`);
    const pokemon = await respuesta.json();


    setTimeout(() => {
      contenedorPokemon.innerHTML = `
        <div class="tarjeta-pokemon">
          <div class="poke-header">
            <span class="poke-id">#${pokemon.id}</span>
          </div>
          <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          <div class="poke-types">
            ${pokemon.types.map(t => `<span class="tipo ${t.type.name}">${t.type.name}</span>`).join('')}
          </div>
        </div>
      `;
      btnPokemon.disabled = false;
      btnPokemon.textContent = "Traer Pokémon aleatorio";
    }, 500);

  } catch (error) {
    console.error("Error al traer el Pokémon:", error);
    contenedorPokemon.innerHTML = "<p class='error-p'>No se pudo conectar con la PokéAPI</p>";
    btnPokemon.disabled = false;
    btnPokemon.textContent = "Reintentar";
  }
});

// 6. Cerrar Sesión (Extra)
btnCerrarSesion.addEventListener('click', () => {
  pantallaPrincipal.classList.add('oculta');
  pantallaLogin.classList.remove('oculta');
  formLogin.reset();
});
