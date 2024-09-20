const fetch = require("node-fetch");

// This will handle the API call to VPNAPI.io
exports.handler = async function (event, context) {
  // Define your VPNAPI.io token (use environment variables to hide this)
  const vpnApiToken = process.env.VPN_API_TOKEN;

  const ip = event.queryStringParameters.ip; // Get the user IP from the query parameters
  const vpnApiUrl = `https://vpnapi.io/api/${ip}?key=${vpnApiToken}`;

  try {
    const response = await fetch(vpnApiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching VPN data" }),
    };
  }
};
