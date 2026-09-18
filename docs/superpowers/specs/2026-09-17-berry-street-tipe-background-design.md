# Berry Street TIPE background design

## Purpose

Clarify the Berry Street Teachers App's educational premise by explaining Trauma-Informed Positive Education (TIPE), the communication need the prototype addressed, and the purpose of the student readiness check-in.

## Content

The English background will explain that TIPE is a strengths-based approach supporting regulation, relationships, wellbeing and learning engagement. It will state carefully that students affected by stress or adversity may find it difficult to identify or communicate how they feel and whether they are ready to learn. It will then connect that need to a simple, non-judgemental digital check-in and a clearer teacher view of classroom support needs.

The Chinese version will preserve the English proper name and acronym as `Trauma-Informed Positive Education（TIPE，创伤知情积极教育）`, then convey the same meaning without characterising TIPE-supported students as a fixed or deficient group.

## Link treatment

- Add one optional, YAML-managed `backgroundLink` with a bilingual label and HTTPS URL.
- Link to the University of Melbourne article section introducing the TIPE approach: `https://pursuit.unimelb.edu.au/articles/Trauma-follows-children-into-the-classroom.-A-new-teaching-model-is-changing-that`.
- Render it directly below the Background paragraph as a quiet underlined source link with an external-link arrow.
- Projects without `backgroundLink` remain unchanged.

## Safety and validation

- Escape the label and URL before rendering.
- Accept HTTPS URLs only.
- Require both English and Chinese link labels.
- Verify English and Chinese rendering and omission on projects without the field.
