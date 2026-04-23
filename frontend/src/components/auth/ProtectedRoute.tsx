"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, isAuthenticated } from "@/utils/auth";

type Props = {
  children: React.ReactNode;
  role?: "STUDENT" | "ADMIN";
};

export default function ProtectedRoute({ children, role }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();

    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    if (role && user?.role !== role) {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [router, role]);

  if (loading) {
    return <div style={{ padding: "24px" }}>Checking access...</div>;
  }

  return <>{children}</>;
}