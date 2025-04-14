import"./style-C4-xeK-Y.js";document.addEventListener("DOMContentLoaded",()=>{const o=(()=>{const e=localStorage.getItem("token_app");return e||(window.location.href="/"),e})();c(o)});document.querySelector("#dashbord").innerHTML=`
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

`;const c=async s=>{try{const e=await(await fetch("/contacts",{method:"GET",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"}})).json();if(e.length===0){const t=document.querySelector("#alert");t.classList.remove("d-none"),t.innerHTML="<strong>Error!</strong> No hay contactos";return}const a=document.querySelector(".user-card");a.innerHTML="";let r="";e.forEach(t=>{let n=`
            <div class="card shadow-sm mb-3">
                <div class="card-body">
                    <h5 class="card-title">${t.firstname} ${t.lastname}</h5>
                    <p class="card-text">
                        <strong>Email:</strong> ${t.email}<br/>
                    </p>
                    <div class="d-flex justify-content-end gap-2">
                        <button class="btn btn-warning btn-sm btn-actualizar" data-id="${t.id}">Actualizar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar" data-id="${t.id}">Eliminar</button>
                    </div>
                </div>
            </div>
            `;r+=n}),a.innerHTML=r}catch(o){return console.log(o),document.querySelector(".user-card").innerHTML="",[]}};(()=>{const s=document.querySelector("#botonAgregarUsuario"),o=new bootstrap.Modal(document.querySelector("#modalAgregarUsuario")),e=document.querySelector("#formAgregarUsuario");s.addEventListener("click",()=>{o.show()}),e.addEventListener("submit",async a=>{a.preventDefault();const r=document.querySelector("#alert");r.classList.add("d-none"),r.innerHTML="";const t=localStorage.getItem("token_app"),n=document.querySelector("#firstname").value,l=document.querySelector("#lastname").value,i=document.querySelector("#email").value,d=document.querySelector("#phone").value,m=await fetch("/contacts",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({firstname:n,lastname:l,email:i,phone:d})}),u=await m.json();if(m.status===400){r.classList.remove("d-none"),r.innerHTML=`<strong>Error!</strong> ${u.message}`;return}o.hide(),e.reset(),c(t)})})();(async()=>{const s=async e=>{try{const a=localStorage.getItem("token_app"),t=await(await fetch(`/contacts/${e}`,{method:"GET",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}})).json();return t||null}catch(a){return console.log(a),null}};let o=null;document.addEventListener("click",async e=>{if(e.target&&e.target.classList.contains("btn-actualizar")){const a=parseInt(e.target.getAttribute("data-id")),r=await s(a);if(!r)return;const{lastname:t,firstname:n,email:l}=r;o=a,new bootstrap.Modal(document.querySelector("#modalActualizarUsuario")).show(),document.querySelector("#firstnameUpdate").value=n,document.querySelector("#lastnameUpdate").value=t,document.querySelector("#emailUpdate").value=l}}),document.querySelector("#formActualizarUsuario").addEventListener("submit",async e=>{e.preventDefault();const a=localStorage.getItem("token_app"),r=document.querySelector("#firstnameUpdate").value,t=document.querySelector("#lastnameUpdate").value,n=document.querySelector("#emailUpdate").value,l=await fetch(`/contacts/${o}`,{method:"PATCH",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({firstname:r,lastname:t,email:n})}),i=await l.json(),d=document.querySelector("#alertUpdate");if(l.status===400){d.classList.remove("d-none"),d.innerHTML=`<strong>Error!</strong> ${i.message}`;return}bootstrap.Modal.getInstance(document.querySelector("#modalActualizarUsuario")).hide(),e.target.reset(),c(a)})})();(()=>{let s=null;document.addEventListener("click",async o=>{o.target&&o.target.classList.contains("btn-eliminar")&&(s=parseInt(o.target.getAttribute("data-id")),new bootstrap.Modal(document.querySelector("#modalEliminarUsuario")).show())}),document.querySelector("#modalEliminarUsuario").addEventListener("click",async o=>{o.preventDefault();const e=localStorage.getItem("token_app"),a=await fetch(`/contacts/${s}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),r=await a.json(),t=document.querySelector("#alertDelete");if(a.status===404){t.classList.remove("d-none"),t.innerHTML=`<strong>Error!</strong> ${r.message}`;return}bootstrap.Modal.getInstance(document.querySelector("#modalEliminarUsuario")).hide(),c(e)})})();
