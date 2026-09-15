import type { Block } from '@/domain/pages/model';
import { HeroBlock } from './hero-block';
import { RichTextBlock } from './rich-text-block';
import { MediaSplitBlock } from './media-split-block';
import { CardGridBlock } from './card-grid-block';
import { CtaBannerBlock } from './cta-banner-block';
import { FaqBlock } from './faq-block';
import { GalleryBlock } from './gallery-block';
import { ScriptureQuoteBlock } from './scripture-quote-block';

/**
 * Maps an admin-authored `Block` (from `domain/pages`) to its component.
 * Adding a new block type is: one component here, one line in this map, one
 * new enum value in `openapi.yaml` — never a new route or page template.
 */
const blockComponents = {
  hero: HeroBlock,
  richText: RichTextBlock,
  mediaSplit: MediaSplitBlock,
  cardGrid: CardGridBlock,
  ctaBanner: CtaBannerBlock,
  faq: FaqBlock,
  gallery: GalleryBlock,
  scriptureQuote: ScriptureQuoteBlock,
} satisfies Record<Block['type'], (props: { data: Record<string, unknown> }) => React.ReactNode>;

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.type];
        if (!Component) return null;
        // eslint-disable-next-line react/no-array-index-key -- blocks have no stable id from the API
        return <Component key={`${block.type}-${index}`} data={block.data} />;
      })}
    </>
  );
}
