"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import { register } from "@/features/auth/services/auth-api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
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
    setSuccessMessage("");

    const trimmedFirstName = form.firstName.trim();
    const trimmedLastName = form.lastName.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedFirstName) {
      setError("First name is required.");
      return;
    }

    if (!trimmedLastName) {
      setError("Last name is required.");
      return;
    }

    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    if (!form.password) {
      setError("Password is required.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await register({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        password: form.password,
        role: "STUDENT",
      });

      setSuccessMessage("Account created successfully. Redirecting to login...");

      console.log("Register success:", response);

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";

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
              <p className={styles.brandTag}>Student registration portal</p>
            </div>
          </Link>

          <div className={styles.leftContent}>
            <span className={styles.badge}>Create your student account</span>

            <h2 className={styles.heading}>
              Start your learning journey with <span>learnIT</span>
            </h2>

            <p className={styles.description}>
              Register as a student to access courses, track your progress,
              and build your skills in a modern digital learning environment.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <div className={styles.featureDot} />
                <span>Simple and secure registration flow</span>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureDot} />
                <span>Access your courses and learning dashboard</span>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureDot} />
                <span>Built for a clean and focused student experience</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.sectionLabel}>Student Signup</p>
              <h2>Create Account</h2>
              <p className={styles.cardText}>
                Fill in your details to register as a student.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </div>
              </div>

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
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              {error ? <div className={styles.error}>{error}</div> : null}
              {successMessage ? (
                <div className={styles.success}>{successMessage}</div>
              ) : null}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Register as Student"}
              </button>
            </form>

            <div className={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.loginLink}>
                Login here
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}