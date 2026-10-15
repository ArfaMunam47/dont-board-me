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
- Keep the preserved hero and introduction in `src/components/dog-homepage.tsx` and extended marketing sections in `src/components/dog-sections.tsx`, composed by the index route; this separates the established opening design from later additions.
- Use global semantic CSS tokens for all visual colors and CSS-only motion with reduced-motion support to keep the illustrated editorial experience cohesive and lightweight.
- Navigation and service links target existing homepage sections until additional pages are requested; marketing content does not imply a working booking flow.
- The contact form validates locally and offers a client-side text download, explicitly stating that nothing is sent; connect a real delivery service before introducing sent-message success states.
- Scroll reveals progressively enhance visible SSR content with IntersectionObserver and bypass hidden states for reduced motion, so the page remains readable without animation support.
