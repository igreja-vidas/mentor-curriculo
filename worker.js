// =====================================================================
// MENTOR Currículo — Worker do Cloudflare (OPCIONAL)
// Serve para a chave da Anthropic ficar guardada no Cloudflare, e não no
// navegador. Variáveis a criar no Worker (Settings → Variables and Secrets):
//   ANTHROPIC_API_KEY  = sua chave sk-ant-...        (tipo Secret)
//   APP_TOKEN          = uma senha que você inventar (tipo Secret)
// No app: ⚙ Ajustes → "Usar um Worker" → cole o endereço e a mesma senha.
// =====================================================================
const ORIGENS = ["https://igreja-vidas.github.io"];

export default {
  async fetch(request, env) {
    const origem = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ORIGENS.includes(origem) ? origem : ORIGENS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, x-mentor-token",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Use POST", { status: 405, headers: cors });
    if (request.headers.get("x-mentor-token") !== env.APP_TOKEN) {
      return new Response(JSON.stringify({ error: { message: "Senha do Worker incorreta." } }), {
        status: 401, headers: { ...cors, "content-type": "application/json" },
      });
    }
    const resposta = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: await request.text(),
    });
    // Repassa a resposta em streaming (o texto vai chegando aos poucos)
    return new Response(resposta.body, {
      status: resposta.status,
      headers: { ...cors, "content-type": resposta.headers.get("content-type") || "text/event-stream" },
    });
  },
};
