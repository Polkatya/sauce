export async function onRequestGet(context) {

  const url = new URL(context.request.url);
  const q = url.searchParams;

  const video = q.get("v") || "";
  const thumb = q.get("i") || "";
  const title = q.get("t") || "Видео";
  const timer = Math.min(30, Math.max(3, Number(q.get("s") || 8)));

  const esc = (s)=>String(s).replace(/[&<>"']/g,c=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[c]));


  const V = esc(video);
  const I = esc(thumb);
  const T = esc(title);


  const html = `
<!doctype html>
<html>
<head>

<meta charset="utf-8">

<title>${T}</title>

<style>

body{
margin:0;
background:#111;
color:white;
font-family:Arial;
}

.wrap{
display:flex;
justify-content:center;
gap:20px;
padding:20px;
}

.side{
width:160px;
height:600px;
}

.card{
width:480px;
text-align:center;
}

img{
width:100%;
border-radius:12px;
cursor:pointer;
}

#gate{
display:none;
}

#timer{
font-size:40px;
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


<div id="preview">
<img src="${I}">
</div>


<div id="gate">

<div id="top"></div>

<div id="timer">${timer}</div>


<video id="video" controls src="${V}"></video>


</div>


</div>


<div class="side" id="right"></div>


</div>



<script>


function banner(el, key, w, h){

el.innerHTML="";

let s=document.createElement("script");

s.innerHTML=
"atOptions={"+
"'key':'"+key+"',"+
"'format':'iframe',"+
"'height':"+h+","+
"'width':"+w+","+
"'params':{}};";

el.appendChild(s);


let x=document.createElement("script");

x.src=
"https://www.highperformanceformat.com/"+key+"/invoke.js";

el.appendChild(x);

}



const preview=document.getElementById("preview");

const gate=document.getElementById("gate");

const video=document.getElementById("video");


preview.onclick=()=>{


preview.style.display="none";

gate.style.display="block";


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

video.style.display="block";

}


},1000);



};


</script>


</body>
</html>
`;


return new Response(html,{
headers:{
"content-type":"text/html;charset=utf-8",
"cache-control":"no-cache"
}
});


}