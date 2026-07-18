export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const q = url.searchParams;

  const video = q.get("v") || "";
  const thumb = q.get("i") || "";
  const title = q.get("t") || "Видео";
  const timer = Math.min(30, Math.max(3, Number(q.get("s") || 8)));

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, c => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"
    }[c]));

  const V = esc(video);
  const I = esc(thumb);
  const T = esc(title);

  const bannerTop = `
<script>
atOptions={
'key':'d23a1fd1e3611a7e483d6319d05ceda4',
'format':'iframe',
'height':250,
'width':300,
'params':{}
}
</script>
<script src="https://www.highperformanceformat.com/d23a1fd1e3611a7e483d6319d05ceda4/invoke.js"></script>
`;

  const bannerSide = `
<script>
atOptions={
'key':'757bc3bbc1cd4205a78514cb1b4fa5e4',
'format':'iframe',
'height':600,
'width':160,
'params':{}
}
</script>
<script src="https://www.highperformanceformat.com/757bc3bbc1cd4205a78514cb1b4fa5e4/invoke.js"></script>
`;

  const html = `
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
}

.side{
display:block;
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

<div class="gate" id="gate">

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

preview.onclick=()=>{

preview.style.display="none";

gate.classList.add("active");

document.getElementById("top").innerHTML=${JSON.stringify(bannerTop)};

document.getElementById("left").innerHTML=${JSON.stringify(bannerSide)};

document.getElementById("right").innerHTML=${JSON.stringify(bannerSide)};


let n=${timer};

let t=setInterval(()=>{

n--;

document.getElementById("timer").innerHTML=n;

if(n<=0){

clearInterval(t);

video.style.display="block";

}

},1000);


}

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