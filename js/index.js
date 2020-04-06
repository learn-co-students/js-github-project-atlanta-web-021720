// selecting the form
const githubForm = document.querySelector('#github-form')
//eventlistener on submit for the form
githubForm.addEventListener('submit', function(e) {
    // prevent the form from rendering
    e.preventDefault();
    // search for target value
    const searchValue = e.target.search.value

// fetch the api 
    fetch(`https://api.github.com/search/users?q=${searchValue}`)
        .then(resp => resp.json())
        .then(json => {
        json.items.forEach(json => {
            // create new element for each item 
            let userLi = document.createElement("li")
            let userImg = document.createElement("img")
            let userLink = document.createElement("a")
            // asign value to the elements
            userImg.src = json.avatar_url
            userLi.innerText = json.login
            userLink.href = json.html_url
            userLink.innerHTML = json.html_url
            // find parent eleemnt
            let parentTag = document.querySelector('#user-list')
            // apend elements to the dom
            userLi.append(userImg, userLink)
            parentTag.appendChild(userLi)

    // add event listener on click
            userLi.addEventListener("Click", function(e){
                fetch(`https://api.github.com/users/${json.login}/repos`)
                .then(response => response.json())
                .then(json =>  {
                    json.forEach(json  =>  {
                        let repoLi = document.createElement("li")
                        repoLi.innerText = json.full_name
                        let repoParent = document.querySelector('#repos-list')
                        repoParent.appendChild(repoLi)
                    })
                })
            })

      
    })
  
    
})
})
























// function fetchGithub(){
// return fetch('https://api.github.com')
//   .then(resp => resp.json())
//   .then(json => {
//     debugger;
//     // renderGithub(json)
//   })
// //   debugger;
// //   .then(json => console.log(json));
// }


// function renderGithub(users) {
//     const userLi = document.createElement("li")
//     userLi.className = "users"
// }
