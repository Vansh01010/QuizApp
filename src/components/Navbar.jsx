    import { Link } from "react-router-dom";

    function Navbar() {
    return (
        <nav className="bg-[#212529] shadow-md py-4">
        <div className="container mx-auto flex justify-center">
            <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-gray-300 transition"
            >
            QuizApp
            </Link>
        </div>
        </nav>
    );
    }

    export default Navbar;
