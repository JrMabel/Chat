//Render chat templates to the DOM (Document Object Model)
//Limpiando la lista de chats (cuando haya cambios)
class ChatUI {
    constructor(lista){
        this.lista = lista;
    }

//Este otro metodo servira para limpiar todas las conversaciones del chat o el UL del HTML y simular una nueva sala
    clear() {
        this.lista.innerHTML = '';
        }
    //El render method es responsable de crear el html template
    render (data){
        //Con el script agregado en el HTML, esta libreria nos ayuda a colocar 3 mnts ago y asi
        const cuando = dateFns.distanceInWordsToNow(
            data.creado_en.toDate(),
            {addSuffix: true } // Con esto el ago
        );
        const html = `
        <li class="list-group-item">
            <span class="nombreusuario">${data.nombreusuario}</span>
            <span class="mensaje">${data.mensaje}</span>
            <div class="tiempo">${cuando}</div>
        </li>
        `;
        this.lista.innerHTML += html;
    }
}