export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'No content provided' });
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
      console.error('LaTeX API error:', response.status, errorText);
      return res.status(500).json({ 
        error: `Compilation failed: ${response.status}. ${errorText.substring(0, 500)}`,
        success: false 
      });
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/pdf')) {
      const pdfBuffer = await response.arrayBuffer();
      const base64Pdf = Buffer.from(pdfBuffer).toString('base64');
      return res.status(200).json({ pdf: base64Pdf, success: true });
    } else {
      // API returned an error message instead of PDF
      const errorData = await response.text();
      let errorMessage = 'Compilation failed';
      
      try {
        const jsonError = JSON.parse(errorData);
        if (jsonError.logs) {
          // Extract error from logs
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
      
      return res.status(200).json({ 
        error: errorMessage,
        success: false 
      });
    }
  } catch (err) {
    console.error('Compile error:', err);
    return res.status(500).json({ error: err.message, success: false });
  }
}
