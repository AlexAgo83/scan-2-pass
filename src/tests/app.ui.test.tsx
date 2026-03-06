import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import App from "../App";
import { SUBMIT_RECOVERY_TIMEOUT_MS } from "../hooks/useContactForm";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  window.history.replaceState({}, "", "/");
});

describe("App UI", () => {
  test("renders core fields and submit CTA", () => {
    render(<App />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  test("shows validation errors on submit when form is empty", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("First name is required.")).toBeInTheDocument();
    expect(screen.getByText("Last name is required.")).toBeInTheDocument();
  });

  test("shows submitting state and disables submit on valid payload", () => {
    render(<App />);

    const submitButton = screen.getByRole("button", { name: "Continue" });
    const form = submitButton.closest("form");
    expect(form).not.toBeNull();
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "alex@example.com" },
    });
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });

    fireEvent.click(submitButton);

    expect(
      screen.getByRole("button", { name: "Submitting..." }),
    ).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Submitting...");
  });

  test("recovers submit state when navigation does not complete", () => {
    vi.useFakeTimers();
    render(<App />);

    const submitButton = screen.getByRole("button", { name: "Continue" });
    const form = submitButton.closest("form");
    expect(form).not.toBeNull();
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "alex@example.com" },
    });
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });

    fireEvent.click(submitButton);

    expect(
      screen.getByRole("button", { name: "Submitting..." }),
    ).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(SUBMIT_RECOVERY_TIMEOUT_MS);
    });

    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Submission took longer than expected. Please review your details and try again.",
    );
  });

  test("sets direct post-submit _next when exactly one destination link is enabled", () => {
    vi.stubEnv(
      "VITE_DESTINATION_LINKS_JSON",
      JSON.stringify([
        {
          label: { en: "Watch video", fr: "Voir la video" },
          url: "https://example.com/video",
          order: 1,
          enabled: true,
        },
      ]),
    );

    render(<App />);

    const nextInput = document.querySelector<HTMLInputElement>(
      'input[name="_next"]',
    );
    expect(nextInput).not.toBeNull();
    expect(nextInput?.value).toBe("https://example.com/video");
  });

  test("sets post-submit _next to links hub when two links are enabled", () => {
    vi.stubEnv(
      "VITE_DESTINATION_LINKS_JSON",
      JSON.stringify([
        {
          label: { en: "Watch video", fr: "Voir la video" },
          url: "https://example.com/video",
          order: 1,
          enabled: true,
        },
        {
          label: { en: "Download guide", fr: "Telecharger le guide" },
          url: "https://example.com/guide",
          order: 2,
          enabled: true,
        },
      ]),
    );
    window.history.replaceState({}, "", "/?email=alex@example.com");
    const expectedHubUrl = `${window.location.origin}${window.location.pathname}?view=links`;

    render(<App />);

    const nextInput = document.querySelector<HTMLInputElement>(
      'input[name="_next"]',
    );
    expect(nextInput).not.toBeNull();
    expect(nextInput?.value).toBe(expectedHubUrl);
  });

  test("renders links hub view when view=links and at least two links are configured", () => {
    vi.stubEnv(
      "VITE_DESTINATION_LINKS_JSON",
      JSON.stringify([
        {
          label: { en: "Watch video", fr: "Voir la video" },
          url: "https://example.com/video",
          order: 1,
          enabled: true,
        },
        {
          label: { en: "Download guide", fr: "Telecharger le guide" },
          url: "https://example.com/guide",
          order: 2,
          enabled: true,
        },
      ]),
    );
    window.history.replaceState({}, "", "/?view=links");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Choose your content" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Watch video" })).toHaveAttribute(
      "href",
      "https://example.com/video",
    );
    expect(
      screen.getByRole("link", { name: "Download guide" }),
    ).toHaveAttribute("href", "https://example.com/guide");
  });

  test("uses fallback redirect when destination links are missing or invalid", () => {
    vi.stubEnv("VITE_REDIRECT_URL", "https://fallback.example.com/final");
    vi.stubEnv("VITE_DESTINATION_LINKS_JSON", "{invalid");

    render(<App />);

    const nextInput = document.querySelector<HTMLInputElement>(
      'input[name="_next"]',
    );
    expect(nextInput).not.toBeNull();
    expect(nextInput?.value).toBe("https://fallback.example.com/final");
  });
});
