import { createServerFn } from "@tanstack/react-start";

export const rankDesign = createServerFn({ method: "POST" })
  .validator((input: { summary: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available" };
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 280,
        messages: [
          {
            role: "system",
            content:
              "You are a computational protein-design critic. Rank the design using only the numeric report. Be terse. No wet-lab recipes, no CRISPR, no gene therapy.",
          },
          { role: "user", content: data.summary.slice(0, 4000) },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI ${res.status}` };
    const body = (await res.json()) as { choices: { message: { content: string } }[] };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
