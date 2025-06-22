import { cn } from "@/lib/utils";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400",
        className
      )}
      aria-label="Breadcrumb"
      dir="rtl"
    >
      <ol className="flex items-center space-x-1 space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronLeft className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500 rotate-180" />
            )}
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span
                className={cn(
                  "flex items-center gap-1",
                  item.current
                    ? "text-gray-900 dark:text-gray-100 font-medium"
                    : "text-gray-600 dark:text-gray-400"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {index === 0 && <Home className="h-4 w-4" />}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
