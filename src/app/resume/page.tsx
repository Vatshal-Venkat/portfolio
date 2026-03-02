export default function ResumePage() {
    return (
        <div className="py-32 max-w-3xl">
            <h1 className="text-4xl font-semibold mb-8">Resume</h1>

            <p className="text-gray-400 mb-6">
                Download my latest resume below.
            </p>

            <a
                href="/resume.pdf"
                target="_blank"
                className="inline-block px-6 py-3 border border-gray-700 rounded-md hover:border-gray-500 transition"
            >
                Download Resume
            </a>
        </div>
    );
}