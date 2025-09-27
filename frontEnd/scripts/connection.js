const form = document.getElementById('form');
const clientName = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const message = document.getElementById('message');


form.addEventListener('submit', function(event) {
    event.preventDefault();
    createClient();
});

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