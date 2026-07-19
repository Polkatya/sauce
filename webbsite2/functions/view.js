export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const q = url.searchParams;

  const video = q.get("v") || "";
  const thumb = q.get("i") || "";
  const title = q.get("t") || "Видео";
  const timer = Math.min(30, Math.max(3, parseInt(q.get("s") || "8", 10) || 8));

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  const V = esc(video), I = esc(thumb), T = esc(title);

  const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${T}</title>
<meta property="og:title" content="${T}">
<meta property="og:description" content="Нажмите, чтобы посмотреть видео">
<meta property="og:type" content="website">
<meta property="og:image" content="${I}">
<meta property="og:image:secure_url" content="${I}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${I}">
<meta name="theme-color" content="#0f0f0f">
<style>
*{box-sizing:border-box;margin:0;padding:0}body{background:#0f0f0f;color:#f2f2f2;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px}.card{width:100%;max-width:480px}.thumb{position:relative;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#1a1a1a;cursor:pointer}.thumb img{width:100%;height:100%;object-fit:cover;display:block}.play{position:absolute;inset:0;display:grid;place-items:center}.play span{width:64px;height:64px;border-radius:50%;background:#000a;display:grid;place-items:center;font-size:28px;padding-left:4px}.title{margin-top:12px;font-size:15px}.gate{display:none;background:#181818;border-radius:12px;overflow:hidden}.gate.active{display:block}.banner{background:#232323;min-height:60px;display:flex;align-items:center;justify-content:center;padding:10px}.body{padding:28px 20px;text-align:center}.timer{font-size:28px;margin-bottom:18px}.btn{width:100%;padding:13px;border:0;border-radius:8px;background:#2c2c2c;color:#777;font-size:15px}.video{display:none;width:100%;max-height:70vh;background:#000;border-radius:8px}.err{display:none;color:#ff8b8b;font-size:13px;margin-top:10px}
.side{display:none}
</style>
</head>
<body><div class="card">
<div id="preview"><div class="thumb" id="open"><img src="${I}" alt=""><div class="play"><span>▶</span></div></div><div class="title">${T}</div></div>
<div class="gate" id="gate">
<div class="banner">
<script>atOptions={'key':'d23a1fd1e3611a7e483d6319d05ceda4','format':'iframe','height':250,'width':300,'params':{}};<\/script>
<script src="https://www.highperformanceformat.com/d23a1fd1e3611a7e483d6319d05ceda4/invoke.js"><\/script>
</div>
<div class="body">
<div id="wait"><div class="timer" id="timer">${timer}</div><button class="btn" id="btn">Подождите...</button></div>
<video class="video" id="video" controls playsinline preload="metadata" src="${V}"></video>
<div class="err" id="err">Видео не загрузилось. Проверь прямую ссылку на MP4.</div>
</div>
<div class="banner">
<script async data-cfasync="false" src="https://pl30381760.effectivecpmnetwork.com/005a0b247c5edb84a57a6b92b4b26f1a/invoke.js"><\/script>
<div id="container-005a0b247c5edb84a57a6b92b4b26f1a"></div>
</div></div></div>

<script src="https://pl30435907.effectivecpmnetwork.com/60/92/d9/6092d99937a7b46f899dce14317d6b3a.js"><\/script>

<script>
const open=document.getElementById('open'),preview=document.getElementById('preview'),gate=document.getElementById('gate'),wait=document.getElementById('wait'),timerEl=document.getElementById('timer'),video=document.getElementById('video'),err=document.getElementById('err');
open.onclick=()=>{preview.style.display='none';gate.classList.add('active');let n=${timer};timerEl.textContent=n;const x=setInterval(()=>{n--;timerEl.textContent=n>0?n:'';if(n<=0){clearInterval(x);wait.style.display='none';video.style.display='block';video.load()}},1000)};
video.onerror=()=>{err.style.display='block'};
</script></body></html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60"
    }
  });
}
