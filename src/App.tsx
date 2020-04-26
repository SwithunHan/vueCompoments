import "./App.css";
import { createComponent, reactive } from "@vue/composition-api";
// import HelloWorld from "./components/HelloWorld";
// import ImageLogo from "./assets/logo.png";
import Steps from "./components/Steps/Steps";
import Step from "./components/Steps/Step";

const stepList = [1, 2, 3, 4];
const dic = [
  {
    key: "status",
    text: "状态",
    list: [
      { value: "process", label: "正常" },
      { value: "wait", label: "等待" },
      { value: "finish", label: "完成" },
      { value: "error", label: "错误" },
    ],
  },
  {
    key: "size",
    text: "尺寸",
    list: [
      { value: "", label: "默认" },
      { value: "small", label: "略小" },
    ],
  },
  {
    key: "direction",
    text: "方向",
    list: [
      { value: "horizontal", label: "水平" },
      { value: "vertical", label: "垂直" },
    ],
  },
];
export default createComponent({
  name: "App",
  setup() {
    type dataType = { [index: string]: String | Number | boolean };
    const data: dataType = reactive({
      direction: "horizontal",
      size: "",
      current: 0,
      status: "process",
      disabled: false,
    });

    interface iType {
      key: string;
      text: string;
      list: { value: string; label: string }[];
    }
    return () => (
      <div id="app">
        <div class="box">
          <span>步骤：</span>
          <input
            min={0}
            max={stepList.length}
            type="number"
            onChange={(e: any) => (data.current = parseInt(e.target.value))}
            value={data.current}
          />
        </div>
        <div class="box">
          <label>
            <input
              type="radio"
              checked={!data.disabled}
              onChange={(e: any) =>
                (data.disabled = e.target.value === "disable")
              }
              value="able"
            />
            可点击
          </label>
          <label>
            <input
              type="radio"
              checked={data.disabled}
              onChange={(e: any) =>
                (data.disabled = e.target.value === "disable")
              }
              value="disable"
            />
            不可点击
          </label>
        </div>
        {dic.map((i: iType) => (
          <div class="box">
            <span>{i.text}：</span>
            {i.list.map((item) => (
              <label>
                <input
                  name={i.key}
                  type="radio"
                  checked={item.value === data[i.key]}
                  onclick={(e: any) => (data[i.key] = e.target.value)}
                  value={item.value}
                />
                {item.label}
              </label>
            ))}
          </div>
        ))}
        <div class="box">
          <Steps
            {...{
              props: data,
              on: {
                change: (cur: { [index: string]: any }) => {
                  let str = "";
                  for (let k in cur) {
                    str += `${k}: ${cur[k]}\n`;
                  }
                  alert(str);
                },
              },
            }}
          >
            {stepList.map((item) => (
              <Step title={`第 ${item} 步`} content={`我的第 ${item} 步`} />
            ))}
          </Steps>
        </div>

        {/* <HelloWorld
          msg="Welcome to Your Vue.js + TypeScript App"
          eventClick={(e) => console.log("click", e.target)}
        /> */}
      </div>
    );
  },
});