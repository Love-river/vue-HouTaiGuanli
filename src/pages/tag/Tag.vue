<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="unreadMsgLength" name="1">
        <el-card>
          <div v-if="unreadMsg.length > 0">
            <div v-for="(item, index) in unreadMsg" :key="index" class="content">
              <div class="name">
                {{item.name}}
              </div>
              <div class="date">
                <div class="time">
                  {{item.date}}
                </div>
                <el-button @click="unread(item, index)">标为已读</el-button>
              </div>
            </div>
            <div class="btn" >
              <el-button type="primary" @click="unreadAll">全部标为已读</el-button>
            </div>
          </div>
          <div v-else style="text-align: center">
            暂无数据
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="readMsgLength" name="2">
        <el-card>
          <div v-if="readMsg.length > 0">
            <div v-for="(item, index) in readMsg" :key="index" class="content">
              <div class="name">
                {{item.name}}
              </div>
              <div class="date">
                <div class="time">
                  {{item.date}}
                </div>
                <el-button @click="deleteItem(item, index)">删除</el-button>
              </div>
            </div>
            <div class="btn">
              <el-button type="danger" @click="deleteAll">删除全部</el-button>
            </div>
          </div>
          <div v-else style="text-align: center">
            暂无数据
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="recycleLength" name="3">
        <el-card>
          <div v-if="recycle.length > 0">
            <div v-for="(item, index) in recycle" :key="index" class="content">
              <div class="name">
                {{item.name}}
              </div>
              <div class="date">
                <div class="time">
                  {{item.date}}
                </div>
                <el-button type="warning" @click="sendItem(item, index)">还原</el-button>
              </div>
            </div>
            <div class="btn">
              <el-button type="info" @click="sendAll">清空回收站</el-button>
            </div>
          </div>
          <div v-else style="text-align: center">
            暂无数据
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  export default {
    name: "Tag",
    components: {},
    props: {},
    data() {
      return {
        activeName: '1',
        unreadMsg: [
          {
            name: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
            date: '2018-04-19 20:00:00'
          },
          {
            name: '今晚12点整发大红包，先到先得',
            date: '2018-04-19 21:00:00'
          }
        ],
        readMsg: [
          {
            name: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
            date: '2018-04-19 20:00:00'
          }
        ],
        recycle: [{
          name: '【系统通知】您的优惠券已经过期',
          date: '2018-04-19 20:00:00'
        }]
      }
    },
    methods: {
      handleClick(tab, event) {

      },
      unread(item, index) {
        this.unreadMsg.splice(index, 1)
        this.readMsg.push(item)
      },
      unreadAll () {
        this.readMsg = [...this.readMsg, ...this.unreadMsg]
        this.unreadMsg = []
      },
      deleteItem(item, index) {
        this.readMsg.splice(index, 1)
        this.recycle.push(item)
      },
      deleteAll () {
        this.recycle = [...this.readMsg, ...this.recycle]
        this.readMsg = []
      },
      sendItem(item, index) {
        this.recycle.splice(index, 1)
        this.readMsg.push(item)
      },
      sendAll() {
        this.recycle = []
      }
    },
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {
      unreadMsgLength () {
        return `未读消息(${this.unreadMsg.length})`
      },
      readMsgLength () {
        return `已读消息(${this.readMsg.length})`
      },
      recycleLength () {
        return `回收站(${this.recycle.length})`
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    &:first-child {
      margin-top: 0;
    }
    .date {
      display: flex;
      align-items: center;
      position: relative;
      right: 40px;
      .time {
        margin-right: 15px;
      }
    }
  }
  .btn {
    margin-top: 30px;
  }
</style>
