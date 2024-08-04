export const CAMPAIGNS_ALL_CAMPAIGNS = 'CAMPAIGNS_ALL_CAMPAIGNS';
export const CAMPAIGNS_SINGLE_CAMPAIGNS = 'CAMPAIGNS_SINGLE_CAMPAIGNS';
export const CAMPAIGNS_OFFERS_CAMPAIGNS = 'CAMPAIGNS_OFFERS_CAMPAIGNS';
export const CAMPAIGNS_CONFIG = 'CAMPAIGNS_CONFIG';

export function campaignAllCampaign(data) {
  return { type: CAMPAIGNS_ALL_CAMPAIGNS, payload: data };
}
export function campaignSingleCampaign(campaignDetails) {
  return { type: CAMPAIGNS_SINGLE_CAMPAIGNS, payload: campaignDetails };
}
export function campaignOfferCampaigns() {
  return { type: CAMPAIGNS_OFFERS_CAMPAIGNS };
}
export function campaignConfig(data) {
  return { type: CAMPAIGNS_CONFIG, payload: data };
}