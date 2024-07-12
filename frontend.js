async function enviar(){
    var sA = document.getElementById('nSA').value
    var fluig = document.getElementById('nFlg').value
    var data = document.getElementById('data').value
    var descricao = document.getElementById('desc').value

    if (descricao === "" || data === "" || sA === "") {
        alert("Os seguintes campos obrigatórios podem não estarem preenchidos:\nData, SA, Descrição. Favor revisar.")
    }
    else{
        try {
            const response = await fetch('http://localhost:3000/api/criar-armazem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sA, fluig, data, descricao })
            });
            if (response.ok) {
                alert('Dados enviados com sucesso!');
            } else {
                alert('Erro ao enviar os dados!');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao enviar os dados!');
        }
    }
}

window.enviar = enviar;