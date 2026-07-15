import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The bundled skills live at the repo root /skills, two levels up from this
// plugin file — the publish workflow stages the skills there alongside
// .opencode/plugins/doc-holiday.js in the published package.
const skillsDir = path.resolve(__dirname, "../../skills")

/**
 * Mutate an OpenCode config object to wire up Doc Holiday: register the bundled
 * skills directory and the remote Doc Holiday MCP server (which hosts the
 * `doc_holiday_*` tools), authenticated with the DOC_HOLIDAY_API_KEY env var.
 * Idempotent and non-clobbering: a user-defined doc-holiday MCP entry wins.
 */
export function applyDocHolidayConfig(config, dir = skillsDir) {
  config.skills = config.skills || {}
  config.skills.paths = config.skills.paths || []
  if (!config.skills.paths.includes(dir)) config.skills.paths.push(dir)
  config.mcp = config.mcp || {}
  config.mcp["doc-holiday"] = config.mcp["doc-holiday"] || {
    type: "remote",
    url: "https://api.doc.holiday/mcp",
    headers: { Authorization: `Bearer ${process.env.DOC_HOLIDAY_API_KEY ?? ""}` },
    enabled: true,
  }
  return config
}

// OpenCode plugin entry. The `config` hook receives OpenCode's config singleton;
// mutations here are visible when skills and MCP servers are resolved later.
// There is no `session.created` version nudge; Doc Holiday has no dedicated
// plugin-version endpoint to poll.
export const docHoliday = async () => ({
  config: async (config) => {
    applyDocHolidayConfig(config)
  },
})

export default docHoliday
