# Berry Street members section

## Goal

Add a compact, bilingual Members section to the Berry Street project detail page. It must identify the five students named in the Wombat project README without using avatars or stacked profile images.

## Content source and attribution

The source is `SRA_Repository/SWEN90009-2025-BST-Wombat/README.md`, which lists Ziyu Wang, Hao Chen, Zikun Qiu, Gaoyongle Zhang, and Junhao Zhu as team members. The public project page will show names only, without student numbers, email addresses, roles, supervisors, or industrial partners.

Verified repository identity evidence supports external GitHub links for Hao Chen (`JarrettChen217`), Gaoyongle Zhang (`XinMoZ`), and Junhao Zhu (`junhaozhu1`). Ziyu Wang and Zikun Qiu will remain plain text until their GitHub identities are supplied or independently confirmed.

## Presentation

`projects.yml` will gain optional project-level member data, with bilingual section labels. The project renderer will output Members after the project background and before the resources/scope content. Linked names open the relevant GitHub profile in a new tab with `rel="noopener"`; non-linked names stay as text in the same accessible inline list. A small dedicated CSS rule will keep names readable, wrap safely on narrow screens, and avoid avatar or stack treatments.

## Verification

Add a focused renderer test that demonstrates that Berry Street includes every listed member, renders the three verified external profile links, and does not render student numbers or email addresses. Run the focused test and the repository's normal build, checks, and test suite after the change.
