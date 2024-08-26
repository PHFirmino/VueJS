<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'

    const route = useRoute()
    const router = useRouter()
    let idRota = route.params.id

    let nome = ref()
    let descricao = ref()

    let erro = ref(false)
    let mensagem = ref()
    let status = ref()

    onMounted(() => {
        fetch(`http://127.0.0.1:8000/api/auth/deletando/${idRota}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            nome.value = data.data.nome
            descricao.value = data.data.descricao
        })
    })

    function deletee(){
        fetch(`http://127.0.0.1:8000/api/auth/deletado`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body : JSON.stringify({
                id: idRota
            })
        })
        .then(response => response.json())
        .then(data => {
            erro.value = true
            mensagem.value = data.mensagem
            status.value = data.status
        })
    }
</script>

<template>
    <main> 
        <div id="externoFormulario" class="col-4">
            <p class="text-start"><router-link :to="'/Home'" class="d-inline-block ms-2 text-decoration-none">Voltar</router-link></p>
            <div v-if="erro && status == 'error'" class="alert alert-danger">{{ mensagem }}</div>
            <div v-else-if="erro && status == 'success'" class="alert alert-success">{{ mensagem }}</div>
            <form id="formulario" @submit.prevent="deletee">
                <h1>Deletar</h1>
                <div>
                    <div>
                        <p>{{ nome }}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>{{ descricao }}</p>
                    </div>
                </div>
                <div>
                    <input class="btn btn-danger col-12" type="submit" id="button" value="Excluir">
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
    main {
        margin: 0;
        display: flex;
        place-items: center;
        min-width: 320px;
        min-height: 100vh;
    }

    main div {
        max-width: 1280px;
        margin: 0 auto;
        text-align: center;
    }

    form div{
        margin-bottom: 10px;
    }
</style>