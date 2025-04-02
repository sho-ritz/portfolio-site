import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

// This is a placeholder for demonstration purposes
// In a real application, you would fetch blog post data from a database or CMS
const getBlogPost = (slug: string) => {
  const posts = {
    "getting-started-with-nextjs": {
      title: "Getting Started with Next.js",
      date: "April 3, 2023",
      readTime: "8 min read",
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg",
        bio: "Frontend Developer & UI/UX Designer",
      },
      tags: ["Next.js", "React", "Web Development"],
      content: `
        <p>Next.js is a React framework that enables server-side rendering and static site generation for React applications. It's a powerful tool for building modern web applications with React.</p>
        
        <h2>Why Next.js?</h2>
        <p>Next.js provides a number of benefits over a traditional React application:</p>
        <ul>
          <li>Server-side rendering</li>
          <li>Static site generation</li>
          <li>Automatic code splitting</li>
          <li>Built-in CSS and Sass support</li>
          <li>API routes</li>
          <li>Development environment with Fast Refresh</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>To create a new Next.js application, you can use the create-next-app command:</p>
        <pre><code>npx create-next-app@latest my-next-app</code></pre>
        
        <p>This will create a new Next.js application in the my-next-app directory. You can then navigate to that directory and start the development server:</p>
        <pre><code>cd my-next-app
npm run dev</code></pre>
        
        <p>Your Next.js application will be running at http://localhost:3000.</p>
        
        <h2>Pages and Routing</h2>
        <p>Next.js has a file-system based router built on the concept of pages. When a file is added to the pages directory, it's automatically available as a route.</p>
        
        <p>For example, if you create a file at pages/about.js, it will be accessible at /about.</p>
        
        <h2>Data Fetching</h2>
        <p>Next.js provides several methods for fetching data:</p>
        
        <h3>getStaticProps</h3>
        <p>If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.</p>
        
        <h3>getStaticPaths</h3>
        <p>If a page has dynamic routes and uses getStaticProps, it needs to define a list of paths to be statically generated.</p>
        
        <h3>getServerSideProps</h3>
        <p>If you export an async function called getServerSideProps from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.</p>
        
        <h2>Conclusion</h2>
        <p>Next.js is a powerful framework for building React applications. It provides a number of benefits over a traditional React application, including server-side rendering, static site generation, and automatic code splitting.</p>
        
        <p>By using Next.js, you can create fast, SEO-friendly React applications with a great developer experience.</p>
      `,
      relatedPosts: [
        {
          slug: "responsive-design-best-practices",
          title: "Responsive Design Best Practices",
          excerpt: "Tips and tricks for creating responsive websites that look great on all devices.",
        },
        {
          slug: "introduction-to-typescript",
          title: "Introduction to TypeScript",
          excerpt: "Why TypeScript is becoming the standard for modern JavaScript development.",
        },
      ],
    },
    "responsive-design-best-practices": {
      title: "Responsive Design Best Practices",
      date: "March 15, 2023",
      readTime: "6 min read",
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg",
        bio: "Frontend Developer & UI/UX Designer",
      },
      tags: ["CSS", "Responsive Design", "Web Development"],
      content: `
        <p>Responsive design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. Here are some best practices for responsive design.</p>
        
        <h2>Use a Mobile-First Approach</h2>
        <p>Start designing for mobile devices first, then progressively enhance the design for larger screens. This approach ensures that your design works well on small screens and that you're only adding complexity as the screen size increases.</p>
        
        <h2>Use Relative Units</h2>
        <p>Use relative units like percentages, em, and rem instead of fixed units like pixels. This allows your design to scale based on the user's device and preferences.</p>
        
        <h2>Use Media Queries</h2>
        <p>Media queries allow you to apply different styles based on the characteristics of the device, such as its width, height, or orientation. This is a key component of responsive design.</p>
        
        <h2>Test on Real Devices</h2>
        <p>While browser developer tools can simulate different devices, it's important to test your design on real devices to ensure it works as expected.</p>
        
        <h2>Conclusion</h2>
        <p>Responsive design is essential for creating websites that work well on a variety of devices. By following these best practices, you can create a responsive design that provides a good user experience regardless of the device being used.</p>
      `,
      relatedPosts: [
        {
          slug: "getting-started-with-nextjs",
          title: "Getting Started with Next.js",
          excerpt: "Learn how to build modern web applications with Next.js, React, and Tailwind CSS.",
        },
        {
          slug: "building-a-portfolio-website",
          title: "Building a Portfolio Website",
          excerpt: "A step-by-step guide to creating a professional portfolio website to showcase your work.",
        },
      ],
    },
    // Add more blog posts as needed
  }

  return (
    posts[slug as keyof typeof posts] || {
      title: "Blog Post Not Found",
      date: "",
      readTime: "",
      author: {
        name: "Unknown",
        avatar: "/placeholder.svg",
        bio: "",
      },
      tags: [],
      content: "<p>The requested blog post could not be found.</p>",
      relatedPosts: [],
    }
  )
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

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
        <article className="container max-w-4xl py-12 md:py-20 lg:py-32">
          <div className="space-y-4">
            <Link href="/blog">
              <Button variant="link" className="p-0 h-auto">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </Link>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div
            className="mt-8 prose prose-gray max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-12" />

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-6 border rounded-lg bg-muted/40">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <h3 className="font-semibold">{post.author.name}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.bio}</p>
              </div>
            </div>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Related Articles</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {post.relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.slug}>
                      <CardContent className="p-4">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:underline">
                          <h3 className="font-semibold">{relatedPost.title}</h3>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{relatedPost.excerpt}</p>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <Button variant="link" className="p-0 h-auto mt-2">
                            Read More <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
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

