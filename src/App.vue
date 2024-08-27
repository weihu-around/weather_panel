<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <Weather/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import Weather from './components/Weather.vue';

@Options({
  components: {
    HelloWorld,
    Weather
  },
})
export default class App extends Vue {
  // mounted():void {
  //   // ====== 以下会报跨域问题 ============
  //   // let api = "http://apis.juhe.cn/simpleWeather/query?city=%E5%8E%A6%E9%97%A8&key=70fbe5080576ea8423c674d8799237a4"
  //   // 使用get方法来进行网络数据的获取
  //   // this.axios.get(api).then((res)=>{
  //   //   console.log(res)
  //   // })

  //   // ===== 解决跨域问题： vue.config.js中添加devServer配置 ===========
  //   let city = '厦门'
  //   city = encodeURI(city)

  //   // 一、优先级最低：axios默认配置
  //   // let api = `simpleWeather/query?city=${city}&key=70fbe5080576ea8423c674d8799237a4`
  //   // console.log(api)
  //   // this.axios.get("/myApi" + api).then((res)=>{
  //   //   console.log(res)
  //   // })

  //   // 二、优先级中：defaults属性配置
  //   // this.axios.defaults.baseURL = "/myApi"
  //   // let api = `simpleWeather/query?city=${city}&key=70fbe5080576ea8423c674d8799237a4`
  //   // this.axios.get(api).then((res)=>{
  //   //   console.log(res.data)
  //   // })


  //   // 三、优先级最高：请求时的config参数配置
  //   const instance = this.axios.create({
  //     baseURL: '/myApi',
  //     timeout: 1000,
  //     headers: {'X-Custom-Header': 'custom'}
  //   })
  //   // 设置请求拦截器 ：instance.interceptors.request.use()
  //   // instance.interceptors.request.use((config)=>{
  //   //   alert("请求将要开始")
  //   //   return config
  //   // }, (error)=>{
  //   //   alert("请求出现错误")
  //   //   return Promise.reject(error)
  //   // })

  //   let i = instance.interceptors.request.use((config)=>{
  //     alert("请求将要开始")
  //     return config
  //   }, (error)=>{
  //     alert("请求出现错误")
  //     return Promise.reject(error)
  //   })

  //   console.log("拦截器："+ i)
  //   let api = `simpleWeather/query?city=${city}&key=70fbe5080576ea8423c674d8799237a4`
  //   instance.get(api).then((res)=>{
  //     console.log(res.data)
  //   })

  //   // 将拦截器移除
  //   instance.interceptors.request.eject(i)
  //   console.log('移除拦截器：' + i)

  //   // 设置响应拦截器 ：instance.interceptors.response.use()
  //   instance.interceptors.response.use((response)=>{
  //     alert(response.status)
  //     return response
  //   }, (error)=>{
  //     return Promise.reject(error)
  //   })

  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
