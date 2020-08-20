import {http} from './config'


export default {

    //Rota onde retortar todos as photos da api
    all: () => {return http.get('/photos', {
        headers: {
            "Content-Type": "application/json"
        }
    })},
    
    //Rota onde retortar uma unica photo da api pelo seu ID
    single: (id) => { return http.get('/photos/'+id, {
        headers: {
            "Content-Type": "application/json"
        }
    })},

    //Rota ira criar uma nova photo na api
    store: (form) => {
        return new Promise ((res, rej) => {
            
            http.post('/photos', JSON.stringify( form ), {
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

    //Rota ira atualizar uma photo na api, buscando pelo seu ID
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
 
    //Rota responsavel pela remoção de uma photo especifica, tendo como paramento o ID do post
    delete: (id) => {
        return new Promise ((res, rej) => {
            http.delete('/photos/'+id, {
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
