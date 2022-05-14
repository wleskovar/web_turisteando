//  seleccionamos los dos elementos que serán clickables

const boton_menu_hamburgue = document.getElementById("button-menu_hamburguer");
const nav_hamburguer = document.getElementById("nav_hamburguer");
const boton_menu_hamburgue_close = document.getElementById("button-menu_hamburguer_close");


/* 
  cada ves que se haga click en el botón 
  agrega y quita las clases necesarias 
  para que el menú se muestre.
*/
boton_menu_hamburgue.addEventListener("click", () => {
  boton_menu_hamburgue.classList.toggle("close");
  nav_hamburguer.classList.toggle("show");
  boton_menu_hamburgue_close.classList.toggle("show");
});

/* 
  Cuándo se haga click fuera del contenedor de enlaces 
  el menú debe esconderse.
*/

nav_hamburguer.addEventListener("click", e => {
  if (e.target.id === "nav_hamburguer") {
    nav_hamburguer.classList.remove("show");
    boton_menu_hamburgue_close.classList.remove("show");
    boton_menu_hamburgue.classList.toggle("show");
  }
});
boton_menu_hamburgue_close.addEventListener("click", ()=> {
  nav_hamburguer.classList.remove("show");
  boton_menu_hamburgue_close.classList.remove("show");
  boton_menu_hamburgue.classList.toggle("show");
});
