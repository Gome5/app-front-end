let receitas = [];
let despesas = [];

function addReceita() {
  const desc = document.getElementById("descReceita").value;
  const valor = parseFloat(document.getElementById("valorReceita").value);
  const data = document.getElementById("dataReceita").value;

  if (!desc || !valor || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  receitas.push({ desc, valor, data });
  limparCamposReceita();
  atualizarTela();
}

function addDespesa() {
  const desc = document.getElementById("descDespesa").value;
  const valor = parseFloat(document.getElementById("valorDespesa").value);
  const data = document.getElementById("dataDespesa").value;

  if (!desc || !valor || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  despesas.push({ desc, valor, data });
  limparCamposDespesa();
  atualizarTela();
}

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
