// função que faz o logout do usuario
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login-cadastro.html";
    }).catch(() => {
        alert("Erro ao fazer logout");
    });
}

// verifica se o usuário está logado ou não
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Se o usuário estiver logado, exiba o email
        document.getElementById('email-logado').textContent = user.email;
    }
});