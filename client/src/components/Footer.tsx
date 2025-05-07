import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-primary font-bold text-lg">WordWise</div>
            <nav className="flex space-x-6">
              <Link href="#">
                <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  About
                </span>
              </Link>
              <Link href="#">
                <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Privacy
                </span>
              </Link>
              <Link href="#">
                <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Terms
                </span>
              </Link>
              <Link href="#">
                <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Contact
                </span>
              </Link>
            </nav>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} WordWise Dictionary. Powered by{" "}
              <a 
                href="https://dictionaryapi.dev/" 
                className="text-primary hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Free Dictionary API
              </a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
