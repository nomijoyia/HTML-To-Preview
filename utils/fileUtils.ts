
const createAndDownloadFile = (filename: string, content: string | Blob, mimeType: string) => {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generateHtmlFile = (html: string, css: string, js: string) => {
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Project</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    ${js}
  <\/script>
</body>
</html>
  `;
  createAndDownloadFile('index.html', fullHtml, 'text/html');
};

export const generateZip = async (html: string, css: string, js: string) => {
    if (!window.JSZip) {
        alert('JSZip library not found. Please check your internet connection.');
        return;
    }
    const zip = new window.JSZip();

    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${html}
    <script src="script.js"><\/script>
</body>
</html>
    `;

    zip.file("index.html", fullHtml);
    zip.file("style.css", css);
    zip.file("script.js", js);

    try {
        const content = await zip.generateAsync({ type: "blob" });
        createAndDownloadFile('project.zip', content, 'application/zip');
    } catch (error) {
        console.error("Failed to generate ZIP file:", error);
        alert('Failed to generate ZIP file. See console for details.');
    }
};
