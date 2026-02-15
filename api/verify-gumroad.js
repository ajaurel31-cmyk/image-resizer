export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { product_id, license_key } = req.body || {};

  if (!product_id || !license_key) {
    return res.status(400).json({ success: false, message: 'Missing product_id or license_key.' });
  }

  try {
    const body = new URLSearchParams({
      product_id,
      license_key,
      increment_uses_count: 'true',
    });

    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      body,
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ success: false, message: 'Unable to reach Gumroad.' });
  }
}
