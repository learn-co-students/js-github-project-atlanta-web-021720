










let foundForm = document.querySelector("#github-form")

foundForm.addEventListener("submit", function(e){
    e.preventDefault()
    let userSearch = e.target.search.value

    fetch(`https://api.github.com/search/users?q=${userSearch}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data.items)
        renderUser(data.items)
    })
})

function renderUser(users) {

    let userList = document.querySelector("#user-list")
    

        let foundUl = document.querySelector("#deleteme")
        if (foundUl){
            foundUl.remove()
        }

    let overUl = document.createElement("ul")
    overUl.id = "deleteme"
    userList.append(overUl)
    users.forEach(user => {
        // console.log(user)
        let userDiv = document.createElement("div")
        let userImage = document.createElement("img")
        let userHref = document.createElement("a")
        let userH2 = document.createElement("h2")
        userDiv.className = "userDiv"
        userImage.src = user.avatar_url
        userImage.height = 100
        
        userH2.innerText = user.login
        userH2.className = "userH2"

        userHref.href = user.url
        userHref.innerText = user.url

        overUl.appendChild(userDiv)
        userDiv.appendChild(userH2)
        userDiv.appendChild(userImage)
        userDiv.appendChild(userHref)

        userDiv.addEventListener("click", function(e){
            let userName = userH2.innerText

            fetch(`https://api.github.com/users/${userName}/repos`)
            .then(response => response.json())
            .then(data => {

                let foundList = document.querySelector("#repos-list")

                while (foundList.firstChild){
                    foundList.firstChild.remove()
                }
                
                for (dataset of data){
                    let repoLi = document.createElement("li")
                    repoLi.innerText = dataset.full_name

                    foundList.appendChild(repoLi)
                }
            })




        })
    
       
    })
}








