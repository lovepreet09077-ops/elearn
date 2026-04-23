"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { login } from "@/features/auth/services/auth-api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const email = form.email.trim();
    const password = form.password;

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await login({
        email,
        password,
      });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      if (response.user.role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else if (response.user.role === "STUDENT") {
        router.replace("/dashboard/student");
      } else {
        router.replace("/");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Login failed. Please try again.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.wrapper}>
        <div className={styles.leftPanel}>
          <Link href="/" className={styles.brand}>
            <div className={styles.logo}>
              <span>&lt;/&gt;</span>
            </div>

            <div>
              <h1 className={styles.brandName}>learnIT</h1>
              <p className={styles.brandTag}>Unified login portal</p>
            </div>
          </Link>

          <div className={styles.leftContent}>
            <span className={styles.badge}>Unified Access</span>

            <h2 className={styles.heading}>
              One platform for <span>learning and management</span>
            </h2>

            <p className={styles.description}>
              Sign in to learnIT as a student or administrator. Access your
              courses, manage the platform, and continue your work from one
              modern and streamlined portal.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <div className={styles.featureDot} />
                <span>Access as student or administrator</span>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureDot} />
                <span>Secure and fast authentication flow</span>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureDot} />
                <span>Unified platform for learning and management</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.sectionLabel}>Access Portal</p>
              <h2>Welcome Back</h2>
              <p className={styles.cardText}>
                Sign in to your learnIT account as a student or administrator.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              {error ? <div className={styles.error}>{error}</div> : null}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className={styles.footerText}>
              Don&apos;t have an account?{" "}
              <Link href="/register/student" className={styles.loginLink}>
                Register as Student
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}