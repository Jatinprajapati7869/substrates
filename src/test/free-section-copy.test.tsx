import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductPage } from "@/components/ProductPage";
import { findProduct } from "@/lib/catalog";

const mocks = vi.hoisted(() => ({ copy: vi.fn(), account: { user: { id: "visitor" } as { id: string } | null } }));
vi.mock("@/lib/account-context", () => ({ useAccount: () => mocks.account }));
vi.mock("@/lib/assistant-copy", async importOriginal => ({ ...await importOriginal<typeof import("@/lib/assistant-copy")>(), copySectionPrompt: mocks.copy }));
vi.mock("@/lib/recommend.functions", () => ({ getRelatedProducts: async () => ({ items: [], ai: false }) }));
vi.mock("use-webmcp-tool", () => ({ useWebMCP: () => {} }));
vi.mock("@tanstack/react-router", () => ({ Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a> }));
vi.mock("@/components/ProductCheckoutButton", () => ({ ProductCheckoutButton: () => null }));

describe("Free section copy after sign-in", () => {
  beforeEach(() => { mocks.account.user = { id: "visitor" }; mocks.copy.mockReset(); });
  it("reopens the original section's copy choices after the account becomes available", async () => {
    const product = findProduct("section", "signal");
    if (!product) throw new Error("Missing Signal fixture");
    mocks.account.user = null;
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const page = () => <QueryClientProvider client={client}><ProductPage product={product} resumeCopy /></QueryClientProvider>;
    const view = render(page());
    expect(screen.queryByRole("dialog")).toBeNull();
    mocks.account.user = { id: "visitor" };
    view.rerender(page());
    expect(await screen.findByRole("dialog")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /^Codex$/ }));
    await waitFor(() => expect(mocks.copy).toHaveBeenCalledWith("signal", "Codex"));
    await screen.findByRole("status");
  });
});