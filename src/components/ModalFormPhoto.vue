<template>
    <div class="form-photo-modal">
         <b-button  v-b-modal.modalForm class="float-right"   variant="success">Adicionar Foto</b-button >

            <b-modal id="modalForm" @show="onShow" :title="titleModal" hide-footer show>
                <p v-if="errors.length" class="text-left"> 
                    <b-alert show variant="danger">

                        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                        <ul>
                            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                        </ul>
                        </b-alert>
                </p>
                <b-form  >
                    <b-form-group id="title" label="Titulo *" label-for="title" class="text-left">
                        <b-form-input
                        id="title"
                        v-model="formPhoto.title"
                        placeholder="Entre com o titulo do seu post"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="thumbnail" label="thumbnail" label-for="thumbnail" class="text-left">
                        <b-form-file
                            v-model="formPhoto.thumbnailUrl"
                            accept="image/jpeg, image/png, image/gif"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            ></b-form-file>
                    </b-form-group>
                    <b-form-group id="url" label="Imagem *" label-for="url" class="text-left">
                        <b-form-file
                            v-model="formPhoto.url"
                            accept="image/jpeg, image/png, image/gif"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            ></b-form-file>
                    </b-form-group>
                    <b-button type="button" variant="success" class="mt-2 float-right" @click="onSave">Salvar</b-button>
                </b-form>
            </b-modal>
    </div>
</template>

<script>
export default {
    name: 'ModalFormPhoto',
    props: {
        formPhoto: {
            type: Object,
            default: () => {
                return {
                    title: '',
                    thumbnailUrl: null,
                    url: null
                }
            }
        },
        errors: Array,
        onSave: {
            type: Function,
        },
        titleModal: String,
        onShow: Function,
    },
    computed: {
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
