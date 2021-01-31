import Vue from 'vue';
import Home from '../components/Home';
import About from '../components/About';
import VueRouter from './kvue-router';
Vue.use(VueRouter);

// 配置路由表
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: About
    }
]

const router = new VueRouter({
    routes
}) 

export default router;