<template>
  <div class="upload">
    <input @change="uploadFile($event)" type="file" class="uploadFile" />
    <span class="add">+</span>
    <img :src="valueUrl" v-if="valueUrl"/>
    <!-- <img :src="value" v-if="value" alt=""> -->
  </div>
</template>

<script>
/**
 * 上传图片组件
 *
 * valueUrl: '展示图片'
 */
export default {
  name: 'upload',
  props: {
    valueUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // value:''
    }
  },
  methods: {
    uploadFile (el) {
      if (!el.target.files[0].size) return // 如果文件大小为0，则返回
      if (el.target.files[0].type.indexOf('image') === -1) {
        // 如果不是图片格式
        // this.$dialog.toast({ mes: '请选择图片文件' })
        console.log('请选择图片文件')
      } else {
        const that = this
        const reader = new FileReader() // 创建读取文件对象
        reader.readAsDataURL(el.target.files[0]) // 发起异步请求，读取文件
        reader.onload = function () {
          // 文件读取完成后
          // 读取完成后，将结果赋值给img的src
          that.valueUrl = this.result
        }
      }
      this.$emit('uploadFile', el)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 70px;
  height: 70px;
  position: relative;
  // background:rgba(2,51,84,1);
  background: #fff;
  border: 1px solid #DEDEDE;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .add {
    text-align: center;
    font-size: 60px;
    font-weight: 600;
    line-height: 60px;
    color: #ccc;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .uploadFile {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    z-index: 1;
  }
}
</style>
