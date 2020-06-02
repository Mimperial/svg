<template>
  <div class="upload">
    <input @change="uploadFile($event)" type="file" class="uploadFile" />
    <span class="add">+</span>
    <img :src="valueUrl" v-if="valueUrl" />
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
          console.log(this.result)
          that.valueUrl = this.result
          // console.log(this.result);
        }
        /*  const formData = new FormData()  // 创建一个formdata对象
                formData.append('res', el.target.files[0])
                postUploadFile(formData).then(res => {  // 发送请求，保存图片
                    if (res.status === 0) {
                        this.valueUrl = res.data
                    } else {
                        console.log(res)
                    }
                }); */
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 100px;
  height: 100px;
  position: relative;
  border: 1px solid #ccc;
  background: #fff;
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
    color: #000;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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
