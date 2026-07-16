export async function onRequestPost(context) {
  try {
    const incomingForm = await context.request.formData();
    const file = incomingForm.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'no file' }), { status: 400 });
    }

    const fd = new FormData();
    fd.append('file', file, file.name);

    const res = await fetch('https://0x0.st', {
      method: 'POST',
      body: fd,
      headers: { 'User-Agent': 'Mozilla/5.0 (Cloudflare Pages Function)' }
    });

    const text = (await res.text()).trim();

    if (!res.ok || !text.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'upload failed: ' + res.status + ' ' + text }), { status: 502 });
    }

    return new Response(JSON.stringify({ url: text }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
