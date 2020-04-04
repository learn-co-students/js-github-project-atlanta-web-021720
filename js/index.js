
document.addEventListener('DOMContentLoaded', () => {

    //--submit search event listener
    const form = document.querySelector('#github-form')
    const userContainer = document.querySelector('#user-list')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let input = e.target.search.value
        fetch(`https://api.github.com/search/users?q=${input}`, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(userdata => {
            userdata.items.forEach(user => {
                let newLi = document.createElement('li')
                let newP = document.createElement('p')
                newP.innerText = `Username: ${user.login}`
                let newImg = document.createElement('img')
                newImg.src = `${user.avatar_url}`
                newImg.style.display = 'inline'
                let newA = document.createElement('a')
                newA.href = `${user.html_url}`
                newA.innerHTML = "View Profile"
                newLi.append(newImg, newP, newA)
                newLi.addEventListener('click', () => {
                    const reposContainer = document.querySelector('#repos-list')
                    fetch(`https://api.github.com/users/${user.login}/repos`, {headers: {Accept: 'application/vnd.github.v3+json'}})
                    .then(response => response.json())
                    .then( repoData => {
                        repoData.forEach(i => {
                            let repoLi = document.createElement('li')
                            let repoLink = document.createElement('a')
                            repoLink.href = `${i.html_url}`
                            repoLink.innerHTML = `${i.name}`
                            repoLi.appendChild(repoLink)
                            reposContainer.appendChild(repoLi)
                        })
                    })
                })
                userContainer.appendChild(newLi)
            })
    })
    })




})//---DOMContentLoaded event listener closure