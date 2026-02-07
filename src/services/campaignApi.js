const BASE_URL = "http://localhost:4000/campaigns";

export const getCampaignsApi = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addCampaignApi = async (campaign) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campaign),
  });
  return res.json();
};

export const deleteCampaignApi = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};

export const updateCampaignStatusApi = async (id, status) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};
