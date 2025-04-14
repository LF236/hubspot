import './style.css'

document.querySelector('#app').innerHTML = `
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
`;

document.querySelector('#login-form').addEventListener('submit', function (event) {
  event.preventDefault();


  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  
  loginFunction({email, password});

});


const cleanAlert = () => {
  const alert = document.querySelector('#alert');
  alert.classList.add('d-none');
  alert.innerHTML = '';
}

const loginFunction = async (data) => {
  try {
    cleanAlert();
    const request = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response = await request.json();
    if(response.statusCode == 400) {
      const alert = document.querySelector('#alert');
      alert.classList.remove('d-none');
      alert.innerHTML = `<strong>Error!</strong> ${response.message}`;
      return;
    }
   
    const {token} = response;
    localStorage.setItem('token_app', token);
    window.location.href = '/dashboard';
  }
  catch(err) {
    console.log(err);
    const alert = document.querySelector('#alert');
    alert.classList.remove('d-none');
    alert.innerHTML = `<strong>Error!</strong> ${err.message}`;
  }
}