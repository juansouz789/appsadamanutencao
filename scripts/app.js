

function enviar(){
    let sA = document.getElementById('nSA').value
    let fluig = document.getElementById('nFlg').value
    let data = document.getElementById('data').value
    let descricao = document.getElementById('desc').value

    if (descricao === "" || data === "" || sA === "") {
        alert("Os seguintes campos obrigatórios podem não estarem preenchidos:\nData, SA, Descrição. Favor revisar.")
    }else{
        alert(`SA: ${sA}\n Fluig: ${fluig}\n Data de solicitação: ${data}\n ${descricao}`)
    }
}
