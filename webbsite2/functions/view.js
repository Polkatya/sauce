export async function onRequestGet(context) {

const {request}=context;

const url=new URL(request.url);
const q=url.searchParams;


const video=q.get("v") || "";
const thumb=q.get("i") || "";
const title=q.get("t") || "Видео";
const timer=Math.min(30,Math.max(3,Number(q.get("s") || 8)));


const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;"
}[c]));


const V=esc(video);
const I=esc(thumb);
const T=esc(title);



const html=`

<!doctype html>
<html>

<head>

<meta charset="utf-8">

<title>${T}</title>

<style>

body{
background:#111;
color:white;
font-family:Arial;
display:flex;
justify-content:center;
padding:20px;
}

.wrap{
display:flex;
gap:20px;
align-items:flex-start;
}

.side{
width:160px;
height:600px;
}

.card{
width:480px;
}

.thumb img{
width:100%;
border-radius:12px;
cursor:pointer;
}

.gate{
display:none;
}

.gate.active{
display:block;
}

.banner{
text-align:center;
margin:10px;
min-height:20px;
}

#timer{
font-size:30px;
text-align:center;
margin:20px;
}

video{
width:100%;
display:none;
}

</style>

</head>


<body>


<div class="wrap">


<div class="side" id="left"></div>


<div class="card">


<div id="preview" class="thumb">

<img src="${I}">

</div>


<div id="gate" class="gate">


<div id="top" class="banner"></div>


<div id="timer">
${timer}
</div>


<video id="video" controls src="${V}"></video>


</div>


</div>


<div class="side" id="right"></div>


</div>



<script>


const preview=document.getElementById("preview");

const gate=document.getElementById("gate");

const video=document.getElementById("video");



function banner(el,key,w,h){


let s1=document.createElement("script");

s1.textContent=
"atOptions={"+
"'key':'"+key+"',"+
"'format':'iframe',"+
"'height':"+h+","+
"'width':"+w+","+
"'params':{}"+
"};";


let s2=document.createElement("script");

s2.src=
"https://www.highperformanceformat.com/"+key+"/invoke.js";


el.appendChild(s1);

el.appendChild(s2);


}




preview.onclick=()=>{


preview.style.display="none";


gate.classList.add("active");



banner(
document.getElementById("top"),
"d23a1fd1e3611a7e483d6319d05ceda4",
300,
250
);



banner(
document.getElementById("left"),
"757bc3bbc1cd4205a78514cb1b4fa5e4",
160,
600
);



banner(
document.getElementById("right"),
"757bc3bbc1cd4205a78514cb1b4fa5e4",
160,
600
);



let n=${timer};



let x=setInterval(()=>{


n--;


document.getElementById("timer").innerHTML=n;



if(n<=0){


clearInterval(x);


document.getElementById("timer").style.display="none";


video.style.display="block";


video.play();


}


},1000);



};



</script>


</body>

</html>

`;


return new Response(html,{

headers:{

"content-type":"text/html;charset=UTF-8",

"cache-control":"no-cache"

}

});


}