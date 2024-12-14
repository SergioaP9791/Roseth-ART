//PROGRAMACION DE TRANSICION DE AMBOS FORMULARIOS
const signUpButton = document.getElementById("signUp");//Registro
const signInButton = document.getElementById("signIn");//ingreso
const container = document.getElementById("container");
const boost = document.getElementById("boost");
//evento click de mostrar from registro
signUpButton.addEventListener('click',() => {
    container.classList.add("right-panel-active");
    boost.style.visibility="hiden";
});
//evento click de ocultar form registro
signInButton.addEventListener('click',() => {
    container.classList.remove("right-panel-active");
    boost.style.visibility="visible";
});
//mostrar contraseña
function mostrarSeña(){
    var tipo =document.getElementById("seña");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}