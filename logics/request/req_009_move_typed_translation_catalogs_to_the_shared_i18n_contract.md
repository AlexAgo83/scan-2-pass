## req_009_move_typed_translation_catalogs_to_the_shared_i18n_contract - Move typed translation catalogs to the shared i18n contract
> From version: 1.2.0
> Schema version: 1.0
> Status: Done
> Understanding: 100
> Confidence: 99
> Complexity: Medium
> Theme: Internationalization migration
> Reminder: Update status/understanding/confidence and linked backlog/task references when you edit this doc.

# Needs
- Move the existing typed English/French translation values into editable JSON catalogs governed by the shared i18n contract.
- Preserve the existing English default and automatic French browser-locale selection.
- Keep the runtime adapter local and small rather than adding a general i18n dependency.

# Context
- `src/lib/i18n.ts` contains a compact typed translation object for form, hub, and validation copy.
- `resolveLocale()` already provides deterministic English fallback and French locale detection.
- The current source-defined dictionary is visible but read-only in the viewer.
- The shared i18n contract v1 is a delivery dependency for the final declaration and validation.

# Scope
- In:
  - extract English and French string values to JSON catalogs with stable semantic keys;
  - retain locale resolution and the existing source/default/fallback behavior;
  - replace the structural translation object with the smallest typed or key-based adapter needed by current call sites;
  - declare the catalogs through the shared contract and enable viewer editing;
  - validate keys, string leaves, values, and named placeholders.
- Out:
  - alter form submission, validation rules, redirect behavior, or environment-configured copy;
  - add a language selector, third locale, runtime package, or automatic translation;
  - rename keys without a migration benefit.

# Acceptance criteria
- AC1: English and French values live in JSON catalogs declared by a valid i18n v1 contract.
- AC2: Catalogs have exact key and named-placeholder parity and pass contract validation.
- AC3: English remains the default/fallback and French remains selected for French browser locales.
- AC4: Form, hub, and validation copy render exactly as before for both locales.
- AC5: Environment-configured strings remain outside the locale catalogs and retain their current precedence.
- AC6: The viewer can edit both declared catalogs and reports English as the source locale.
- AC7: Existing i18n, validation, UI, lint, typecheck, and build checks pass without a new runtime dependency.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Dependencies and risks
- Depends on the shared i18n v1 schema and validation commands being stable.
- JSON imports must preserve current build and typecheck behavior without recreating the full catalog shape as duplicate handwritten types.

# Companion docs
- Product brief(s): (none yet)
- Architecture decision(s): (none yet)

# References
- `src/lib/i18n.ts`
- `src/lib/i18n.test.ts`
- `src/App.tsx`
- `src/lib/validation.ts`
- `logics/request/req_005_default_english_with_automatic_french_locale_detection_for_non_configurable_ui_text.md`

# AI Context
- Summary: Extract the existing compact typed dictionaries to governed JSON catalogs without runtime behavior changes.
- Keywords: i18n-contract, json-catalog, locale-resolution, viewer
- Use when: Planning the low-risk pilot migration to the shared contract.
- Skip when: Changing form behavior or adding a new locale.

# Backlog
- none
- `item_020_move_typed_translation_catalogs_to_the_shared_i18n_contract`
