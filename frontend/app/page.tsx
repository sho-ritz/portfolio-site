"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SpaceInvadersGame } from "@/components/space-invaders-game";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // 走査 → スクロール
    targetRef.current?.scrollIntoView({
      behavior: "smooth", // “なめらか” に
      block: "start", // 要素の先頭を上端に合わせる
    });
  };

  // Calculate opacity based on scroll position (fade out between 0 and 500px scroll)
  const videoOpacity = Math.max(0, 1 - scrollY / 500);
  const showInvaders = scrollY > 300;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Video Background */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-0 transition-opacity duration-300"
        style={{ opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Space Invaders Background (appears when scrolling) */}
      {showInvaders && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black z-0 transition-opacity duration-500"
          style={{ opacity: Math.min(0.6, (scrollY - 300) / 300) }}
        >
          <SpaceInvadersGame />
        </div>
      )}

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full h-screen flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
                  Shodai SONOBE
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-gray-200 md:text-2xl">
                  Frontend Developer & Backend Developer
                </p>
              </div>
              <div className="space-x-4 pt-6">
                <Link href="/blog">
                  <Button className="inline-flex h-11 items-center justify-center rounded-md bg-white text-black px-8 py-2 text-sm font-medium shadow transition-colors hover:bg-gray-200">
                    Read My Blog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="inline-flex h-11 items-center justify-center border-white text-white hover:bg-white hover:text-black"
                  onClick={handleClick}
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-24 md:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Skills & Technologies
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the technologies and languages I work with.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 bg-black bg-opacity-70 p-6 rounded-lg border border-gray-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Frontend Development
                  </h3>
                  <p className="text-gray-300">
                    HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind
                    CSS
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-black bg-opacity-70 p-6 rounded-lg border border-gray-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Backend Development
                  </h3>
                  <p className="text-gray-300">
                    Node.js, NestJS, Python, Django, SQL, PostgreSQL, Java,
                    SpringBoot
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-24 md:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Featured Projects
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of my recent work.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-black bg-opacity-70 p-2">
                <div className="flex h-60 items-center justify-center rounded-md bg-gray-900">
                  <span className="text-gray-400">Project Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white">Project One</h3>
                  <p className="text-gray-300">
                    A brief description of the project, technologies used, and
                    your role.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      View Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-black bg-opacity-70 p-2">
                <div className="flex h-60 items-center justify-center rounded-md bg-gray-900">
                  <span className="text-gray-400">Project Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white">Project Two</h3>
                  <p className="text-gray-300">
                    A brief description of the project, technologies used, and
                    your role.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      View Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-24 md:py-32 relative">
          <div className="container px-4 md:px-6 mb-[700px]" ref={targetRef}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Feel free to reach out for collaborations or just a friendly
                  hello.
                </p>
              </div>
            </div>
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 py-12 md:flex-row md:space-x-4 md:space-y-0">
              <a
                href="mailto:shoudai.20030417@gmail.com"
                className="inline-flex h-10 items-center justify-center rounded-md border border-blue-500 bg-transparent px-8 text-sm font-medium text-blue-500 shadow-sm transition-colors hover:bg-blue-500 hover:text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </a>
              <a
                href="https://github.com/sho-ritz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-blue-500 bg-transparent px-8 text-sm font-medium text-blue-500 shadow-sm transition-colors hover:bg-blue-500 hover:text-white"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          © 2023 Your Name. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  );
}
