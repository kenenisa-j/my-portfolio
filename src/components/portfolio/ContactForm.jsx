"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Required"),
  message: z.string().min(10, "Too short"),
});

export default function ContactSection() {
  const [status, setStatus] = useState({ type: "", message: "" });
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
      setStatus({ type: "success", message: "Message sent!" });
      reset();
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send." });
    }
  };

  return (
    <section className="bg-[#050505] text-white min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16">
        {/* LEFT: FORM */}
        <motion.div className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 shadow-2xl">
          <h2 className="text-5xl font-extrabold mb-8">Let's Talk.</h2>
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-2xl ${status.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
            >
              {status.message}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {["name", "email", "subject"].map((f) => (
              <div key={f}>
                <input
                  {...register(f)}
                  className="w-full px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/5 focus:border-purple-500 outline-none"
                  placeholder={f.toUpperCase()}
                />
                {errors[f] && (
                  <p className="text-red-500 text-xs ml-2">
                    {errors[f].message}
                  </p>
                )}
              </div>
            ))}
            <textarea
              {...register("message")}
              className="w-full px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/5 focus:border-purple-500 outline-none h-32"
              placeholder="MESSAGE"
            />
            <button
              disabled={isSubmitting}
              className="w-full py-5 bg-white text-black rounded-2xl font-bold hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}{" "}
              <FiSend size={20} />
            </button>
          </form>
        </motion.div>

        {/* RIGHT: ICON + TEXT INFO */}
        <div className="flex flex-col justify-center space-y-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <h3 className="text-purple-400 font-bold uppercase tracking-widest">
              Contact Details
            </h3>
            {[
              { icon: FiPhone, label: "+251 962629009" },
              { icon: FiMail, label: "Kenenisajaleto7@gmail.com" },
              { icon: FiMapPin, label: "Addis Ababa, Ethiopia" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-purple-600 transition-all">
                  <item.icon size={24} />
                </div>
                <span className="text-xl text-zinc-300">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="space-y-8">
            <h3 className="text-purple-400 font-bold uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex gap-4">
              {[FaLinkedin, FaFacebook, FaInstagram, FaTelegram].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-5 bg-white/5 rounded-2xl hover:bg-purple-600 transition-all"
                  >
                    <Icon size={24} />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
