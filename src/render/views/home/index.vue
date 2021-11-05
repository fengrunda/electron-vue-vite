<template>
  <el-container>
    <el-header class="header">
      Header
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        Aside
      </el-aside>
      <el-container>
        <el-main class="main">
          <el-upload
            action=""
            :auto-upload="false"
            class="upload-demo"
            :drag="true"
            :multiple="true"
            :on-change="handlePickFile"
          >
            <el-icon class="el-icon--upload">
              <upload-filled accept=".xlsx" />
            </el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
        </el-main>
        <el-footer class="footer">
          Footer
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { UploadFile } from 'element-plus/lib/components/upload/src/upload.type'
// console.log(useStore().state.template.testData)
// import xlsx from 'node-xlsx'
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
const handlePickFile = (file:UploadFile, fileList:UploadFile[]) => {
  console.log('handlePickFile :>> ', file, fileList)
  // console.log('fs :>> ', fs.readFileSync(file.path))
  // const path = window.fs.readFileSync(file.raw.path)
  // console.log('path :>> ', path)
  // const reader = new FileReader()
  // reader.readAsDataURL(file.raw)
  // reader.onload = function (e) {
  //   console.log('this.result :>> ', this.result)
  //   const workSheetsFromFile = window.xlsx.parse(this.result as string)
  //   console.log('workSheetsFromFile :>> ', workSheetsFromFile)
  // }
  const workSheetsFromFile = window.xlsx.parse(file.raw.path)
  console.log('workSheetsFromFile :>> ', workSheetsFromFile)
}
// console.log('window.electron :>> ', window.electron)

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header,
.footer {
  background-color: #dedede;
}

.aside {
  background-color: #fafafa;
}
</style>
