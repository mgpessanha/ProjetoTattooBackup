// obj facilitador para pegar as IDs dos elementos do cadastro
const form2 = {
    email2: () => document.getElementById('email2'),
    emailInvalidError2: () => document.getElementById('email-invalido-error2'),
    emailRequiredError2: () => document.getElementById('email-obrigatorio-error2'),
    password2: () => document.getElementById('password2'),
    passwordRequiredError2: () => document.getElementById('senha-obrigatoria-error2'),
    passwordLengthError: () => document.getElementById('senha-tamanho-error'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('senha-diferente-error'),
    registerButton: () => document.getElementById('cadastrar-botao')
}

document.getElementById('email2').addEventListener('input', onChangeEmail2);
document.getElementById('password2').addEventListener('input', onChangePassword2);
document.getElementById('confirmPassword').addEventListener('input', onChangeConfirmPassword);

// função para verificar o campo de email do cadastro e atualizar a UI
function onChangeEmail2() {
    const email2 = form2.email2().value;

    form2.emailRequiredError2().style.display = email2 ? "none" : "block";
    form2.emailInvalidError2().style.display = validarEmail2(email2) ? "none" : "block";

    alternarBotaoCadastroDesabilitado();
}

// função para verificar o campo de senha do cadastro e atualizar a UI
function onChangePassword2() {
    const password2 = form2.password2().value;

    form2.passwordRequiredError2().style.display = password2 ? "none" : "block";
    form2.passwordLengthError().style.display = password2.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    alternarBotaoCadastroDesabilitado();
}

// função para verificar o campo de confirmar senha do cadastro e atualizar a UI
function onChangeConfirmPassword() {
    validatePasswordsMatch();
    alternarBotaoCadastroDesabilitado();
}


// função para cadastrar um usuario
function cadastrar() {
    const email2 = form2.email2().value;
    const password2 = form2.password2().value;

    firebase.auth().createUserWithEmailAndPassword(
        email2, password2
    ).then(() => {
        window.location.href = "index.html";
    }).catch(error => {
        console.log(error)
        alert(getErrorMessage2(error));
    })
}

// função para retornar o erro
function getErrorMessage2(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Esse email já está em uso";
    }
    return error.message;
}

// função que valida se os campos senha e confirmar senha do cadastro são iguais
function validatePasswordsMatch() {
    const password2 = form2.password2().value;
    const confirmPassword = form2.confirmPassword().value;

    form2.confirmPasswordDoesntMatchError().style.display = password2 == confirmPassword ? "none" : "block";
}

// função para habilitar botao de cadastrar
function alternarBotaoCadastroDesabilitado() {
    form2.registerButton().disabled = !isFormValid();
}

// função que verifica se o formulario de cadastro é valido
function isFormValid() {
    const email2 = form2.email2().value;

    if (!email2 || !validarEmail2(email2)) {
        return false;
    }

    const password2 = form2.password2().value;
    if (!password2 || password2.length < 6) {
        return false;
    }

    const confirmPassword = form2.confirmPassword().value;
    if (password2 != confirmPassword) {
        return false;
    }

    return true;
}
