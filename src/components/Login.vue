<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'


    const router = useRouter()
    let erro = ref(false)
    let mensagemErro = ref()

    let email = ref()
    let senha = ref()

    onMounted(() =>{
        fetch("http://127.0.0.1:8000/api/auth/me", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " +  localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.error == "success"){
                router.push('/home')
            }
            else{
                router.push('/')
            }
        })
    })

    function login() {
        fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password : senha.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.error == "success"){
                erro.value = false
                localStorage.setItem("token", data.access_token)
                router.push('/home')
            }
            else{
                erro.value = true
                mensagemErro.value = data.error
            }
        })
    }
</script>

<template>
    <main> 
        <div id="externoFormulario" class="col-4">
            <div v-if="erro" class="alert alert-danger">{{ mensagemErro }}</div>
            <form id="formulario" @submit.prevent="login">
                <h1>Login</h1>
                <div>
                    <label class="text-start d-block mb-2" for="email">Email</label>
                    <div>
                        <input class="col-12 form-control" placeholder="email@gmail.com" type="text" name="email" id="email" v-model="email"/>
                    </div>
                </div>
                <div>
                    <label class="text-start d-block mb-2" for="senha">Senha</label>
                    <div>
                        <input class="col-12 form-control" placeholder="............" type="password" name="password" id="senha" v-model="senha">
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