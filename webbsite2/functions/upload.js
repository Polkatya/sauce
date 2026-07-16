const PUBLIC_R2_URL = 'https://pub-a806ca017d9b4ec1998502d81a9a686c.r2.dev';

export async function onRequestPost(context) {
  try {
    const { env, request } = context;
    const incomingForm = await request.formData();
    const file = incomingForm.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'no file' }), { status: 400 });
    }

    const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
    const key = crypto.randomUUID() + '.' + ext;

    await env.VIDEOS.put(key, file.stream(), {
      httpMetadata: { contentType: file.type || 'application/octet-stream' }
    });

    const url = PUBLIC_R2_URL + '/' + key;

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
