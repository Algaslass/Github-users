
// document.getElementById('btn').addEventListener('click',showGithubProfil);


// function showGithubProfil() {
//     let username = document.getElementById('gitUserName').value

//     let url = 'https://api.github.com/users/' +username
//     fetch(url).then(res => res.json()).then(data => {
//         if(data.message) {
//             console.log('User Profile Not Found')
//             document.getElementById('res').innerHTML = `
//             <h3>Profil Not Found</h3>
//             `
//         } else {
//             console.log(data)
//             document.getElementById('res').innerHTML = 
//             `
//             <div class ="text-center">    
//                 <img src = '${data.avatar_url}'
//                 style = "width:30%">
//                 <p>Name: ${data.login}</p>
//                 <strong>Github:</strong> <a href="${data.html_url}"> Link </a> <br><br> 
//                 <p>Public Repos: ${data.public_repos}</p>
//             </div>            
//             `
//         }
        
//     }).catch(e => {
//         console.log(e)
//     })
// }

const input = document.getElementById('input');
const submit = document.getElementById('submit');
const searching = document.getElementById('searching');
var name = "node";
const url1 = 'https://api.github.com/users/'

function search(name) {
    fetch(`${url1}${name}`)
        .then(response => response.json())
        .then(respons => {

        const url = `https://api.github.com/users/${name}/repos`;
        fetch(`${url}`).then(response => response.json()).then(data => {
            searching.innerHTML += `
            <div class="container">
            <div class="row">
                <div class="col s3 offset-s1"><img src="${respons.avatar_url}" class="responsive-img image" alt="profil"></div>
                
                <div class="col s3">
                    <p>
                    <strong>Name:</strong> ${respons.login} <br><br> 
                    <strong>Github:</strong> <a id='link' href="${respons.html_url}"> Link </a> <br><br> 
                    <strong>Public Repos:</strong> <span>${respons.public_repos}</span>
                    </p> 
                </div> 
                <div class="col s3 center">
                <a class='dropdown btn' id= 'button' href='#' data-target='dropdown1'>All repos</a>
        
                <!-- Dropdown Structure -->
                <ul class='content-drop'>${urlAllRepos(data)}</ul>
            </div>
                </div>
            </div>
        `;
        })
    })
}

function urlAllRepos(repos){
    let mesRepo;
    for (let i = 0; i < repos.length; i++) {
        mesRepo += `<li><a href="${repos[i].html_url}">${repos[i].name}</a> <br/></li> `
    }
    // debut de chaine indefined pour supprimer
    return mesRepo.replace("undefined","");
}



submit.addEventListener('click', function (e) {
    e.preventDefault()
    userGithub = input.value
    input.value = ''
    search(userGithub)
})


// pour pourvoir afficher les repos quand on click
searching.addEventListener('click', e=> {
    e.preventDefault();
    if(e.target.classList.contains('dropdown')){
        e.target.nextElementSibling.classList.toggle('activeUrl');
    }
})