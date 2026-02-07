import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createCampaign } from "../features/campaigns/campaignSlice";

const ExcelUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, {
        type: "binary",
      });

      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(sheet);

      rows.forEach((row) => {
        if (row.name) {
          dispatch(
            createCampaign({
              name: row.name,
              status: row.status || "Active",
              createdAt: new Date().toISOString(),
            })
          );
        }
      });

      setLoading(false);
      setFile(null);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium">
        Upload Excel
      </label>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`px-3 py-1 text-sm rounded text-white
          ${file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"}
        `}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {file && (
        <span className="text-xs text-gray-500">
          {file.name}
        </span>
      )}
    </div>
  );
};

export default ExcelUpload;
