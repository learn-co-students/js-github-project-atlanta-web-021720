document.addEventListener("DOMContentLoaded", () => {
    fetchNames();
})

function fetchNames() {
    let searchForm = document.querySelector("#github-form")
    let nameList = document.querySelector("#user-list")
    let repoList = document.querySelector("#repos-list")

    searchForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = e.target.search.value

        fetch(`https://api.github.com/search/users?q=${username}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then(req => req.json())
        .then(userData => {
            console.log(userData.items)
            userData.items.forEach(item => {
                let newDiv = document.createElement("div")
                let newLi = document.createElement("li")
                newLi.innerHTML = item.login

                let newImg = document.createElement("img")
                newImg.src = item.avatar_url
                newImg.addEventListener("click", e => {
                    fetch(`https://api.github.com/users/${username}/repos`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        Accept: "application/vnd.github.v3+json"
                        }
                    })
                    .then(req => req.json())
                    .then(repoData => {
                        if(nameList.style.display === "none") {
                            nameList.style.display = "block"
                        } else {
                            nameList.style.display = "none"
                            repoData.forEach(repo => {
                                let repoLi = document.createElement("li")
                                repoLi.innerHTML = repo.name
                                repoList.appendChild(repoLi)
                            })
                        }
                    })
                })

                let newLink = document.createElement("a")
                newLink.href = item.html_url

                let newText = document.createTextNode("Link to profile")
                newLink.appendChild(newText)

                newDiv.appendChild(newLi)
                newDiv.appendChild(newImg)
                newDiv.appendChild(newLink)
                nameList.appendChild(newDiv)
            })
        })


        e.target.reset();
    })


}