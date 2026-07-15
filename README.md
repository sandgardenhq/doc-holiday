<h1 align="center">Doc Holiday</h1>

<p align="center">
  <strong>Plan, generate, and maintain your docs from the code that is the source of truth.</strong>
</p>

---

This is the plugin marketplace for **[Doc Holiday](https://doc.holiday)**. One repo serves multiple coding agents — [Claude Code](https://docs.claude.com/en/docs/claude-code/plugins), [OpenAI Codex](https://developers.openai.com/codex/plugins), [OpenCode](https://opencode.ai), and [Cursor](https://cursor.com) — from a single published source. Install the `doc-holiday` plugin and your agent gets Doc Holiday's documentation skills plus Doc Holiday's hosted MCP server (`doc_holiday_*` tools).

> **Extracted from the `gloria` marketplace.** Doc Holiday's skills used to ship inside the general-purpose [`sandgardenhq/gloria`](https://github.com/sandgardenhq/gloria) plugin. They now live here so Doc Holiday's surface can grow on its own. If you previously installed `writing-doc-holiday-prompts`, `defining-the-documentation-site-map`, or `capturing-documentation-screenshots` via the `gloria` marketplace, keep it or reinstall it here — see [Migrating from the gloria marketplace](#migrating-from-the-gloria-marketplace) below.

## What is Doc Holiday?

Doc Holiday turns your codebase into a documentation site and keeps it current. You plan the information architecture, Doc Holiday writes and maintains the pages — each reconciled against the source of truth in the code. Doc Holiday exposes itself to coding agents through nine `doc_holiday_*` MCP tools (authenticated by a Doc Holiday API key) and a set of skills for planning and prompting the docs.

## What's in the `doc-holiday` plugin

Installing the plugin gives your agent Doc Holiday's skills and wires up the hosted MCP server. (Cursor's marketplace has no individual-user self-service install command yet — see its section below for the working-today local-plugin install.)

| Skill                                     | What it does                                                                                                                                                                                                      |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`defining-the-documentation-site-map`** | Scans the source and emits a Diátaxis-organized documentation site map plus a per-page content plan and a Mermaid hierarchy.                                                                                      |
| **`writing-doc-holiday-prompts`**         | Turns a documentation site map + per-page content plan into ready-to-run `@doc.holiday` create/update prompts, plus reusable Instruction Library entries.                                                         |
| **`capturing-documentation-screenshots`** | Drives a browser to capture real product-UI screenshots for docs pages, crops out chrome/PII, and wires them in — plus exact capture instructions for shots (terminal, IDE, native dialogs) it can't take itself. |

The plugin also registers the remote **Doc Holiday MCP server** at `https://api.doc.holiday/mcp` (Streamable HTTP) under the name **doc-holiday**. The agent uses it to drive Doc Holiday via the `doc_holiday_*` tools. Authenticate with a Doc Holiday API key: create one under **Settings > API Keys** at <https://app.doc.holiday/settings/api-keys>, then expose it as the `DOC_HOLIDAY_API_KEY` environment variable so the plugin sends it as the `Authorization: Bearer` header.

## Authentication

The Doc Holiday MCP server authenticates with a Doc Holiday API key. Create one under **Settings > API Keys** at <https://app.doc.holiday/settings/api-keys>, then make it available to your coding agent as the `DOC_HOLIDAY_API_KEY` environment variable:

```bash
export DOC_HOLIDAY_API_KEY="atn-..."
```

The plugin sends the key to the server as an `Authorization: Bearer` header. Without a valid key the server returns a `401` explaining how to create one. Treat the key like a password: it is scoped to your organization.

## Install

Pick your agent. Each command below is run from inside that agent unless noted.

### Claude Code

```bash
/plugin marketplace add sandgardenhq/doc-holiday
/plugin install doc-holiday@doc-holiday
```

The first command registers this marketplace; the second installs the `doc-holiday` plugin (its skills plus the Doc Holiday MCP server). Restart Claude Code if prompted. Set `DOC_HOLIDAY_API_KEY` in your environment first so the plugin can authenticate (see [Authentication](#authentication)).

### OpenAI Codex

```bash
codex plugin marketplace add sandgardenhq/doc-holiday   # in your shell
```

Then, inside Codex, run `/plugins` and install **doc-holiday**. Set `DOC_HOLIDAY_API_KEY` in your environment so the plugin can authenticate to the Doc Holiday MCP server (see [Authentication](#authentication)).

### OpenCode

OpenCode has no marketplace — add Doc Holiday as a plugin in your `opencode.json` (global `~/.config/opencode/opencode.json` or a project-local `opencode.json`), then restart OpenCode:

```json
{ "plugin": ["doc-holiday@git+https://github.com/sandgardenhq/doc-holiday.git"] }
```

OpenCode installs the plugin, which registers Doc Holiday's skills and the remote MCP server. Set `DOC_HOLIDAY_API_KEY` in your environment so the plugin can authenticate (see [Authentication](#authentication)). Pin a version with a git ref (`…/doc-holiday.git#v0.3.0`).

### Cursor

Cursor shipped its own plugin marketplace in February 2026 (Cursor 2.5), and this repo ships a real Cursor plugin (`.cursor-plugin/`) bundling the same skills and MCP server as the Claude/Codex plugin. Cursor has no individual-user self-service "add a marketplace repo" command yet, so clone this repo and symlink the plugin into Cursor's local plugins directory:

```bash
git -C ~/.cursor/plugins/sources/doc-holiday pull || git clone https://github.com/sandgardenhq/doc-holiday.git ~/.cursor/plugins/sources/doc-holiday
mkdir -p ~/.cursor/plugins/local
ln -sf ~/.cursor/plugins/sources/doc-holiday/plugins/doc-holiday ~/.cursor/plugins/local/doc-holiday
```

Open Cursor's Customize sidebar → Plugins and enable **doc-holiday** if it isn't already on. Set `DOC_HOLIDAY_API_KEY` in your environment so the plugin can authenticate (see [Authentication](#authentication)).

If your org is on a Cursor Team or Enterprise plan, an admin can instead import this repo once for everyone: Dashboard → Settings → Plugins → Team Marketplaces → Import → `sandgardenhq/doc-holiday`.

## Migrating from the gloria marketplace

`writing-doc-holiday-prompts`, `defining-the-documentation-site-map`, and `capturing-documentation-screenshots` previously shipped inside the `gloria` plugin. Nothing breaks on the day of the switch: an existing install keeps the copies it has. To move to this marketplace:

1. (Optional) Remove the skills from your `gloria` install by updating that plugin — after the extraction it no longer bundles them.
2. Add this marketplace and install `doc-holiday` using the [Install](#install) commands for your agent.

The skills' behavior is unchanged; only the marketplace they publish through is different.

## Updating

| Agent        | Command                                                         |
| ------------ | --------------------------------------------------------------- |
| Claude Code  | `/plugin marketplace update doc-holiday` then `/reload-plugins` |
| OpenAI Codex | `codex plugin marketplace upgrade doc-holiday` (restart Codex)  |
| OpenCode     | `rm -rf ~/.cache/opencode/node_modules/doc-holiday` and restart |
| Cursor       | `git -C ~/.cursor/plugins/sources/doc-holiday pull`             |

## Links

- Doc Holiday — <https://doc.holiday>
- MCP server — <https://api.doc.holiday/mcp>

---

<p align="center"><sub>© Sandgarden, Inc. · gloria@sandgarden.com</sub></p>
