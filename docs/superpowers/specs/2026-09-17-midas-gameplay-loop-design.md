# Midas Curse gameplay loop design

## Goal

Explain the playable system before the engineering narrative so a portfolio visitor can understand why the golden path is simultaneously the player's weapon, resource and primary risk.

## Placement and presentation

- Add `How the game works / 游戏机制` after Background and before the existing engineering process.
- Present four compact stages in one restrained horizontal flow on wide screens and one vertical column on phones.
- Reuse the site's white background, font scale, muted blue text and light rules. Do not add cards, shadows, a new display font or project-specific navigation.
- Keep the section as live bilingual HTML. The content and its order come only from `projects.yml`.

## Public content

1. **Leave a golden path / 留下黄金路径** — Moving through the maze turns traversed ground into gold, so route choice continuously changes the arena.
2. **Manage the curse / 控制黄金化** — Activated gold slows both the player and enemies while continuously raising their Goldenate meter. A full player meter completes the curse and ends the run.
3. **Turn danger into offence / 化险为攻** — Lure enemies onto the same path; a full enemy meter defeats them and awards coins, while crystals collected in the maze provide another upgrade resource.
4. **Reshape the battlefield / 重塑战场** — Artifact skills can create, remove or chain-react with gold. Shop upgrades strengthen armour, movement speed, skill damage, cooldown, range and ultimate charging.

Use `Goldenate` as the in-game term, with an immediate plain-language explanation. Do not describe Goldenate as a second independent health system. Do not publish a shop hotkey because the user's recollection and the final script differ. Describe team-owned mechanics as team work and preserve the existing personal-contribution boundary.

## Data and rendering contract

Add an optional project-level `mechanics` object:

```yaml
mechanics:
  heading: { en: How the game works, zh: 游戏机制 }
  intro: { en: ..., zh: ... }
  steps:
    - id: create
      title: { en: Leave a golden path, zh: 留下黄金路径 }
      body: { en: ..., zh: ... }
```

The compiler validates bilingual heading, introduction, unique safe step IDs, bilingual step titles and bodies, preserves order, and discards editorial metadata. `mechanics` becomes an allowed `sectionOrder` key. Projects without it render unchanged.

## Verification

- Compiler tests cover valid bilingual output, private-metadata stripping, duplicate/unsafe IDs, missing translations and the new section-order key.
- Renderer tests cover English and Chinese content, escaping, order between Background and Process, and omission on unrelated projects.
- Full generation, test and stale-output checks pass.
- Browser review covers English and Chinese at desktop width and 390px mobile width with no horizontal overflow.

