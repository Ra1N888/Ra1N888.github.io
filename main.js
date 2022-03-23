Pace.on("done",function(){
  document.getElementById("loader").style.display="none";
})

import {option_4,myChart_4,floorData} from './charts.js';

let camera, scene, renderer, controls,raycaster;
var group_A, group_B, group_C, group_D;

const color_1 = 0x1D4ED8; //底板和隔板的颜色
const color_2 = 0x909698; //其余部分的颜色

const opacity_1 = 0.5;      //底板和隔板的透明度
const opacity_2 = 0.5;    //其余部分的透明度


const cube_side = 10;
const Floor_thickness = 2; //楼板厚度
const Floor_height = 50;   //楼层高度
const Wall_thickness = 2;  //墙面厚度

const container = document.getElementById("building");
const reset_button = document.getElementById("button");
const div_titlt_4 = document.getElementById("title_4");
const div_wai = document.getElementById("wai");
const newbox = document.getElementsByClassName('newbox');

let uniforms = {
  u_color: { value: new THREE.Color("#ffff22") },
  u_tcolor: { value: new THREE.Color("#ff2222") },
  u_r: { value: 0.25 },
  u_length: { value: 1.3 },//扫过区域
  u_max: { value: 300 }//扫过最大值
}

var floorChar = 'M';
var mouse = new THREE.Vector2(); //记录屏幕鼠标的X，Y坐标

var Width  = window.innerWidth;
var Height = window.innerHeight;

//检测是mobile还是pc
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
var flag = window.mobileCheck();
console.log(flag);

var dt;//记录时间

//默认页面隐藏每层的box-6数据
for(let i=0; i< newbox.length; i++){
  newbox[i].style.display = "none";
}

//手机端的按钮
const button_A = document.getElementById("button_A");
const button_B = document.getElementById("button_B");
const button_C = document.getElementById("button_C");


const Flo_1 = document.getElementById('newbox_1');
const Flo_2 = document.getElementById('newbox_2');
const Flo_3 = document.getElementById('newbox_2');

const floorList_1 = document.createDocumentFragment();
const floorList_2 = document.createDocumentFragment();
const floorList_3 = document.createDocumentFragment();


//涟漪材质
let m = new THREE.MeshLambertMaterial({
  color: 0xffff64,
  side: THREE.DoubleSide,
  // transparent: true,
  onBeforeCompile: shader => {
    shader.uniforms.u_color = uniforms.u_color
    shader.uniforms.u_tcolor = uniforms.u_tcolor
    shader.uniforms.u_r = uniforms.u_r
    shader.uniforms.u_length = uniforms.u_length
    shader.uniforms.u_max = uniforms.u_max
    shader.vertexShader = `
        varying vec3 vPos;
      ${shader.vertexShader}
    `.replace(
        `#include <begin_vertex>`,
      `#include <begin_vertex>
        vPos = transformed;
      `
    );
    shader.fragmentShader = `
        uniform vec3 u_color;
      uniform vec3 u_tcolor;
      uniform float u_r;
      uniform float u_length;
      uniform float u_max;
      varying vec3 vPos;
      ${shader.fragmentShader}
    `.replace(
        `#include <dithering_fragment>`,
      `#include <dithering_fragment>

      vec3 vColor = u_tcolor;
      float uLength = distance(vPos, vec3(0.))/2.5;
      float hWidth = u_length * 0.5;
      if ( abs((u_r - hWidth) - uLength) > hWidth ) { discard ;} 
      
      gl_FragColor = vec4(vColor,1.);
           
      `
    );
    //console.log(shader.fragmentShader)
  }
});
var clock = new THREE.Clock();
clock.start();

init();
animation();

function init() {

  window.addEventListener( 'resize', onWindowResize, false );

  //scene
  scene = new THREE.Scene();

  //floorGroup
  group_A = createFloorGroup('A'); //第一层
  group_B = createFloorGroup('B'); //第二层
  group_C = createFloorGroup('C'); //第三层
  group_D = createFloorGroup('D'); //屋顶

  scene.add(group_A);
  scene.add(group_B);
  scene.add(group_C);
  scene.add(group_D);

  //创建相机---相机初始化
  if (flag == false){ //pc端
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10000 );
  }
  else { //移动端
    if(Width<Height) camera = new THREE.PerspectiveCamera( 70, window.innerHeight / window.innerWidth, 0.01, 10000 ); //一开始手机竖屏状态---正常横屏比例显示
    else camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10000 );
  }  
  camera.position.set(300,140,600); 

  //环境光-粉色
  var ambientLight = new THREE.AmbientLight(0xffffff,0.3);
  scene.add(ambientLight);

  //平行光-白色
  var DirectLight = new THREE.DirectionalLight(0xffffff, 1, 100, 2 );
  DirectLight.position.set(360, 800, 300); 
  DirectLight.castShadow = true;
  scene.add(DirectLight);

  //网格参考线
  var helper = new THREE.GridHelper( 2000, 200 ); //一个格子10个单位长
  helper.material.opacity = 0.5;
  helper.material.transparent = true;
  scene.add( helper );

  // //世界坐标轴
  // var axisHelper = new THREE.AxisHelper( 1000 );
  // axisHelper.material.opacity = 1;
  // axisHelper.material.transparent = true;
  // scene.add( axisHelper );

  //渲染器
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x0C1323); //黑色背景
  container.appendChild(renderer.domElement);

  // orbit Controls-方向控制器
  controls = new THREE.OrbitControls(camera,renderer.domElement);
  controls.target = new THREE.Vector3(350,140,100);
  controls.update();

  //相机和鼠标连接起来的射线
  raycaster = new THREE.Raycaster();

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  container.addEventListener( 'dblclick', onDocumentDoubleClick, false );
  window.addEventListener( 'resize', onWindowResize, false );
  reset_button.addEventListener('mousedown', clickReset, false);
  button_A.addEventListener('click', () => { display(button_A.id); }, false);
  button_B.addEventListener('click', () => { display(button_B.id); }, false);
  button_C.addEventListener('click', () => { display(button_C.id); }, false);

  //创建大楼
  creatGroup_A(group_A);  //第一层
  creatGroup_B(group_B);  //第二层
  creatGroup_C(group_C);  //第三层
  creatGroup_D(group_D);  //屋顶

  creatCube();

  group_B.translateY(Floor_height + Floor_thickness);
  group_C.translateY((Floor_height + Floor_thickness)*2);


  // console.log(group_A.children);
  // console.log(group_B.children);
  // console.log(group_C.children);

}

function animation() {
  dt = new Date();
  var myDate = (dt.getFullYear()) + "-" + (dt.getMonth() + 1)+ "-" + (dt.getDate());
  var time = dt.getHours() + ":" + dt.getMinutes();
  document.getElementById('date').innerHTML = myDate;
  document.getElementById("time").innerHTML = time; 
  

  if (flag == true) { //移动端
    if(document.documentElement.clientWidth < document.documentElement.clientHeight)renderer.setSize( window.innerHeight , window.innerWidth); //解决横竖屏转换，屏幕更新不及时
    else renderer.setSize(  window.innerWidth, window.innerHeight );
  }
  else{ //pc端
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  floorChar = whichFloor();
  var delta = clock.getDelta(); //获得Three.js两帧渲染时间间隔

  uniforms.u_r.value += delta * 5;
  if (uniforms.u_r.value >= 10) {
     uniforms.u_r.value = 1
  }
    requestAnimationFrame(animation);
    renderer.render( scene, camera );
}

//创建FloorGroup
function createFloorGroup(id){
  var group = new THREE.Group();
  group.name = 'floorGroup(' + id + ')'; //给大楼命名,例如“floorGroup(A)”
  return group;
}

function creatGroup_A(group_A){
  
  //楼层地板
  var floorShape_A_1 = new THREE.Shape([
    new THREE.Vector2(0,0),
    new THREE.Vector2(160,0),
    new THREE.Vector2(160,-90),
    new THREE.Vector2(135,-90),
    new THREE.Vector2(135,-115),
    new THREE.Vector2(160,-115),
    new THREE.Vector2(160,-180),
    new THREE.Vector2(65,-180),
    new THREE.Vector2(65,-20),
    new THREE.Vector2(35,-20),
    new THREE.Vector2(35,-70),
    new THREE.Vector2(0,-70),
    new THREE.Vector2(0,0),
  ]);

  var floorShape_A_2 = new THREE.Shape([
    new THREE.Vector2(220,0),
    new THREE.Vector2(650,0),
    new THREE.Vector2(650,-160),
    new THREE.Vector2(505,-160),
    new THREE.Vector2(505,-180),
    new THREE.Vector2(365,-180),
    new THREE.Vector2(365,-160),
    new THREE.Vector2(220,-160),
    new THREE.Vector2(220,0),
  ]);

  var floorShape_A_3 = new THREE.Shape([
    new THREE.Vector2(710,0),
    new THREE.Vector2(810,0),
    new THREE.Vector2(810,-180),
    new THREE.Vector2(710,-180),
    new THREE.Vector2(710,-115),
    new THREE.Vector2(735,-115),
    new THREE.Vector2(735,-90),
    new THREE.Vector2(710,-90),
    new THREE.Vector2(710,0),
  ]);

  //墙壁
  var wallShape_A_1 = new THREE.Shape([
    new THREE.Vector2(-2,0),
    new THREE.Vector2(-2,2),
    new THREE.Vector2(162,2),
    new THREE.Vector2(162,-92),
    new THREE.Vector2(137,-92),
    new THREE.Vector2(137,-113),
    new THREE.Vector2(162,-113),
    new THREE.Vector2(162,-182),
    new THREE.Vector2(63,-182),
    new THREE.Vector2(63,-22),
    new THREE.Vector2(37,-22),
    new THREE.Vector2(37,-72),
    new THREE.Vector2(-2,-72),
    new THREE.Vector2(-2,0),
    new THREE.Vector2(0,0),
    new THREE.Vector2(0,-70),
    new THREE.Vector2(35,-70),
    new THREE.Vector2(35,-20),
    new THREE.Vector2(65,-20),
    new THREE.Vector2(65,-180),
    new THREE.Vector2(160,-180),
    new THREE.Vector2(160,-115),
    new THREE.Vector2(135,-115),
    new THREE.Vector2(135,-90),
    new THREE.Vector2(160,-90),
    new THREE.Vector2(160,0),
    new THREE.Vector2(-2,0),

  ]);
  var wallShape_A_2= new THREE.Shape([
    new THREE.Vector2(218,0),
    new THREE.Vector2(218,2),
    new THREE.Vector2(652,2),
    new THREE.Vector2(652,-162),
    new THREE.Vector2(507,-162),
    new THREE.Vector2(507,-182),
    new THREE.Vector2(483,-182),
    new THREE.Vector2(483,-92),
    new THREE.Vector2(387,-92),
    new THREE.Vector2(387,-182),
    new THREE.Vector2(363,-182),
    new THREE.Vector2(363,-162),
    new THREE.Vector2(218,-162),
    new THREE.Vector2(218,0),
    new THREE.Vector2(220,0),
    new THREE.Vector2(220,-160),
    new THREE.Vector2(365,-160),
    new THREE.Vector2(365,-180),
    new THREE.Vector2(385,-180),
    new THREE.Vector2(385,-90),
    new THREE.Vector2(485,-90),
    new THREE.Vector2(485,-180),
    new THREE.Vector2(505,-180),
    new THREE.Vector2(505,-160),
    new THREE.Vector2(650,-160),
    new THREE.Vector2(650,0),
    new THREE.Vector2(218,0),

  ]);
  var wallShape_A_3= new THREE.Shape([
    new THREE.Vector2(708,0),
    new THREE.Vector2(708,2),
    new THREE.Vector2(812,2),
    new THREE.Vector2(812,-182),
    new THREE.Vector2(708,-182),
    new THREE.Vector2(708,-113),
    new THREE.Vector2(733,-113),
    new THREE.Vector2(733,-92),
    new THREE.Vector2(708,-92),
    new THREE.Vector2(708,0),
    new THREE.Vector2(710,0),
    new THREE.Vector2(710,-90),
    new THREE.Vector2(735,-90),
    new THREE.Vector2(735,-115),
    new THREE.Vector2(710,-115),
    new THREE.Vector2(710,-180),
    new THREE.Vector2(810,-180),
    new THREE.Vector2(810,0),
    new THREE.Vector2(708,0),

  ]);

  createExtrudeGeometry(floorShape_A_1, Floor_thickness, color_1, opacity_1, 'floor_1', group_A, 0);
  createExtrudeGeometry(floorShape_A_2, Floor_thickness, color_1, opacity_1, 'floor_2', group_A, 0);
  createExtrudeGeometry(floorShape_A_3, Floor_thickness, color_1, opacity_1, 'floor_3', group_A, 0);

  createExtrudeGeometry(wallShape_A_1, Floor_height + Floor_thickness, color_2, opacity_2, 'Fence_1', group_A, 0);
  createExtrudeGeometry(wallShape_A_2, Floor_height + Floor_thickness, color_2, opacity_2, 'Fence_1', group_A, 0);
  createExtrudeGeometry(wallShape_A_3, Floor_height + Floor_thickness, color_2, opacity_2, 'Fence_1', group_A, 0);


  let Wall_Z_Position = [
    [35,0,20],  
    [63,0,20],  
    [135,-67,23], 
    [135,-115,65],    
    [240,-30,35],
    [260,0,65],
    [340,0,65],
    [410,0,65],
    [460,0,65],
    [490,0,65],
    [520,0,65],
    [610,0,65],

    [340,-90,70],
    [520,-90,70],
    [585,-90,70],

    [733,-67,23],
    [790,-115,65],    
  ];

  let Wall_X_Position = [
    [65,-65,95],   
    [220,-28,22], 

    [220,-65,192], 
    [460,-65,190],

    [220,-90,165],
    [485,-90,165],  
    
    [710,-65,100],  
    [735,-113,75],  

  ];

  creatArches(group_A)

  //通过顶点数组创建墙壁
  creatWall_Z(Wall_Z_Position,group_A);
  creatWall_X(Wall_X_Position, group_A);

  // creatStair_left(group_A);
  // creatStair_right(group_A);
  // creatStair_middle(group_A);

}

function creatGroup_B(group_B){
  //楼层地板
  var floorShape = new THREE.Shape([
    new THREE.Vector2(0,0),
    new THREE.Vector2(160,0),
    new THREE.Vector2(160,-30),
    new THREE.Vector2(220,-30),
    new THREE.Vector2(220,0),
    new THREE.Vector2(650,0),
    new THREE.Vector2(650,-10),
    new THREE.Vector2(710,-10),
    new THREE.Vector2(710,0),
    new THREE.Vector2(810,0),
    new THREE.Vector2(810,-180),
    new THREE.Vector2(710,-180),
    new THREE.Vector2(710,-160),
    new THREE.Vector2(505,-160),
    new THREE.Vector2(505,-180),
    new THREE.Vector2(365,-180),
    new THREE.Vector2(365,-160),
    new THREE.Vector2(160,-160),
    new THREE.Vector2(160,-180),
    new THREE.Vector2(65,-180),
    new THREE.Vector2(65,-20),
    new THREE.Vector2(35,-20),
    new THREE.Vector2(35,-70),
    new THREE.Vector2(0,-70),
    new THREE.Vector2(0,0),

  ]);
  //墙壁
  //墙壁
  var wallShape_B_1 = new THREE.Shape([
    new THREE.Vector2(-2,0),
    new THREE.Vector2(-2,2),
    new THREE.Vector2(162,2),
    new THREE.Vector2(162,-92),
    new THREE.Vector2(137,-92),
    new THREE.Vector2(137,-113),
    new THREE.Vector2(162,-113),
    new THREE.Vector2(162,-182),
    new THREE.Vector2(63,-182),
    new THREE.Vector2(63,-22),
    new THREE.Vector2(37,-22),
    new THREE.Vector2(37,-72),
    new THREE.Vector2(-2,-72),
    new THREE.Vector2(-2,0),
    new THREE.Vector2(0,0),
    new THREE.Vector2(0,-70),
    new THREE.Vector2(35,-70),
    new THREE.Vector2(35,-20),
    new THREE.Vector2(65,-20),
    new THREE.Vector2(65,-180),
    new THREE.Vector2(160,-180),
    new THREE.Vector2(160,-115),
    new THREE.Vector2(135,-115),
    new THREE.Vector2(135,-90),
    new THREE.Vector2(160,-90),
    new THREE.Vector2(160,0),
    new THREE.Vector2(-2,0),

  ]);
  var wallShape_B_2= new THREE.Shape([
    new THREE.Vector2(218,0),
    new THREE.Vector2(218,2),
    new THREE.Vector2(652,2),
    new THREE.Vector2(652,-162),
    new THREE.Vector2(507,-162),
    new THREE.Vector2(507,-182),
    new THREE.Vector2(483,-182),
    new THREE.Vector2(483,-162),
    new THREE.Vector2(387,-162),
    new THREE.Vector2(387,-182),
    new THREE.Vector2(363,-182),
    new THREE.Vector2(363,-162),
    new THREE.Vector2(218,-162),
    new THREE.Vector2(218,0),
    new THREE.Vector2(220,0),
    new THREE.Vector2(220,-160),
    new THREE.Vector2(365,-160),
    new THREE.Vector2(365,-180),
    new THREE.Vector2(385,-180),
    new THREE.Vector2(385,-160),
    new THREE.Vector2(485,-160),
    new THREE.Vector2(485,-180),
    new THREE.Vector2(505,-180),
    new THREE.Vector2(505,-160),
    new THREE.Vector2(650,-160),
    new THREE.Vector2(650,0),
    new THREE.Vector2(218,0),

  ]);
  var wallShape_B_3= new THREE.Shape([
    new THREE.Vector2(708,0),
    new THREE.Vector2(708,2),
    new THREE.Vector2(812,2),
    new THREE.Vector2(812,-182),
    new THREE.Vector2(708,-182),
    new THREE.Vector2(708,-113),
    new THREE.Vector2(733,-113),
    new THREE.Vector2(733,-92),
    new THREE.Vector2(708,-92),
    new THREE.Vector2(708,0),
    new THREE.Vector2(710,0),
    new THREE.Vector2(710,-90),
    new THREE.Vector2(735,-90),
    new THREE.Vector2(735,-115),
    new THREE.Vector2(710,-115),
    new THREE.Vector2(710,-180),
    new THREE.Vector2(810,-180),
    new THREE.Vector2(810,0),
    new THREE.Vector2(708,0),

  ]);
  var wallShape_B_4= new THREE.Shape([
    new THREE.Vector2(160,-92),
    new THREE.Vector2(162,-92),
    new THREE.Vector2(162,-113),
    new THREE.Vector2(160,-113),
    new THREE.Vector2(160,-92),
  ]);
  var wallShape_B_5= new THREE.Shape([
    new THREE.Vector2(162,-28),
    new THREE.Vector2(218,-28),
    new THREE.Vector2(218,-30),
    new THREE.Vector2(162,-30),
    new THREE.Vector2(162,-28),
  ]);
  

  createExtrudeGeometry(floorShape, Floor_thickness, color_1, opacity_1, 'floor_B', group_B, 0);
 
  createExtrudeGeometry(wallShape_B_1, Floor_height + Floor_thickness, color_2, opacity_2, 'Fence_1', group_B, 0);
  createExtrudeGeometry(wallShape_B_2, Floor_height + Floor_thickness, color_2, opacity_2, 'Fence_2', group_B, 0);
  createExtrudeGeometry(wallShape_B_3, Floor_height + Floor_thickness, color_2, opacity_2, 'Fence_3', group_B, 0);
  var wall_1 = createExtrudeGeometry(wallShape_B_4, Floor_height + Floor_thickness, color_2, opacity_2, 'Fence_4_1', group_B, 0);
  var wall_2 = wall_1.clone();
  wall_2.name = 'Fence_4_2_'+group_B.name
  wall_2.position.x = 548
  group_B.add(wall_2)

  var wall_3 = createExtrudeGeometry(wallShape_B_5, 35 + Floor_thickness, color_2, opacity_2, 'Fence_5_1', group_B, 0);
  var wall_4 = wall_3.clone();
  wall_4.position.z = 37
  var wall_5 = wall_3.clone();
  wall_5.position.x = 490
  wall_5.position.z = -20
  var wall_6 = wall_3.clone();
  wall_6.position.x = 490
  wall_6.position.z = 37

  var wall_7 = createExtrudeGeometry(wallShape_B_5, 15 + Floor_thickness, color_2, opacity_2, 'Fence_5_1', group_B, 0);
  wall_7.position.z = 132
  var wall_8 = wall_7.clone();
  wall_8.position.x = 490
  group_B.add(wall_4,wall_5,wall_6,wall_8)
  
  let Wall_Z_Position = [
    [35,0,20],  
    [63,0,20], 

    [115,-67,48], 
   
    [340,0,65],
    [410,0,65],
    [460,0,65],
    [490,0,65],
    [520,0,65],
    [580,0,65],
    [610,0,65],

    [265,-90,70],
    [300,-90,70],
    [340,-90,70],
    [385,-90,70],
    [445,-90,70],
    [483,-90,70],
    [520,-90,70],
    [550,-90,70],
    [585,-90,70],
    [620,-90,70],

    [733,0,65],
    [768,0,65],
    [753,-67,48],
    [735,-115,65],    
  ];

  let Wall_X_Position = [
    [65,-65,95],   
    [65,-113,70],   

    [220,-65,192], 
    [460,-65,190],

    [220,-90,430],
    
    [710,-65,100],  
    [735,-113,75],  

  ];

  //通过顶点数组创建墙壁
  creatWall_Z(Wall_Z_Position,group_B);
  creatWall_X(Wall_X_Position, group_B);

}

function creatGroup_C(group_C){
  
  //楼层地板
  var floorShape = new THREE.Shape([
    new THREE.Vector2(220,0),
    new THREE.Vector2(650,0),
    new THREE.Vector2(650,-160),
    new THREE.Vector2(505,-160),
    new THREE.Vector2(505,-180),
    new THREE.Vector2(485,-180),
    new THREE.Vector2(485,-160),
    new THREE.Vector2(385,-160),
    new THREE.Vector2(385,-180),
    new THREE.Vector2(365,-180),
    new THREE.Vector2(365,-160),
    new THREE.Vector2(220,-160),
    new THREE.Vector2(220,0),
  ]);

  var wallShape_C =  new THREE.Shape([
    new THREE.Vector2(218,0),
    new THREE.Vector2(218,2),
    new THREE.Vector2(652,2),
    new THREE.Vector2(652,-162),
    new THREE.Vector2(507,-162),
    new THREE.Vector2(507,-182),
    new THREE.Vector2(483,-182),
    new THREE.Vector2(483,-162),
    new THREE.Vector2(387,-162),
    new THREE.Vector2(387,-182),
    new THREE.Vector2(363,-182),
    new THREE.Vector2(363,-162),
    new THREE.Vector2(218,-162),
    new THREE.Vector2(218,0),
    new THREE.Vector2(220,0),
    new THREE.Vector2(220,-160),
    new THREE.Vector2(365,-160),
    new THREE.Vector2(365,-180),
    new THREE.Vector2(385,-180),
    new THREE.Vector2(385,-160),
    new THREE.Vector2(485,-160),
    new THREE.Vector2(485,-180),
    new THREE.Vector2(505,-180),
    new THREE.Vector2(505,-160),
    new THREE.Vector2(650,-160),
    new THREE.Vector2(650,0),
    new THREE.Vector2(218,0),

  ]);


  createExtrudeGeometry(floorShape, Floor_thickness, color_1, opacity_1, 'floor', group_C, 0);
  createExtrudeGeometry(wallShape_C, Floor_height + Floor_thickness, color_2, opacity_2, 'fence', group_C, 0);

  let Wall_Z_Position = [

    [310,0,90],
    [350,0,65],
    [410,0,65],
    [460,0,65],
    [520,0,65],
    [560,0,90],

    [350,-90,70],
    [385,-90,70],
    [435,-90,70],
    [483,-90,70],
    [515,-90,70],


  ];

  let Wall_X_Position = [

    [310,-65,102], 
    [460,-65,100],
    [220,-90,430],

  ];

  //通过顶点数组创建墙壁
  creatWall_Z(Wall_Z_Position,group_C);
  creatWall_X(Wall_X_Position, group_C);
}

//屋顶+柱子+楼梯
function creatGroup_D(group_D){

  //左屋顶
  var floorShape_D_1 = new THREE.Shape([
    new THREE.Vector2(-2,2),
    new THREE.Vector2(61,2),
    new THREE.Vector2(61,4),
    new THREE.Vector2(164,4),
    new THREE.Vector2(164,-184),
    new THREE.Vector2(61,-184),
    new THREE.Vector2(61,-22),
    new THREE.Vector2(37,-22),
    new THREE.Vector2(37,-72),
    new THREE.Vector2(-2,-72),
    new THREE.Vector2(-2,2),
  ]);
  createExtrudeGeometry(floorShape_D_1, Floor_thickness, color_2, opacity_2, 'floor_1', group_D, 2*(Floor_thickness+Floor_height));


  //二层走廊的顶
  var floorShape_D_3 = new THREE.Shape([
    new THREE.Vector2(162,-28),
    new THREE.Vector2(218,-28),
    new THREE.Vector2(218,-84),
    new THREE.Vector2(162,-84),
    new THREE.Vector2(162,-28),
  ]);
  
  createExtrudeGeometry(floorShape_D_3, Floor_thickness, color_2, opacity_2, 'floor_3', group_D, 1*(Floor_thickness+Floor_height)+37);

  var traMaterial = new THREE.MeshLambertMaterial({color: color_2, transparent:true, opacity:opacity_2, side: THREE.DoubleSide });
  //-三角顶
  var traShape_1 = new THREE.Shape()
    traShape_1.moveTo(0,0)
    traShape_1.lineTo(103,0)
    traShape_1.lineTo(51.5,20)

  var traShape_1_Geometry = new THREE.ExtrudeGeometry( traShape_1, {depth: 188, bevelEnabled: false} );
  var start = new THREE.Mesh(traShape_1_Geometry, traMaterial);
  start.name = 'traEave_1_'+group_D.name
  start.position.x = 61
  start.position.z = -4
  start.position.y = 2*(Floor_thickness+Floor_height)+2
  group_D.add(start);

  //-边缘
  var wallShape_D_1 = new THREE.Shape([
    new THREE.Vector2(-2,0),
    new THREE.Vector2(-2,2),
    new THREE.Vector2(37,2),
    new THREE.Vector2(37,-72),
    new THREE.Vector2(-2,-72),
    new THREE.Vector2(-2,0),
    new THREE.Vector2(0,0),
    new THREE.Vector2(0,-70),
    new THREE.Vector2(35,-70),
    new THREE.Vector2(35,0),
    new THREE.Vector2(-2,0),
  ]);
  createExtrudeGeometry(wallShape_D_1, 10, color_2, opacity_2, 'Fence_1', group_D, 2*(Floor_thickness+Floor_height)+2);


  //中间屋顶

  //-底板
  var floorShape_D_2 = new THREE.Shape([
    new THREE.Vector2(210,0),
    new THREE.Vector2(210,10),
    new THREE.Vector2(660,10),
    new THREE.Vector2(660,-170),
    new THREE.Vector2(515,-170),
    new THREE.Vector2(515,-190),
    new THREE.Vector2(355,-190),
    new THREE.Vector2(355,-170),
    new THREE.Vector2(210,-170),
    new THREE.Vector2(210,0),
  ]);
  
  createExtrudeGeometry(floorShape_D_2, 5, color_2, opacity_2, 'floor_2', group_D, 3*(Floor_thickness+Floor_height));

  //-边缘
  var wallShape_D_3 = new THREE.Shape([
    new THREE.Vector2(210,5),
    new THREE.Vector2(210,10),
    new THREE.Vector2(660,10),
    new THREE.Vector2(660,-170),
    new THREE.Vector2(515,-170),
    new THREE.Vector2(515,-190),
    new THREE.Vector2(355,-190),
    new THREE.Vector2(355,-170),
    new THREE.Vector2(210,-170),
    new THREE.Vector2(210,5),
    new THREE.Vector2(215,5),
    new THREE.Vector2(215,-165),
    new THREE.Vector2(360,-165),
    new THREE.Vector2(360,-185),
    new THREE.Vector2(510,-185),
    new THREE.Vector2(510,-165),
    new THREE.Vector2(655,-165),
    new THREE.Vector2(655,5),
    new THREE.Vector2(210,5),

  ]);
  createExtrudeGeometry(wallShape_D_3, 10, color_2, opacity_2, 'Fence_2', group_D, 3*(Floor_thickness+Floor_height)+5);

  var wallShape_D_4 = new THREE.Shape([
    new THREE.Vector2(360,3),
    new THREE.Vector2(360,5),
    new THREE.Vector2(510,5),
    new THREE.Vector2(510,-185),
    new THREE.Vector2(360,-185),
    new THREE.Vector2(360,3),
    new THREE.Vector2(362,3),
    new THREE.Vector2(362,-185),
    new THREE.Vector2(508,-185),
    new THREE.Vector2(508,3),
    new THREE.Vector2(360,3),
  ]);
  createExtrudeGeometry(wallShape_D_4, 12, color_2, opacity_2, 'Fence_3', group_D, 3*(Floor_thickness+Floor_height)+5);

  //-三角顶
  var traShape_2 = new THREE.Shape()
    traShape_2.moveTo(0,0)
    traShape_2.lineTo(146,0)
    traShape_2.lineTo(73,37)

  var traShape_2_Geometry = new THREE.ExtrudeGeometry( traShape_2, {depth: 186, bevelEnabled: false} );
  var start_2 = new THREE.Mesh(traShape_2_Geometry, traMaterial);
  start_2.name = 'traEave_2_'+group_D.name
  start_2.position.x = 362
  start_2.position.z = -2
  start_2.position.y = 3*(Floor_thickness+Floor_height)+17
  group_D.add(start_2);


  //右屋顶
  //-三角顶
  var traShape_3 = new THREE.Shape()
  traShape_3.moveTo(0,0)
  traShape_3.lineTo(196,0)
  traShape_3.lineTo(196,2)
  traShape_3.lineTo(88,20)
  traShape_3.lineTo(0,2)

  var traShape_3_Geometry = new THREE.ExtrudeGeometry( traShape_3, {depth: 116, bevelEnabled: false} );
  var start_3 = new THREE.Mesh(traShape_3_Geometry, traMaterial);
  start_3.name = 'traEave_3_'+group_D.name
  start_3.rotation.y = - Math.PI / 2;
  start_3.position.x = 818
  start_3.position.z = -8
  start_3.position.y = 2*(Floor_thickness+Floor_height)
  group_D.add(start_3);

  var floorShape_D_4 = new THREE.Shape([
    new THREE.Vector2(652,-8),
    new THREE.Vector2(708,-8),
    new THREE.Vector2(708,-85),
    new THREE.Vector2(652,-85),
    new THREE.Vector2(652,-8),
  ]);
  
  createExtrudeGeometry(floorShape_D_4, Floor_thickness, color_2, opacity_2, 'floor_4', group_D, 1*(Floor_thickness+Floor_height)+37);

  //6根长柱子-cube
  const pillar_data = [
    [390,179],
    [420,179],
    [450,179],
    [480,179],
    [390,168],
    [420,168],
    [450,168],
    [480,168],
  ]
  pillar_data.forEach(function(item,index){
    const geometry = new THREE.BoxGeometry(6,102,6);
    const material = new THREE.MeshLambertMaterial({color: color_2, transparent:true, opacity: opacity_2, side: THREE.DoubleSide});
    const cube = new THREE.Mesh( geometry, material );
    // cube.name = item[2]; 
    group_D.add( cube );
    cube.position.x = item[0];
    cube.position.z = item[1];
    cube.position.y = Floor_height+Floor_thickness+53
  })

  //3块小挡板
  const dangban_data = [
    [405,181],
    [435,181],
    [465,181],
  ]
  dangban_data.forEach(function(item,index){
    const geometry = new THREE.BoxGeometry(24,13,2);
    const material = new THREE.MeshLambertMaterial({color: color_2, transparent:true, opacity: opacity_2, side: THREE.DoubleSide});
    const cube = new THREE.Mesh( geometry, material );
    // cube.name = item[2]; 
    group_D.add( cube );
    cube.position.x = item[0];
    cube.position.z = item[1];
    cube.position.y = Floor_height+Floor_thickness+7.5
  })

  creatStairs()

}

//创建与Z轴平行的墙面
function creatWall_Z(array, group){
  for(let i = 0; i < array.length; i++){
    const newWallShape = new THREE.Shape();
    newWallShape.moveTo(array[i][0], array[i][1]);
    newWallShape.lineTo(array[i][0] + Wall_thickness, array[i][1]);
    newWallShape.lineTo(array[i][0] + Wall_thickness, array[i][1]-array[i][2]);
    newWallShape.lineTo(array[i][0], array[i][1]-array[i][2]);

    if(group.name == 'floorGroup(A)'){
      createExtrudeGeometry(newWallShape, Floor_height, color_1, opacity_1, 'Wall_Z:'+ (i+1), group, Floor_thickness);
    }
    else{
      createExtrudeGeometry(newWallShape, Floor_height, color_1, opacity_1, 'Wall_Z:'+ (i+1), group, Floor_thickness);
    }

 }
}

//创建与X轴平行的墙面
function creatWall_X(array, group){
  for(let i = 0; i < array.length; i++){
    const newWallShape = new THREE.Shape();
    newWallShape.moveTo(array[i][0], array[i][1]);
    newWallShape.lineTo(array[i][0] + array[i][2], array[i][1]);
    newWallShape.lineTo(array[i][0] + array[i][2], array[i][1] - Wall_thickness);
    newWallShape.lineTo(array[i][0], array[i][1] - Wall_thickness);

    if(group.name == 'floorGroup(A)'){
      createExtrudeGeometry(newWallShape, Floor_height, color_1, opacity_1, 'Wall_X:'+ (i+1), group, Floor_thickness);
    }
    else{
      createExtrudeGeometry(newWallShape, Floor_height, color_1, opacity_1, 'Wall_X:'+ (i+1), group, Floor_thickness);
    }
  }
}

function createExtrudeGeometry(shape, Depth, Color, Opacity, Name, Group, Position_Y){
  var geometry = new THREE.ExtrudeGeometry( shape, {depth: Depth, bevelEnabled: false} );
  var material = new THREE.MeshBasicMaterial({color: Color, transparent:true, opacity:Opacity, side: THREE.DoubleSide});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.name = Name + '_' + Group.name;
  mesh.rotation.x = -Math.PI/2;
  mesh.position.y = Position_Y;
  mesh.castShadow = true;
  Group.add(mesh);
  return mesh;
}

function creatArches(group){

  //大拱门左边圆的曲线
  const curve_1 = new THREE.EllipseCurve(
      18,  20,            // ax, aY
      10, 10,           // xRadius, yRadius
      0,  1 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
  );
  const points_1 = curve_1.getPoints( 30 );

  //大拱门中间圆的曲线
  const curve_2 = new THREE.EllipseCurve(
      48,  20,            // ax, aY
      10, 10,           // xRadius, yRadius
      0,  1 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
  );
  const points_2 = curve_2.getPoints( 30 );

  //大拱门右边圆的曲线
  const curve_3 = new THREE.EllipseCurve(
      78,  20,            // ax, aY
      10, 10,           // xRadius, yRadius
      0,  1 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
  );
  const points_3 = curve_3.getPoints( 30 );

  //小拱门的曲线
  const curve_4 = new THREE.EllipseCurve(
      28,  20,            // ax, aY
      18, 10,           // xRadius, yRadius
      0,  1 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
  );
  const points_4 = curve_4.getPoints( 30 );


  //大拱门描点
  var startShape = new THREE.Shape()
  startShape.moveTo(0,54)
  startShape.lineTo(96,54)
  startShape.lineTo(96,0)
  startShape.lineTo(88,0)

  points_3.forEach(function(item){
      startShape.lineTo(item.x,item.y)
  });

  startShape.lineTo(68,0)
  startShape.lineTo(58,0)

  points_2.forEach(function(item){
      startShape.lineTo(item.x,item.y)
  });

  startShape.lineTo(38,0)
  startShape.lineTo(28,0)

  points_1.forEach(function(item){
      startShape.lineTo(item.x,item.y)
  });

  startShape.lineTo(8,0)
  startShape.lineTo(0,0)
  startShape.lineTo(0,54)


  var startGeometry = new THREE.ExtrudeGeometry( startShape, {depth: 2, bevelEnabled: false} );
  var startMaterial = new THREE.MeshLambertMaterial({color: color_2, transparent:true, opacity:opacity_2, side: THREE.DoubleSide });
  var start = new THREE.Mesh(startGeometry, startMaterial);
  start.name = 'big_Arches_'+group.name
  start.position.x = 387
  start.position.z = 180
  group.add(start);


  //小拱门描点
  var startShape_1 = new THREE.Shape()
  startShape_1.moveTo(0,52)
  startShape_1.lineTo(56,52)
  startShape_1.lineTo(56,0)
  startShape_1.lineTo(46,0)

  points_4.forEach(function(item){
      startShape_1.lineTo(item.x,item.y)
  });

  startShape_1.lineTo(10,0)
  startShape_1.lineTo(0,0)

  var startGeometry_1 = new THREE.ExtrudeGeometry( startShape_1, {depth: 2, bevelEnabled: false} );
  var startMaterial_1 = new THREE.MeshLambertMaterial({color: color_2, transparent:true, opacity:opacity_2, side: THREE.DoubleSide });
  var start_1 = new THREE.Mesh(startGeometry_1, startMaterial_1);
  start_1.position.x = 162
  start_1.position.z = 28
  start_1.name = 'small_Arches_1_'+group.name
  var start_2 = start_1.clone();
  start_2.position.x = 652
  start_2.position.z = 8
  start_2.name = 'small_Arches_2_'+group.name
  var start_3 = start_1.clone();
  start_3.position.x = 162
  start_3.position.z = 160
  start_3.name = 'small_Arches_3_'+group.name
  var start_4 = start_1.clone();
  start_4.position.x = 652
  start_4.position.z = 160
  start_4.name = 'small_Arches_4_'+group.name
  
  group.add(start_1);
  group.add(start_2);
  group.add(start_3);
  group.add(start_4);
}

function creatStairs(){

  //台阶
  for(let i = 0; i < 11; i++){

    const newWallShape = new THREE.Shape();
    newWallShape.moveTo(380 + i*3, 32);
    newWallShape.lineTo(490 - i*3, 32);
    newWallShape.lineTo(490 - i*3, 2);
    newWallShape.lineTo(380 + i*3, 2);
    createExtrudeGeometry(newWallShape, 3, color_2, opacity_2, 'stair_:'+ (i+1), group_D, i*3);
    
    if(i == 10){
      createExtrudeGeometry(newWallShape, 3, color_2, opacity_2, 'stair_:'+ (i+1)+'_1', group_D, i*3+30);
    }
    else if(i == 9){
      createExtrudeGeometry(newWallShape, 3, color_2, opacity_2, 'stair_:'+ (i+1)+'_1', group_D, i*3+36);
    }
 }

 //4根柱子
 const pillar_data = [
    [411.5,-3.5],
    [458.5,-3.5],
    [458.5,-30.5],
    [411.5,-30.5],
  ]
  pillar_data.forEach(function(item,index){
    const geometry = new THREE.BoxGeometry(3,27,3);
    const material = new THREE.MeshLambertMaterial({color: color_2, transparent:true, opacity: opacity_2, side: THREE.DoubleSide});
    const cube = new THREE.Mesh( geometry, material );
    // cube.name = item[2]; 
    group_D.add( cube );
    cube.position.x = item[0];
    cube.position.z = item[1];
    cube.position.y = 46.5
  })


  var traMaterial = new THREE.MeshLambertMaterial({color: color_2, transparent:true, opacity:opacity_2, side: THREE.DoubleSide });
  //梯形板
  var traShape_1 = new THREE.Shape()
    traShape_1.moveTo(0,0)
    traShape_1.lineTo(110,0)
    traShape_1.lineTo(110,12)
    traShape_1.lineTo(80,42)
    traShape_1.lineTo(30,42)
    traShape_1.lineTo(0,12)

  var traShape_1_Geometry = new THREE.ExtrudeGeometry( traShape_1, {depth: 3, bevelEnabled: false} );
  var start = new THREE.Mesh(traShape_1_Geometry, traMaterial);
  start.name = 'tixing_'+group_D.name
  start.position.x = 380
  start.position.z = -32
  group_D.add(start);

}

function creatCube(){

  var a = cube_side;

  const cube_floor_1 = [
    [20,35,'138'],
    [103,35,'135'],
    [103,120,'115'],
    [148,150,'115-1'],
    [240,15,'130'],

    [300,30,'126-128'],
    [380,30,'122-124'],
    [475,30,'116'],
    [505,30,'114'],
    [570,30,'110-112'],
    [760,30,'104'],

    [280,125,'111-112'],
    [365,125,'109'],
    [500,125,'107'],
    [550,125,'105'],
    [620,125,'103'],

    [760,30,'104'],
    [770,90,'102'],
    [750,150,'101'],
    [800,150,'101-1'],
  ]

  cube_floor_1.forEach(function(item,index){

    const geometry = new THREE.BoxGeometry(a,a,a);
    const material = new THREE.MeshBasicMaterial( {color: 0xff2222} );
    const cube = new THREE.Mesh( geometry, material );
    cube.name = item[2]; 
    group_A.add( cube );
    cube.position.x = item[0];
    cube.position.z = item[1];
    cube.position.y = 10/2+2;
    cube.layers.set(1);

  })

  const cube_floor_2 = [
    [20,35,'232'],
    [113,35,'230'],
    [93,90,'221-1'],
    [113,150,'221'],
    
    [190,45,'226-228'],

    [290,30,'220-224'],
    [380,30,'216-218'],
    [475,30,'214'],
    [505,30,'212'],
    [550,30,'210'],
    [595,30,'208-2'],
    [630,30,'208-1'],

    [720,30,'202-2'],
    [750,30,'202'],
    [790,30,'202-1'],

    [245,125,'217'],
    [285,125,'215'],
    [325,125,'213'],
    [370,125,'221'],
    [415,125,'209-1'],
    [465,125,'209'],
    [505,125,'207'],
    [535,125,'205-2'],
    [570,125,'205-1'],
    [605,125,'203-3'],
    [640,125,'203-1'],

    [780,90,'201-2'],
    [725,150,'201-1'],
    [770,150,'201'],

  ]

  cube_floor_2.forEach(function(item,index){

    const geometry = new THREE.BoxGeometry(a,a,a);
    const material = new THREE.MeshBasicMaterial( {color: 0xff2222} );
    const cube = new THREE.Mesh( geometry, material );
    cube.name = item[2]; 
    group_B.add( cube );
    cube.position.x = item[0];
    cube.position.z = item[1];
    cube.position.y = 10/2+2;
    cube.layers.set(1);
  })

  const cube_floor_3 = [
    [270,50,'314'],

    [330,30,'312'],
    [380,30,'310'],
    [495,30,'306-308'],
    [540,30,'304'],

    [610,50,'302'],

    [290,125,'311'],
    [370,125,'309'],
    [415,125,'307'],
    [460,125,'305'],
    [500,125,'303'],
    [580,125,'303'],

  ]

  cube_floor_3.forEach(function(item,index){

    const geometry = new THREE.BoxGeometry(a,a,a);
    const material = new THREE.MeshBasicMaterial( {color: 0xff2222} );
    const cube = new THREE.Mesh( geometry, material );
    cube.name = item[2]; 
    group_C.add( cube );
    cube.position.x = item[0];
    cube.position.z = item[1];
    cube.position.y = 10/2+2;
    cube.layers.set(1);
  })

  //加载右边的box(单层显示)
  async function newbox(){
    const Data = await fetch('https://lab.huaxuejia.org/api/unity/out_stats');
    const data = await Data.json();
    return data;
  }

  //房间地址
  async function Address(){
    const Data = await fetch('https://lab.huaxuejia.org/api/unity/address');
    const data = await Data.json();
    return data;
  }


  Address().then(add => {

    var add_array = [];

    add.data.forEach(function(item){
      if(item.building.id == '2'){
        add_array.push(item.id)
      }
    })

    console.log(add_array)

    newbox().then(data => {

      var array = [];
  
      Object.entries(data).forEach(([key, value]) => {
        
        const k = parseInt(key)

        if( add_array.includes(k)){
          
          // console.log(k+'_'+add_array.includes(k))
          
          array[0] =  value.title;
          array[1] = '('+ value.rows.length + ')件';

          console.log(k,array)
  
          switch(array[0][0]){
            case '1': //第一层
              cube_display(1,array);
              break;
            case '2':
              cube_display(2,array);
              break;
          }
  
          value.rows.forEach(function(item){
  
  
            // console.log(value.title)
  
            let li = document.createElement('div');
            let title = document.createElement('h4');
            let info = document.createElement('div');
            let bar_container = document.createElement('div');
            let bar = document.createElement('div');
  
            const perc = ((item.out_quantity - item.used_quantity) / item.out_quantity * 100).toFixed(0) + '%';
            // console.log(`"${perc}"`)
  
            title.innerHTML = `${value.title}`;
            info.innerHTML = `${item.title} ${item.out_quantity}${item.measurement.unit} ${item.user}`
            bar.style.backgroundColor = "red"
            bar.style.height = "3px"
            bar.style.width = `${perc}`
  
  
            bar_container.appendChild(bar);
            li.appendChild(title);
            li.appendChild(info);
            li.appendChild(bar_container);
        
            switch(value.title[0]){
              case '1':
  
                floorList_1.appendChild(li);
                Flo_1.appendChild(floorList_1);
                break;
  
              case '2':
  
                floorList_2.appendChild(li);
                Flo_2.appendChild(floorList_2);
                break;  

              case '3':
  
                floorList_3.appendChild(li);
                Flo_3.appendChild(floorList_3);
                break;  
            }
          })
        }
      });

      Object.entries(data).forEach(([key, value]) => {
        
        const k = parseInt(key)

        if( add_array.includes(k)){
          
          value.rows.forEach(function(item){
            // console.log(value.title)
  
            let li = document.createElement('div');
            let title = document.createElement('h4');
            let info = document.createElement('div');
            let bar_container = document.createElement('div');
            let bar = document.createElement('div');
  
            const perc = ((item.out_quantity - item.used_quantity) / item.out_quantity * 100).toFixed(0) + '%';
            // console.log(`"${perc}"`)
  
            title.innerHTML = `${value.title}`;
            info.innerHTML = `${item.title} ${item.out_quantity}${item.measurement.unit} ${item.user}`
            bar.style.backgroundColor = "red"
            bar.style.height = "3px"
            bar.style.width = `${perc}`
  
  
            bar_container.appendChild(bar);
            li.appendChild(title);
            li.appendChild(info);
            li.appendChild(bar_container);
        
            switch(value.title[0]){
              case '1':
  
                floorList_1.appendChild(li);
                Flo_1.appendChild(floorList_1);
                break;
  
              case '2':
  
                floorList_2.appendChild(li);
                Flo_2.appendChild(floorList_2);
                break;  

              case '3':
  
                floorList_3.appendChild(li);
                Flo_3.appendChild(floorList_3);
                break;  
            }
          })
        }
      });

      //方块加载完毕，创建id为node_2的div
      const div = document.createElement('div')
      div.setAttribute("id", "node_2");
      document.getElementById("body").append(div); 
    })   
  }) 
  
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  // console.log('x:'+ mouse.x);
}

function onWindowResize() {

  if (flag == true) { //移动端
    if(Width < Height && window.innerWidth > window.innerHeight) { //竖转横
      camera.aspect = window.innerWidth / window.innerHeight; 
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    else if(Width > Height && window.innerWidth < window.innerHeight){ //横转竖
      camera.aspect = window.innerHeight / window.innerWidth; 
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerHeight, window.innerWidth );  
    }
  }
  else{ //pc端
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );  
  }
}

//双击-单层显示
function onDocumentDoubleClick( event ) {

  
  event.preventDefault();


  if ( floorChar != 'M' && floorChar != '0' ){

    scene.traverse(function(obj) {
      
      if (obj.type === "Group") {

        if(obj.name[obj.name.length-2] != floorChar) {

          obj.traverse(function(child){
            child.visible = false;
          });

        }
        else{ //显示的那一层
          obj.traverse(function(child){
            // console.log(child.name)
            if(child.name.substr(0,6) == 'sprite') child.layers.set(0); //将指定层的标签显示出来
          });
        }


      };
    });

    container.removeEventListener( 'dblclick', onDocumentDoubleClick, false );
  }
  
  updateBox(floorChar);

}

function clickReset( event ) {

  event.preventDefault();
  scene.traverse(function(obj) {
      
    if (obj.type === "Group") {
        obj.traverse(function(child){
          
          child.visible = true; //显示全部模型
          if(child.name.substr(0,6) == 'sprite') child.layers.set(1); //隐藏全部标签

        });

        
      }
  });
  camera.position.set(300,140,600); 
  camera.lookAt(350,140,100);
  
  option_4.series.forEach(item => {

    switch(item.name){
      case '易制毒':
        item.data[0] = floorData[3][2];
        break;
      case '易制爆':
        item.data[1] = floorData[3][3];
        break;
      case '民爆':
        item.data[2] = floorData[3][1];
        break;
      case '剧毒':
        item.data[3] = floorData[3][0];
        break;
    }
  })
  
  option_4.title.text= '在外管控品数量(件)';
  option_4 && myChart_4.setOption(option_4);

  //隐藏表格
  for(let i=0; i< newbox.length; i++){
    newbox[i].style.display = "none";
  }

 //显示默认信息
  div_titlt_4.style.display = "block";
  div_wai.style.display = "block";

  container.addEventListener( 'dblclick', onDocumentDoubleClick, false );

}

function updateBox(char){

  const FloorChar = char;
  const floorNum = FloorChar.charCodeAt(0) - 64;

  option_4.series.forEach(item => {

    switch(item.name){
      case '易制毒':
        item.data[0] = floorData[floorNum-1][2];
        break;
      case '易制爆':
        item.data[1] = floorData[floorNum-1][3];
        break;
      case '民爆':
        item.data[2] = floorData[floorNum-1][1];
        break;
      case '剧毒':
        item.data[3] = floorData[floorNum-1][0];
        break;
    }
  })
  
  option_4.title.text='第' + floorNum + '层在外管控品数量(件)';
  option_4 && myChart_4.setOption(option_4);
  
 //隐藏默认的的表格
  div_titlt_4.style.display = "none";
  div_wai.style.display = "none";

  //显示单层的数据信息
  newbox[floorNum - 1].style.display = "block";

}

//鼠标点击的是哪一层
function whichFloor(){
  
  raycaster.setFromCamera( mouse, camera );

  var intersects_A = raycaster.intersectObjects(group_A.children); //找到与射线相交的对象
  var intersects_B = raycaster.intersectObjects(group_B.children);
  var intersects_C = raycaster.intersectObjects(group_C.children);
  
  var a = Number.MAX_SAFE_INTEGER;
  var b = Number.MAX_SAFE_INTEGER;
  var c = Number.MAX_SAFE_INTEGER;

  if(intersects_A.length > 0) a = intersects_A[0].distance;
  if(intersects_B.length > 0) b = intersects_B[0].distance;
  if(intersects_C.length > 0) c = intersects_C[0].distance;

  var array = [a,b,c];
  var min = Math.min(...array);
  
  if(min < Number.MAX_SAFE_INTEGER){
    var minIndex = array.indexOf(min);
    var char = String.fromCharCode(65 + minIndex);
    return char;
  }
  else return '0';
}

function display(text){


  scene.traverse(function(obj) {
      
    if (obj.type === "Group") {
      if(obj.name[obj.name.length-2] != text[7]) {
        obj.traverse(function(child){
          child.visible = false;
        });
      }
      else{ //因为指示牌默认不显示，这一步将指示牌显示出来
        obj.traverse(function(child){
          child.visible = true;
          if(child.name.substr(0,6) == 'sprite') child.layers.set(0); //将指定层的标签显示出来
        });
      }
    };
  });

  //隐藏表格
  for(let i=0; i< newbox.length; i++){
    newbox[i].style.display = "none";
  }

  updateBox(text[7]);

}

function makeTextSprite( message, parameters,cube){

  var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Courier New";
  var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 1;
  var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  var img = new Image();

  img.onload = function() {
    
    canvas.width = img.width * 1;
    canvas.height = img.height * 1;   

    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.font = "Bold " + "90" + "px " + fontface; //"Bold 88px Courier"
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";  
    context.fillText( message, canvas.width/7, canvas.height/3.5);
    texture.needsUpdate = true;      
  };
  
  img.src = './img/002.png';     

  var texture = new THREE.Texture( canvas );
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  var spriteMaterial = new THREE.SpriteMaterial( { map: texture,opacity:0.6} );
  var sprite = new THREE.Sprite( spriteMaterial );
  
  sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
  sprite.position.set( cube.position.x, cube.position.y + 50, cube.position.z);
  sprite.name = 'sprite_'+cube.name;
  sprite.layers.set(1);
  return sprite;  
}

function cube_display(num,item){

  var spriteCube;
  var sprite;
  var plane;

  switch(num){
    case 1:
      spriteCube = group_A.getObjectByName(item[0]);
      plane = createRipple(spriteCube);
      spriteCube.layers.set(0); //显示接口中的方块
      sprite = makeTextSprite( `${item[0]} ${item[1]}`, { fontsize: 120, textColor: {r:205, g:255, b:255, a:1.0}} ,spriteCube);
      group_A.add(plane,sprite);
      break;
    case 2:
      spriteCube = group_B.getObjectByName(item[0]);
      plane = createRipple(spriteCube);
      // plane.position.y = 3;
      spriteCube.layers.set(0); //显示接口中的方块
      sprite = makeTextSprite( `${item[0]} ${item[1]}`, { fontsize: 120, textColor: {r:205, g:255, b:255, a:1.0}} ,spriteCube);
      group_B.add(plane,sprite);
      break;
    case 3:
        spriteCube = group_C.getObjectByName(item[0]);
        plane = createRipple(spriteCube);
        // plane.position.y = 3;
        spriteCube.layers.set(0); //显示接口中的方块
        sprite = makeTextSprite( `${item[0]} ${item[1]}`, { fontsize: 120, textColor: {r:205, g:255, b:255, a:1.0}} ,spriteCube);
        group_C.add(plane,sprite);
        break;
  }
}

function createRipple(cube){

  const planeGeometry = new THREE.CircleGeometry( 20, 32 );
  var plane = new THREE.Mesh(planeGeometry, m);
  plane.rotateX(-Math.PI * .5);
  plane.position.x = cube.position.x;
  plane.position.z = cube.position.z;
  plane.position.y = 3;
  // console.log(plane.name);
  return plane;

}
