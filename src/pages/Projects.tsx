
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PaymentModal from "@/components/PaymentModal";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; project?: any }>({ isOpen: false });

  const projects = [
    {
      id: 1,
      title: "ML Prediction Dashboard",
      description: "Interactive dashboard for machine learning model predictions with real-time data visualization and model performance metrics.",
      longDescription: "A comprehensive machine learning dashboard built with Python and Streamlit that provides real-time predictions and model performance analytics. Features include data preprocessing, model comparison, and interactive visualizations.",
      tech: ["Python", "Streamlit", "Scikit-learn", "Pandas", "Plotly"],
      status: "Completed",
      category: "data-science",
      demoUrl: "https://demo.example.com",
      blogUrl: "/blog/ml-dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      price: "$29"
    },
    {
      id: 2,
      title: "E-commerce Analytics Platform",
      description: "Full-stack web application with advanced analytics, user behavior tracking, and real-time sales monitoring.",
      longDescription: "A complete e-commerce analytics solution with React frontend and Node.js backend. Includes user behavior analysis, sales forecasting, and automated reporting features.",
      tech: ["React", "Node.js", "PostgreSQL", "Redis", "D3.js"],
      status: "Completed",
      category: "web-dev",
      demoUrl: "https://demo.example.com",
      blogUrl: "/blog/ecommerce-analytics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      price: "$49"
    },
    {
      id: 3,
      title: "Data Visualization Suite",
      description: "Comprehensive data visualization tool for complex datasets with statistical analysis and interactive charts.",
      longDescription: "Advanced data visualization platform supporting multiple data formats and providing statistical analysis tools. Built with modern web technologies for optimal performance.",
      tech: ["D3.js", "Python", "Flask", "SQLite", "Chart.js"],
      status: "In Progress",
      category: "data-science",
      demoUrl: null,
      blogUrl: "/blog/data-viz-suite",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      price: "$39"
    },
    {
      id: 4,
      title: "React Component Library",
      description: "Modern, accessible React component library with TypeScript support and comprehensive documentation.",
      longDescription: "A production-ready React component library built with TypeScript, featuring accessibility-first design and comprehensive Storybook documentation.",
      tech: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Jest"],
      status: "In Progress",
      category: "web-dev",
      demoUrl: "https://demo.example.com",
      blogUrl: "/blog/component-library",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      price: "$19"
    },
    {
      id: 5,
      title: "AI Content Generator",
      description: "AI-powered content generation tool with natural language processing and customizable templates.",
      longDescription: "An intelligent content generation platform that uses advanced NLP models to create high-quality content for various use cases including blogs, marketing copy, and technical documentation.",
      tech: ["Python", "FastAPI", "OpenAI API", "React", "MongoDB"],
      status: "Upcoming",
      category: "data-science",
      demoUrl: null,
      blogUrl: null,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      price: "$59"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-900 text-green-400 border-green-700";
      case "In Progress": return "bg-yellow-900 text-yellow-400 border-yellow-700";
      case "Upcoming": return "bg-blue-900 text-blue-400 border-blue-700";
      default: return "bg-gray-900 text-gray-400 border-gray-700";
    }
  };

  const handleBuyProject = (project: any) => {
    setPaymentModal({ isOpen: true, project });
  };

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-blue-900/90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of data science experiments, web applications, and digital solutions. 
            Each project represents a journey of learning and innovation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-slate-700">
            {[
              { key: "all", label: "All Projects" },
              { key: "data-science", label: "Data Science" },
              { key: "web-dev", label: "Web Development" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                    {project.price}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300 hover:bg-slate-600 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {project.demoUrl && (
                    <Button size="sm" variant="outline" asChild className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        Demo <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  {project.blogUrl && (
                    <Button size="sm" variant="outline" asChild className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                      <Link to={project.blogUrl}>
                        Blog <Mail className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleBuyProject(project)}
                  >
                    Buy {project.price}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Have a Project in Mind?</h2>
            <p className="text-gray-400 mb-6">
              Let's collaborate and bring your ideas to life with data-driven solutions and modern web technologies.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/contact">
                Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false })}
        project={paymentModal.project || { title: "", price: "" }}
      />
    </div>
  );
};

export default Projects;
