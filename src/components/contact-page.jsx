"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function ContactPage() {
  const router = useRouter();

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setStatus({
      type: "",
      message: "",
    });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          reply_to: data.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });

      reset();
    } catch (error) {
      console.error("EmailJS error:", error);

      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm text-card-foreground font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm">
            <MessageSquare className="h-4 w-4" />
            Contact Developer
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Get in Touch
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Have a question, suggestion, bug report, or just want to say hello?
            Send me a message and I&apos;ll get back to you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Developer Info */}
          <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <User className="h-7 w-7 text-primary" />
              </div>

              <h2 className="text-2xl font-bold">
                Contact the Developer
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                I&apos;m always open to feedback, collaboration, and ideas
                that can make this platform better.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-4 rounded-2xl border p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:your-email@example.com"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    naveenzz.0.0.0.3@gmail.com
                  </a>
                </div>
              </div>

              {/* Response */}
              <div className="rounded-2xl border p-4">
                <p className="text-sm font-medium">Response Time</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Usually within 24–48 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Send a Message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form below and your message will be sent directly
                to me.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <Label className="mb-2 block text-sm font-medium">
                  Name
                </Label>

                <Input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="mb-2 block text-sm font-medium">
                  Email
                </Label>

                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <Label className="mb-2 block text-sm font-medium">
                  Subject
                </Label>

                <Input
                  type="text"
                  placeholder="What is this about?"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 3,
                      message: "Subject must be at least 3 characters",
                    },
                  })}
                />

                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label className="mb-2 block text-sm font-medium">
                  Message
                </Label>

                <Textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />

                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Status */}
              {status.message && (
                <div
                  className={`flex items-center gap-2 rounded-xl border p-4 text-sm ${
                    status.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                      : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {status.type === "success" && (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  )}

                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

