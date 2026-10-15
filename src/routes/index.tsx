import { createFileRoute } from "@tanstack/react-router";
import { DogHomepage } from '@/components/dog-homepage';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Don’t Board Me — Good days for very good dogs' },
    { name: 'description', content: 'Big walks, great company, and a little extra love. A happy world for dogs and their favorite people.' },
    { property: 'og:title', content: 'Don’t Board Me — A tired dog is a happy dog' },
    { property: 'og:description', content: 'Discover a playful world of dog walks, pet visits, and very good company.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: DogHomepage,
});
