function abrePerfil() {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    let data = JSON.parse(this.responseText);
    let perfilCard = `<div class="card mb-3" style="max-width: 540px; id="idPerfil">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.avatar_url}" class="img-fluid rounded-start" id ="imagem1" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.name}<br>(${data.login})</h5>
        <p class="card-text">${data.bio}</p>
        <p class="card-text">${data.followers} seguidores</p>
        <a href="${data.html_url}" target="_blank" class="btn btn-primary">Perfil no GitHub</a>
      </div>
    </div>
  </div>
</div>
</div>`;
    document.getElementById('perfil').innerHTML = perfilCard;
  };
  xhr.open('GET', 'https://api.github.com/users/Frederico-dos-Santos');
  xhr.send();
  xhr.onerror = function () {
    alert(`Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`);
  }
}
function abreRepos() {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let data = JSON.parse(this.responseText);

    let listaRepos = "";
    for (let i = 0; i < data.length; i++) {
      listaRepos += `
      <tr>
      <td>${data[i].id}</td>
      <td>${data[i].name}</td>
      <td>${data[i].html_url}</td>
      <td>${data[i].language}</td>
      </tr>`;
    }
    document.getElementById('listaRepos').innerHTML = listaRepos;
  }
  xhr.onerror = function () {
    alert(`Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`);
  }
  xhr.open('GET', 'https://api.github.com/users/Frederico-dos-Santos/repos')
  xhr.send();
}

function pesquisaUser() {
  var form = document.getElementById('searchForm')

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    var search = document.getElementById('search').value

    var originalName = search.split(' ').join('')

    document.getElementById('result').innerHTML = "";

    fetch("https://api.github.com/users/" + search)
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
        let pesquisa = "";
        pesquisa += `
         < a target = "_blank" href = "https:www.github.com/${originalName}" > <img src"${data.avatar_url}" /></a >
              <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <a target="_blank" href="https:www.github.com/${originalName}"><img src"${data.avatar_url}"/></a>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${data.name}<br>(${data.login})</h5>
                      <p class="card-text">${data.bio}</p>
                      <p class="card-text">${data.followers} seguidores</p>
                    </div>
                  </div>
                </div>
              </div>
  </div > `;
        document.getElementById('result').innerHtml = pesquisa;
      })
  })
}


function carregaPerfil() {
  abrePerfil();
  abreRepos();
  let pesquisaUserBotao = document.getElementById("botao");
  pesquisaUserBotao.addEventListener("click", pesquisaUser);
}
window.addEventListener("carrega", carregaPerfil);
