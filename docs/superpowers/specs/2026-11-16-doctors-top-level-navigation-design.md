# Doctors Top-Level Navigation Design

## Intent

Make Doctors a first-class navigation destination instead of nesting it under Management. The existing `/doctors` route and page content remain unchanged.

## Goals

- Remove “Our Doctors” from the Management dropdown.
- Add a reusable top-level Doctors navigation item to every desktop header.
- Add Doctors as a top-level item in the mobile navigation.
- Preserve active-state styling for `/doctors`.
- Keep the existing route, sitemap entry, and page behavior intact.

## Non-goals

- No redesign of the Doctors page.
- No route changes or redirects.
- No changes to management content, doctor data, or page metadata.

## Approach

Create a shared `NavDoctors` component that detects `/doctors` with `usePathname` and applies the same active styling used by the existing navigation. Update all desktop page headers to render it beside `NavManagement`, remove the Doctors item from `NavManagement`, and update `MobileNav` so Doctors is a top-level link rather than a Management submenu item.

This was chosen over adding duplicated plain anchors because it keeps active-state behavior centralized and prevents future navigation variants from drifting.

## Verification

- Search confirms Doctors appears only as a top-level desktop/mobile navigation item.
- `npm run build` succeeds.
- Existing `/doctors` route and sitemap entry remain present.
- No existing management or doctor page content changes.
