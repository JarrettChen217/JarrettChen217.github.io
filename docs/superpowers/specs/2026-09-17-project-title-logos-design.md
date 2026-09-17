# Project title logos design

## Purpose

Give the Berry Street and AVL case-study pages a quiet, recognisable project identity without changing the academic portfolio layout or competing with the page title.

## Design

- Add an optional `logo` object to a project in `projects.yml` with a repository-local image path, intrinsic width and height, and bilingual alternative text.
- Render the logo only beside the project-detail title. Other project cards, filters, and pages remain unchanged.
- Use the Wombat mascot without the wordmark for Berry Street and the original three-node Algorithms in Action mark for AVL.
- Treat both marks as supporting identity: a maximum visual height of 56px on desktop and 44px on mobile, aligned to the title's upper edge.
- Let the title wrap independently while the logo keeps its aspect ratio and never shrinks.
- Use transparent, compressed WebP derivatives. Preserve the supplied source files unchanged.
- If JavaScript is unavailable or an image fails to load, the text title remains complete and understandable.

## Accessibility and responsive behaviour

- The image receives the configured bilingual alternative text.
- The title and logo are grouped in a flex row; the text owns the remaining width.
- At narrow widths the same row remains, with a smaller logo and gap. No horizontal overflow is permitted.

## Validation

- The YAML compiler accepts only `.webp` files inside the matching project's asset directory and verifies that the file exists.
- Width and height must be positive integers.
- Automated tests cover schema validation, safe rendering, bilingual alternative text, and omission for projects without a logo.
- Browser review covers both project pages at desktop and mobile widths.
