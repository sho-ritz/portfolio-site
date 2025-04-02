import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This is a placeholder for demonstration purposes
// In a real application, you would fetch project data from a database or CMS
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, Tailwind CSS, and Stripe integration.",
    image: "/placeholder.svg",
    tags: ["Next.js", "React", "Tailwind CSS", "Stripe"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "web",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A productivity app for managing tasks and projects with real-time updates and team collaboration features.",
    image: "/placeholder.svg",
    tags: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "web",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio website with blog functionality built with Next.js and Tailwind CSS.",
    image: "/placeholder.svg",
    tags: ["Next.js", "React", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "web",
  },
  {
    id: 4,
    title: "Weather App",
    description: "A weather application that provides real-time weather information using the OpenWeather API.",
    image: "/placeholder.svg",
    tags: ["React", "API Integration", "CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "mobile",
  },
  {
    id: 5,
    title: "Recipe Finder",
    description: "An application that allows users to search for recipes based on ingredients they have.",
    image: "/placeholder.svg",
    tags: ["React", "API Integration", "Styled Components"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "web",
  },
  {
    id: 6,
    title: "Chat Application",
    description: "A real-time chat application with private messaging and group chat functionality.",
    image: "/placeholder.svg",
    tags: ["React", "Socket.io", "Node.js", "Express"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "mobile",
  },
]

export default function ProjectsPage() {
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
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/projects">
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
            <div className="flex flex-col items-start space-y-4">
              <Link href="/">
                <Button variant="link" className="p-0 h-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Button>
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">All Projects</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Browse through my portfolio of projects. Filter by category to find what you're looking for.
              </p>
            </div>

            <Tabs defaultValue="all" className="mt-8">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="web">Web Development</TabsTrigger>
                <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
                <TabsTrigger value="design">UI/UX Design</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="web" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter((project) => project.category === "web")
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter((project) => project.category === "mobile")
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter((project) => project.category === "design")
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
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

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-48 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
        <span className="text-gray-500 dark:text-gray-400">Project Image</span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button asChild size="sm">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

