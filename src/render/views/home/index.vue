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
            :on-remove="handleRemoveFile"
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
import { ref } from 'vue'
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
// const DATA_MAP:{
//   [uid: number]: {
//     name: string;
//     data: unknown[][];
//   }[]
// } = {}
const firstFileTitle = ref([])
const DATA_MAP = new Map()
function handlePickFile (file:UploadFile, fileList:UploadFile[]) {
  const workSheetsFromFile = window.xlsx.parse(file.raw.path)
  DATA_MAP.set(file.uid, workSheetsFromFile)
  console.log('workSheetsFromFile :>> ', workSheetsFromFile)
}
function handleRemoveFile (file:UploadFile, fileList:UploadFile[]) {
  DATA_MAP.delete(file.uid)
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
