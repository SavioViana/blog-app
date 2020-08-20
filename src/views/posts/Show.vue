<template>
    <div class="post-create mt-5">
    
    <h2 class="">Detalhes do Post</h2>
    <b-card>
       
        <div>
            <b-form  >
                <b-form-group id="title" label="Titulo" label-for="title" class="text-left">
                    <b-form-input
                    id="title"
                    v-model="form.title"
                    placeholder="Entre com o titulo do seu post"
                    disabled=""
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="title" label="Conteúdo do post" label-for="body"  class="text-left">
                    <b-form-textarea
                    id="body"
                    v-model="form.body"
                    placeholder="Entre com o conteudo do seu post..."
                    rows="6"
                    max-rows="15"
                    size="md"
                    disabled=""
                    ></b-form-textarea>
                </b-form-group>

               <router-link to="/posts">Voltar para listagem</router-link>

            </b-form>
    
        </div>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/providers/posts';
export default {
  
    name: 'PostEdit',
    components: {
    },
    data() {
        return {
            form: {
                title: '',
                body: ''
            }
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

        onSave(){
            console.log(this.form)

            Post.update(this.form, 1)
                .then((res) => {
                    console.log(res)
                    this.$router.push({path: '/posts'})
                }).catch((e) => {
                    this.snackbar = true
                    this.$data.errors = e.response.data.errors;
                })
        },
    }
}
</script>
