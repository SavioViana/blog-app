<template>
    <div class="post-create mt-5">
    
    <h2 class="text-info">Cadastrar Novo Post</h2>
    <b-card>
       
        <div>
            <form-post :errors="errors" :form="form" :onSave="()=>onSave()" />
        </div>
    </b-card>
  </div>
</template>

<script>
import Post from '@/providers/posts';
import FormPost from '@/components/FormPost';
export default {
    name: 'Home',
    components: {
        FormPost
    },
    data() {
        return {
            form: {
                title: '',
                body: ''
            },
            errors: []
        }
    },
    methods: {
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
             
            Post.store(this.form)
                .then(() => {
                    this.$router.push({path: '/posts', query: {msg: 'Post cadastrado com sucesso!'}})
                }).catch((e) => {
                    this.snackbar = true
                    this.$data.errors = e.response.data.errors;
                })
        },
    }
}
</script>
