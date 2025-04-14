import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    const getToken = () => {
        const token = localStorage.getItem('token_app');
        if (!token) {
            window.location.href = '/';
        }
        return token;
    }
    // Validate Token

    const token = getToken();

    getUsers(token);
});


document.querySelector('#dashbord').innerHTML = `
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <a class="navbar-brand" href="#">HubSpot</a>
    <div class="ms-auto">
      <button class="btn btn-success" id="botonAgregarUsuario">
        Agregar
      </button>
    </div>
  </nav>

  <div class="container user-card">
  </div>

  <div class="modal fade" id="modalAgregarUsuario" tabindex="-1" aria-labelledby="modalAgregarUsuarioLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="alert alert-primary d-none" role="alert" id="alert"></div>

        <form id="formAgregarUsuario">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAgregarUsuarioLabel">Agregar Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="firstname" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="firstname" required />
            </div>

            <div class="mb-3">
              <label for="lastname" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="lastname" required />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" id="email" required />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Teléfono</label>
              <input type="text" class="form-control" id="phone" required />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    </div>

    <div class="modal fade" id="modalActualizarUsuario" tabindex="-1" aria-hidden="true" aria-labelledby="modalActualizarUsuarioLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="alert alert-primary d-none" role="alert" id="alertUpdate"></div>

                <form id="formActualizarUsuario">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalActualizarUsuario">Actualizar Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="firstnameUpdate" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="firstnameUpdate" required />
                        </div>

                        <div class="mb-3">
                            <label for="lastnameUpdate" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="lastnameUpdate" required />
                        </div>

                        <div class="mb-3">
                            <label for="emailUpdate" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="emailUpdate" required />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalEliminarUsuario" tabindex="-1" aria-hidden="true" aria-labelledby="modalEliminarUsuarioLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="alert alert-primary d-none" role="alert" id="alertDelete"></div>

                <form id="formEliminarUsuario">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalEliminarUsuarioLabel">Eliminar Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>

                    <div class="modal-body">
                        <p>¿Está seguro de que desea eliminar este usuario?</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="btnEliminarUsuario">Eliminar</button>
                    </div>
                </form>
            </div>

        </div>
    </div>

`;



const getUsers = async (token) => {
    try {
        const request = await fetch('/contacts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const response = await request.json();

        if (response.length === 0) {
            const alert = document.querySelector('#alert');
            alert.classList.remove('d-none');
            alert.innerHTML = `<strong>Error!</strong> No hay contactos`;
            return;
        }

        const container = document.querySelector('.user-card');
        container.innerHTML = '';

        let htmlContent = '';
        response.forEach(item => {
            let cardItem = `
            <div class="card shadow-sm mb-3">
                <div class="card-body">
                    <h5 class="card-title">${item.firstname} ${item.lastname}</h5>
                    <p class="card-text">
                        <strong>Email:</strong> ${item.email}<br/>
                    </p>
                    <div class="d-flex justify-content-end gap-2">
                        <button class="btn btn-warning btn-sm btn-actualizar" data-id="${item.id}">Actualizar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            </div>
            `;
            htmlContent += cardItem;
        });

        container.innerHTML = htmlContent;
    }

    catch (err) {
        console.log(err);
        document.querySelector('.user-card').innerHTML = ``;
        return [];
    }
}

// Logic to add user
(() => {
    const btnAddUser = document.querySelector('#botonAgregarUsuario');
    const modal = new bootstrap.Modal(document.querySelector('#modalAgregarUsuario'));
    const form = document.querySelector('#formAgregarUsuario');

    btnAddUser.addEventListener('click', () => {
        modal.show();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const alert = document.querySelector('#alert');
        alert.classList.add('d-none');
        alert.innerHTML = '';
        const token = localStorage.getItem('token_app');
        const nombre = document.querySelector('#firstname').value;
        const apellido = document.querySelector('#lastname').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#phone').value;

        const request = await fetch('/contacts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: nombre,
                lastname: apellido,
                email,
                phone: telefono
            })
        });

        const response = await request.json();

        if (request.status === 400) {
            alert.classList.remove('d-none');
            alert.innerHTML = `<strong>Error!</strong> ${response.message}`;
            return;
        }
        modal.hide();
        form.reset();
        getUsers(token);
    });
})();

// Logic to update user
(async () => {

    const getUserById = async (id) => {
        try {
            const token = localStorage.getItem('token_app');
            const request = await fetch(`/contacts/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const response = await request.json();
            if (response) return response;
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    let selectedUserId = null;

    document.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('btn-actualizar')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            const user = await getUserById(id);

            if (!user) return;

            const { lastname, firstname, email } = user;
            selectedUserId = id;

            const modal = new bootstrap.Modal(document.querySelector('#modalActualizarUsuario'));
            modal.show();

            document.querySelector('#firstnameUpdate').value = firstname;
            document.querySelector('#lastnameUpdate').value = lastname;
            document.querySelector('#emailUpdate').value = email;
        }
    });

    document.querySelector('#formActualizarUsuario').addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token_app');
        const nombre = document.querySelector('#firstnameUpdate').value;
        const apellido = document.querySelector('#lastnameUpdate').value;
        const email = document.querySelector('#emailUpdate').value;

        const request = await fetch(`/contacts/${selectedUserId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: nombre,
                lastname: apellido,
                email: email,
            })
        });

        const response = await request.json();

        const alert = document.querySelector('#alertUpdate');
        if (request.status === 400) {
            alert.classList.remove('d-none');
            alert.innerHTML = `<strong>Error!</strong> ${response.message}`;
            return;
        }

        const modal = bootstrap.Modal.getInstance(document.querySelector('#modalActualizarUsuario'));
        modal.hide();
        e.target.reset();
        getUsers(token);
    });
})();


// Logic to delete user
(() => {

    let selectedUserId = null;

    document.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('btn-eliminar')) {
            const id = parseInt(e.target.getAttribute('data-id'));            
            selectedUserId = id;

            const modal = new bootstrap.Modal(document.querySelector('#modalEliminarUsuario'));
            modal.show();
        }
    });

    document.querySelector('#modalEliminarUsuario').addEventListener('click', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token_app');
        const request = await fetch(`/contacts/${selectedUserId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const response = await request.json();

        const alert = document.querySelector('#alertDelete');
        if (request.status === 404) {
            alert.classList.remove('d-none');
            alert.innerHTML = `<strong>Error!</strong> ${response.message}`;
            return;
        }

        const modal = bootstrap.Modal.getInstance(document.querySelector('#modalEliminarUsuario'));
        modal.hide();
        getUsers(token);
    });

})();