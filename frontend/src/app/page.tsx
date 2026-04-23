"use client";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span>&lt;/&gt;</span>
          </div>
          <div>
            <h2 className={styles.brandName}>learnIT</h2>
            <p className={styles.brandTag}>Modern digital learning platform</p>
          </div>
        </div>

        <nav className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#access">Access</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Smart learning for students and admins</div>

          <h1 className={styles.title}>
            Welcome to <span>learnIT</span>
          </h1>

          <p className={styles.subtitle}>
            learnIT is a modern e-learning platform built for seamless digital
            education. Students can access courses, manage their progress, and
            stay focused, while administrators get a clean workspace to manage
            users, content, and the learning experience.
          </p>

          <div className={styles.buttons}>
            <a href="/login" className={`${styles.btn} ${styles.primary}`}>
              Login
            </a>

            <a href="/register/student" className={`${styles.btn} ${styles.ghost}`}>
              Register as Student
            </a>
                        <a href="/register/instructor" className={`${styles.btn} ${styles.ghost}`}>
              Register as Instructor
            </a>
          </div>

          <div className={styles.quickInfo}>
            <div className={styles.infoCard}>
              <h3>Easy Access</h3>
              <p>Simple login flow for both students and administrators.</p>
            </div>

            <div className={styles.infoCard}>
              <h3>Modern Experience</h3>
              <p>Clean, responsive design with a polished interface.</p>
            </div>

            <div className={styles.infoCard}>
              <h3>Built to Scale</h3>
              <p>Structured for future dashboards, courses, and analytics.</p>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardLabel}>Preview</p>
                <h3>Learning Dashboard</h3>
              </div>
              <span className={styles.livePill}>Live</span>
            </div>

            <div className={styles.progressGroup}>
              <div className={styles.progressRow}>
                <span>Frontend Basics</span>
                <span>82%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={`${styles.progressFill} ${styles.fill82}`}></div>
              </div>

              <div className={styles.progressRow}>
                <span>Backend Essentials</span>
                <span>64%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={`${styles.progressFill} ${styles.fill64}`}></div>
              </div>

              <div className={styles.progressRow}>
                <span>Cloud Foundations</span>
                <span>73%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={`${styles.progressFill} ${styles.fill73}`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Features</p>
          <h2>Everything designed for a better learning flow</h2>
          <p>
            learnIT combines a clean student experience with practical Instructor
            controls, making education simple, modern, and efficient.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <h3>Student-first design</h3>
            <p>
              A clean interface that helps students focus on courses,
              assignments, and progress.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>Instructor control panel</h3>
            <p>
              Manage users, monitor activity, and organize educational content
              from one place.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>Future-ready architecture</h3>
            <p>
              Built with scalability in mind so you can expand into dashboards,
              analytics, and advanced learning tools.
            </p>
          </article>
        </div>
      </section>

      <section id="access" className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Access</p>
          <h2>Choose how you want to continue</h2>
        </div>

        <div className={styles.accessGrid}>
          <a href="/login" className={styles.accessCard}>
            <span className={styles.accessBadge}>Student/Instructor</span>
            <h3>Login</h3>
            <p>Enter your learning portal and continue your progress or regulate courses as Instructor.</p>
          </a>

          <a href="/register/instructor" className={styles.accessCard}>
            <span className={styles.accessBadge}>New Instructor</span>
            <h3>Register as Instructor</h3>
            <p>Access management tools and platform administration.</p>
          </a>

          <a href="/register/student" className={`${styles.accessCard} ${styles.highlightCard}`}>
            <span className={styles.accessBadge}>New Student</span>
            <h3>Register as Student</h3>
            <p>Create your student account and get started with learnIT.</p>
          </a>
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.aboutBox}>
          <p className={styles.sectionLabel}>About learnIT</p>
          <h2>A modern identity for digital education</h2>
          <p>
            The learnIT brand uses a deep navy base with electric blue and cyan
            accents to create a modern, trustworthy, and tech-inspired visual
            system. It feels clean enough for education and strong enough for a
            software product.
          </p>
        </div>
      </section>
    </main>
  );
}