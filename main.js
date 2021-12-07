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

const gitHubForm = document.getElementById('gitHubForm');


gitHubForm.addEventListener('submit', (e) => {


  e.preventDefault();


  let usernameInput = document.getElementById('usernameInput');


  let gitHubUsername = usernameInput.value;


  requestUser(gitHubUsername);

})


function requestUser(username) {


  const xhr = new XMLHttpRequest();


  const url = `https://api.github.com/users/${username}/repos`;


  xhr.open('GET', url, true);


  xhr.onload = function () {


    const data = JSON.parse(this.response);

    for (let i in data) {
      let ul = document.getElementById('userRepos');


      let li = document.createElement('li');


      li.classList.add('list-group-item')


      li.innerHTML = (`
    <p><strong>Nome:</strong> ${data[i].name}</p>
    <p><strong>Linguagem:</strong> ${data[i].language}</p>
    <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
`);
      ul.appendChild(li);


    }
  }
  xhr.send();

}


function carregaPerfil() {
  abrePerfil();
  abreRepos();
  let pesquisaUserBotao = document.getElementById("submit");
  pesquisaUserBotao.addEventListener("click", requestUser);
}
window.addEventListener("carrega", carregaPerfil);
