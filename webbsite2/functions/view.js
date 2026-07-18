export async function onRequestGet(context) {

const {request}=context;
const url=new URL(request.url);
const q=url.searchParams;

const video=q.get("v")||"";
const thumb=q.get("i")||"";
const title=q.get("t")||"Видео";
const timer=Math.min(30,Math.max(3,Number(q.get("s")||8)));

const esc=s=>String(s).replace(/[&<>"']/g,c=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;"
}[c]));

const V=esc(video);
const I=esc(thumb);
const T=esc(title);


const topBanner=`
<script>
atOptions={
'key':'d23a1fd1e3611a7e483d6319d05ceda4',
'format':'iframe',
'height':250,
'width':300,
'params':{}
};
<\/script>
<script src="https://www.highperformanceformat.com/d23a1fd1e3611a7e483d6319d05ceda4/invoke.js"><\/script>
`;


const sideBanner=`
<script>
atOptions={
'key':'757bc3bbc1cd4205a78514cb1b4fa5e4',
'format':'iframe',
'height':600,
'width':160,
'params':{}
};
<\/script>
<script src="https://www.highperformanceformat.com/757bc3bbc1cd4205a78514cb1b4fa5e4/invoke.js"><\/script>
`;


const html=`<!doctype html>
<html>
<head>
<meta charset="utf-8">

<style>

body{
background:#111;
color:white;
font-family:Arial;
margin:0;
display:flex;
justify-content:center;
padding:20px;
}

.wrap{
display:flex;
gap:20px;
align-items:flex-start;
}

.side iframe{
width:160px;
height:600px;
border:0;
}

.center{
width:480px;
}

img{
width:100%;
border-radius:10px;
cursor:pointer;
}

#gate{
display:none;
}

#gate.active{
display:block;
}

.top iframe{
width:300px;
height:250px;
border:0;
}

video{
width:100%;
display:none;
}

</style>

</head>


<body>

<div class="wrap">


<div class="side">
<div id="left"></div>
</div>


<div class="center">

<div id="preview">
<img src="${I}">
</div>


<div id="gate">

<div class="top">
<div id="top"></div>
</div>


<h2 id="timer">${timer}</h2>


<video id="video" controls src="${V}"></video>


</div>

</div>


<div class="side">
<div id="right"></div>
</div>


</div>



<script>

const preview=document.getElementById("preview");
const gate=document.getElementById("gate");
const video=document.getElementById("video");


function banner(el,code,w,h){

let f=document.createElement("iframe");

f.style.width=w+"px";
f.style.height=h+"px";
f.style.border="0";

f.srcdoc=code;

el.appendChild(f);

}



preview.onclick=()=>{


preview.style.display="none";

gate.classList.add("active");


banner(
document.getElementById("top"),
${JSON.stringify(topBanner)},
300,
250
);


banner(
document.getElementById("left"),
${JSON.stringify(sideBanner)},
160,
600
);


banner(
document.getElementById("right"),
${JSON.stringify(sideBanner)},
160,
600
);



let n=${timer};


let x=setInterval(()=>{

n--;

document.getElementById("timer").innerHTML=n;


if(n<=0){

clearInterval(x);

video.style.display="block";

}

},1000);


};


</script>


</body>
</html>`;


return new Response(html,{
headers:{
"content-type":"text/html;charset=utf-8",
"cache-control":"no-cache"
}
});


}