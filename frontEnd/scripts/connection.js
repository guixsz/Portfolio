const form = document.getElementById('form');
const clientName = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const message = document.getElementById('message');
const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

form.addEventListener('submit', function(event) {
    event.preventDefault();
    //createClient();
    validation();
});

function validation() {
    const fields = [
        {
            id: 'name',
            label: 'Nome',
            validator: nameIsValid,
        },
        {
            id: 'email',
            label: 'Email',
            validator: emailIsValid,
        },
        {
            id: 'number',
            label: 'Número',
            validator: numberIsValid,
        },
        {
            id: 'message',
            label: 'Mensagem',
            validator: messageIsValid,
        }
    ]

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const groupForm = input.closest('.group-form');
        const inputValue = input.value;

        const erroSpan = groupForm.querySelector('.error'); 
        erroSpan.innerHTML = '';

        groupForm.classList.remove('invalid');
        groupForm.classList.add('valid')

        const fieldValidator = field.validator(inputValue);

        if(!fieldValidator.isValid) {
            erroSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`;
            groupForm.classList.add('invalid');
            groupForm.classList.remove('valid');
            return;
        }
    })
}

function isEmpty(value) {
    return value === '';
}

function nameIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    };

    if(isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O nome é obrigatório!';
        return validator;
    }

    const min = 3;

    if(value.length < min) {
        validator.isValid = false;
        validator.errorMessage = `Deve ter no mínimo ${min} caracteres!`;
        return validator;
    }

    const regex = /^[a-zA-Z]/;

    if(!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O nome deve conter apenas letras!'
    }

    return validator;
}

function emailIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    };

    if(isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O e-mail é obrigatório!';
        return validator;
    }

    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

    if(!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O e-mail precisa ser válido!';
        return validator;
    }

    return validator;
}

function numberIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    };

    if(isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O número é obrigatório!';
        return validator;
    }

    const regex = /^(55)?(?:([1-9]{2})?)(\d{4,5})(\d{4})$/;

    if(regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O número precisa ser válido!';
        return validator;
    }

    return validator;
}

function messageIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    };

    if(isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'A mensagem é obrigatória!';
        return validator;
    }

    return validator;
}


function createClient() {

    const clientData = {
        name: clientName.value,
        email: email.value,
        number: number.value, 
        message: message.value
    };

    console.log("Dados que serão enviados (clientData):", clientData);

    fetch("http://localhost:8080/client",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(clientData)
        })
        .then(function (res) {
            console.log("Status da Resposta:", res.status, res.statusText);
            
            if (!res.ok) {
                throw new Error(`Erro HTTP: ${res.status}. Verifique o console do servidor e a configuração CORS.`);
            }
            
            return res.json(); 
        })
        .then(function (data) {
            console.log("Resposta de Sucesso do Back-end:", data);
            alert("Mensagem enviada com sucesso!");
            form.reset();
        })
        .catch(function (error) {
            console.error("ERRO na Conexão/Requisição:", error);
            alert("Falha ao enviar mensagem. Verifique o console para mais detalhes.");
        });
}