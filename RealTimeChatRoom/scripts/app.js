//NOTA> salachat es nuestra instancia para llamar los metodos de chat.js
//DOM queries
const listaChat = document.querySelector('.chat-list');
const nuevoChatForm = document.querySelector('.new-chat');
const nuevoNombreForm = document.querySelector('.new-name');
const actualizarMensaje = document.querySelector('.update-mssg');
const salas = document.querySelector('.chat-rooms');

//Agregando nuevo chat o mensaje
nuevoChatForm.addEventListener('submit', e => {
  e.preventDefault();
  //uso .message porque en el html ese el id del input
  const mensaje = nuevoChatForm.message.value.trim();
  //Con esto agregaremos realmente el mensaje pero podemos usar el metodo creado e instanciado
  salachat.agregarChat(mensaje)
      .then(() => nuevoChatForm.reset())
      .catch(err => console.log(err));
});

// Actualizar nombre de usuario
nuevoNombreForm.addEventListener('submit', e => {
  e.preventDefault();
  //Actualizando nombre via salachat clase
  const nuevoNombre = nuevoNombreForm.name.value.trim();
  salachat.actualizarNombre(nuevoNombre);
  //Reseteando el form
  nuevoChatForm.reset();
  // Mostrar y luego esconder mensaje de actualizacion
  actualizarMensaje.innerText = `Tu nombre fue actualizado a ${nuevoNombre}`;
  setTimeout(() => actualizarMensaje.innerText = '', 3000);
});

//cambiando o actualizando sala cuando clickeamos las opciones o botones
salas.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON'){
      //chatUI es la instancia de ui.js donde esta el metodo clear
      chatUI.clear();
      //Le pasaremos el id del html para que actualice de sala
      salachat.actualizarSala(e.target.getAttribute('id'));
      //Necesitamos ver los chats o mensajes si cambiamos entre sala y sala
      //Hacemos referencia a nuestro callback funct
      salachat.obtenerChats(chat => chatUI.render(chat));
  }

});

//Validando localstorage para el nombre
const nombreusuario = localStorage.nombreusuario ? localStorage.nombreusuario : 'Anónimo';

// class instances
const chatUI = new ChatUI(listaChat);
const salachat = new salaChat('general', nombreusuario);

// get chats & render
salachat.obtenerChats(data => chatUI.render(data));
