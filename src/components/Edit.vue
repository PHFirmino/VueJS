<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'

    const route = useRoute()
    let idRota = route.params.id

    let nome = ref()
    let descricao = ref()

    let erro = ref(false)
    let mensagem = ref()
    let status = ref()

    onMounted(() => {
        fetch(`http://127.0.0.1:8000/api/auth/editando/${idRota}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            nome.value = data.data.nome
            descricao.value = data.data.descricao
        })
    })
    
    function edit(){
        fetch(`http://127.0.0.1:8000/api/auth/editado/${idRota}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : JSON.stringify({
                nome : nome.value,
                descricao : descricao.value
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
            <form id="formulario" @submit.prevent="edit">
                <h1>Editar</h1>
                <div>
                    <label class="text-start d-block mb-2" for="nome">Nome</label>
                    <div>
                        <input class="col-12 form-control" placeholder="Digite o nome do produto" type="text" name="nome" id="nome" v-model="nome" />
                    </div>
                </div>
                <div>
                    <label class="text-start d-block mb-2" for="descricao">Descrição</label>
                    <div>
                        <input class="col-12 form-control" placeholder="Digite a descrição do produto" type="text" name="descricao" id="descricao" v-model="descricao">
                    </div>
                </div>
                <div>
                    <input class="btn btn-primary col-12" type="submit" id="button" value="Entrar">
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