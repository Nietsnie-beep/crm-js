(function () {
  let DB;
  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();
    formulario.addEventListener("submit", validarCliente);
  });



  function validarCliente(e) {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("Todos los campos son obligatorios", "error");

      return;
    }
    
    //objeto
    const cliente = {
        nombre: nombre,
        email,
        telefono,
        empresa
    }

    cliente.id = Date.now();
    
    crearNuevoCliente(cliente)
}

const crearNuevoCliente = (cliente) => {
    const transaction = DB.transaction(['crm'], 'readwrite');

    const objectStore = transaction.objectStore('crm');

    objectStore.add(cliente);

    transaction.onerror = function() {
        imprimirAlerta('Hubo un error');
    };
    transaction.oncomplete = function() {
        console.log('cliente agregado');

        imprimirAlerta('El Cliente se agrego correctamente');

        setTimeout(() => {
            window.location.href = 'index.html';
        },3000);
    }
}

 
})();
