# Framework v3.0 Implementation Report

The revised philosophy (`Sovereign_Software_Manifesto_Revised.md`) carried through the whole site, on the branch `framework-v3`. It branches from `framework-v2`, so the six-principle weighted work stays intact and either branch can be kept or dropped. Nothing was pushed, merged, or deployed. The live site is unchanged.

The fourth principle is named **Transparency** everywhere (it was "Transparency and Control" in the revised file), as requested afterwards.

## 1. What changed

- **Philosophy:** four principles (Sovereignty, Longevity, Locality, Transparency) in a conceptual order that is a relationship and not a ranking. Responsiveness, interoperability, modularity, and determinism are now supporting engineering qualities, not principles.
- **Evaluation:** no weights, no numerical score, no tiers. Each principle gets an evidence-based finding (Meets, Partially meets, Does not meet, or Not assessed). Five fundamental requirements carry the weight that numbers used to carry. The overall determination is qualified: Meets the proposed core requirements, Partially aligned, Fails a fundamental requirement, or Insufficient evidence.
- **Manifesto** (`content/read.md`, which also feeds the download): your revised text, with the title and tagline drawn by the page, a link to the evaluator and methodology added at the end of Section 06, and the revision history and five selected references as you wrote them.
- **New tagline** ("Software should serve people without claiming permanent custody over their information, choices, or work.") replaces the old quote in the home hero, the footer, the reading edition, the download, the short manifesto, and the slides. The site description is your new description sentence.
- **Engine:** `static/js/assessment.js` replaces the scoring engine. `data/framework.json` is rewritten (version 3.0, status proposed).
- **Methodology page** rewritten, including why the weights are withdrawn and what a future scored method would need.
- **Evaluator** now collects findings, shows a principle profile in words and symbols, and exports Markdown and JSON (schema 3.0). Examples A, B, and C were redesigned for the new model.
- **Index:** all 25 entries remain "Insufficient evidence"; filters are discipline, determination, status, and "principle needing attention". Detail pages show findings and requirements.
- **Home page** rewritten against the new text. **Slides** rebuilt (24). **README** rewritten. **Escape Hatches** requirement references updated.

## 2. Decisions to review (all can be undone)

1. **The framework needed a version name.** The revised file calls it a "philosophical revision (proposed)" and names no version, so I used **3.0, status proposed**. The old v2.0 file layout is rejected on import.
2. **Determination rules were not in your text,** so I wrote provisional ones and documented them on the methodology page. A verified requirement failure gives "fails a fundamental requirement". Unverified requirements, an unassessed principle, or incomplete evidence give "insufficient evidence". Otherwise all four principles meeting gives "meets", and anything less gives "partially aligned". A principle that "does not meet" without a failed requirement therefore gives "partially aligned", not a failure.
3. **Evidence rule:** every finding needs an observations statement of at least ten characters, every Pass needs evidence, and no finding may rest on Low or unstated confidence. Otherwise the determination is "insufficient evidence". Confidence is my addition, kept from v2.
4. **Three finding levels** (meets, partial, does not meet) are my choice for the "evidence-led principle profile". Your text does not define a scale. This is the most important thing to confirm.
5. **The five fundamental requirements** are your five bullets, given ids E1 to E5 and short titles. The old "custody and recovery" requirement is gone, so Escape Hatches references to E4 and E5 were updated.
6. **Supporting tests:** your seven tests became T1 to T7. T7 supports no principle. T5 is cross-cutting. T6 supports Sovereignty and Longevity.
7. **Em dashes:** your file contains nine. Following your earlier rule I replaced them with colons or commas.
8. **References:** I used your five. The McIlroy, Pinson, Tague entry reads "E. E. Pinson" in your file, but the paper's author is **E. N. Pinson**, so I corrected it. Miller (1968) is no longer cited, matching your list.
9. **ToDoz slide:** it now says ToDoz was built around the earlier six-principle formulation and has not been reassessed, which keeps the slide truthful.
10. **Removed:** the weight bars, the score, the strongest and weakest filters, the score sort, and everything tier-related except the labeled legacy v1 tier on each Index entry.

## 3. Tests and build

- `node --test`: **35 passed, 0 failed** (21 engine tests, 14 consistency and built-site tests). They cover: no weights or scores anywhere; a verified failure cannot be offset; missing evidence is neither a pass nor a failure; evidence sufficiency; precedence; the worked examples; export, import, and malicious input; Index entries never inheriting a determination; the order of the four principles across the source, the slides, and the built site; the new tagline; no retired wording or em dashes; and no third-party requests.
- `hugo --gc` builds 36 pages with no errors.
- Browser checks (in-app Chromium only): evaluator examples A, B, C (fails, meets, partially aligned), export and import round trip, rejection of a 2.0 file, 8 pages at 320, 375, 768, 1024, and 1440 px with no horizontal overflow, every control labeled, no duplicate ids, sequential headings (I fixed an h1-to-h3 skip on the Index and Escape Hatches, and a long reference URL that overflowed small screens), an assessed Index entry rendering on a temporary copy with synthetic data (since deleted), and the slides.

## 4. Open items

- **Other repositories still use the old principles and are not changed:** the ToDoz repository (`PHILOSOPHY.md`, its landing pages) and the posts and project entries on polla.dev describe six principles and the old quote. They now contradict this site.
- `Sovereign_Software_Manifesto_Revised.md` (your input) and `Review.md` are left untouched and uncommitted.
- Accessibility is not a full WCAG audit: no screen reader, no complete manual keyboard pass, one browser engine.
- The three worked examples and the finding descriptions are my wording and need your review.

## 5. Verify and publish

```bash
git switch framework-v3
node --test
hugo server -D
```

To publish, review this report, merge `framework-v3` (or `framework-v2`, never both), and push. The workflow runs the tests, builds, and deploys.
