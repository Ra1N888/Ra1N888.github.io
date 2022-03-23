window.mobileCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
  };
  
var flag = window.mobileCheck();

var chartDom_1 = document.getElementById('box_1');
var chartDom_4 = document.getElementById('box_4');
var chartDom_2 = document.getElementById('box_2');

var myChart_1 = echarts.init(chartDom_1);
var myChart_4 = echarts.init(chartDom_4);
var myChart_2 = echarts.init(chartDom_2);

//存储表格的四项数据
let chart_1=[];
let chart_2=[];
let chart_4=[];

//表4单层显示时的每层数据, 二维数组初始化, 三层楼, 每层楼四项数据, 最后一组数据存储总数据
var floorData = new Array(4);
for (var i = 0; i < floorData.length; i++) {
  floorData[i] = new Array(4);
}

//存储标签信息,二维数组,房间号+件数
var tagsData = [];

var option_1;
var option_4;
var option_2;

const ul_1 = document.getElementById('kucun');
const ul_2 = document.getElementById('wai');


const list_1 = document.createDocumentFragment();
const list_2 = document.createDocumentFragment();



var arr = []; //用来存放最近七天的时间

function getBeforeDate(n) {
    var s;
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
    if (mon > 1) {
        mon = mon - 1;
    } else {
        year = year - 1;
        mon = 12;
    }
    }
    d.setDate(d.getDate() + n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day);
    return s;
}

for (var i = 0; i > -7; i--) {
    arr.push(getBeforeDate(i));
}
    
var array = arr.reverse(); //数组倒序


//对接表一
async function foo_1(){
  const Data = await fetch('https://lab.huaxuejia.org/api/unity/level_stock');
  const data = await Data.json();
  console.log(data);
  return data;
}

foo_1().then(data => {

  data.map(function(num){
    chart_1.push(num.num);
  })

  console.log(chart_1);
    
  if(flag){ //手机端

    option_1 = {

      grid: {
          left: 5,
          top: 25,
          right: 45,
          bottom: 8
      },

      legend: {
          itemHeight: 7,
          itemWidth: 7,

          data: ['易制毒', '易制爆', '民爆', '剧毒'],
          icon: 'rect',
          orient: 'vertical',
          right: 0,
          top: 'center',
          textStyle: {
              color: '#E1E2E4',
              fontSize: 7
          }

      },

    xAxis: {
      
      type: 'category',
      axisLabel: { show: false },
      axisTick: { show: false },
      showGrid: false,
      data: ['易制毒', '易制爆', '民爆', '剧毒']
    },

    yAxis: {
      axisLine: {
        show: true
      },
      axisLabel: { show: false },
      splitLine: {
        show: false
      },
      type: 'value'
    },

    series: [
      {
        name: '易制毒',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          color: '#13A9D5',
          formatter: function(params) {
              if (params.value > 0) {
                return params.value;
              } else {
                return ' ';
              }}
        },
        data: [chart_1[2], , ,],
        itemStyle: {
          color: '#09C8FF'
        }
      },

      {
        name: '易制爆',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          color: '#13A9D5',
          formatter: function(params) {
              if (params.value > 0) {
                return params.value;
              } else {
                return ' ';
              }}
        },
        data: [, chart_1[3], ,],
        itemStyle: {
          color: '#E6D016'
        }
      },

      {
        name: '民爆',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          color: '#13A9D5',
          formatter: function(params) {
              if (params.value > 0) {
                return params.value;
              } else {
                return ' ';
              }}
        },
        data: [, ,chart_1[1],],
        itemStyle: {
          color: '#F53912'
        }
      },
      {
        name: '剧毒',
        barCategoryGap: '50%',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          color: '#13A9D5',
          formatter: function(params) {
              if (params.value > 0) {
                return params.value;
              } else {
                return ' ';
              }}
        },
        data: [, , , chart_1[0]],
        itemStyle: {
          color: '#D712AA'
        }
      }
    ]
  };


  }else{ //pc端

    option_1 = {

      grid: {
          left: 15,
          top: 60,
          right: 90,
          bottom: 30
      },

      legend: {
          itemHeight: 15,
          itemWidth: 15,

          data: ['易制毒', '易制爆', '民爆', '剧毒'],
          icon: 'rect',
          orient: 'vertical',
          right: 0,
          top: 'center',
          textStyle: {
              color: '#E1E2E4',
              fontSize: 12
          }

      },

      xAxis: {
        
        type: 'category',
        axisLabel: { show: false },
        axisTick: { show: false },
        showGrid: false,
        data: ['易制毒', '易制爆', '民爆', '剧毒']
        // axisLine:{
        //   show:true,
        //   lineStyle:{
        //     width:5
        //   },
        // },
      },

      yAxis: {
        axisLine: {
          show: true
          // lineStyle:{
          //   width:5
          // },
        },
        axisLabel: { show: false },
        splitLine: {
          show: false
        },
        type: 'value'
      },

      series: [
        {
          name: '易制毒',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
            fontSize: 18,
            color: '#13A9D5',
            formatter: function(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return ' ';
                }}
          },
          data: [chart_1[2], , ,],
          itemStyle: {
            color: '#09C8FF'
          }
        },

        {
          name: '易制爆',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
            fontSize: 18,
            color: '#13A9D5',
            formatter: function(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return ' ';
                }}
          },
          data: [, chart_1[3], ,],
          itemStyle: {
            color: '#E6D016'
          }
        },

        {
          name: '民爆',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
            fontSize: 18,
            color: '#13A9D5',
            formatter: function(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return ' ';
                }}
          },
          data: [, ,chart_1[1],],
          itemStyle: {
            color: '#F53912'
          }
        },
        {
          name: '剧毒',
          barCategoryGap: '50%',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
            fontSize: 18,
            color: '#13A9D5',
            formatter: function(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return ' ';
                }}
          },
          data: [, , , chart_1[0]],
          itemStyle: {
            color: '#D712AA'
          }
        }
      ]
    };

  }

  option_1 && myChart_1.setOption(option_1);


})

//对接表二
async function foo_2(){
  const Data = await fetch('https://lab.huaxuejia.org/api/unity/orders');
  const data = await Data.json();
  console.log(data);
  return data;
}

foo_2().then(data => {

  data.map(function(num){
    chart_2.push(num.sum);
  })

  console.log(chart_2);
    
  if(flag){ //手机端

    option_2 = {

        grid: {
            left: 10,
            top: 30,
            right: 10,
            bottom: 20
        },
        
        title: {
            text: '7日内领用（件）',
            top: 0,
            left: 'center',
            textStyle: {
                color: '#13A9D5',
                fontSize: 7
            }
        },
        
        xAxis: {
          axisLabel: { 
            textStyle: {
              color: '#13A9D5',
              fontSize: 8
            } 
          },
          type: 'category',
          boundaryGap: false,
          data: array
        },

        yAxis: {
          type: 'value',
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
          }
        },

        series: [{
        
            data: [chart_2[0], chart_2[1], chart_2[2], chart_2[3], chart_2[4], chart_2[5], chart_2[6]],
            type: 'line',
            symbolSize:4,
            symbol: 'circle',
            label: {
                show: true,
                position: 'top',
                fontSize: 10,
                color: '#13A9D5',
                formatter: function(params) {
                    if (params.value > 0) {
                      return params.value;
                    } else {
                      return ' ';
                    }}
              },
            itemStyle: {
                normal: {
                    color: '#13A9D5',
                    lineStyle: {
                        width: 2
                    }
                }
            }
        }]  
    };

  }else{ //pc端

    option_2 = {

        grid: {
            left: 15,
            top: 50,
            right: 15,
            bottom: 30
        },
        
        title: {
            text: '7日内领用（件）',
            top: 5,
            left: 'center',
            textStyle: {
                color: '#13A9D5',
                fontSize: 15
            }
        },
        
        xAxis: {
          axisLabel: { 
            textStyle: {
              color: '#13A9D5',
            } 
          },
          type: 'category',
          boundaryGap: false,
          data: array
        },

        yAxis: {
          type: 'value',
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
          }
        },

        series: [{
        
          data: [chart_2[0], chart_2[1], chart_2[2], chart_2[3], chart_2[4], chart_2[5], chart_2[6]],
            type: 'line',
            symbolSize: 9,
            symbol: 'circle',
            label: {
                show: true,
                position: 'top',
                fontSize: 18,
                color: '#13A9D5',
                formatter: function(params) {
                    if (params.value > 0) {
                      return params.value;
                    } else {
                      return ' ';
                    }}
              },
            itemStyle: {
                normal: {
                    color: '#13A9D5',
                    lineStyle: {
                        width: 5
                    }
                }
            }
        }]  
    };

  }

  option_2 && myChart_2.setOption(option_2);

})

//对接表四
fetch('https://lab.huaxuejia.org/api/unity/level_stats')
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      //将每层的四项数据存进floorData
      for(let i = 0; i < 3; i++ ){

        data[2].floors[i+7].stats.map(function(num,index){
          floorData[i][index] = num.num;
        })

      }

      data[2].stats.map(function(num,index){
        chart_4.push(num.num);
        floorData[3][index] = num.num;
      })

      if(flag){ //手机端

        option_4 = {


          title: {
              text: '在外管控品数量(件)',
              left: 'left',
              top: 0,
              textStyle:{
                  color:'#13A9D5',
                  fontSize:7
              }
            },
      
            grid: {
              left: 5,
              top: 30,
              right: 45,
              bottom: 8
          },
      
          legend: {
              itemHeight: 7,
              itemWidth: 7,
      
              data: ['易制毒', '易制爆', '民爆', '剧毒'],
              icon: 'rect',
              orient: 'vertical',
              right: 0,
              top: 'center',
              textStyle: {
                  color: '#E1E2E4',
                  fontSize: 7
              }
      
          },
      
          xAxis: {
            
            type: 'category',
            axisLabel: { show: false },
            axisTick: { show: false },
            showGrid: false,
            data: ['易制毒', '易制爆', '民爆', '剧毒']
            // axisLine:{
            //   show:true,
            //   lineStyle:{
            //     width:5
            //   },
            // },
          },
      
          yAxis: {
            axisLine: {
              show: true
              // lineStyle:{
              //   width:5
              // },
            },
            axisLabel: { show: false },
            splitLine: {
              show: false
            },
            type: 'value'
          },
      
          series: [
            {
              name: '易制毒',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'top',
                fontSize: 10,
                color: '#13A9D5',
                formatter: function(params) {
                    if (params.value > 0) {
                      return params.value;
                    } else {
                      return ' ';
                    }}
              },
              data: [chart_4[2], , ,],
              itemStyle: {
                color: '#09C8FF'
              }
            },
      
            {
              name: '易制爆',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'top',
                fontSize: 10,
                color: '#13A9D5',
                formatter: function(params) {
                    if (params.value > 0) {
                      return params.value;
                    } else {
                      return ' ';
                    }}
              },
              data: [, chart_4[3], ,],
              itemStyle: {
                color: '#E6D016'
              }
            },
      
            {
              name: '民爆',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'top',
                fontSize: 10,
                color: '#13A9D5',
                formatter: function(params) {
                    if (params.value > 0) {
                      return params.value;
                    } else {
                      return ' ';
                    }}
              },
              data: [, ,chart_4[1],],
              itemStyle: {
                color: '#F53912'
              }
            },
            {
              name: '剧毒',
              barCategoryGap: '50%',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'top',
                fontSize: 10,
                color: '#13A9D5',
                formatter: function(params) {
                    if (params.value > 0) {
                      return params.value;
                    } else {
                      return ' ';
                    }}
              },
              data: [, , , chart_4[0]],
              itemStyle: {
                color: '#D712AA'
              }
            }
          ]
        };


      }else{ //pc端

        option_4 = {


          title: {
              text: '在外管控品数量（件）',
              top:5,
              left: 'center',
              textStyle:{
                  color:'#13A9D5',
                  fontSize:15
              }
            },

          grid: {
              left: 15,
              top: 60,
              right: 90,
              bottom: 30
          },

          legend: {
              itemHeight: 15,
              itemWidth: 15,

              data: ['易制毒', '易制爆', '民爆', '剧毒'],
              icon: 'rect',
              orient: 'vertical',
              right: 0,
              top: 'center',
              textStyle: {
                  color: '#E1E2E4',
                  fontSize: 12
              }

          },

        xAxis: {
          
          type: 'category',
          axisLabel: { show: false },
          axisTick: { show: false },
          showGrid: false,
          data: ['易制毒', '易制爆', '民爆', '剧毒']
          // axisLine:{
          //   show:true,
          //   lineStyle:{
          //     width:5
          //   },
          // },
        },

        yAxis: {
          axisLine: {
            show: true
            // lineStyle:{
            //   width:5
            // },
          },
          axisLabel: { show: false },
          splitLine: {
            show: false
          },
          type: 'value'
        },

        series: [
          {
            name: '易制毒',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
              fontSize: 18,
              color: '#13A9D5',
              formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return ' ';
                  }}
            },
            data: [chart_4[2], , ,],
            itemStyle: {
              color: '#09C8FF'
            }
          },

          {
            name: '易制爆',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
              fontSize: 18,
              color: '#13A9D5',
              formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return ' ';
                  }}
            },
            data: [, chart_4[3], ,],
            itemStyle: {
              color: '#E6D016'
            }
          },

          {
            name: '民爆',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
              fontSize: 18,
              color: '#13A9D5',
              formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return ' ';
                  }}
            },
            data: [, ,chart_4[1],],
            itemStyle: {
              color: '#F53912'
            }
          },
          {
            name: '剧毒',
            barCategoryGap: '50%',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
              fontSize: 18,
              color: '#13A9D5',
              formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return ' ';
                  }}
            },
            data: [, , , chart_4[0]],
            itemStyle: {
              color: '#D712AA'
            }
          }
        ]
        };

      }

      
      option_4 && myChart_4.setOption(option_4);

      const div = document.createElement('div')
      div.setAttribute("id", "node_1");
      document.getElementById("body").append(div); 

    })


//加载左边的box
fetch('https://lab.huaxuejia.org/api/unity/mancon_stock_stats')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let kucun = data;

      kucun.map(function(kucun) {
        let li = document.createElement('div');
        li.innerHTML = `${kucun.title} ${kucun.stock_quantity}${kucun.measurement.unit}`;

        list_1.appendChild(li);
        ul_1.appendChild(list_1);
      });

      kucun.map(function(kucun) {
        let li = document.createElement('div');
        li.innerHTML = `${kucun.title} ${kucun.stock_quantity}${kucun.measurement.unit}`;

        list_1.appendChild(li);
        ul_1.appendChild(list_1);
      });

    })
    .catch(function(error) {
      console.log(error);
    });


//加载右边的box(默认)
fetch('https://lab.huaxuejia.org/api/unity/mancon_out_stats')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let wai = data;

    wai.map(function(kucun) {
      let li = document.createElement('div');

      li.innerHTML = `${kucun.title} ${kucun.out_quantity}${kucun.measurement.unit}`;

      list_2.appendChild(li);
      ul_2.appendChild(list_2);
    });

    wai.map(function(kucun) {
      let li = document.createElement('div');

      li.innerHTML = `${kucun.title} ${kucun.out_quantity}${kucun.measurement.unit}`;

      list_2.appendChild(li);
      ul_2.appendChild(list_2);
    });


  })
  .catch(function(error) {
    console.log(error);
  });


// //加载右边的box(单层显示)
// async function newbox(){
//   const Data = await fetch('https://lab.huaxuejia.org/api/unity/out_stats');
//   const data = await Data.json();
//   return data;
// }

// newbox().then(data => {

//   let wai = data;

//   Object.entries(wai).forEach(([key, value]) => {
    
//     if( value.title[0] == 'N' || value.title[0] == 'S'){
      
//       var array = [];
//       array[0] =  value.title;
//       array[1] = '('+ value.rows.length + ')件';
//       // console.log(array[1]);
//       tagsData.push(array);
      

//       value.rows.forEach(function(item){


//         // console.log(value.title)

//         let li = document.createElement('div');
//         let title = document.createElement('h4');
//         let info = document.createElement('div');
//         let bar_container = document.createElement('div');
//         let bar = document.createElement('div');

//         const perc = ((item.out_quantity - item.used_quantity) / item.out_quantity * 100).toFixed(0) + '%';
//         // console.log(`"${perc}"`)
  
//         title.innerHTML = `${value.title}`;
//         info.innerHTML = `${item.title} ${item.out_quantity}${item.measurement.unit} ${item.user}`
//         bar.style.backgroundColor = "red"
//         bar.style.height = "3px"
//         bar.style.width = `${perc}`


//         bar_container.appendChild(bar);
//         li.appendChild(title);
//         li.appendChild(info);
//         li.appendChild(bar_container);
//         // li.appendChild(bar);

        

//         switch(value.title[1]){
//           case '1':

//             floorList_1.appendChild(li);
//             Flo_1.appendChild(floorList_1);
//             break;

//           case '2':

//             floorList_2.appendChild(li);
//             Flo_2.appendChild(floorList_2);
//             break;

//           case '3':

//             floorList_3.appendChild(li);
//             Flo_3.appendChild(floorList_3);
//             break;

//           case '4':

//             floorList_4.appendChild(li);
//             Flo_4.appendChild(floorList_4);
//             break;

//           case '5':

//             floorList_5.appendChild(li);
//             Flo_5.appendChild(floorList_5);
//             break;

//           case '6':

//             floorList_6.appendChild(li);
//             Flo_6.appendChild(floorList_6);
//             break;

//         }

//       })

//     }

//   });
  
//   console.log('完成')

// })

export { option_4,myChart_4,floorData};