"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Updated import for modern X branding

const contactSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Required"),
  message: z.string().min(10, "Too short"),
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Floating-label field */
function Field({ label, step, error, children }) {
  return (
    <motion.div variants={fadeUp} style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.4rem",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#a855f7",
            fontFamily: "monospace",
            opacity: 0.8,
          }}
        >
          {step}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {label}
        </span>
      </div>
      {children}
      {error && (
        <p
          style={{
            fontSize: "0.65rem",
            color: "#f87171",
            marginTop: "0.35rem",
            letterSpacing: "0.06em",
          }}
        >
          ↑ {error}
        </p>
      )}
    </motion.div>
  );
}

/* Glowing input */
const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.75rem",
  padding: "0.85rem 1.1rem",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.25s, box-shadow 0.25s",
  fontFamily: "inherit",
};

function GlowInput({ onFocus, onBlur, style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        ...style,
        borderColor: focused ? "#a855f7" : "rgba(255,255,255,0.08)",
        boxShadow: focused ? "0 0 0 3px rgba(168,85,247,0.15)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function GlowTextarea({ maxLength = 300, style, ...props }) {
  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div style={{ position: "relative" }}>
      <textarea
        {...props}
        maxLength={maxLength}
        onChange={(e) => {
          setCount(e.target.value.length);
          props.onChange?.(e);
        }}
        style={{
          ...inputStyle,
          ...style,
          borderColor: focused ? "#a855f7" : "rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(168,85,247,0.15)" : "none",
          resize: "none",
          height: "7.5rem",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <span
        style={{
          position: "absolute",
          bottom: "0.6rem",
          right: "0.85rem",
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.25)",
          fontFamily: "monospace",
          pointerEvents: "none",
        }}
      >
        {count}/{maxLength}
      </span>
    </div>
  );
}

/* Complete active directory including X (Twitter) links */
const SOCIALS = [
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    color: "#0A66C2",
    url: "https://www.linkedin.com/in/kenenisa-jaleto-751a26356?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    Icon: FaXTwitter,
    label: "X",
    color: "#ffffff",
    url: "https://x.com/Kenenisa_j",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    color: "#E1306C",
    url: "https://www.instagram.com/kenenisa-j7?igsh=OHRpbmJ0M3VqZmk2",
  },
  {
    Icon: FaTelegram,
    label: "Telegram",
    color: "#26A5E4",
    url: "https://t.me/K_Dominus7",
  },
];

function SocialBtn({ Icon, label, color, url }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.8rem",
        height: "2.8rem",
        borderRadius: "0.65rem",
        border: `1px solid ${hovered ? color : "rgba(255,255,255,0.08)"}`,
        background: hovered ? `${color}22` : "rgba(255,255,255,0.03)",
        color: hovered ? color : "rgba(255,255,255,0.55)",
        transition: "all 0.22s",
        cursor: "pointer",
      }}
    >
      <Icon size={18} />
    </a>
  );
}

export default function ContactSection() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [btnHover, setBtnHover] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      setStatus({ type: "success", message: "Message sent successfully!" });
      reset();
    } catch {
      setStatus({ type: "error", message: "Failed to send. Try again." });
    }
  };

  const { ref: nameRef, ...nameRest } = register("name");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: subjectRef, ...subjectRest } = register("subject");
  const {
    ref: msgRef,
    onChange: msgOnChange,
    ...msgRest
  } = register("message");

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#050505",
        color: "#fff",
        minHeight: "100vh",
        padding: "5rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(168,85,247,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Purple radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "3rem", padding: "0 0.5rem" }}
        >
          {/* Availability badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "999px",
              padding: "0.3rem 0.85rem",
              marginBottom: "1.2rem",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 0 0 rgba(34,197,94,0.4)",
                animation: "pulse-green 2s infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                color: "#22c55e",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              AVAILABLE FOR WORK
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg, #fff 40%, rgba(168,85,247,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Let's Talk.
          </h2>
        </motion.div>

        {/* ── BODY GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 px-2 sm:px-4">
          {/* LEFT: FORM */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="order-1"
          >
            {/* Status */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: "1.5rem",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "0.75rem",
                  background:
                    status.type === "success"
                      ? "rgba(34,197,94,0.08)"
                      : "rgba(239,68,68,0.08)",
                  border: `1px solid ${status.type === "success" ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
                  color: status.type === "success" ? "#4ade80" : "#f87171",
                  fontSize: "0.82rem",
                  letterSpacing: "0.03em",
                }}
              >
                {status.message}
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.4rem",
              }}
            >
              <Field label="Full Name" error={errors.name?.message}>
                <GlowInput
                  {...nameRest}
                  ref={nameRef}
                  placeholder="Kenenisa Jaleto"
                  type="text"
                />
              </Field>

              <Field label="Email Address" error={errors.email?.message}>
                <GlowInput
                  {...emailRest}
                  ref={emailRef}
                  placeholder="Kenenisajaleto7@gmail.com"
                  type="email"
                />
              </Field>

              <Field label="Subject" error={errors.subject?.message}>
                <GlowInput
                  {...subjectRest}
                  ref={subjectRef}
                  placeholder="What's this about?"
                  type="text"
                />
              </Field>

              <Field label="Message" error={errors.message?.message}>
                <GlowTextarea
                  {...msgRest}
                  ref={msgRef}
                  onChange={msgOnChange}
                  placeholder="Tell me about your project or idea..."
                />
              </Field>

              {/* Submit button with sliding fill */}
              <motion.div variants={fadeUp}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  style={{
                    position: "relative",
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "0.9rem",
                    border: "1px solid rgba(168,85,247,0.4)",
                    background: "transparent",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    transition: "border-color 0.25s",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {/* Wipe fill on hover */}
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      transform: btnHover
                        ? "translateX(0%)"
                        : "translateX(-101%)",
                      transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                      zIndex: 0,
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                    <FiSend size={17} />
                  </span>
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* RIGHT: INFO */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="order-2"
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {/* Contact details */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  color: "#a855f7",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "1.4rem",
                }}
              >
                Contact Details
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0" }}
              >
                {[
                  { icon: FiPhone, meta: "Phone", val: "+251 962 629 009" },
                  {
                    icon: FiMail,
                    meta: "Email",
                    val: "Kenenisajaleto7@gmail.com",
                  },
                  {
                    icon: FiMapPin,
                    meta: "Location",
                    val: "Addis Ababa, Ethiopia",
                  },
                ].map(({ icon: Icon, meta, val }, i) => (
                  <InfoRow key={i} Icon={Icon} meta={meta} val={val} />
                ))}
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  color: "#a855f7",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                }}
              >
                Connect
              </p>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                {SOCIALS.map((s) => (
                  <SocialBtn key={s.label} {...s} />
                ))}
              </div>
            </motion.div>

            {/* Response time card */}
            <motion.div
              variants={fadeUp}
              style={{
                background: "rgba(168,85,247,0.05)",
                border: "1px solid rgba(168,85,247,0.15)",
                borderRadius: "1rem",
                padding: "1.4rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.6rem",
                  background: "rgba(168,85,247,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FiArrowUpRight size={20} color="#a855f7" />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 0.2rem",
                  }}
                >
                  Usually replies within 24h
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.35)",
                    margin: 0,
                  }}
                >
                  Feel free to reach out anytime.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pulse animation keyframe */}
      <style>{`
        @keyframes pulse-green {
          0%    { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
      `}</style>
    </section>
  );
}

function InfoRow({ Icon, meta, val }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        cursor: "default",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.7rem",
          flexShrink: 0,
          background: hovered
            ? "rgba(168,85,247,0.2)"
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.06)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.25s",
          color: hovered ? "#a855f7" : "rgba(255,255,255,0.5)",
        }}
      >
        <Icon size={16} />
      </div>
      <div>
        <p
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.3)",
            margin: "0 0 0.15rem",
            textTransform: "uppercase",
          }}
        >
          {meta}
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            color: hovered ? "#fff" : "rgba(255,255,255,0.75)",
            margin: 0,
            transition: "color 0.2s",
          }}
        >
          {val}
        </p>
      </div>
    </div>
  );
}
