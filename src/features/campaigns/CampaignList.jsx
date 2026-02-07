import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns } from "./campaignSlice";
import { createCampaign, removeCampaign, updateStatus }
  from "./campaignSlice";
import CampaignRow from "./CampaignRow";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import useAuth from "../../hooks/useAuth";
import ExcelUpload from "../../components/ExcelUpload";
import { useLocation } from "react-router-dom";
import { updateCampaignStatus } from "./campaignSlice";

const CampaignList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.campaigns);
  const { isAdmin } = useAuth();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const pageSize = 5;

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/campaigns") {
      setShowFilters(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);


  const filteredList = useMemo(() => {
    return list.filter((campaign) => {
      // search
      const matchesSearch = campaign.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // status
      const matchesStatus =
        statusFilter === "All" ||
        campaign.status === statusFilter;

      // date range
      const campaignDate = new Date(campaign.createdAt).getTime();
      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = toDate ? new Date(toDate).getTime() : null;

      const matchesDate =
        (!from || campaignDate >= from) &&
        (!to || campaignDate <= to);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [list, search, statusFilter, fromDate, toDate]);


  const totalPages = Math.ceil(filteredList.length / pageSize);

  const paginatedList = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, page]);

  const handleAdd = () => {
    if (!name.trim()) return;

    dispatch(
      createCampaign({
        name,
        status,
        createdAt: new Date().toISOString(),
      })
    );

    setName("");
    setStatus("Active");
  };

  const handleDelete = (id) => {
    dispatch(removeCampaign(id));
  };

  if (loading) return <Loader text="Loading campaigns..." />;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-xl font-semibold">Campaigns</h1>

      {/* Add Campaign */}
      {isAdmin && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-sm font-medium mb-3">
            Add Campaign
          </h2>

          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Left: Add Campaign */}
            <div className="flex flex-wrap gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Campaign name"
                className="w-48 px-3 py-2 border rounded text-sm
                     dark:bg-gray-700 dark:border-gray-600"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border rounded text-sm
                     dark:bg-gray-700 dark:border-gray-600"
              >
                <option>Active</option>
                <option>Paused</option>
              </select>

              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            {/* Right: Excel Upload */}
            <div className="flex flex-wrap gap-3">
              <ExcelUpload />
              <p className="text-xs text-gray-500 mt-1">
                Excel: name, status
              </p>
            </div>
          </div>
        </div>
      )}


      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium">Filters</h2>

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {!showFilters && (
          <div className="flex flex-wrap gap-4 items-end">
            {/* Search */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Search
              </label>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search campaign..."
                className="w-56 px-3 py-2 border rounded text-sm
                     dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border rounded text-sm
                     dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>

            {/* Dates */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border rounded text-sm
                     dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border rounded text-sm
                     dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setFromDate("");
                setToDate("");
                setPage(1);
              }}
              className="px-4 py-2 border rounded text-sm hover:bg-gray-100
                   dark:hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Action</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No campaigns found
                </td>
              </tr>
            ) : (
              paginatedList.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignList;
