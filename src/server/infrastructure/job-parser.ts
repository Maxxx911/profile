export async function parseJobUrl(url: string): Promise<{ title: string; company: string }> {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();

  const title =
    html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1] ??
    html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:title"/i)?.[1] ??
    html.match(/<title>([^<]+)<\/title>/i)?.[1] ??
    "Unknown";

  const company =
    html.match(/<meta[^>]+property="og:site_name"[^>]+content="([^"]+)"/i)?.[1] ??
    html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:site_name"/i)?.[1] ??
    "Unknown";

  return { title: title.trim(), company: company.trim() };
}
