import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Display, H2, Lead, Muted, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <Section className="pt-24 sm:pt-32">
        <Container className="flex flex-col items-start gap-6">
          <Badge variant="secondary">Design system preview</Badge>
          <Display>
            A warm, modern home
            <br className="hidden sm:block" />
            for {siteConfig.name}.
          </Display>
          <Lead className="max-w-2xl">{siteConfig.description}</Lead>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg">Get involved</Button>
            <Button size="lg" variant="outline">
              Learn more
            </Button>
            <Button size="lg" variant="link" asChild>
              <Link href="#components">View components →</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Separator />

      <Section id="components">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <div>
              <H2>Buttons</H2>
              <Muted>Every variant and size in the system.</Muted>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Add item">
                +
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <H2>Cards</H2>
              <Muted>A content container with header, body, and footer slots.</Muted>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Badge className="w-fit">New</Badge>
                  <CardTitle>Weekly gathering</CardTitle>
                  <CardDescription>
                    Join us every Sunday for worship, community, and connection.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>10:00 AM &middot; Main Hall</Text>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Small groups</CardTitle>
                  <CardDescription>Find a group near you and grow together.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>Meets weekly &middot; All ages welcome</Text>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Get involved</CardTitle>
                  <CardDescription>Volunteer opportunities across every ministry.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>Sign up in under five minutes.</Text>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <H2>Form elements</H2>
              <Muted>Inputs, labels, and focus states.</Muted>
            </div>
            <div className="flex max-w-sm flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane@example.com" />
              </div>
              <Button className="w-fit">Submit</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
