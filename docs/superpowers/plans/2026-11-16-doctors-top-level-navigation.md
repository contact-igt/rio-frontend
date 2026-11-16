# Doctors Top-Level Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move Doctors out of the Management navigation group and expose `/doctors` as a first-class desktop and mobile navigation item.

**Architecture:** Add a small shared `NavDoctors` component that derives active state from the current pathname. Remove Doctors from `NavManagement`, add `NavDoctors` beside it in every existing desktop header, and make Doctors a top-level item in `MobileNav`.

**Tech Stack:** Next.js 14 App Router, React 18, JavaScript/JSX, `next/navigation`, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-16-doctors-top-level-navigation-design.md`

## Global Constraints

- Keep the existing `/doctors` route and page content unchanged.
- Do not change management content, doctor data, metadata, or sitemap behavior.
- Preserve the existing nav ordering and visual classes.
- Do not add dependencies.

## Review Focus

- `/doctors` must activate Doctors, not Management.
- `/about/chairman`, `/about/management`, and `/doctors` must not regress their active states.
- Desktop headers across all page components must render the same top-level Doctors item.
- Mobile navigation must not leave a duplicate Doctors link inside Management.
- The existing build must continue to compile all routes.

### Task 1: Add tested Doctors route-state helper

**Files:**
- Create: `components/shared/navState.js`
- Create: `components/shared/navState.test.js`

**Interfaces:**
- Produces `isDoctorsPath(pathname)` returning a boolean that is true only for `/doctors`.

- [ ] **Step 1: Write the failing test**

  Add Node `node:test` coverage for `/doctors` returning `true`, `/doctors/` returning `false`, and `/about/management` returning `false`.

- [ ] **Step 2: Run the test to verify it fails**

  Run `node --test components/shared/navState.test.js`.
  Expected: fail because `components/shared/navState.js` does not yet exist.

- [ ] **Step 3: Implement the minimal helper**

  Export `isDoctorsPath(pathname)` from `components/shared/navState.js` with an exact equality check against `/doctors`.

- [ ] **Step 4: Run the test to verify it passes**

  Run `node --test components/shared/navState.test.js`.
  Expected: all assertions pass.

### Task 2: Create the shared Doctors nav item and update navigation variants

**Files:**
- Create: `components/shared/NavDoctors.jsx`
- Modify: `components/shared/NavManagement.jsx`
- Modify: `components/shared/MobileNav.jsx`
- Modify: every page component currently importing `NavManagement` under `components/`

**Interfaces:**
- `NavDoctors({ active = false })` renders a top-level `/doctors` anchor using `nav-dd-trigger` and `active` styling, with pathname-aware activation.

- [ ] **Step 1: Add `NavDoctors`**

  Use `usePathname` and `isDoctorsPath`; treat the explicit `active` prop as an override. Render the label `Doctors` and link to `/doctors`.

- [ ] **Step 2: Remove Doctors from Management**

  Remove `/doctors` from the `NavManagement` active-state calculation and dropdown markup, leaving only Founder & Chairman and Management Team.

- [ ] **Step 3: Update mobile navigation**

  Add a top-level `/doctors` link beside the existing About/Facilities links and remove the nested `Our Doctors` link from the Management details group.

- [ ] **Step 4: Update all desktop headers**

  Import and render `NavDoctors` immediately after `NavManagement` in every component that currently renders `NavManagement`, including the Doctors, Management, Chairman, status, home, treatment, facility, contact, booking, specialty, and service pages.

### Task 3: Verify the navigation change

**Files:**
- No production files expected beyond Tasks 1–2.

- [ ] **Step 1: Verify source structure**

  Confirm `NavManagement.jsx` and the Management section of `MobileNav.jsx` contain no `/doctors` link, while all desktop headers have `NavDoctors` and mobile navigation has exactly one top-level `/doctors` link.

- [ ] **Step 2: Run focused tests**

  Run `node --test components/shared/navState.test.js` and expect all tests to pass.

- [ ] **Step 3: Run the production build**

  Run `npm run build` and expect successful compilation and static generation of the existing routes. Record any existing non-blocking warnings.
