// This will handle the API call to VPNAPI.io
exports.handler = async function (event, context) {
  // Use dynamic import to load node-fetch
  const fetch = (await import("node-fetch")).default;

  // Define your VPNAPI.io token (use environment variables to hide this)
  const vpnApiToken = process.env.VPN_API_TOKEN;

  const ip = event.queryStringParameters.ip; // Get the user IP from the query parameters
  const vpnApiUrl = `https://vpnapi.io/api/${ip}?key=${vpnApiToken}`;

  try {
    const response = await fetch(vpnApiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins (or specify your GitHub Pages domain)
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Ensure CORS headers are present for errors too
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Error fetching VPN data" }),
    };
  }
};
