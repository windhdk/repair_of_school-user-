<template>
  <div v-loading="loading" class="app-container">
    <div class="header demo-input-suffix">
      <span style="float:right;">
        <el-button-group>
          <el-button type="primary" icon="el-icon-refresh" size="mini" style="height:28px;" @click="get_data"/>
          <el-button type="primary" size="mini" @click="$refs['form'].init({title: '报修', category: param.category_value})">报修</el-button>
        </el-button-group>
      </span>
    </div>
    <el-tabs v-if="param.category_value" v-model="param.category_value" @tab-click="handle_click_tabs">
      <el-tab-pane v-for="(item, index) in category_option" :key="index" :label="item.label" :name="item.value" />
    </el-tabs>
    <el-table :data="table_data.data" style="width: 100%">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="place" label="地点" />
      <el-table-column prop="type" label="类型" >
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">教室</span>
          <span v-else-if="scope.row.type == 1">办公室</span>
          <span v-else-if="scope.row.type == 2">实训室</span>
          <span v-else>学生宿舍</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0" style="color: rgb(14, 175, 0);">未处理</span>
          <span v-if="scope.row.status == 1" style="color: red;">已处理</span>
        </template>
      </el-table-column>
      <el-table-column prop="repair_time" label="报修时间" />
      <el-table-column prop="sort" label="操作" width="140" >
        <template slot-scope="scope">
          <span v-show="scope.row.status == 0" style="display: none;">
            <el-button type="text" size="small" @click="$refs['form'].init({title: '编辑', id: scope.row.id})">编辑
            </el-button>
          </span>
          <el-button type="text" size="small" @click="$refs['formdata'].init({title: '详情', id: scope.row.id})">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <forms ref="form" @reload="get_data"/>
    <formdata ref="formdata" @reload="get_data"/>
    <el-pagination
      v-if="table_data.total"
      :current-page="param.page"
      :page-sizes="[20, 50, 100, 500]"
      :page-size="Number(param.page_size)"
      :total="table_data.total"
      style="padding:15px; text-align: right;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import forms from './components/form'
import formdata from './components/formdata'

export default {
  name: 'Dashboard',
  components: { forms, formdata },
  data() {
    return {
      table_data: [],
      category_option: [],
      param: {
        page: Number(this.$route.query.page ? this.$route.query.page : 1),
        page_size: this.$route.query.page_size ? this.$route.query.page_size : 20,
        category_value: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  watch: {
    '$route'() {
      this.get_data()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.get_data()
    },
    search() {
      this.param.page = 1
      for (var i in this.param) {
        if (this.param[i] === '') {
          delete this.param[i]
        }
      }
      this.param.t = (new Date()).valueOf()
      this.$router.push({ name: this.$route.name, query: this.param })
    },
    get_data() {
      this.loading = true
      delete this.param.t
      this.$request.post('/user/Info_Repair/getListData', this.param).then((res) => {
        this.category_option = res.data.category_option
        this.table_data = res.data.list
        this.param.page = res.data.list.current_page
        this.loading = false
        if (this.param.category_value === '') {
          this.param.category_value = this.category_option[0].value
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.param.page = 1
      this.param.page_size = val
      for (var i in this.param) {
        if (this.param[i] === '') {
          this.param.splice(i, 1)
        }
      }
      this.$router.push({ name: this.$route.name, query: this.param })
    },
    handleCurrentChange(val) {
      this.param.page = val
      for (var i in this.param) {
        if (this.param[i] === '') {
          delete this.param[i]
        }
      }
      this.$router.push({ name: this.$route.name, query: this.param })
    },
    currentPage() {},
    handle_click_tabs(tab, event) {
      console.log(tab)
      console.log(event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header{ margin-bottom: 15px; height: 28px;}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
