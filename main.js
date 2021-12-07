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

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {
    
    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;          

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username){
    
    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}`;
   
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    
    // When request is received
    // Process it here
    xhr.onload = function () {
    
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        
        // Loop over each object in data array

            // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');
    
            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');
            
            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')
        
            // Create the html markup for each li
            li.innerHTML = (`<div class="card mb-3" style="max-width: 540px; id="idPerfil">
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
          </div>`);
            
            // Append each li to the ul
            ul.appendChild(li);
        

    }
    
    // Send the request to the server
    xhr.send();
    
}


function carregaPerfil() {
  abrePerfil();
  abreRepos();
  let pesquisaUserBotao = document.getElementById("botao");
  pesquisaUserBotao.addEventListener("click", pesquisaUser);
}
window.addEventListener("carrega", carregaPerfil);
