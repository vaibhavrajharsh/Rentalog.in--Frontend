import { FiUser, FiSun, FiMoon } from "react-icons/fi"; // Import the icons
import { FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import { useState, useEffect } from "react";
import GoogleTranslate from "./GoogleTranslate";
import gsap from "gsap";
import ProgressBar from "./ProgressBar";
const tl = gsap.timeline();
import "../Header-section/Navbar.css";

const Navbar = () => {
  const [dark, setDarkMode] = useState(false); // Track theme state
  const [showMenu, setShowMenu] = useState("");
  const [doBlure, setDoBlure] = useState(false);
  const [navLinkbgColor, setNavlinkbgColor] = useState(true);
  const [activeSection, setActiveSection] = useState("home"); // Track active section
  const [checkToken, setCheckToken] = useState(false);
  const sectionIds = ["home", "Service", "About Us", "Contact Us", "FAQ","RentCalculator"]; // Section IDs

  // Toggle Dark Mode
 const toggleDarkMode = () => {
  // Toggle dark mode
  setDarkMode((prevMode) => {
    const newMode = !prevMode;
    // Save the new mode to localStorage
    localStorage.setItem('dark', newMode ? 'true' : 'false');
    return newMode;
  });
  
  // Toggle the 'dark' class on the body element
  document.body.classList.toggle("dark", !dark);
};

// On page load, check localStorage and set the dark mode accordingly
useEffect(() => {
  const savedDarkMode = localStorage.getItem('dark') === 'true';
  setDarkMode(savedDarkMode);
  // Set the class based on the saved mode
  document.body.classList.toggle("dark", savedDarkMode);
}, []);


  useEffect(() => {
    const tl = gsap.timeline(); // Initialize the timeline

    const ctx = gsap.context(() => {
      tl.fromTo(
        ".navbar",
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.inOut", stagger: 0.3 }
      );
      tl.fromTo(
        ".navbar2",
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.inOut", stagger: 0.3 }
      );
      tl.fromTo(
        ".navbar3",
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.inOut", stagger: 0.3 }
      );
    });
    var getToken = localStorage.getItem("userToken");
    if (getToken != null || getToken != undefined) {
      setCheckToken(true);
    }
    return () => ctx.revert();
  }, []);

  // Intersection Observer to Highlight Links on Scroll and Update URL
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newActiveSection = entry.target.id;
            setActiveSection(newActiveSection);
            if (window.location.hash !== `#${newActiveSection}`) {
              window.history.replaceState(null, null, `#${newActiveSection}`);
            }
          }
        });
      },
      { threshold: 0.9, rootMargin: "0px 0px -50% 0px" }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () =>
      sections.forEach((section) => section && observer.unobserve(section));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection("home");
        window.history.replaceState(null, null, "#home");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      setDoBlure(window.pageYOffset <= 30);
    };
    window.addEventListener("scroll", scrollHandler);
    scrollHandler();
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  if (showMenu) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);

    return (
      <div className="md:hidden bg-[#1ABC9C] fixed w-full z-20 top-0 left-0 h-full flex justify-center items-center">
        <ProgressBar />
        <button
          onClick={() => setShowMenu("")}
           className="absolute top-4 right-4 text-white text-2xl"
        >
          <FiX/>
        </button>
         {/* Mobile Navigation Links */}
      <ul className="flex flex-col gap-6 text-lg">
        {sectionIds.map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className="hover:underline"
              onClick={() => setShowMenu("")} // Close the menu on link click
            >
              {section.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  } else {
    window.onscroll = () => {};
  }
  const handleLogout = () => {
    // Clear session data (e.g., token from localStorage)
    localStorage.removeItem("userToken");
    setCheckToken(false)
    // Redirect to login page
    navigate("/");
  };
  return (
    <nav
    className={`fixed w-full z-20 top-0 left-0 ${dark ? 'navbar-dark' : 'navbar-light'} transition-colors duration-500`}
    >
      <ProgressBar />

      <div
        className={
          doBlure
            ? `absolute w-full h-full -z-20 bg-yellow-950`
            : `absolute w-full h-full -z-20 bg-stone-950 `
        }
      ></div>

      <div className="max-w-screen-xl w-50 flex items-center justify-between mx-auto p-2 text-sm">
        {/* Logo on the Left */}
        <div className="flex flex-row items-center">
          <a href="#home" aria-current="page">
            <img
              className="self-start navbar my-auto"
              style={{ height: "70px", width:"15rem"}}
              src={logo}
              alt="Rentalog-logo"
            />
          </a>
          <div className="ml-4"> {/* Adds 1rem (16px) of space */}</div>
        </div>

        {/* Center Navigation Links */}
        <ul className="hidden md:flex items-center gap-5 text-sm font-light">
          {sectionIds.map((section) => (
            <li
              className="hover:scale-[1.05] transition duration-300"
              key={section}
            >
              <a href={`#${section}`}>
                <h1 className={activeSection === section ? "text-green" : ""}>
                  {section.toUpperCase()}
                </h1>
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: Login, Register, and GoogleTranslate */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button onClick={toggleDarkMode} className="text-lg">
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          {checkToken ? (
            <Link to="/">
              <button onClick={handleLogout} className="navbar3 hidden md:block text-sm px-4 py-1 rounded-lg bg-green-500 text-white transition-transform hover:scale-105">
              Logout
              </button>
            </Link>
          ) : (
            <>
            <Link to="/login">
              <button className="navbar3 hidden md:block text-sm px-4 py-1 rounded-lg bg-green-500 text-white transition-transform hover:scale-105">
                Login
              </button>
            </Link>
            <Link to="/register">
            <button className="navbar3 hidden md:flex items-center gap-1 px-4 py-1 text-sm rounded-lg bg-green-500 text-white transition-transform hover:scale-105">
              <FiUser className="text-lg" />
              Register
            </button>
          </Link>
          </>
          )}
          
          <GoogleTranslate />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu("show")}
          type="button"
          className="md:hidden p-2"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
