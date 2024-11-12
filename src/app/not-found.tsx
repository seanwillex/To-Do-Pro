import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-[600px] md:text-xl/relaxed">
          Sorry, we couldn't find the page you're looking for. Please check the URL or return to the homepage.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  )
} 