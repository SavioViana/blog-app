import {http} from './config'


export default {

    //Rota onde retortar todos os posts da api
    all: () => {return http.get('/posts', {
        headers: {
            "Content-Type": "application/json"
        }
    })},
    
    //Rota onde retortar um unico post da api pelo seu ID
    single: (id) => { return http.get('/posts/'+id, {
        headers: {
            "Content-Type": "application/json"
        }
    })},

    //Rota ira criar um novo post na api
    store: (form) => {
        return new Promise ((res, rej) => {
            http.post('/posts', JSON.stringify( form ), {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                res(response.data)
            })
            .catch(e => {
                rej(e)
            })
        })
    },

    //Rota ira atualizar um post na api, buscando pelo seu ID
    update: (form, id) => {
        return new Promise ((res, rej) => {
            http.put('/posts/'+id, form, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                res(response.data)
            })
            .catch(e => {
                console.log(e.response);
                rej(e)
            })
        })
    },
    
    //Rota responsavel pela remoção de um post especifico, tendo como paramento o ID do post
    delete: (id) => {
        return new Promise ((res, rej) => {
            http.delete('/posts/'+id, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                res(response.data)
            })
            .catch(e => {
                console.log(e.response);
                rej(e)
            })
        })
    },
 

}
