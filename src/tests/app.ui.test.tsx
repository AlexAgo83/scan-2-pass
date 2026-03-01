import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import App from "../App";
import { SUBMIT_RECOVERY_TIMEOUT_MS } from "../hooks/useContactForm";

afterEach(() => {
  vi.useRealTimers();
});

describe("App UI", () => {
  test("renders core fields and submit CTA", () => {
    render(<App />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
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
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Agostini" },
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
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Agostini" },
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
});
