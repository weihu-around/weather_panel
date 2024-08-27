<template>
    <el-container class="container">
        <el-header>
            <el-input placeholder="请输入" class="input" v-model="city" @change="changeCity">
                <template #prepend>城市名：</template>
            </el-input>
        </el-header>
        <el-main class="main">
            <div class="today">
                今天:
                <span>{{todayData?.weather ?? plc}}{{todayData?.temperature ?? plc}}</span>
                <span style="margin-left: 20px;">{{todayData?.direct ?? plc}}</span>
                <span style="margin-left: 100px;">{{todayData?.date}}</span>
            </div>
            <div class="real">
                <span class="temp">{{realtime?.temperature ?? plc}}°</span>
                <span class="realInfo">{{realtime?.info ?? plc}}</span>
                <span class="realInfo" style="margin-left: 20px;">{{realtime?.direct ?? plc}}</span>
                <span class="realInfo" style="margin-left: 20px;">{{realtime?.power ?? plc}}</span>
            </div>
            <div class="real">
                <span class="realInfo">空气质量：{{realtime?.aqi ?? plc}}°</span>
                <span class="realInfo" style="margin-left: 20px;">湿度：{{realtime?.humidity ?? plc}}</span>
            </div>
            <div class="future">
                <div class="header">5日天气预报</div>
                <el-table :data="futureData" style="margin-top: 30px;">
                    <el-table-column prop="date" label="日期"></el-table-column>
                    <el-table-column prop="temperature" label="温度"></el-table-column>
                    <el-table-column prop="weather" label="天气"></el-table-column>
                    <el-table-column prop="direct" label="风向"></el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    // 定义昼夜温度模型
    interface DayNightModel {
        dat?: string,
        night?: string
    }
    // 定义天气信息模型接口
    interface WeatherModel {
        weather?: string      // 天气
        temperature?: string  // 温度
        direct?: string       // 风向
        date?: string         // 日期
        wid?: DayNightModel //昼夜温度模型
    }
    // 定义实时气象信息模型
    interface RealtimeModel {
        temperature?: string  // 温度
        info?: string         // 天气详情
        direct?: string       // 风向
        power?: string        // 风级
        aqi?: string          // 体感数值
        humidity: string      // 湿度
    }
    @Options({
        
    })

    export default class Weather extends Vue {
        city = "上海"
        weatherData?: any
        // 当日信息
        todayData: WeatherModel | null = null
        // 默认文案
        plc = "暂无数据"
        // 实时信息
        realtime: RealtimeModel | null = null
        futureData: WeatherModel[] = []
        mounted(): void {
            // 组件挂载时，进行默认数据的初始化
            this.axios.defaults.baseURL = "/myApi"
            this.requestData()
        }
        changeCity(val:string|number):void{
            console.log(val)
            this.requestData()
        }
        // 进行数据请求
        requestData(){
            let city = encodeURI(this.city)
            // 构造URL
            let api = `simpleWeather/query?city=${city}&key=70fbe5080576ea8423c674d8799237a4`
            // 进行数据请求
            this.axios.get(api).then((res)=>{
                if (res.data.error_code != 0) {
                    alert(res.data.reason + ' 目前展示测试数据')
                    // 接口失效时可以使用此测试数据
                    let data = JSON.parse('{"reason":"查询成功!","result":{"city":"苏州","realtime":{"temperature":"15","humidity":"79","info":"阴","wid":"02","direct":"西北风","power":"4级","aqi":"39"},"future":[{"date":"2023-05-07","temperature":"12/18℃","weather":"阴","wid":{"day":"02","night":"02"},"direct":"北风"},{"date":"2023-05-08","temperature":"10/21℃","weather":"晴","wid":{"day":"00","night":"00"},"direct":"东北风"},{"date":"2023-05-09","temperature":"11/23℃","weather":"晴","wid":{"day":"00","night":"00"},"direct":"东北风"},{"date":"2023-05-10","temperature":"15/24℃","weather":"多云转阴","wid":{"day":"01","night":"02"},"direct":"东风"},{"date":"2023-05-11","temperature":"16/25℃","weather":"多云","wid":{"day":"01","night":"01"},"direct":"东风"}]},"error_code":0}')
                    this.weatherData = data
                } else {
                    this.weatherData = res.data
                    console.log(res.data)
                }
                this.todayData = this.weatherData?.result.future[0]
                this.realtime = this.weatherData?.result.realtime
                this.futureData = this.weatherData?.result.future
            })
        }
    }
</script>

<style>
.container {
    max-width: 800px;
    background: linear-gradient(rgb(13, 104, 188), rgb(54, 131, 195));
}
.real {
    text-align: left;
}
.input {
    width: 300px;
    margin-top: 20px;
}
.today {
    font-size: 20px;
    color: white;
    text-align: left;
}
.temp {
    font-size: 79px;
    color: white;
}
.realInfo {
    color: white;
}
.future {
    margin-top: 40px;
}
.header {
    color: white;
    font-size: 27px;
    text-align: left;
}
    </style>
