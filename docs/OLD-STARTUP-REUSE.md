# Reuse from the old startup

Source: `Startup/` in this workspace (gitignored, never deployed). Inventory taken November 3, 2026.

## Adopted

| Item                                                          | Where it went                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `repos/.cursor/rules/task-protocol.mdc`                       | `.cursor/rules/task-protocol.mdc`, rewritten for this repo (branch per prompt, no direct main commits) |
| `repos/.cursor/rules/karpathy-guidelines.mdc`                 | `.cursor/rules/surgical-changes.mdc`, condensed                                                        |
| `.agents/agents/code-reviewer.md`, `security-auditor.md`      | `.cursor/agents/`, adapted to Cursor subagent format and to this stack                                 |
| Process: spec, tickets, one prompt per chat, PROGRESS tracker | `docs/`, `docs/prompts/PACK-1.md`                                                                      |

## Not adopted

- `quality-reviewer.md`: overlaps code-reviewer. Add later if wanted.
- `repos/.cursor/rules/first-run-sprint.mdc`: tied to that startup's sprint and QA person.
- `repos/.agents/teamwork/*`: logs from a multi-agent run, not reusable.
- `Audio/`, `Ayumi/`, `Substrata*/`, `substrata-api*/`: Japanese-learning app code. Different product.
- `docs/home-spec.md`, `lesson-*.md`: that product's specs.

## Handle with care

`repos/Resoruces if ever needed/` holds commercial UI kits and HTML templates (Azurio, Flowbite Pro, Gogo, Magicoon, Materialize, Metronic, TailwindUI components, UBold) with license certificates in `licenses/`. Its own README warns about restrictions on public redistribution.

Rule for Substrates: do not copy kit source into `catalog.json`, `public/`, or any downloadable product. Selling or giving away files derived from a licensed kit may breach its license. Use kits only as reference for your own original work, and check each license before any derivative ships. This matters directly for P10 and P11 (delivery) because delivered files must be yours to sell.

## Open question

Which products in `catalog.json` are your original work versus imported from another marketplace? The catalog was extracted from an imported site. Before launch, confirm you have the right to sell or deliver each product. Record the answer in `docs/DECISIONS.md` as D13.
