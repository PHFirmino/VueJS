import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createMemoryHistory, createRouter } from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Edit from './components/Edit.vue'
import Delete from './components/Delete.vue'
import Add from './components/Add.vue'

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/Home', name: 'Home', component: Home },
    { path: '/Edit/:id', name: 'Edit', component: Edit},
    { path: '/Delete/:id', name: 'Delete', component: Delete},
    { path: '/Add', name: 'Add', component: Add},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')