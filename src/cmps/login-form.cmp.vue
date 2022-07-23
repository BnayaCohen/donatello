<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="login-form"
    :size="formSize"
    @keyup.enter="submitForm(ruleFormRef)"
  >
    <!-- <h2>
      {{ ruleForm.signup ? 'Sign up' : 'Sign in ' }}
    </h2> -->
    <el-form-item v-if="ruleForm.signup" label="fullname" prop="fullname">
      <el-input v-model="ruleForm.fullname" />
    </el-form-item>
    <el-form-item label="username" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input type="password" show-password v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Sign {{ ruleForm.signup ? 'up' : 'in' }}</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="ruleForm.signup = !ruleForm.signup">
        {{ ruleForm.signup ? 'Login' : 'Signup' }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits(['formSubmited'])
const router = useRouter()
const store = useStore()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  fullname: '',
  username: '',
  password: '',
  signup: false,
})

const rules = reactive<FormRules>({
  fullname: [
    { required: true, message: 'Please input fullname', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' },
  ],
  username: [
    { required: true, message: 'Please input username' },
    { min: 3, max: 12, message: 'Length should be 3 to 12', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input password' },
    { min: 5, max: 22, message: 'Length should be 5 to 22', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const action = ruleForm.signup ? 'signup' : 'login'
      try {
        await store.dispatch({
          type: 'logUser',
          action,
          ruleForm,
        })
        emit('formSubmited')
        router.currentRoute.value.path === '/' && router.push('/home')
      } catch (err) {
        console.log(err)
        console.error('Something went wrong try again later')
      } finally {
        formEl.resetFields()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
