# DaisyWorld context and extension narrative

## Purpose

Make the existing bilingual DaisyWorld detail page easier to understand without
turning a small course project into a long case study or claiming unresolved
experimental results.

## Content approach

Update only the existing `summary` and `background` fields in `projects.yml`.
The shared project-detail renderer, metadata schema, contribution bullets,
video, and page layout remain unchanged.

The revised copy will explain that SWEN90004 asked teams to reimplement a
selected NetLogo grid model, investigate its behaviour, and propose an
extension. It will retain the verified Python implementation context: parameter
configuration, the simulation entry point, Pygame rendering, and notebook-based
data inspection.

The English and Chinese background will use ant-colony shortest-path behaviour
only as an explanatory analogy for complex systems: simple local feedback can
produce a visible system-level pattern. It will explicitly distinguish that
analogy from this project. DaisyWorld concerns local plant, albedo, temperature,
reproduction, ageing, and diffusion rules; it does not simulate ants or route
finding.

The extension explanation will state that the code adds pollution zones and
spread, pollution-dependent behaviour, visual overlays, and a Lucky Clover
mutation/mitigation mechanism. It will not claim that a saved run demonstrated
Lucky Clover, nor state quantitative findings, effect sizes, validation, or
performance results.

## Acceptance criteria

- English and Chinese copy have equivalent meaning.
- The page continues to use the existing generic detail layout.
- README concepts are paraphrased rather than copied verbatim.
- No student identifiers, commands, source link, or private research notes are
  published.
- Existing contribution wording remains conservative and unchanged.
- The generated `projects-data.js` is refreshed through the existing build
  command.
