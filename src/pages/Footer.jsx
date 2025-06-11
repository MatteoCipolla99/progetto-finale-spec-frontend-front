import { FaGithub, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-white/10 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Social icons (non cliccabili) */}
          <div className="flex space-x-6 text-gray-400 mb-4">
            <FaGithub className="text-xl" />
            <FaInstagram className="text-xl" />
            <FaTwitter className="text-xl" />
            <FaFacebook className="text-xl" />
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SmartBool
          </p>
        </div>
      </div>
    </footer>
  );
}
