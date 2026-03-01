## req_003_adaptive_vertical_centering_behavior_for_landing_card - Adaptive vertical centering behavior for landing card
> From version: 0.1.0
> Status: Done
> Understanding: 100%
> Confidence: 98%
> Complexity: Low
> Theme: UI
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Improve the landing page layout behavior so vertical positioning feels intentional across devices.
- Support adaptive placement:
  - vertically centered card on tall/comfortable viewports;
  - top-aligned card on constrained mobile heights to preserve form usability.
- Avoid static one-size-fits-all vertical spacing.

# Context
- Current layout centers content horizontally but relies on top padding for vertical placement.
- On some mobile screens this looks visually unbalanced (too much empty space below card).
- Form usage context requires safe behavior with virtual keyboard and small viewport heights.

# Objectives
- Define responsive vertical alignment rules for the main landing card.
- Keep mobile-first form ergonomics intact.
- Avoid regressions in spacing, overflow, and scroll behavior.

# Scope
- In:
  - update CSS layout contract for adaptive vertical placement of `.landing-card`;
  - define breakpoint/viewport-height strategy for center vs top alignment;
  - verify behavior on mobile and desktop viewports.
- Out:
  - full redesign of spacing scale or typography;
  - animation-heavy entrance/scroll effects.

# Locked execution decisions
- Decision 1: Vertical centering is conditional, not forced globally.
- Decision 2: On constrained mobile heights, card remains top-oriented for form usability.
- Decision 3: On larger viewports, card is vertically centered within viewport safe area.
- Decision 4: No JS layout measurement is required unless CSS-only approach is insufficient.

# Acceptance criteria
- AC1: On desktop-class viewport (for example `1440x900`), landing card appears visually centered vertically.
- AC2: On baseline mobile viewports (`360x800`, `390x844`), layout remains usable with no clipped controls.
- AC3: On short-height mobile scenarios (keyboard-like constraints), top-oriented behavior is preserved.
- AC4: No mandatory horizontal scroll is introduced.
- AC5: Spacing remains consistent with existing visual design language.
- AC6: Lint/build/test checks pass after layout changes.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- Over-aggressive centering can reduce usability on short viewport heights.
- Inconsistent behavior across mobile browsers if viewport units are not chosen carefully.

# Backlog
- To create from this request:
  - `item_004_adaptive_vertical_layout_contract_for_landing_card.md`

- `logics/backlog/item_003_adaptive_vertical_centering_behavior_for_landing_card.md`

# Tasks
- `logics/tasks/task_001_super_orchestration_delivery_execution_for_item_001_to_item_004_with_validation_gates.md`

# Implementation snapshot
- `src/App.css`

# References
- `src/App.css`
- `src/App.jsx`
- `logics/request/req_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`
