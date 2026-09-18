# Midas Team Reunion Photo Design

## Goal

Add the supplied Cosmic Creators photograph to the Midas Curse detail page as a restrained closing team image.

## Presentation

- Keep the existing white academic layout and existing gallery component unchanged.
- Add the photograph to the existing `team` gallery group so it appears in the page's Team section.
- Present it simply as a Cosmic Creators team photograph. Do not add a public timeline explanation or present it as a 2023 development-session image.
- Use neutral bilingual alternative text and captions:
  - English alt: `Four members of Cosmic Creators at a team gathering in Melbourne`
  - Chinese alt: `Cosmic Creators 四位成员在墨尔本小聚合照`
  - English caption: `Cosmic Creators team photo.`
  - Chinese caption: `Cosmic Creators 团队合照。`

## Asset handling

- Preserve the 8192×5464 JPEG in the ignored local intake directory at `photo-inbox/cosmic-creators/team/cosmic-creators-reunion-2024-06-09-original.jpg`.
- Publish only metadata-free WebP derivatives with maximum long edges of 800 and 1600 pixels under `assets/projects/midas-curse-unity/`.
- Record the derivatives' actual intrinsic dimensions in `projects.yml`.
- Do not add the source JPEG to Git.

## Verification

- A focused project-data test must fail before the gallery entry is added, then pass after implementation.
- The YAML compiler must accept the media paths and bilingual copy.
- The complete unit, artifact-build, and browser verification suite must pass.
- Inspect the Midas detail page at desktop and phone widths in both languages, checking the Team section, caption, image proportions, and horizontal overflow.
