<template>
  <div>
    <el-card>
      <div class="top">
        mavonEditor：基于Vue的markdown编辑器
      </div>
        <div class="main">
          <mavon-editor v-model="text" ref=md @imgAdd="imgAdd"></mavon-editor>
        </div>
    </el-card>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: "Markdown",
    components: {},
    props: {},
    data() {
      return {
        text: ''
      }
    },
    methods: {
      imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        let formdata = new FormData();
        formdata.append('file', $file);
        axios({
          url: 'api/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          console.log(url)
          this.$refs.md.$img2Url(pos, url.data.path);
        })
      }
    },
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .top {
    height: 60px;
    line-height: 60px;
    background: #eee;
    padding-left: 30px;
  }
  .main {
    margin-top: 40px;
  }
</style>
