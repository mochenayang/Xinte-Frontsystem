<template>
  <el-container style="background-color: #fff;">
    <el-col>
      <el-row style="height: 50px;margin-top: 10px;" align="middle">
        <el-form :inline="true" :model="form" style="width: 95%;margin-left: 5%;">
          <el-form-item label="工段选择：" style="width: 30%;">
            <el-select v-model="form.section" style="width: 80%;">
              <el-option
                v-for="item in data.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围：" style="width: 40%;min-width: 500px;">
            <el-date-picker
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </el-form-item>
          <el-form-item style="width:25%;text-align: end;">
            <el-button style="background-color: #fff;color: black;">重置</el-button>
            <el-button type="primary">查询</el-button>
            <el-button @click="downLoad">下载模板</el-button>
            <el-upload ref="upload" :limit="1"
            :on-exceed="handleExceed"
            :file-list="uploadFileList"
            :on-change="upload"
            :show-file-list="false"
            :auto-upload="false"
            style="display: inline-block;margin-left: 10px;"
            >
              <el-button>导入模板</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="height: calc(100% - 60px);">
        <el-table :data="data.testList">
          <template :key="index" v-for="(col,index) in data.dataNow">
            <el-table-column align="center" :prop="col.attr" :label="col.label" min-width="180">
              <template #default="scope">
                {{ scope.row[col.attr] }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-row>
    </el-col>
  </el-container>
  
</template>
<script setup>
import { ref,reactive,} from 'vue'
import * as XLSX from 'xlsx'

// const section = ref('')
const form = reactive({
  section:'',
  date:'',
})

const uploadFileList = reactive([])

const data = reactive({
  options:[
    {
      label:"氢化工段",
      value:"QH"
    },
    {
      label:"净化工段",
      value:"JH"
    },
    {
      label:"渣浆高沸工段",
      value:"ZJ"
    },
    {
      label:"还原工段",
      value:"HY"
    },
    {
      label:"公用工程工段",
      value:"GYGC"
    }
  ],
  testList:[
    {
      "id": 1,
      "sitename": "SYNCBASE5.111ELIC321A_DACA_PV",
      "describe": "111E-D-17a液位指示调节",
      "type": "限值报警",
      "realTime": "80.419",
      "alarm_Info": "HI[高限]【75】",
      "start_time": "2023-07-21T09:41:14.000Z",
      "during_time": "00:00:00:33",
      "level": "2",
      "name": "QH1143",
      "warningLevel": 3
    }, {
      "id": 2,
      "sitename": "SYNCBASE5.111ELIC321A_DACA_PV",
      "describe": "111E-D-17a液位指示调节",
      "type": "限值报警",
      "realTime": "80.419",
      "alarm_Info": "HI[高限]【75】",
      "start_time": "2023-07-21T09:41:14.000Z",
      "during_time": "00:00:00:33",
      "level": "2",
      "name": "QH1143",
      "warningLevel": 3
    }
  ],
  dataNow:[
    {label:"序号",attr:"id"},
    {label:"测点", attr:"sitename"},
    {label:"描述", attr:"describe"},
    {label:"报警类型", attr:"type"},
    {label:"实时值", attr:"realTime"},
    {label:"测点", attr:"sitename"},
    {label:"报警内容", attr:"alarm_Info"},
    {label:"开始时间", attr:"start_time"},
    {label:"持续时间", attr:"during_time"},
    {label:"名称", attr:"name"}
  ]
})

const downLoad = () => {
  // 创建workbook对象
  const workbook = XLSX.utils.book_new();
  // 创建worksheet对象
  var obj = [{}]
  data.dataNow.forEach((item)=>{
    obj[0][item.label]=""
  })
  const worksheet1 = XLSX.utils.json_to_sheet(obj);
  // 将 Worksheet 添加到 Workbook 中
  XLSX.utils.book_append_sheet(workbook, worksheet1, '报表1');
  // 生成 Excel 文件并下载
  XLSX.writeFile(workbook, '空白模板.xlsx');
}

const upload = (file) => {
  console.log(file);
  let reader = new FileReader();
  reader.readAsArrayBuffer(file.raw); //读任意文件
  reader.onload = (e)=>{
    console.log(e.target.result);
    const workbook = XLSX.read(e.target.result,{ type:'binary'});
    const xlsxData = XLSX.utils.sheet_to_json(workbook.Sheets['报表1'])
    console.log(Object.keys(xlsxData[0]),xlsxData);
    const list1 = Object.keys(xlsxData[0])
    var list2 = []
    Object.keys(xlsxData[0]).forEach((e)=>{
      data.dataNow.forEach((item)=>{
        if(e==item.label){
          e=item.attr
          list2.push(item.attr)
        }
      })
    })
    let obj = []
    xlsxData.forEach((item)=>{
      let obj0 = {}
      for(let i=0;i<list1.length;i++){
        obj0[list2[i]]=item[list1[i]]
      }
      obj.push(obj0)
    })
    console.log(obj);
    
  }
}
</script>
<style lang="less" scoped>

</style>
