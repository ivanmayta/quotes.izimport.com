export default function Header() {
    return (
        <header className="sticky top-0 w-full max-w-7xl mx-auto bg-background dark:bg-[#111111] z-999999">
            <nav className="flex h-24 w-full justify-between items-center">
                <a
                    className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200"
                    href="https://izimport.com"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1 1 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1 1 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2"
                        ></path>
                    </svg>
                    <img
                        className="h-8"
                        src="/logo.webp"
                        alt="Logo de quotes.izimport.com"
                    />
                    <span className="text-2xl font-extrabold ">
                        izimport.com
                    </span>
                </a>
                <strong className="text-xl">quotes</strong>
            </nav>
        </header>
    )
}
