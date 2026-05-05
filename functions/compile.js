export async function onRequestPost(context) {
  const { request } = context;

  // Set CORS headers
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    const { content } = await request.json();
    if (!content) {
      return new Response(JSON.stringify({ error: 'No content provided' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    // Use YtoTech LaTeX API - reliable and free
    const response = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        compiler: 'pdflatex',
        resources: [
          {
            main: true,
            content: content
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ 
        error: `Compilation failed: ${response.status}. ${errorText.substring(0, 500)}`,
        success: false 
      }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/pdf')) {
      const pdfBuffer = await response.arrayBuffer();
      
      // Manual loop conversion to avoid "Maximum call stack size exceeded" 
      // which happens with String.fromCharCode(...new Uint8Array(buffer)) on files > 64KB
      const bytes = new Uint8Array(pdfBuffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64Pdf = btoa(binary);
      
      return new Response(JSON.stringify({ pdf: base64Pdf, success: true }), {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    } else {
      const errorData = await response.text();
      let errorMessage = 'Compilation failed';
      
      try {
        const jsonError = JSON.parse(errorData);
        if (jsonError.logs) {
          const errorLines = jsonError.logs.split('\n').filter(line => 
            line.includes('Error') || line.includes('!') || line.includes('error')
          );
          errorMessage = errorLines.slice(0, 10).join('\n') || jsonError.logs.substring(0, 1000);
        } else if (jsonError.error) {
          errorMessage = jsonError.error;
        }
      } catch {
        errorMessage = errorData.substring(0, 1000);
      }
      
      return new Response(JSON.stringify({ 
        error: errorMessage, 
        success: false 
      }), {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, success: false }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}
