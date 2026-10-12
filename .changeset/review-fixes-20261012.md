---
'midgar-pixi-tech': patch
---

Fix the getSupportedVideoFormat export path casing so the package builds on case-sensitive filesystems. Bullets now deal their configured `damage` (previously always 35) and hit at most one target. `calculateDirectionVector` returns `(0, 0)` for coincident points instead of NaN. `destroySprites` now empties the caller's array.
