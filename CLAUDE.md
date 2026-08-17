# Claude Project Instructions

## Architecture

Follow Feature-Sliced Design (FSD).

- `app`: Next.js App Router entries and routing.
- `views`: page-level composition.
- `features`: user actions and feature logic.
- `entities`: domain models and server-state logic.
- `shared/ui`: reusable presentational UI.
- `shared/api`: shared API clients.
- `shared/lib`: shared libraries and infrastructure.
- `shared/config`: configuration and constants.

Do not use an FSD `pages` layer unless the project actually uses the legacy Pages Router.

Keep routing, UI, business logic, server state, and client state clearly separated.

## Code Structure

- Keep files under ~100 lines when practical.
- Split by responsibility, not only line count.
- Separate UI, hooks, business logic, API, types, constants, and utilities.
- Do not create meaningless files only to reduce line count.
- Split files when multiple responsibilities are mixed.

## TypeScript

- Never use `any`.
- Use `unknown` for untrusted external values and narrow with type guards.
- Never force-cast unvalidated values.
- Explicitly type component props.
- Treat API responses, errors, and external input as untrusted.

## Next.js App Router

- Prefer Server Components by default.
- Use `use client` only when interaction, browser APIs, React Query, Zustand, or client state is required.
- Keep Client Component boundaries as small as possible.
- Do not use browser-only APIs inside Server Components.
- Avoid server/client rendering differences that can cause hydration mismatch.
- Prefer server-side data loading for initial page data, SEO-critical data, and shareable pages.

## State Management

- React Query owns reusable client-side server state.
- Zustand owns global client/UI state only.
- Never duplicate React Query server data in Zustand.
- Keep local state local unless it must be shared.

## Server Data

- Prefer Server Component fetching for initial page data.
- When server-prefetched data is reused by React Query, use dehydration/hydration.
- Server prefetch and client queries must share the same query key and query options.
- Do not call raw API functions directly from view components when reusable query options exist.

## Components

- Server Components prepare data and compose static UI.
- Client Components handle interaction and client-only behavior.
- Screens/views should focus on composition.
- Extract complex behavior into hooks or feature logic.
- Keep pure UI components driven by props.

## Safety

- Prefer small, incremental changes.
- Preserve existing behavior unless explicitly requested otherwise.
- Do not change public APIs, route paths, or database schemas without explicit permission.
- Explain impact before destructive or behavior-changing modifications.

## Workflow

Before editing:

1. Inspect related existing code.
2. Briefly explain the change plan.
3. Make the smallest safe change.

After editing:

1. Summarize modified files and reasons.
2. Run relevant lint, type-check, and tests when available.
3. Report remaining risks or unverified behavior.