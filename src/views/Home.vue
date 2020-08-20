<template>
  <div class="home mt-5">
    
    <b-card>
        <div class="d-flex  justify-content-between">
          <h2 class="">TODOS OS POSTS</h2>
          <b-button variant="primary" class="float-right mb-2">Novo Post</b-button>
        </div>
        <div>
          <b-table responsive head-variant="dark" striped borderless hover :items="items">
            <template v-slot:cell(options)="">
              <b-button variant="danger" size="sm" class="float-right">Remover</b-button>
              <b-button variant="primary" size="sm" class="float-right mr-1">Editar</b-button>
              <b-button variant="success" size="sm" class="float-right mr-1">Mostrar</b-button>
            </template>
          </b-table>
        </div>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  
  name: 'Home',
  components: {
  },
  data() {
      return {
        items: [
          { id: 40, Titulo: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', options: '' },
          { id: 40, Titulo: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', options: '' },
          { id: 40, Titulo: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', options: '' },
          { id: 40, Titulo: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', options: '' },
          { id: 40, Titulo: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', options: '' },
          { id: 40, Titulo: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', options: '' },
          { id: 40, Titulo: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', options: '' },
        ]
      }
    }
}
</script>
