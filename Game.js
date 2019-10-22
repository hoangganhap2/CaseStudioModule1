let canvas=document.getElementById("myCanvas");
let context=canvas.getContext("2d");
let bong={x:270,y:300,ax:2,by:3,radius:8};
let thanhchan={width:75,height:10,x:250,y:canvas.height-10,speed:5,isMovingLeft:false,isMovingRight:false};
let gach={
    offsetX:28,
    offsetY:30,
    margin:15,
    width:50,
    height:15,
    line:3,
    col:7,
};

//danh sách gạch
let dsgach=[];
for(let i=0;i<gach.line;i++){
    for(let j=0;j<gach.col;j++){
        dsgach.push({
            x:gach.offsetX+j*(gach.width+gach.margin),
            y:gach.offsetY+i*(gach.height+gach.margin),
            isVo:false
        });
    }

}
let Thuacuoc=false;
let thangcuoc=false;
let maxdiem=gach.line*gach.col;
let tinhdiem=0;
// let mang=false;
let count=3;

//Sự kiện bàn phím
document.addEventListener("keyup",function (event) {
   if(event.keyCode==37){
       thanhchan.isMovingLeft=false;
    }else if(event.keyCode==39){
       thanhchan.isMovingRight=false;
   }
});

document.addEventListener("keydown", function (event) {
    if (event.keyCode==37){
        thanhchan.isMovingLeft=true;
    }else if(event.keyCode==39){
        thanhchan.isMovingRight=true;
    }
});


//Hàm tạo bóng
function taoBong() {
    context.beginPath();
    context.arc(bong.x,bong.y,bong.radius,0,2*Math.PI);
    context.strokeStyle="red";
    context.stroke();
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
}

//Hàm tạo thanh chắn
function taoThanhchan() {
    context.beginPath();
    context.rect(thanhchan.x,thanhchan.y,thanhchan.width,thanhchan.height);
    context.fillStyle="Purple";
    context.fill();
    context.closePath();
}

//công thức tính dài, rộng gach
//2*lề+5*rộng+4*khoảng cách=500
//Hàm tạo gạch
function taoGach() {
   dsgach.forEach(function (b) {
       if(!b.isVo) {
           context.beginPath();
           context.rect(b.x, b.y, gach.width, gach.height);
           context.fillStyle = "Blue";
           context.fill();
           context.closePath();
       }
    });
}
// Hàm xử lý bóng với đường biên
function bongvsbien() {
    if(bong.x<bong.radius || bong.x>canvas.width-15){
        bong.ax= -bong.ax;
    }
    if(bong.y<bong.radius ){
        bong.by= -bong.by;
    }

}

//Hàm bóng với thanh chắn
function thanhchanvsbong() {
    if(bong.x+(2*bong.radius)>=thanhchan.x&&bong.x+bong.radius<=thanhchan.x+thanhchan.width&&bong.y+bong.radius>=canvas.height-thanhchan.height){
        bong.by=-bong.by;
    }
}

//Hàm bóng với gach
function bongvsgach() {
    dsgach.forEach(function (b) {
        if(!b.isVo){
            if(bong.x+(2*bong.radius)>=b.x&&bong.x<=b.x+gach.width&&bong.y+bong.radius>=b.y&&bong.y-bong.radius<=b.y+gach.height){
                bong.by=-bong.by;
                // bong.ax=-bong.by;
                b.isVo=true;
                tinhdiem++;
                if(tinhdiem>=maxdiem){
                    Thuacuoc=true;
                    thangcuoc=true;
                }
            }
        }
    })
}
//Hàm cải thiện  tốc độ bóng rơi
function bongtocdo() {
    bong.x +=bong.ax;
    bong.y +=bong.by;
}

//Hàm cải thiện thanh chắn
function upthanhchan() {

    if (thanhchan.isMovingLeft) {
        thanhchan.x -= thanhchan.speed;
    } else if (thanhchan.isMovingRight) {
        thanhchan.x += thanhchan.speed;
    }
    if (thanhchan.x < 0) {
        thanhchan.x = 0;
    } else if (thanhchan.x > canvas.width - thanhchan.width) {
        thanhchan.x = canvas.width - thanhchan.width;
    }
}

//Hàm chech thua
function checkThua() {
    if( bong.y>canvas.height-15 ){
        bong={x:250,y:200,ax:2,by:3,radius:8};
      count --;

      if (count ===0){
          bong={x:250,y:200,ax:2,by:3,radius:8};
          Thuacuoc =true;
      }
    }
}


//Hàm tính điểm
function diem() {
    context.font="18 Arial";
    context.fillStyle="#0095dd";
    context.fillText("Điểm: "+tinhdiem,8,20);
}
//Số lần được chơi
function solanchoi() {
    context.font="18 Arial";
    context.fillStyle="#0095dd";
    context.fillText("Mạng: "+count,460,20);
}
//Hàm tổng xử lý

function all(){
    if(!Thuacuoc) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        taoBong();
        bongvsbien();
        bongtocdo();
        taoThanhchan();
        thanhchanvsbong();
        upthanhchan();
        checkThua();
        taoGach();
        bongvsgach();
        diem();
        solanchoi();
// Tạo chuyển động cho bóng
        requestAnimationFrame(all);
    }else if(thangcuoc){
        alert("Bạn đã thắng");
    }else {
        alert("Bạn đã thua");
    }
}
all();
