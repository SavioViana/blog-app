<template>
    <div class="gallery mt-5">
        <h1 class="text-info">Galeria de Fotos</h1>
        <div>
            <b-button  @click="showMultiple" variant="info">Visualizar toda a galeria</b-button >

            <b-row class="p-0 m-0">
                <b-col class="py-0 my-0">
                    <modal-form-photo :isModal="isModal" :titleModal="titleModal" :formPhoto="formPhoto" :errors="errors" :onSave="() => onSave()" :onShow="onShowModal" />
                </b-col>
            </b-row>
            
            <div class="text-center load" v-if="isLoading">
                 <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
            </div>
            <b-row class="mt-5" >
                <b-col lg="4" md="4" v-for="(photo, index) in photos" :key="index"  >
                     <b-card
                        :title="photo.title"
                        :img-src="photo.thumbnailUrl"
                        img-alt="Image"
                        img-top
                        tag="article"
                        class="mb-2"
                    >
                        <b-card-text>
                            <b-button @click="() => showImg(index)" variant="success" size="sm" class="mr-2">Mostrar</b-button>
                            <b-button @click="() => onEditPhoto(photo.id)"  variant="primary" size="sm" class="mr-2">Editar</b-button>
                            <b-button variant="danger" @click="removePhoto(photo.id)" size="sm">Remover</b-button>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>

            <VueEasyLightbox
                :visible="visible"
                :imgs="imgs"
                :index="index"
                @hide="handleHide"
            ></VueEasyLightbox>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
//componente responsavel por fazer a visualização das photos como uma galeria
import VueEasyLightbox from 'vue-easy-lightbox'
import Photo from '@/providers/photos'
import ModalFormPhoto from '@/components/ModalFormPhoto';



export default {
    name: 'GaleryIndex',
    components: {
        VueEasyLightbox,
        ModalFormPhoto
    },
    data() {
        return {
            titleModal: 'Adicionar Nova Foto',
            isLoading: true,
            imgs: '',  
            photos: [],
            visible: false,
            index: 0,
            formPhoto: {
                title: '',
                thumbnailUrl: null,
                url: null 
            },
            errors: [],
            isModal: false,
        }
    },
    mounted() {
        this.getPhotos()
    },
    methods: {
        //busca todas as photos, pelo o metodo do provider photos
        getPhotos() {
            Photo.all().then((res) => {
                this.photos = res.data.slice(1, 100) //limitei a busca das photos, devido a api não ter uma paginação, e as 50000 photos que trazem acaba com que deixando a pagina pesada.
                this.imgs = this.photos.map(function(item){
                    return item.url
                })
                console.log(res)
            }).catch((e) => {
                console.log(e)
            }).finally(()=>{
                this.isLoading = false
            })
        },

        //traz a visualização de todas as photos em formado de galeria pelo componente VueEasyLightbox
        showMultiple() {
            this.imgs =this.photos.map(function(item){
                            return item.url
                        })
            this.index = 1  
            this.show()
        },

        show() {
            this.visible = true
        },

        //permitir abrir e vizualizar uma photo, pelo componete VueEasyLightbox
        showImg (photo) {
            this.imgs =this.photos.map(function(item){
                    return item.url
                 })
            this.index = photo  
            this.show()
        },

        handleHide() {
            this.visible = false
        },

        //Metodo faz a validação do formulario de cadastro e edição de photos, devido  a api não possuir validação em back-end
        checkForm(){
            console.log('formPhoto', this.formPhoto.url)
            this.errors = []
            if (this.formPhoto.title.length < 1) {
                this.errors.push('O campo titulo é obrigatorio')
            }
            if (! this.formPhoto.url ) {
                this.errors.push('O campo imagem é obrigatorio')
            }

            if (this.errors.length > 0) return false
            else return true
        },
        

        onSave(){
            if (!this.checkForm()) return 

            if (this.formPhoto.id  > 0) {
                Photo.update(this.formPhoto, this.formPhoto.id)
                    .then((res) => {
                        console.log(res)
                        this.getPhotos()
                        this.$bvModal.hide('modalForm')	
                        this.resetForm()

                        this.$swal({
                                icon: 'success',
                                title: 'Photo atualizada com sucesso!'
                            });
                    }).catch((e) => {
                        console.log(e)
                    })
            } else {

                Photo.store(this.formPhoto)
                    .then((res) => {
                        console.log(res)
                        this.getPhotos()
                        this.$bvModal.hide('modalForm')	
                        this.resetForm()
                        this.$swal({
                                icon: 'success',
                                title: 'Photo cadastrada com sucesso!'
                            });
                    }).catch((e) => {
                        console.log(e)
                    })
            }
            
        },

        onShowModal(){
            this.resetForm()
        },

        onEditPhoto(photoId){
            this.titleModal = "Atualizar Foto"
            this.$bvModal.show('modalForm')
            Photo.single(photoId)
                .then((res) => {
                    console.log(res)
                    this.formPhoto = {
                        id: res.data.id,
                        title: res.data.title,
                        url: null,
                        thumbnailUrl: null
                    }

                }).catch((e) => {
                    console.log(e)
                })
        },

        resetForm(){
            this.formPhoto = {
                title: '',
                thumbnailUrl: null,
                url: null
            }
        },
        
        //Metodo responsavel por fazer a remoção de uma photo da api, invocando o metodo delete do provider photo
        removePhoto(photoId) {

            this.$swal({
                title: 'Você deseja realmente remover esta Foto?',
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

                    Photo.delete(photoId)
                    .then(() => {
                        this.$swal({
                            icon: 'success',
                            title: 'Photo removida com sucesso!'
                        });
                        this.getPhotos()
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

<style lang="css">
    .cursor-pointer {
        cursor: pointer;
    }

    .load {
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>