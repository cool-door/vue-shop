<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <span>电商后台管理系统</span>
      </div>
      <el-button
        type="info"
        @click="logout"
        class="logout-button"
      >退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 左边侧边栏 -->
      <el-aside :width="!isCollapse ? '198px': '64px'">
        <div
          class="hidden-button"
          @click="hiddenMenu"
        >
          <i class="iconfont icon-shousuocaidan"></i>
        </div>
        <el-menu
          active-text-color="#409EFF"
          text-color="#909399"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="collapseTransition"
          router
          :default-active="activePath"
        >
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <template slot="title">
              <i :class="'iconfont ' + item.icon + ' item-icon'"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/'+subItem.path"
              @click="saveNavStatus('/'+subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 脚部 -->
    <el-footer>
      @开发版-请不要直接用于生产环境
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
      collapseTransition: false,
      activePath: ''
    }
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
      this.menuList.forEach(value => {
        switch (value.authName) {
          case '用户管理':
            value.icon = 'icon-user-manage'
            break
          case '权限管理':
            value.icon = 'icon-ums-role'
            break
          case '商品管理':
            value.icon = 'icon-shop'
            break
          case '订单管理':
            value.icon = 'icon-order'
            break
          case '数据统计':
            value.icon = 'icon-data'
            break
        }
      })
    },
    hiddenMenu() {
      this.isCollapse = !this.isCollapse
    },
    saveNavStatus(activePath) {
      sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created() {
    this.getMenuList()
    this.activePath = sessionStorage.getItem('activePath') || ''
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header,
.el-footer {
  color: #000;
  background-color: #fafafa;
  border: 1px solid #eee;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  .hidden-button {
    background-color: #eee;
    text-align: center;
    cursor: pointer;
  }
}

.el-main {
  width: 100%;
}

.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 40px !important;
}

.item-icon {
  margin: 0 10px;
}

.el-menu {
  border: 0;
}

.logout-button {
  font-weight: 700;
}
</style>
