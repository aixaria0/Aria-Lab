import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-vein-Cct2YUFc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var rankDesign_createServerFn_handler = createServerRpc({
	id: "ed4610d69a8fe72a1ab00314e730423dd1c154268156997fae070efbf0c31669",
	name: "rankDesign",
	filename: "src/lib/ask-vein.ts"
}, (opts) => rankDesign.__executeServer(opts));
var rankDesign = createServerFn({ method: "POST" }).validator((input) => input).handler(rankDesign_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available"
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 280,
			messages: [{
				role: "system",
				content: "You are a computational protein-design critic. Rank the design using only the numeric report. Be terse. No wet-lab recipes, no CRISPR, no gene therapy."
			}, {
				role: "user",
				content: data.summary.slice(0, 4e3)
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices[0]?.message.content ?? ""
	};
});
//#endregion
export { rankDesign_createServerFn_handler };
