export const fetchDashboardApi = async () => {
  await new Promise((res) => setTimeout(res, 500));

  return {
    stats: {
      totalCampaigns: 24,
      activeCampaigns: 18,
      totalLeads: 1260,
      conversionRate: "4.8%",
    },
    campaignStatus: [
      { name: "Active", value: 18 },
      { name: "Paused", value: 6 },
    ],
    leadsByCampaign: [
      { name: "Google Ads", leads: 520 },
      { name: "Facebook", leads: 410 },
      { name: "Email", leads: 330 },
    ],
  };
};
