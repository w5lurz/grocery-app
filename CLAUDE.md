# Main purpose

This web app is mainly a grocery list for me and my girlfriend.

## Tech-Stack

React, tailwindcss, vite and firebase realtime db

## Features

- Has a top-side navbar, which has two chips selectable. One is "Tamás", other is "Julcsi"
- Has a menu item "Bevás" (which is the grocery list) and on this page new grocery items can be added, existing ones deleted or edited. They should also have priorities. They can be categorized also in these ways: Tesco, DM, Fressnapf, CBA, Auchan, OBI, Kertészet

## Local components and how to use them

There should be a set of reusable components located inside src/components, ALWAYS try to use one from there (like button, menuitem, etc.). If none exists yet for a new use case create one there.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run eslint

## Language

UI text (labels, buttons, menu items) should be in Hungarian, matching existing copy like "Bevás", "Tamás", "Julcsi". Code, comments, and commit messages stay in English.

## Data model

A grocery item should have roughly this shape:

```
{
  id: string
  name: string
  category: "Tesco" | "DM" | "Fressnapf" | "CBA" | "Auchan" | "OBI" | "Kertészet"
  priority: number | "low" | "medium" | "high"
  done: boolean
  createdAt: timestamp
  addedBy: "Tamás" | "Julcsi"
  lastEditedBy: "Tamás" | "Julcsi"
}
```

Adjust as the real Firebase schema solidifies — treat this as a starting point, not a locked contract.

## Firebase

- Realtime Database is the source of truth; UI should stay in sync via listeners rather than one-off fetches.
- Firebase config/keys must come from environment variables (`.env`, gitignored) — never hardcode or commit them.

## Styling

ALWAYS mobile-first as we will use this web-app mainly from android phone.
Use Tailwind utility classes directly in components; avoid introducing separate custom CSS files unless a utility can't express what's needed.
