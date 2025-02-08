"use client";

import { createContext, useContext, useState } from "react";
import { Session } from "next-auth";

interface SessionContextType {
  session: Session | null;
  updateSession: (newSession: Session | null) => void;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  updateSession: () => {},
});

export function SessionProvider({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);

  return (
    <SessionContext.Provider value={{ session, updateSession: setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
