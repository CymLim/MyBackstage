<template>

  <div>
 
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="Search User" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">Add User</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="Name"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="mobile" label="Phone"></el-table-column>
        <el-table-column prop="role_name" label="Role"></el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="Role Assign"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                circle
                @click="showSetRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totle"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="Add User" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form
        :model="addUserForm"
        ref="addUserFormRef"
        :rules="addUserFormRules"
        label-width="100px"
      >
        <el-form-item label="username" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="mobile" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addUser">Confirm</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="editUserForm"
        ref="editUserFormRef"
        :rules="editUserFormRules"
        label-width="70px"
      >
        <el-form-item label="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="mobile" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editUser">Confirm</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="Role Assign" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
      <div>
        <p>Current User：{{userInfo.username}}</p>
        <p>Current Role：{{userInfo.role_name}}</p>
        <p>
          Role Assign：
          <el-select
            v-model="selectRoleId"
            filterable
            allow-create
            default-first-option
            placeholder="Select Tag"
          >
            <el-option
              v-for="item in rolesLsit"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveRoleInfo">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('Invalid Email'))
    }
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('Invalid Phone Number'))
    }
    return {
      // 获取用户列表查询参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 5
      },
      userlist: [],
      totle: 0,
      // 添加用户对话框
      addDialogVisible: false,
      // 用户添加
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 用户添加表单验证规则
      addUserFormRules: {
        username: [
          { required: true, message: 'Username', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: 'Username must between 2 to 10 characters',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Password', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: 'Password must between 6 to 18 characters',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: 'Email Address', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: 'Phone Number', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 修改用户
      editDialogVisible: false,
      editUserForm: {},
      // 编辑用户表单验证
      editUserFormRules: {
        email: [
          { required: true, message: 'Email Address', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: 'Phone Number', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 分配角色对话框
      setRoleDialogVisible: false,
      // 当前需要被分配角色的用户
      userInfo: {},
      // 所有角色数据列表
      rolesLsit: [],
      // 已选中的角色Id值
      selectRoleId: ''
    }
  },
  
  created () {
    this.getUserList()
    
  },
  methods: {
    // async getUserList () {
    //   const { data: res } = await this.$http.get('users', {
    //     params: this.queryInfo
    //   })
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('获取用户列表失败！')
    //   }
      
    //   this.userlist = res.data.users
    //   this.totle = res.data.totle
    // },
    // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getUserList()
    },
    // 监听 switch开关 状态改变
    // async userStateChanged (userInfo) {
    //   // console.log(userInfo)
    //   const { data: res } = await this.$http.put(
    //     `users/${userInfo.id}/state/${userInfo.mg_state}`
    //   )
    //   if (res.meta.status !== 200) {
    //     userInfo.mg_state = !userInfo.mg_state
    //     return this.$message.error('更新用户状态失败')
    //   }
    //   this.$message.success('更新用户状态成功！')
    // },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addUserFormRef.resetFields()
    },
    // 添加用户
    // addUser () {
    //   // 提交请求前，表单预验证
    //   this.$refs.addUserFormRef.validate(async valid => {
    //     // console.log(valid)
    //     // 表单预校验失败
    //     if (!valid) return
    //     const { data: res } = await this.$http.post('users', this.addUserForm)
    //     if (res.meta.status !== 201) {
    //       this.$message.error('Failed to add user!')
    //     }
    //     this.$message.success('Successed to add user!')
    //     // 隐藏添加用户对话框
    //     this.addDialogVisible = false
    //     this.getUserList()
    //   })
    // },
    // 编辑用户信息
    // async showEditDialog (id) {
    //   const { data: res } = await this.$http.get('users/' + id)
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('查询用户信息失败！')
    //   }
    //   this.editUserForm = res.data
    //   this.editDialogVisible = true
    // },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editUserFormRef.resetFields()
    },
    // 修改用户信息
    // editUser () {
    //   // 提交请求前，表单预验证
    //   this.$refs.editUserFormRef.validate(async valid => {
    //     // console.log(valid)
    //     // 表单预校验失败
    //     if (!valid) return
    //     const { data: res } = await this.$http.put(
    //       'users/' + this.editUserForm.id,
    //       {
    //         email: this.editUserForm.email,
    //         mobile: this.editUserForm.mobile
    //       }
    //     )
    //     if (res.meta.status !== 200) {
    //       this.$message.error('更新用户信息失败！')
    //     }
    //     // 隐藏添加用户对话框
    //     this.editDialogVisible = false
    //     this.$message.success('更新用户信息成功！')
    //     this.getUserList()
    //   })
    // },
    // // 删除用户
    // async removeUserById (id) {
    //   const confirmResult = await this.$confirm(
    //     'This operation will permanently delete the user. Do you want to continue?',
    //     'Notices',
    //     {
    //       confirmButtonText: 'Confirm',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }
    //   ).catch(err => err)
    //   // 点击确定 返回值为：confirm
    //   // 点击取消 返回值为： cancel
    //   if (confirmResult !== 'confirm') {
    //     return this.$message.info('Cancelled delete')
    //   }
    //   const { data: res } = await this.$http.delete('users/' + id)
    //   if (res.meta.status !== 200) return this.$message.error('Failed to delete user!')
    //   this.$message.success('Deleting the user succeeded!')
    //   this.getUserList()
    // },
    // 展示分配角色的对话框
    // async showSetRole (role) {
    //   this.userInfo = role
    //   // 展示对话框之前，获取所有角色列表
    //   const { data: res } = await this.$http.get('roles')
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('获取角色列表失败！')
    //   }
    //   this.rolesLsit = res.data
    //   this.setRoleDialogVisible = true
    // },
    // // 分配角色
    // async saveRoleInfo () {
    //   if (!this.selectRoleId) {
    //     return this.$message.error('请选择要分配的角色')
    //   }
    //   const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.selectRoleId })
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('更新用户角色失败！')
    //   }
    //   this.$message.success('更新角色成功！')
    //   this.getUserList()
    //   this.setRoleDialogVisible = false
    // },
    // 分配角色对话框关闭事件
    setRoleDialogClosed () {
      this.selectRoleId = ''
      this.userInfo = {}
    }
  }
}
</script>

<style lang="less" scoped>
</style>
