import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Mail,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome to My Portfolio",
      subtitle: "Data Science & Web Development",
      content:
        "A passionate data scientist and web developer transforming ideas into digital experiences.",
      image:"https://i.postimg.cc/V65vmM15/20250117-153417.jpg",
      background: "from-blue-600 to-purple-700",
    },
    {
      id: 2,
      title: "Featured Projects",
      subtitle: "Recent Work & Innovations",
      content:
        "Explore my latest projects in machine learning, data visualization, and full-stack web applications.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      background: "from-green-600 to-blue-600",
    },
    {
      id: 3,
      title: "Technical Blog",
      subtitle: "Insights & Tutorials",
      content:
        "Deep dives into data science techniques, web development best practices, and technology insights.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      background: "from-purple-600 to-pink-600",
    },
    {
      id: 4,
      title: "Let's Connect",
      subtitle: "Ready to Collaborate",
      content:
        "Interested in working together? Get in touch to discuss your next project or collaboration opportunity.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      background: "from-orange-600 to-red-600",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Backgrounds */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.background} opacity-10`}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop')",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-24 md:pt-32">
            {/* Left */}
            <div
              className={`space-y-8 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              } px-4 lg:px-0`}
            >
              {/* Profile */}
              {currentSlide === 0 && (
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 text-center sm:text-left animate-fade-in">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-300 group-hover:scale-110">
                      <img
                        src={currentSlideData.image}
                        alt="Alex Johnson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-950 animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Muhammad Qasim</h2>
                    <p className="text-blue-400">Data Scientist & Developer</p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="space-y-4 text-center sm:text-left">
                <div className="animate-fade-in">
                  <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
                    {currentSlideData.subtitle}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight animate-scale-in">
                  <span className="block text-white">
                    {currentSlideData.title.split(" ").slice(0, -2).join(" ")}
                  </span>
                  <span className="block text-blue-400 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {currentSlideData.title.split(" ").slice(-2).join(" ")}
                  </span>
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto sm:mx-0 animate-fade-in">
                  {currentSlideData.content}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 animate-fade-in">
                {currentSlide === 0 && (
                  <>
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/projects">
                        View Projects <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/contact">
                        Get In Touch <Mail className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
                {currentSlide === 1 && (
                  <>
                    <Button
                      asChild
                      className="bg-green-600 hover:bg-green-700 text-white hover:scale-105"
                    >
                      <Link to="/projects">
                        Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white hover:scale-105"
                    >
                      <Link to="/admin">Admin Panel</Link>
                    </Button>
                  </>
                )}
                {currentSlide === 2 && (
                  <>
                    <Button
                      asChild
                      className="bg-purple-600 hover:bg-purple-700 text-white hover:scale-105"
                    >
                      <Link to="/blog">
                        Read Blog <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white hover:scale-105"
                    >
                      <Link to="/upcoming">Coming Soon</Link>
                    </Button>
                  </>
                )}
                {currentSlide === 3 && (
                  <>
                    <Button
                      asChild
                      className="bg-orange-600 hover:bg-orange-700 text-white hover:scale-105"
                    >
                      <Link to="/contact">
                        Contact Me <Mail className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white hover:scale-105"
                    >
                      <Link to="/about">
                        About Me <User className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Socials */}
              {currentSlide === 0 && (
                <div className="flex justify-center sm:justify-start space-x-6 animate-fade-in">
                  <a
                    href="https://github.com"
                    className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="mailto:contact@example.com"
                    className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              )}
            </div>

            {/* Right */}
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="relative">
                <div
                  className={`w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br ${currentSlideData.background} rounded-full opacity-20 blur-3xl absolute -top-10 -right-10`}
                />
                {currentSlide === 0 ? (
                  <div className="relative bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-500">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-blue-300">
                      Skills & Focus
                    </h3>
                    <div className="space-y-4">
                      <div className="group">
                        <h4 className="text-blue-400 font-medium mb-2 group-hover:text-blue-300 transition-colors duration-300">
                          Data Science
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {["Python", "Machine Learning", "Analytics"].map(
                            (skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-slate-800 rounded-full text-sm hover:bg-blue-900/50 hover:scale-105"
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="group">
                        <h4 className="text-green-400 font-medium mb-2 group-hover:text-green-300 transition-colors duration-300">
                          Web Development
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {["React", "TypeScript", "Node.js"].map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-slate-800 rounded-full text-sm hover:bg-green-900/50 hover:scale-105"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-slate-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50">
                    <img
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {currentSlideData.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {currentSlideData.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          {/* Controls */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-4 bg-slate-800/40 p-3 rounded-xl shadow-inner backdrop-blur-md">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:scale-110 transition rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide
                        ? "bg-blue-400 shadow-lg shadow-blue-400/50"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:scale-110 transition rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Bubbles */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${currentSlideData.background} opacity-10 rounded-full blur-3xl animate-pulse`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br ${currentSlideData.background} opacity-10 rounded-full blur-3xl animate-pulse delay-1000`}
        />
      </div>
    </div>
  );
};

export default Index;
