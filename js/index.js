document.addEventListener('DOMContentLoaded', () => {

    gitSearch()
    // renderUsers()
})

const gitForm = document.getElementById('github-form')
const gitContainer = document.getElementById('github-container')
const gitUserList = document.getElementById('user-list')
const repoContainer = document.getElementById('repos-list')

const gitSearch = () => {
    gitForm.addEventListener('submit', e => {
        e.preventDefault()
        let userName = e.target.search.value
        fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(res => res.json())
        .then(data => {
            renderUsers(data.items)
            // console.log(data.items)
        }),
        e.target.reset()
    })
}

const renderUsers = (users) => {
    let mainChildUl = document.createElement('ul')

    mainChildUl.id = 'delete'

    let foundUl = document.querySelector('#delete')

    if (foundUl) {
        foundUl.remove()
    }
    gitUserList.appendChild(mainChildUl)
    users.forEach(user => {
        const userDiv = document.createElement('div')

        const gitUserName = document.createElement('h2')
        
        const gitImage = document.createElement('img')
        
        const gitLink = document.createElement('a')
        
        gitUserName.innerHTML = user.login
        gitUserName.id = 'id'
        
        gitImage.src = user.avatar_url
        
        gitLink.href = user.html_url
        
        gitLink.innerHTML = user.html_url
        
        userDiv.append(gitUserName, gitImage, gitLink)
        userDiv.addEventListener('click', (e) => {
            console.log(e.target)
            e.preventDefault()
            fetch(`https://api.github.com/users/${e.target.querySelector('#id').innerText}/repos`, {headers: {Accept: 'application/vnd.github.v3+json'}})
            .then(res => res.json())
            .then(data => data.forEach(repo => {
                const userRepo = document.createElement('li')
                const repoLink = document.createElement('a')
                repoLink.href = repo.html_url
                repoLink.innerHTML = repo.name 
                userRepo.appendChild(repoLink)
                repoContainer.appendChild(userRepo)
            }))
            // debugger
        })
        
        mainChildUl.appendChild(userDiv)
        // gitUserList.appendChild(userDiv)
    })
}




