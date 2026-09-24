/**
 * Utility functions for exporting data to CSV and client-side image compression
 */

/**
 * Exports an array of objects to a CSV file and triggers download in browser
 * @param {string} filename - The base name of the downloaded file
 * @param {Array<Object>} rows - Array of row objects
 * @param {Object} [columnMapping] - Optional map of { dataKey: 'Display Header' }
 */
export const exportToCSV = (filename, rows, columnMapping = null) => {
  if (!rows || !rows.length) {
    alert('No data available to export.');
    return;
  }

  const keys = columnMapping ? Object.keys(columnMapping) : Object.keys(rows[0]);
  const headers = columnMapping ? Object.values(columnMapping) : keys;

  const separator = ',';
  const csvRows = [];

  // Header line
  csvRows.push(headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(separator));

  // Data lines
  rows.forEach(row => {
    const values = keys.map(k => {
      let val = row[k];
      if (val === null || val === undefined) {
        val = '';
      } else if (typeof val === 'object') {
        val = JSON.stringify(val);
      } else {
        val = String(val);
      }
      // Escape double quotes and enclose in quotes if needed
      val = val.replace(/"/g, '""');
      if (val.search(/("|,|\n|\r)/g) >= 0) {
        val = `"${val}"`;
      }
      return val;
    });
    csvRows.push(values.join(separator));
  });

  const csvString = csvRows.join('\r\n');
  // UTF-8 BOM so Excel opens Hindi / Gujarati / special characters properly
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('download', `${filename}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Compresses an image file client-side using HTML5 Canvas to a lightweight Web-ready JPEG Base64 data URL
 * @param {File} file - Browser File object from input[type="file"]
 * @param {number} maxWidth - Maximum width in pixels (default 1280)
 * @param {number} quality - JPEG compression quality 0.0 to 1.0 (default 0.82)
 * @returns {Promise<string>} Base64 data URL string
 */
export const compressImageFile = (file, maxWidth = 1280, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file (JPG, PNG, WebP)'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file from disk'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image data. Could not decode photo.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Fill white background for transparent PNGs
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
