<template>
  <div>
    <el-card>
      <h1 style="font-size: 24px">支持拖拽</h1>
      <div class="top">
        Element UI自带上传组件
      </div>
      <div>
        <el-upload
                class="upload-demo"
                drag
                action="api/upload"
                multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>

      <h1 class="cai">
        支持裁剪
      </h1>
      <div class="top">
        vue-image-crop-upload
      </div>

    <div style="margin-top: 30px">
      <el-button type="primary" class="btn" @click="toggleShow">上传图片</el-button>
      <my-upload field="file"
                 :withCredentials="true"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :width="100"
                 :height="100"
                 url="/api/upload"
                 img-format="png">
      </my-upload>
      <div class="imgs">
        <div v-for="(item, index) in imgDataUrl" :key="index" >
          <img :src="item" alt="">
        </div>
      </div>

    </div>
    </el-card>
  </div>

</template>

<script>
  import myUpload from 'vue-image-crop-upload'

  export default {
    name: "Upload",
    components: {
      myUpload
    },
    props: {},
    data() {
      return {
        show: false,
        imgDataUrl: []
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field){
        console.log('-------- crop success --------');
        this.imgDataUrl.push(imgDataUrl)
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }
    },
    mounted() {

    },
    created() {
      this.cropImg = this.defaultSrc
    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .top {
    width: 90%;
    height: 60px;
    line-height: 60px;
    background: #eee;
    padding-left: 30px;
    margin: 20px 0;
  }

  .cai {
    font-size: 24px;
    margin: 30px 0;
  }

  .imgs {
    display: flex;
    align-items: center;
    margin-top: 20px;
    div {
      margin-left: 15px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
</style>
