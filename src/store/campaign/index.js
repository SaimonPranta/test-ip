/* eslint-disable import/no-anonymous-default-export */
import {
  CAMPAIGNS_ALL_CAMPAIGNS,
  CAMPAIGNS_OFFERS_CAMPAIGNS,
  CAMPAIGNS_SINGLE_CAMPAIGNS,
  CAMPAIGNS_CONFIG
} from "./action";

const initialState = {
  campaigns: [],
  campaign: {},
  offerCampaigns: [],
  campaignConfig: {
    searchText: '',
    searchInfo: {},
    page: 1,
    campaignCount: 0,
    sort: 'random',
    filterInfo: {},
    topCampaignsData: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGNS_ALL_CAMPAIGNS:
      return {
        ...state,
        campaigns: action?.payload,
      };
    case CAMPAIGNS_CONFIG:
      return {
        ...state,
        campaignConfig: {
          ...state.campaignConfig,
          ...action?.payload
        }
      };
    case CAMPAIGNS_SINGLE_CAMPAIGNS:
      return {
        ...state,
        campaign: state?.campaigns?.find(campaign => campaign.campaign_id === action.payload),
      };
    case CAMPAIGNS_OFFERS_CAMPAIGNS:
      return {
        ...state,
        offerCampaigns: state?.campaigns?.filter(campaign => campaign.offer === true),
      };
    default:
      return state;
  }
};
