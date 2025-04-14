import"./style-C4-xeK-Y.js";document.querySelector("#app").innerHTML=`
 <div class="login-container">

  <div class="alert alert-primary d-none" role="alert" id="alert">
    
  </div>

    <h2 class="text-center mb-4">Iniciar Sesión</h2>
    <form id="login-form">
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input type="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Entrar</button>
    </form>
</div>
`;document.querySelector("#login-form").addEventListener("submit",function(t){t.preventDefault();const r=document.querySelector("#email").value,e=document.querySelector("#password").value,o=new FormData;o.append("email",r),o.append("password",e),s({email:r,password:e})});const a=()=>{const t=document.querySelector("#alert");t.classList.add("d-none"),t.innerHTML=""},s=async t=>{try{a();const e=await(await fetch("/auth/login",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})).json();if(e.statusCode==400){const n=document.querySelector("#alert");n.classList.remove("d-none"),n.innerHTML=`<strong>Error!</strong> ${e.message}`;return}const{token:o}=e;localStorage.setItem("token_app",o),window.location.href="/dashboard.html"}catch(r){console.log(r);const e=document.querySelector("#alert");e.classList.remove("d-none"),e.innerHTML=`<strong>Error!</strong> ${r.message}`}};
