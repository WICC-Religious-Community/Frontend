export type BlockType =
  | 'hero'
  | 'richText'
  | 'mediaSplit'
  | 'cardGrid'
  | 'ctaBanner'
  | 'faq'
  | 'gallery'
  | 'scriptureQuote';

export interface Block {
  type: BlockType;
  data: Record<string, unknown>;
}

export interface CmsPage {
  slug: string;
  title: string;
  description?: string;
  blocks: Block[];
}
