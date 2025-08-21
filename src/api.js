export async function apiFetch(path, { method = "GET", headers = {}, body, token } = {}) {
  const url = path.startsWith("http") ? path : `https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net${path}`;
  const finalHeaders = { "Content-Type": "application/json", ...headers };
  if (token) {
    // token expected like "Bearer abc..." per backend response
    finalHeaders["Authorization"] = token.startsWith("Bearer") ? token : `Bearer ${token}`;
  }
  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}


