export async function onRequestPost(context) {
  try {
    const incomingForm = await context.request.formData();
    const file = incomingForm.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'no file' }), { status: 400 });
    }

    const fd = new FormData();
    fd.append('reqtype', 'fileupload');
    fd.append('fileToUpload', file, file.name);

    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: fd
    });

    const text = (await res.text()).trim();

    if (!res.ok || !text.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'upload failed: ' + text }), { status: 502 });
    }

    return new Response(JSON.stringify({ url: text }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
