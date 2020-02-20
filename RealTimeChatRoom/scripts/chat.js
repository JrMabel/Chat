//Separaremos nuestras secciones en clases
//Agregando nuevos chat documents

//Seteando real time listener para obtener nuevos chats

//Actualizando nombre de usuario

//Actualizando la sala cada que se envia un mensaje
//Este es el responsable de manejar toda la data del chat
class salaChat {
    constructor(sala, nombreusuario){
        this.sala = sala;
        this.nombreusuario = nombreusuario;
        this.chats = db.collection('chats');
        this.desubscribir;
    }
//Agregando chat documents
async agregarChat (mensaje) {
    //format a chat object
    const ahora = new Date();
    const chat = {
        mensaje: mensaje,
        nombreusuario: this.nombreusuario,
        sala: this.sala,
        creado_en: firebase.firestore.Timestamp.fromDate(ahora)
        };
// Guardando el chat document en Firebase
const response = await this.chats.add(chat);
return response;  
    }
//Metodo haciendo referencia a nuestro chat colecction
obtenerChats(callback){
    this.desubscribir = this.chats
        //Esta es una consulta en Firestore para cualquier sala que pasemos - Esto es lo que me une a una sala
        .where('sala', '==', this.sala)
        .orderBy('creado_en')
        .onSnapshot(snapshot => {
            //Obtener los cambios en los documentos
            snapshot.docChanges().forEach(cambio => {
                //Si algo es added, queremos ponerla en la ventana de chat
                if(cambio.type==='added')
                {
                    //Esto actualizara la UI
                    callback(cambio.doc.data());
                }
            });
         });
    }
// Nuevo metodo
actualizarNombre(nombreusuario) {
    this.nombreusuario = nombreusuario;
    //Que se almacene el ultimo nick usado o de lo contrario, usaremos anonimo
    localStorage.setItem('nombreusuario', nombreusuario);
    }
//Este metodo es cuando cliqueamos en una nueva sala
actualizarSala(sala){
    this.sala = sala;
    console.log('Nueva sala');
    if (this.desubscribir)
        this.desubscribir();
    }
}
/* //Con esto creamos un nuevo chatroom
const salachat = new salaChat ('general','Mabel');

salachat.obtenerChats((data)=>{
    console.log(data);
});

//Esto emulara cuando el usuario cambie de sala
setTimeout(() => {
   salachat.actualizarSala('gaming');
   salachat.actualizarNombre('Catalina');
   salachat.obtenerChats((data) =>{
    console.log(data);
   });
   salachat.agregarChat('Hola');
   //Asi van apareciendo los chats cada cierto tiempo 3000 mlsecs
}, 3000);

 */