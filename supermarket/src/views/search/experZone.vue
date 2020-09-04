<template>
    <div class="shop-inter">
        <!-- 体验区采集 -->
        <h1>  {{ markeTitle }} </h1>
        <OnePhoto></OnePhoto>
    </div>
</template>
<script>
export default {
    data(){
        return{
            markeTitle:""
        }

    },
    components:{
        'OnePhoto': ()=>import('../../components/OnePhoto')
    },
    mounted(){
        this.backList()
    },
    methods:{
        backList(){
            this.markeTitle = this.$route.query.title
        }
    }
}
</script>
<style lang="stylus" scoped>
.shop-inter{
    padding 15px
}
</style>