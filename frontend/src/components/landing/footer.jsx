 export function Footer(){
    return (
        <footer className="w-full py-6 bg-black text-white flex flex-col items-center justify-center space-y-3">
          {/* Social Icons */}
          <div className="flex space-x-6 mt-10">
            {/* GitHub */}
            <a
              href="https://github.com/realsubodh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src="/github-mark-white.png"
                alt="GitHub"
                className="w-6 h-6"
              />
            </a>
    
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/realsubodh/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition "
            >
              <img
                src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF"
                alt="X"
                className="w-7 h-7"
              />
            </a>
            {/* X */}
            <a
              href="https://x.com/real_subodh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition "
            >
              <img
                src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=FFFFFF"
                alt="X"
                className="w-7 h-7"
              />
            </a>
          </div>
    
          {/* Email */}
          <a
            href="mailto:subodhsingh0021@gmail.com"
            className="text-m text-white hover:text-white transition"
          >
            subodhsingh0021@gmail.com
          </a>
    
          {/* Copyright */}
          <p className="text-sm text-gray-300 mt-5">
            &copy; {new Date().getFullYear()} Mento. All rights reserved.
          </p>
        </footer>
      );
};    