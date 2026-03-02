export default function Footer() {
    return (
        <footer className="border-t border-gray-800 mt-24 py-10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Vatshal K. Built with Next.js.
        </footer>
    );
}