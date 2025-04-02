import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold">Portfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#skills">
            Skills
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#projects">
            Projects
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/blog">
            Blog
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog & Articles</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Sharing my thoughts, experiences, and knowledge about web development and design.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 md:grid-cols-2 lg:gap-12">
              <div className="group space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <div className="h-60 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Article Image</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Getting Started with Next.js</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Learn how to build modern web applications with Next.js, React, and Tailwind CSS.
                  </p>
                </div>
                <Link href="/blog/getting-started-with-nextjs">
                  <Button variant="link" className="p-0 h-auto">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="group space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <div className="h-60 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Article Image</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Responsive Design Best Practices</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Tips and tricks for creating responsive websites that look great on all devices.
                  </p>
                </div>
                <Link href="/blog/responsive-design-best-practices">
                  <Button variant="link" className="p-0 h-auto">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="group space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <div className="h-60 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Article Image</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Introduction to TypeScript</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Why TypeScript is becoming the standard for modern JavaScript development.
                  </p>
                </div>
                <Link href="/blog/introduction-to-typescript">
                  <Button variant="link" className="p-0 h-auto">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="group space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <div className="h-60 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Article Image</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Building a Portfolio Website</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    A step-by-step guide to creating a professional portfolio website to showcase your work.
                  </p>
                </div>
                <Link href="/blog/building-a-portfolio-website">
                  <Button variant="link" className="p-0 h-auto">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Your Name. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

