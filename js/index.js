let searchForm = document.querySelector('#github-form')
searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let parentTag = document.querySelector("#user-list")
    let searchResult = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${searchResult}`)
        .then(response => response.json())
        .then(gitAccounts => {
            gitAccounts.items.forEach(gitAccount => {
                let userLi = document.createElement("li")
                let userImg = document.createElement('img')
                let userLinkLi = document.createElement("li")
                userImg.style.display = 'block'
                userImg.height = 50
                userImg.width = 50
                userLi.innerText = gitAccount.login
                userLi.addEventListener("click", function(e) {
                    fetch(`https://api.github.com/users/${gitAccount.login}/repos`)
                        .then(response => response.json())
                        .then(repos => {
                            repos.forEach(repo => {
                                let repoLi = document.createElement("li")
                                repoLi.innerText = repo.full_name
                                let repoParent = document.querySelector('#repos-list')
                                repoParent.appendChild(repoLi)
                            })
                        })
                })
                userLinkLi.innerText = `Github Link: ${gitAccount.html_url}`
                userImg.src = gitAccount.avatar_url
                userLi.appendChild(userImg)
                userLi.appendChild(userLinkLi)
                parentTag.appendChild(userLi)

            })
        })
})