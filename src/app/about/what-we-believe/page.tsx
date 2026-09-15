import type { Metadata } from 'next';
import { Container, Page, Reveal, SectionHeader } from '@/components/primitives';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { routes } from '@/config/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'What We Believe',
  description: 'The core convictions that shape everything we teach and practice at WICC.',
  path: routes.whatWeBelieve(),
});

const BELIEFS = [
  {
    title: 'The Scriptures',
    body: 'We believe the Bible is the inspired, infallible, and authoritative Word of God — the final word on faith and life.',
  },
  {
    title: 'God',
    body: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    title: 'Salvation',
    body: 'We believe salvation is a gift of God’s grace, received through faith in the finished work of Jesus Christ.',
  },
  {
    title: 'The Church',
    body: 'We believe the Church is the body of Christ — called to worship, community, discipleship, and mission.',
  },
  {
    title: 'The Holy Spirit',
    body: 'We believe the Holy Spirit indwells every believer, empowering us to live, serve, and grow in Christlikeness.',
  },
  {
    title: 'Eternity',
    body: 'We believe in the bodily resurrection and the return of Christ, and in eternal life for all who believe.',
  },
] as const;

export default function WhatWeBelievePage() {
  return (
    <Page>
      <Container className="py-section" width="narrow">
        <SectionHeader
          eyebrow="Doctrine"
          title="What We Believe"
          description="These convictions shape everything we teach, practice, and pursue as a church."
          size="lg"
        />
        <div className="mt-12 space-y-10">
          {BELIEFS.map((belief, index) => (
            <Reveal key={belief.title} delay={index * 0.04}>
              <div className="border-border border-t pt-6">
                <h2 className="font-display text-heading-md font-semibold text-ink">{belief.title}</h2>
                <p className="text-muted mt-2 text-body-lg leading-loose">{belief.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Page>
  );
}
