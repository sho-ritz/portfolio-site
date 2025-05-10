import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { TetrisGame } from "@/components/tetris-game";

// This is a placeholder for demonstration purposes
// In a real application, you would fetch project data from a database or CMS
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js, Tailwind CSS, and Stripe integration.",
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
    description:
      "A modern portfolio website with blog functionality built with Next.js and Tailwind CSS.",
    image: "/placeholder.svg",
    tags: ["Next.js", "React", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "web",
  },
  {
    id: 4,
    title: "Weather App",
    description:
      "A weather application that provides real-time weather information using the OpenWeather API.",
    image: "/placeholder.svg",
    tags: ["React", "API Integration", "CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "mobile",
  },
  {
    id: 5,
    title: "Recipe Finder",
    description:
      "An application that allows users to search for recipes based on ingredients they have.",
    image: "/placeholder.svg",
    tags: ["React", "API Integration", "Styled Components"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "web",
  },
  {
    id: 6,
    title: "Chat Application",
    description:
      "A real-time chat application with private messaging and group chat functionality.",
    image: "/placeholder.svg",
    tags: ["React", "Socket.io", "Node.js", "Express"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    category: "mobile",
  },
];

interface ProjectsPageProps {
  setShowB: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectsPage({ setShowB }: ProjectsPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-black pb-[600px]">
      {/* <div className="fixed top-0 left-0 w-full h-screen bg-black z-0 transition-opacity duration-500">
        <TetrisGame />
      </div> */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <Button
                variant="link"
                className="p-0 h-auto text-blue-500"
                onClick={() => setShowB(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                All Projects
              </h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse through my portfolio of projects. Filter by category to
                find what you're looking for.
              </p>
            </div>

            <Tabs defaultValue="all" className="mt-8">
              <TabsList className="mb-8 bg-gray-900 text-gray-400">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  All Projects
                </TabsTrigger>
                <TabsTrigger
                  value="web"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Web Development
                </TabsTrigger>
                <TabsTrigger
                  value="mobile"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Mobile Apps
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  UI/UX Design
                </TabsTrigger>
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
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          © 2023 Your Name. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-white"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-white"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-2">
      <div className="flex h-48 items-center justify-center rounded-md bg-black">
        <span className="text-gray-500">Project Image</span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-gray-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-blue-900/30 text-blue-400 flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
