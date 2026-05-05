export async function onRequestPost(context) {
  const { request } = context;

  // Define response headers clearly
  const jsonHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  try {
    const { content } = await request.json();
    if (!content) {
      return new Response(JSON.stringify({ error: 'No content provided', success: false }), {
        status: 400,
        headers: jsonHeaders
      });
    }

    // Use YtoTech LaTeX API
    const response = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'pdflatex',
        resources: [{ main: true, content: content }]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ 
        error: `LaTeX API error: ${response.status}. ${errorText.substring(0, 100)}`,
        success: false 
      }), {
        status: 500,
        headers: jsonHeaders
      });
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/pdf')) {
      const pdfBuffer = await response.arrayBuffer();
      const base64Pdf = Buffer.from(pdfBuffer).toString('base64');
      
      return new Response(JSON.stringify({ pdf: base64Pdf, success: true }), {
        status: 200,
        headers: jsonHeaders
      });
    } else {
      const errorData = await response.text();
      return new Response(JSON.stringify({ 
        error: `Unexpected response: ${errorData.substring(0, 100)}`, 
        success: false 
      }), {
        status: 200,
        headers: jsonHeaders
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, success: false }), {
      status: 500,
      headers: jsonHeaders
    });
  }
}
