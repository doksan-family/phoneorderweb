# AGENTS.md

## Architecture

- Follow Feature-Sliced Design (FSD).
- Place code according to responsibility:
  - `shared`: reusable UI, API clients, utilities, and configuration
  - `entities`: domain models and entity-specific queries
  - `features`: user actions, mutations, forms, and feature logic
  - `views` or `pages`: page-level composition

- Keep business logic, data fetching, state management, and UI concerns separated.

## Code Organization

- Keep files under 100 lines when practical.
- Split files by UI, logic, hooks, types, constants, or utilities when responsibilities become mixed.
- Do not split files solely to reduce line count.
- Keep components small and focused.
- Move complex reusable logic into custom hooks.

## TypeScript

- Avoid `any` and unnecessary `unknown`.
- Explicitly define component prop types.
- Keep types close to the domain or feature that owns them.

## Next.js App Router

- Prefer Server Components by default.
- Use `"use client"` only for interaction, browser APIs, client state, React Query, or Zustand.
- Keep Client Component boundaries as small as possible.
- Fetch initial page data in Server Components when appropriate.
- Never access browser-only APIs from Server Components.
- Prevent hydration mismatches caused by time, randomness, or client-specific values.

## React Query

- Use React Query for server state.
- Define reusable query options and array-based query keys in the owning `entity` or `feature`.
- Share the same query options between server prefetching and client queries.
- Keep server and client query keys identical.
- Use `dehydrate` and `HydrationBoundary` when prefetched data is needed by Client Components.
- Fetch interaction-only data lazily on the client.
- Handle mutations in feature hooks or interactive Client Components.
- Do not call raw API functions directly from view components.

## Zustand

- Use Zustand only for shared client-side state.
- Do not duplicate React Query server data in Zustand.
- Prefer Zustand for UI state such as modals, temporary selections, and multi-step forms.

## File Placement

- React Query setup: `shared/lib/react-query`
- Shared API client: `shared/api`
- Entity queries and query options: `entities/{entity}/api` or `model`
- Feature mutations, forms, and action hooks: `features/{feature}/model`
- Page composition: `views` or `pages`
- Reusable UI: `shared/ui`

## Workflow

- Briefly explain the plan before making changes.
- Inspect only files relevant to the requested task.
- Avoid subagents unless explicitly requested.
- After changes, summarize modified files and their purpose.
- Run only relevant lint, type-check, or tests.
- Do not run a full build unless necessary or requested.
- For Next.js changes, report Server/Client Component and hydration decisions.
- For React Query changes, verify query keys, prefetching, `staleTime`, and hydration.
