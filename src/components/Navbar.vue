<script setup>
    import { useRoute, useRouter } from 'vue-router'

    const router = useRouter()


    function logout(){
        localStorage.removeItem('token')
        router.push('/')

    //     fetch(`http://127.0.0.1:8000/api/auth/logout`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.getItem('token')
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if(data.status == "success"){
    //             localStorage.removeItem('token')
    //             router.push("/")
    //         }
    //     })
    }
</script>

<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <a class="text-decoration-none text-primary fs-4" :href="'./Home.vue'">Home</a>
            <form class="d-flex" role="search" @submit.prevent="logout">
                <button class="btn btn-outline-primary" type="submit">Logout</button>
            </form>
        </div>
    </nav>
</template>

<style scoped>
</style>