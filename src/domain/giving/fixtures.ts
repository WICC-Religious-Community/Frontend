import type { GivingAccount, GivingCampaign } from './model';

export const givingAccountsFixture: GivingAccount[] = [
  {
    id: 'acc_1',
    label: 'Tithes & Offerings',
    bankName: 'Keystone Bank',
    accountNumber: '1012525608',
    accountName: 'WICC',
    currency: 'NGN',
  },
  {
    id: 'acc_2',
    label: 'Building Fund',
    bankName: 'Keystone Bank',
    accountNumber: '1012879868',
    accountName: 'WICC Building Fund',
    currency: 'NGN',
  },
  {
    id: 'acc_3',
    label: 'Diaspora Giving',
    bankName: 'Providus Bank',
    accountNumber: '5403892948',
    accountName: 'WICC',
    currency: 'USD',
  },
];

export const givingCampaignsFixture: GivingCampaign[] = [
  {
    id: 'cmp_1',
    title: 'New Auditorium Building Fund',
    description: 'Help us build a home that can welcome even more people into God\'s family.',
    goalAmount: 50_000_000,
    raisedAmount: 31_200_000,
    currency: 'NGN',
    endsAt: null,
  },
];
