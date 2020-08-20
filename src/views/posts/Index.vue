<template>
    <div class="home mt-5">
        <b-alert  :show="this.$route.query.msg ? true : false" variant="success" dismissible>{{ this.$route.query.msg }}</b-alert>
        <b-card>
            <div class="d-flex  justify-content-between">
                <h2 class="text-info">TODOS OS POSTS</h2>
                <router-link to="/posts/create" class="float-right mb-2 btn btn-primary">Novo Post</router-link>
            </div>
            <div>
                <b-table responsive head-variant="dark" striped borderless hover :items="items" :fields="fields">
                    <template v-slot:cell(options)="scope">
                    <b-button variant="danger" size="sm" class="float-right" @click="removePost(scope.item.id)">Remover</b-button>
                    <router-link :to="'posts/edit/'+scope.item.id" class="float-right mb-2 btn btn-primary btn-sm mr-1">Editar</router-link>
                    <router-link :to="'posts/'+scope.item.id" class="float-right mb-2 btn btn-success btn-sm mr-1">Mostrar</router-link>
                    </template>
                </b-table>
            </div>
        </b-card>
    </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/providers/posts'

export default {
  
    name: 'Home',
    components: {
    },
    data() {
        return {
            fields: [
            {
                key: 'id',
                label: '#',
            },
            {
                key: 'title',
                label: 'Titulo'
            },
            {
                key: 'options',
                label: 'Opções'
            },
            ],
            items: []
        }
        },
    mounted() {
        this.getPost()
    },
    methods: {
        getPost () {
            Post.all().then((res) => {
            this.items = res.data
            }).catch((e) => {
            console.log(e)
            })
        },

        removePost(postId) {

            this.$swal({
                title: 'Você deseja realmente remover este post?',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Remover',
                confirmButtonColor: 'red',
                reverseButtons: true,
                showLoaderOnConfirm: true,
            
                }).then(confirmAction => {
                        if (confirmAction.dismiss) {
                            return
                        }

                    Post.delete(postId)
                    .then(() => {
                        this.$swal({
                            icon: 'success',
                            title: 'Post removido com sucesso!'
                        });
                        this.getPost()
                    }).catch(() => {
                        this.$swal({
                            icon: 'error',
                            title: 'Falha na operação'
                        });
                    })

                });
        },
    }
}
</script>
