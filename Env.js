
const Api      = 'https://www.reddit.com/r'

const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}

export  {
    base_url,
    Api,
}