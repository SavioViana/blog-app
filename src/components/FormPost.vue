<template>
    <div class="form-post">
         <p v-if="errors.length" class="text-left"> 
             <b-alert show variant="danger">

            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
             </b-alert>
        </p>
        <b-form @submit.prevent="onSave" >
            <b-form-group id="title" label="Titulo" label-for="title" class="text-left">
                <b-form-input
                id="title"
               
                v-model="form.title"
                placeholder="Entre com o titulo do seu post"
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
                ></b-form-textarea>
            </b-form-group>
            
                <router-link class="float-left" to="/posts">Voltar para listagem</router-link>
            <b-button type="submit" variant="success" class="mt-2 float-right" >Salvar</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'formPost',
    props: {
        msg: String,
        form: {
            type: Object,
            default: () => {
                return {
                    title: '',
                    body: ' '
                }
            }
        },
        errors: [],
        onSave: {
            type: Function,
        }
    },
    computed: {
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
