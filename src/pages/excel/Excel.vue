<template>
  <div>
    <el-table
            :data="tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
            style="width: 100%">
      <el-table-column
              prop="NAME"
              align="center"
              width="300"
              label="名称">
      </el-table-column>
      <el-table-column
              prop="GOODS_SERIAL_NUMBER"
              label="商品编号"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="ORI_PRICE"
              label="原价"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="PRESENT_PRICE"
              label="现价"
              align="center"
      >
      </el-table-column>
    </el-table>
    <pagination :tableData="tableData" @getPageSize="getPageSize" @getCurrentPage="getCurrentPage"
                style="margin-top:16px;">
    </pagination>

    <div class="btn">
      <div>
        <download-excel
                class = "export-excel-wrapper"
                :data="tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
                name = "filename.xls">
          <div>
            <el-button type="primary">导出xls</el-button>
          </div>
        </download-excel>
      </div>
      <div>
        <download-excel
                type="csv"
                class = "export-excel-wrapper"
                :data="tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
                name = "filename.csv">
          <div>
            <el-button type="danger" class="btn1">导出csv</el-button>
          </div>
        </download-excel>
      </div>
    </div>


  </div>

</template>

<script>
  import downloadExcel from 'vue-json-excel'
  import pagination from '../../components/pagination/Pagination'

  export default {
    name: "excel",
    components: {
      downloadExcel,
      pagination
    },
    props: {},
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
      }
    },
    methods: {
      getData() {
        this.$com.req('api/tableData').then(response => {
          let res = response.data
          if (res.code === 0) {
            this.tableData = res.data
          }
        })
      },
      getPageSize(data) {
        this.pageSize = data
      },
      getCurrentPage(data) {
        this.currentPage = data
      },
    },
    mounted() {
      this.getData()
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
  .item {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .name {
      width: 60px;
    }
  }
  .btn {
    margin-top: 20px;
    display: flex;
    .btn1 {
      margin-left: 40px;
    }
  }
</style>
