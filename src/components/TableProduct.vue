<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    const router = useRouter()
    let dados = ref()

    onMounted(() => {
        fetch("http://127.0.0.1:8000/api/auth/produtos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            dados.value = data.data
        })
        .catch(error => {
            router.push("/")
        })
    })

    function adicionar(){
        router.push("/Add")
    }
</script>

<template>
    <div class="container mt-5 p-0">
        <button class="btn btn-primary" @click="adicionar">Adicionar</button>
    </div>
    <table class="container border mt-2 table">
        <thead>
            <tr>
                <th scope="col">Código</th>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in dados" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.descricao }}</td>
                <td>
                    <router-link :to="'/Delete/' + item.id" class="d-inline-block"><i class="fa-solid fa-trash"></i></router-link>
                    <router-link :to="'/Edit/' + item.id" class="d-inline-block ms-2"><i class="fa-solid fa-pen-to-square"></i></router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>