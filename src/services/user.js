import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthUserStore = create(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (user) => set(() => ({ authUser: user })),
      clearAuthUser: () => set({ authUser: null }),
    }),
    {
      name: "atdms-auth-user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

export async function headers() {
  return [
    {
      source: "/:path*",
      headers: securityHeaders,
    },
  ];
}
