export interface MinistryLeaderRef {
  id: string;
  name: string;
  photoUrl?: string;
}

export interface Ministry {
  id: string;
  slug: string;
  name: string;
  summary?: string;
  descriptionHtml?: string;
  coverUrl?: string;
  meetingSchedule?: string;
  leader?: MinistryLeaderRef;
}
