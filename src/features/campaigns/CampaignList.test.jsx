/* global describe test expect */
import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CampaignList from "./CampaignList";
import { renderWithProviders } from "../../test/testUtils";

// ✅ mock async thunk
vi.mock("./campaignSlice", async () => {
  const actual = await vi.importActual("./campaignSlice");
  return {
    ...actual,
    fetchCampaigns: () => ({ type: "campaigns/fetchCampaigns" }),
  };
});

describe("CampaignList", () => {
  test("renders campaign list", () => {
    renderWithProviders(<CampaignList />, {
      preloadedState: {
        auth: { user: { role: "admin" }, token: "test" },
        campaigns: {
          list: [{ id: 1, name: "Google Ads", status: "Active" }],
          loading: false,
          error: null,
        },
      },
    });

    expect(screen.getByText("Google Ads")).toBeInTheDocument();
  });

  test("admin can add campaign", () => {
    renderWithProviders(<CampaignList />, {
      preloadedState: {
        auth: { user: { role: "admin" }, token: "test" },
        campaigns: { list: [], loading: false, error: null },
      },
    });

    fireEvent.change(
      screen.getByPlaceholderText("Campaign name"),
      { target: { value: "New Campaign" } }
    );

    fireEvent.click(screen.getByText("Add"));

    expect(screen.getByText("New Campaign")).toBeInTheDocument();
  });

  test("user cannot see add button", () => {
    renderWithProviders(<CampaignList />, {
      preloadedState: {
        auth: { user: { role: "user" }, token: "test" },
        campaigns: { list: [], loading: false, error: null },
      },
    });

    expect(screen.queryByText("Add")).not.toBeInTheDocument();
  });
});
