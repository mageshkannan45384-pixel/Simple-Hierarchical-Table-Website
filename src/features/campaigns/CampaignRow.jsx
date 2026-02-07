import { useDispatch } from "react-redux";
import { updateCampaignStatus, removeCampaign } from "./campaignSlice";

const CampaignRow = ({ campaign }) => {
  const dispatch = useDispatch(); // ✅ FIX

  return (
    <tr>
      <td className="px-4 py-2">{campaign.name}</td>

      <td className="px-4 py-2">
        <select
          value={campaign.status}
          onChange={(e) =>
            dispatch(
              updateCampaignStatus({
                id: campaign.id,
                status: e.target.value,
              })
            )
          }
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
      </td>

      <td className="px-4 py-2 text-red-500 cursor-pointer"
          onClick={() => dispatch(removeCampaign(campaign.id))}
      >
        Delete
      </td>

      <td className="px-4 py-2 text-gray-500">
        {campaign.createdAt}
      </td>
    </tr>
  );
};

export default CampaignRow;
