let receitas = [];
let despesas = [];

function limparCamposReceita() {
  document.getElementById("descReceita").value = "";
  document.getElementById("valorReceita").value = "";
  document.getElementById("dataReceita").value = "";
}

function limparCamposDespesa() {
  document.getElementById("descDespesa").value = "";
  document.getElementById("valorDespesa").value = "";
  document.getElementById("dataDespesa").value = "";
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getReceitas = async () => {
  let url = 'http://192.168.1.114:5000/receita';

  fetch(url, {
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      data.receitas.forEach(item => {
        console.log('Receita:', item);
        receitas.push({
          id: item.id,
          desc: item.descricao,
          valor: parseFloat(item.valor),
          data: item.data_entrada
        });
      });
      atualizarTela();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getReceitas();

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET despesas
  --------------------------------------------------------------------------------------
*/
const getDespesas = async () => {
  let url = 'http://192.168.1.114:5000/despesas';

  fetch(url, {
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      data.despesas.forEach(item => {
        console.log('Despesa:', item);
        despesas.push({
          id: item.id,
          desc: item.descricao,
          valor: parseFloat(item.valor),
          data: item.data_entrada
        });
      });
      atualizarTela();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getDespesas();

function addReceita() {
  const desc = document.getElementById("descReceita").value;
  const valor = parseFloat(document.getElementById("valorReceita").value);
  const data = document.getElementById("dataReceita").value;

  if (!desc || !valor || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  limparCamposReceita();
  postItem(desc, valor, data, "receita");
}

function addDespesa() {
  const desc = document.getElementById("descDespesa").value;
  const valor = parseFloat(document.getElementById("valorDespesa").value);
  const data = document.getElementById("dataDespesa").value;

  if (!desc || !valor || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  limparCamposDespesa();
  postItem(desc, valor, data, "despesa");
}

function atualizarTela() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  let totalReceitas = 0;
  let totalDespesas = 0;

  receitas.forEach(r => {
    totalReceitas += r.valor;

    lista.innerHTML += `
      <tr>
        <td>Receita</td>
        <td>${r.desc}</td>
        <td>R$ ${r.valor.toFixed(2)}</td>
        <td>${r.data}</td>
        <td>
          <img class="btn-excluir" src="https://cdn-icons-png.flaticon.com/512/126/126468.png" onClick="deletarItem(${r.id}, 'receita')">
        </td>
      </tr>
    `;
  });

  despesas.forEach(d => {
    totalDespesas += d.valor;

    lista.innerHTML += `
      <tr>
        <td>Despesa</td>
        <td>${d.desc}</td>
        <td>R$ ${d.valor.toFixed(2)}</td>
        <td>${d.data}</td>
        <td>
          <img class="btn-excluir" src="https://cdn-icons-png.flaticon.com/512/126/126468.png" onClick="deletarItem(${d.id}, 'despesa')">
        </td>
      </tr>
    `;
  });

  document.getElementById("totalReceitas").innerText = totalReceitas.toFixed(2);
  document.getElementById("totalDespesas").innerText = totalDespesas.toFixed(2);
  document.getElementById("saldo").innerText = (totalReceitas - totalDespesas).toFixed(2);
}

function filtrarLista() {
  const filtro = document.getElementById("busca").value.toLowerCase();
  console.log("Filtro:", filtro);
  const linhas = document.querySelectorAll("#lista tr");

  linhas.forEach(linha => {
    const descricao = linha.querySelector("td:nth-child(2)").innerText.toLowerCase();
    if (descricao.includes(filtro)) {
      linha.style.display = "";
    } else {
      linha.style.display = "none";
    }
  });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputDesc, inputValue, inputDate, type) => {
  const formData = new FormData();
  formData.append('descricao', inputDesc);
  formData.append('valor', inputValue);
  formData.append('data', inputDate);

  console.log('FormData:', formData.get('descricao'), formData.get('valor'), formData.get('data'));
  let url = '';
  if(type === "receita") {
    url = 'http://192.168.1.114:5000/receita';
  } else if(type === "despesa") {
    url = 'http://192.168.1.114:5000/despesa';
  }
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if(!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      if(type === "receita") {
        receitas = [];
        getReceitas();
      } else if(type === "despesa") {
        despesas = [];
        getDespesas();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Erro ao adicionar item. Verifique os dados ou tente novamente.');
    });
}

const deletarItem = (id, tipo) => {
  if (!confirm('Tem certeza que deseja excluir?')) return;

  let url = '';

  if (tipo === 'receita') {
    url = 'http://192.168.1.114:5000/receita?id=' + id;
  } else {
    url = 'http://192.168.1.114:5000/despesa?id=' + id;
  }

  fetch(url, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao deletar');

      alert('Item excluído com sucesso!');
      receitas = [];
      despesas = [];

      getDespesas();
      getReceitas();

    })
    .catch(error => {
      console.error(error);
      alert('Erro ao excluir item');
    });
};