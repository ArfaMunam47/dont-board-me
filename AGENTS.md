<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Homepage architecture
- Keep the opening homepage in focused sections in `src/components/dog-homepage.tsx`, composed by the index route; future content pages should use separate TanStack routes.
- Use global semantic CSS tokens for all visual colors and CSS-only motion with reduced-motion support to keep the illustrated editorial experience cohesive and lightweight.
- Navigation targets existing homepage sections until additional pages are requested; care previews use accessible client-side tabs and do not imply a working booking flow.
