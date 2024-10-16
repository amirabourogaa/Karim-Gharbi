document
  .getElementById('login-form')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // Simulate login validation (replace with real server-side validation if needed)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true') // Indicateur d'authentification

      window.location.href = 'admin-dashboard.html' // Redirect to the admin dashboard
    } else {
      document.getElementById('login-error').textContent =
        "Nom d'utilisateur ou mot de passe incorrect."
    }
  })
