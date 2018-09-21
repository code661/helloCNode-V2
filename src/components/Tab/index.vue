<script>
import { ButtonGroup, Button } from "iview";

const tabList = [
  { value: "all", label: "全部" },
  { value: "good", label: "精华" },
  { value: "share", label: "分享" },
  { value: "ask", label: "问答" },
  { value: "job", label: "招聘" },
  { value: "dev", label: "客户端测试" },
];

export default {
  name:"Tab",
  components: {
    ButtonGroup,
    Button
  },
  methods: {
    changeTab(tab){
      this.$emit('change-tab',this.page,tab.value)
    }
  },
  props:{
    page:{
      type: Number,
      required: true
    },
    tab:{
      type: String,
      required: true
    }
  },
  render(h) {
    return h(
      'ButtonGroup',
      {
        props:{
          shape: 'circle'
        }
      },
      tabList.map(tab=>h(
        'Button',
        {
          props:{
            type: this.tab === tab.value ? "primary" : 'default'
          },
          on: {
            click: ()=>{
              this.changeTab(tab)
            }
          }
        },
        tab.label
      ))
    )
  }
};
</script>

<style lang="stylus" scoped>
</style>


