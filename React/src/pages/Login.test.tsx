import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

// Mock de supabase para que no hacer una conexion real durante las pruebas
vi.mock("../lib/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

describe("Login page", () => {
  it("renderiza el botón de Login con Google", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const btn = screen.getByRole("button", { name: /google/i });
    expect(btn).toBeInTheDocument();
  });

  it("llama a signInWithOAuth al hacer click en Login con Google", async () => {
    const { supabase } = await import("../lib/supabaseClient");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /google/i });
    fireEvent.click(btn);

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith(
      expect.objectContaining({ provider: "google" })
    );
  });
});