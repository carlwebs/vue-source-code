// 自定义实现vue-router 
let _Vue

class KVueRouter {
    constructor(options) {
        this.$options = options;
        // 1.保存当前hash到current
        // current必须是响应式的数据
        _Vue.util.defineReactive(this, 'current', '/')
        // 监听hash变化
        window.addEventListener("hashchange", () => {
            // 获取#后面的部分
            this.current = window.location.hash.slice(1);

        })
        // 保存当前hash到current
    }
}

// 插件实现：install会在Vue.use被调用时调用
// 参数1是Vue的构造函数
KVueRouter.install = function (Vue) {
    _Vue = Vue;
    // this.$router挂载到Vue原型上，
    // 使用全局混入Vue.mixin(),将router实例挂载过程延迟到Vue实例构建之后
    Vue.mixin({
        beforeCreate() {
            // this指的是组件实例
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    })
    // 实现两个全局组件，router-view和router-link 
    Vue.component("router-link", {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
        }
    })
    Vue.component("router-view", {
        render(h) {
            // 1.获取router
            const current = this.$router.current;

            let component = null;

            // 获取匹配的路由
            // this.$router.$options.routes的理解：
            // this.$router是通过Vue.prototype.$router = this.$options.router获取的。
            // this.$options是vue实例中的一个属性，
            // new Vue({
            //     el: '#app',
            //     router, //实例挂载到这里，是为了插件安装时可以注册实例
            //     components: { App },
            //     template: '<App/>'
            //   })
            // 这里配置了router，所以可以获取到this.$options.router，
            // router是KVueRouter的一个实例，
            // 所以this.$router就是KVueRouter的一个实例，
            // 实例中有一个$options属性，
            // constructor(options) {
            //     this.$options = options;
            // }
            // options是配置路由传递进来的对象
            const route = this.$router.$options.routes.find(
                (route) => route.path === current
            );

            // 设置路由中的组件选项并渲染
            if (route) {
                component = route.component;
            }

            return h(component);
        },
    })
}

export default KVueRouter;