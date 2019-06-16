<template>
  <div>
    <div style="margin: 20px 0;">
      <el-input placeholder="请输入您想搜索的商品名称" style="width: 300px" v-model="searchValue"></el-input>
    </div>
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

      <el-table-column
              align="center"
              label="操作">
        <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"   @click="edit(scope.row)">修改</el-button>
            <el-button type="danger"  icon="el-icon-delete" @click="deleteGoods(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :tableData="tableData" @getPageSize="getPageSize" @getCurrentPage="getCurrentPage"
                style="margin-top:16px;">
    </pagination>

    <el-dialog
            :show-close="false"
            :append-to-body="true"
            :modal-append-to-body = 'false'
            width="30%"
            :visible.sync="dialogVisible">
      <div>
        <div class="item">
          <div class="name">名称:</div>
          <el-input  v-model="currentGood.NAME"></el-input>
        </div>
        <div class="item">
          <div class="name">原价:</div>
          <el-input  v-model="currentGood.ORI_PRICE"></el-input>
        </div>
        <div class="item">
          <div class="name">现价:</div>
          <el-input  v-model="currentGood.PRESENT_PRICE"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureEdit">确 定</el-button>
              </span>
    </el-dialog>
  </div>

</template>

<script>
  import pagination from '../../components/pagination/Pagination'

  export default {
    name: "Tables",
    components: {
      pagination
    },
    props: {},
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        dialogVisible: false,
        currentGood: {},
        searchValue: ''
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
      deleteGoods(row) {
        this.tableData = this.tableData.filter(item => {
          return item.ID !== row.ID
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })

      },
      edit(row) {
        this.currentGood = row
        this.dialogVisible = true
      },
      sureEdit () {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
    },
    mounted() {
      this.getData()
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
      searchValue (val) {
        this.$com.req('api/tableData').then(response => {
          let res = response.data
          if (res.code === 0) {
            this.tableData = res.data.filter(item => {
              return item.NAME.includes(val)
            })
          }
        })

      }
    },
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
</style>
