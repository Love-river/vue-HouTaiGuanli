<template>
  <div class="home">
    <div class="top">
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/icon/user.svg" alt="">
          </div>
          <div class="desc">
            <div class="title">
              New Visits
            </div>
            <div class="num">
              <countTo :startVal='startVal' :endVal='list.visits' :duration='3000'></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/icon/msg.svg" alt="">
          </div>
          <div class="desc">
            <div class="title">
              Messages
            </div>
            <div class="num">
              <countTo :startVal='startVal' :endVal='list.messages' :duration='3000'></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/icon/money.svg" alt="">
          </div>
          <div class="desc">
            <div class="title">
              Purchases
            </div>
            <div class="num">
              <countTo :startVal='startVal' :endVal='list.purchases' :duration='3000'></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/icon/cart.svg" alt="">
          </div>
          <div class="desc">
            <div class="title">
              Shoppings
            </div>
            <div class="num">
              <countTo :startVal='startVal' :endVal='list.shopping' :duration='3000'></countTo>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="chats">
      <el-card>
        <ve-line :data="charts" :colors="colors"></ve-line>
      </el-card>
    </div>

    <div class="chat">
      <el-card>
        <ve-radar :data="radarChat"></ve-radar>
      </el-card>
      <el-card>
        <ve-ring :data="ringChat" :settings="chartSettings"></ve-ring>
      </el-card>
      <el-card>
        <ve-histogram :data="charts"></ve-histogram>
      </el-card>
    </div>

    <div class="foot">
      <el-card class="table">
        <el-table
                :data="orderData"
                style="width: 100%">
          <el-table-column
                  prop="num"
                  label="Order_No"
                  width="300"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="price"
                  label="Price"
                  width="140"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="status"
                  label="Status"
                  align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-tag type="danger" v-if="scope.row.status === 0">
                  pending
                </el-tag>
                <el-tag type="success" v-if="scope.row.status === 1">
                  success
                </el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card>
        <div slot="header" class="todo-top">
          <div>
            <i class="el-icon-arrow-down" @click="selectAll"></i>
          </div>
          <div>
            Todo List
          </div>
        </div>
        <div v-if="todoList.length > 0 && activeIndex === 0"
             v-for="(item, index) in todoList"
             :key="index" class="item"
             @mouseenter="enter(item)"
             @mouseleave="leave(item)"
        >
          <div class="radias" @click="selectCheck(item)">
            <i class="el-icon-check icon" v-if="item.checked"></i>
          </div>
          <div class="name">{{item.name}}</div>
          <div v-if="item.showClose">
            <i class="el-icon-close close" @click="closeItem(item, index)"></i>
          </div>
        </div>
        <div v-if="activeList.length > 0 && activeIndex === 1"
             v-for="(item, index) in activeList"
             :key="index" class="item"
             @mouseenter="enter(item)"
             @mouseleave="leave(item)"
        >
          <div class="radias" @click="selectCheck(item)">
            <i class="el-icon-check icon" v-if="item.checked"></i>
          </div>
          <div class="name">{{item.name}}</div>
          <div v-if="item.showClose">
            <i class="el-icon-close close" @click="closeItem(item, index)"></i>
          </div>
        </div>
        <div v-if="completedList.length > 0 && activeIndex === 2"
             v-for="(item, index) in completedList"
             :key="item.name" class="item"
             @mouseenter="enter(item)"
             @mouseleave="leave(item)"
        >
          <div class="radias" @click="selectCheck(item)">
            <i class="el-icon-check icon" v-if="item.checked"></i>
          </div>
          <div class="name">{{item.name}}</div>
          <div v-if="item.showClose">
            <i class="el-icon-close close" @click="closeItem(item, index)"></i>
          </div>
        </div>
        <div class="footBar">
          <div class="item">
            {{notChecked}} items left
          </div>
          <div class="item" :class="{active: activeIndex === 0}" @click="clickAll">
            All
          </div>
          <div class="item" :class="{active: activeIndex === 1}" @click="clickActive">
            Active
          </div>
          <div class="item" :class="{active: activeIndex === 2}" @click="clickCompleted">
            Completed
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="progress">
          <div class="image">
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt="">
          </div>
          <div class="p-list">
            <div v-for="(item, index) in progressList" :key="index" class="p-item">
              <div>{{item.name}}</div>
              <el-progress v-if="item.progress === 1" :percentage="(item.progress) * 100"
                           status="success"></el-progress>
              <el-progress v-else-if="item.progress === 0" :percentage="(item.progress) * 100"
                           status="exception"></el-progress>
              <el-progress :percentage="(item.progress) * 100"
                           v-else></el-progress>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
  import countTo from 'vue-count-to'

  export default {
    name: "Home",
    components: {
      countTo,
    },
    props: {},
    data() {
      return {
        startVal: 0,
        colors: ['#3C88F7', '#FD1A5E'],
        list: [],
        charts: {
          columns: ['date', 'expected', 'actual'],
          rows: [{
            date: 'Mon',
            expected: 141,
            actual: 81
          },
            {
              date: 'Tue',
              expected: 222,
              actual: 181
            },
            {
              date: 'Wed',
              expected: 41,
              actual: 33
            },
            {
              date: 'Thu',
              expected: 91,
              actual: 77
            },
            {
              date: 'Fri',
              expected: 221,
              actual: 102
            },
            {
              date: 'Sat',
              expected: 83,
              actual: 112
            },
            {
              date: 'Sun',
              expected: 188,
              actual: 141
            }]
        },
        radarChat: {
          columns: ['name', 'sales', 'ministration', 'techology', 'marketing', 'delelopmer'],
          rows: []
        },
        ringChat: {
          columns: ['name', 'data'],
          rows: []
        },
        chartSettings: {
          roseType: 'radius'
        },
        orderData: [],
        todoList: [],
        activeList: [],
        completedList: [],
        showClose: false,
        notChecked: 0,
        activeIndex: 0,
        progressList: []
      }
    },
    methods: {
      selectAll() {
        if (this.notChecked !== 0) {
          this.todoList.map(item => {
            this.$set(item, 'checked', true)
          })
          this.notChecked = 0
        } else {
          this.todoList.map(item => {
            this.$set(item, 'checked', false)
          })
          this.notChecked = this.todoList.length

        }
      },
      clickAll() {
        this.activeIndex = 0
      },
      clickActive() {
        this.activeIndex = 1
        this.activeList = this.todoList.filter(item => {
          return item.checked === false
        })
      },
      clickCompleted() {
        this.activeIndex = 2
        this.completedList = this.todoList.filter(item => {
          return item.checked === true
        })
      },
      enter(item) {
        item.showClose = true
      },
      leave(item) {
        item.showClose = false
      },
      selectCheck(item) {
        item.checked = !item.checked
        if (this.activeIndex === 0) {
          let arr = this.todoList.filter(item => {
            return item.checked === false
          })
          this.notChecked = arr.length
        }
        if (this.activeIndex === 1) {
          let arr = this.activeList.filter(item => {
            return item.checked === false
          })
          this.notChecked = arr.length
        }
        if (this.activeIndex === 2) {
          let arr = this.completedList.filter(item => {
            return item.checked === true
          })
          this.notChecked = this.todoList.length - arr.length
        }
      },
      closeItem(item, index) {
        if (this.activeIndex === 0) {
          this.todoList.splice(index, 1)
          let arr = this.todoList.filter(item => {
            return item.checked === false
          })
          this.notChecked = arr.length
        }
        if (this.activeIndex === 1) {
          this.activeList.splice(index, 1)
          let arr = this.activeList.filter(item => {
            return item.checked === false
          })
          this.notChecked = arr.length
          this.todoList = this.todoList.filter(item1 => {
            return item.name !== item1.name
          })
        }
        if (this.activeIndex === 2) {
          this.completedList.splice(index, 1)
          this.todoList = this.todoList.filter(item1 => {
            return item.name !== item1.name
          })
        }
      },
      getData() {
        this.$com.req('api/homeData').then(response => {
          let res = response.data
          if (res.code === 0) {
            this.list = res.data
          }
        })
      },
      // getChat() {
      //   this.$com.req('api/homeChat').then(response => {
      //     let res = response.data
      //     if (res.code === 0) {
      //       this.charts.rows = res.data
      //     }
      //   })
      // },
      getRadarChat() {
        this.$com.req('api/radarChat').then(response => {
          let res = response.data
          if (res.code === 0) {
            this.radarChat.rows = res.data
          }
        })
      },
      getRingChat() {
        this.$com.req('api/ringChat').then(response => {
          let res = response.data
          if (res.code === 0) {
            this.ringChat.rows = res.data
          }
        })
      },
      getOrderData() {
        this.$com.req('api/orderData').then(response => {
          let res = response.data
          if (res.code === 0) {
            res.data.map(item => {
              item.price = '￥' + item.price
            })
            this.orderData = res.data
          }
        })
      },
      getToDoList() {
        this.$com.req('api/todoList').then(response => {
          let res = response.data
          if (res.code === 0) {
            res.data.map(item => {
              item.showClose = false
            })
            let arr = res.data.filter(item => {
              return item.checked === false
            })
            this.notChecked = arr.length
            this.todoList = res.data
          }
        })
      },
      getProgeress() {
        this.$com.req('api/progress').then(response => {
          let res = response.data
          if (res.code === 0) {
            this.progressList = res.data
          }
        })
      }
    },
    mounted() {
      this.getOrderData()
      this.getToDoList()
      this.getProgeress()
    },
    created() {
      this.$nextTick(() => {
        this.getData()
        // this.getChat()
        this.getRadarChat()
        this.getRingChat()
      })
    },
    filters: {
      numFormat: function (value) {
        if (!value) return '0.00'
        value = value.toFixed(2)
        let intPart = Math.trunc(value)
        let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        let floatPart = '.00' // 预定义小数部分
        let value2Array = value.split('.')
        if (value2Array.length === 2) {
          floatPart = value2Array[1].toString() // 拿到小数部分
          if (floatPart.length === 1) { // 补0,实际上用不着
            return intPartFormat
          } else {
            return intPartFormat
          }
        } else {
          return intPartFormat
        }
      }
    },
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .home {
    .top {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 30px;

      .el-card {
        flex: 1;
        margin-left: 10px;

        &:first-child {
          margin-left: 0;
        }

        .content {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .img {
            position: relative;
            left: 20px;
          }

          .desc {
            position: relative;
            right: 20px;
            cursor: pointer;

            .title {
              line-height: 18px;
              color: rgba(0, 0, 0, .45);
              font-size: 16px;
              margin-bottom: 12px;
            }

            .num {
              font-size: 20px;
              color: #666;
              font-weight: 700;
            }
          }
        }
      }
    }

    .chats {
      margin-top: 50px;
      width: 100%;
    }

    .chat {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 30px;

      .el-card {
        flex: 1;
        margin-left: 15px;

        &:first-child {
          margin-left: 0;
        }
      }
    }

    .foot {
      margin-top: 30px;
      display: flex;

      .el-card {
        flex: 1;
        margin-left: 15px;

        &:first-child {
          margin-left: 0;
          flex: 2;
        }
      }

      .todo-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .item {
        display: flex;
        align-items: center;
        margin: 25px 0;
        position: relative;

        &:first-child {
          margin-top: 10px;
        }

        .close {
          position: absolute;
          right: 20px;
          top: 4px;
          color: #f56c6c;
          cursor: pointer;
          font-size: 20px;

        }

        .radias {
          width: 20px;
          height: 20px;
          border: 1px solid #ccc;
          border-radius: 50%;
        }

        .icon {
          position: relative;
          top: 2px;
          left: 3px;
        }

        .name {
          margin-left: 20px;
        }
      }

      .active {
        border: 1px solid rgba(175, 47, 47, .2);
      }

      .footBar {
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 1px solid #ccc;

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          cursor: pointer;

          &:first-child {
            flex: 2;
            position: relative;
            top: 6px;
          }

          &:last-child {
            position: relative;
            left: 6px;
          }

          flex: 1;
        }
      }

      .progress {
        .image {
          width: 100%;

          img {
            width: 100%;
          }
        }

        .p-list {
          margin-top: 30px;

          .p-item {
            margin: 10px 0;
          }
        }
      }
    }
  }
</style>
