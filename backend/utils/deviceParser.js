/**
 * Parse client user-agent and Vercel geo headers to accurately identify device, browser, and location.
 */
function parseDeviceDetails(req) {
  const ua = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';
  
  // Vercel Geo Headers
  const city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : '';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const country = req.headers['x-vercel-ip-country'] || '';
  let location = 'Ahmedabad, Gujarat, India';
  if (city || country) {
    location = [city, region, country === 'IN' ? 'India' : country].filter(Boolean).join(', ');
  }

  // OS detection
  let os = 'Unknown OS';
  if (/windows phone/i.test(ua)) os = 'Windows Phone';
  else if (/win/i.test(ua)) os = 'Windows PC';
  else if (/android/i.test(ua)) os = 'Android Device';
  else if (/iphone/i.test(ua)) os = 'iPhone';
  else if (/ipad/i.test(ua)) os = 'iPad';
  else if (/mac/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Browser detection
  let browser = 'Web Browser';
  if (/edg/i.test(ua)) browser = 'Microsoft Edge';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';
  else if (/chrome|crios/i.test(ua)) browser = 'Google Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Mozilla Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Apple Safari';
  else if (/wv|webview/i.test(ua)) browser = 'Android Webview App';

  // Device classification
  let device = 'Desktop PC';
  if (/mobile/i.test(ua) || /iphone/i.test(ua) || /android.*mobile/i.test(ua)) {
    device = `${os.includes('iPhone') ? 'iPhone' : os.includes('Android') ? 'Android Phone' : 'Mobile Smartphone'}`;
  } else if (/tablet|ipad/i.test(ua)) {
    device = 'Tablet Device';
  } else {
    device = `${os} (${browser})`;
  }

  return {
    device,
    browser,
    os,
    ip,
    location,
    userAgent: ua.slice(0, 200)
  };
}

module.exports = { parseDeviceDetails };
