<template>
    <div class="post-create mt-5">
    
    <h2 class="text-info">Editar Post</h2>
    <b-card>
        <div>
            <form-post :errors="errors" :form="form" :onSave="()=>onSave()" />
        </div>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/providers/posts';
import FormPost from '@/components/FormPost';

export default {
  
    name: 'PostEdit',
    components: {
        FormPost
    },
    data() {
        return {
            form: {
                title: '',
                body: ''
            },
            errors: [],
        }
    },
    mounted(){
        this.getPost(this.$route.params.id)
    },
    methods: {
        getPost(postId){
            Post.single(postId).then((res) => {
                this.form = res.data
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
        },
        checkForm(){
            this.errors = []
            if (this.form.title.length < 1) {
                this.errors.push('O campo titulo é obrigatorio')
            }

            if (this.errors.length > 0) return false
            else return true
        },

        onSave(){
             //metodo faz a validação antes de salvar o post, devido a api não ter uma validação no back-end
            if (!this.checkForm()) return 

            Post.update(this.form, 1)
                .then((res) => {
                    console.log(res)
                    this.$router.push({path: '/posts', query: {msg: 'Post atualizado com sucesso!'}})
                }).catch((e) => {
                    this.snackbar = true
                    this.$data.errors = e.response.data.errors;
                })
        },
    }
}
</script>
