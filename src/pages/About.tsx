import { Download, Github, Mail, User, Music, Utensils, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const skills = {
    "Data Science": [
      "Python", "R", "SQL", "Machine Learning", "Deep Learning", 
      "Statistics", "Data Visualization", "Pandas", "NumPy", "Scikit-learn",
      "TensorFlow", "PyTorch", "Jupyter", "Statistical Analysis"
    ],
    "Web Development": [
      "JavaScript", "TypeScript", "React", "Node.js", "Express.js",
      "Next.js", "HTML5", "CSS3", "Tailwind CSS", "MongoDB", "PostgreSQL",
      "REST APIs", "GraphQL", "Git", "Docker"
    ],
    "Tools & Technologies": [
      "VS Code", "Jupyter Notebooks", "Git/GitHub", "Docker", "AWS",
      "Google Cloud", "Tableau", "Power BI", "Figma", "Postman",
      "Linux", "Bash/Shell", "CI/CD", "Testing"
    ]
  };

  const education = [
    {
      degree: "Bachelor of Science in Data Science",
      institution: "University of Management Technology",
      period: "2022 - Present",
      status: "Currently Pursuing",
      description: "Focusing on machine learning, statistical analysis, and data visualization with hands-on projects in predictive modeling and data mining."
    },
    {
      degree: "Web Development Certification",
      institution: "Tech Academy Online",
      period: "2023",
      status: "Completed",
      description: "Comprehensive full-stack web development program covering modern frameworks, backend technologies, and database management."
    }
  ];

  const certifications = [
    "AWS Cloud Practitioner",
    "Google Analytics Certified",
    "Python for Data Science (Coursera)",
    "React Developer Certification",
    "Machine Learning Specialization"
  ];

  const hobbies = [
    {
      icon: Music,
      title: "Music & Dance",
      description: "Playing guitar, learning piano, and contemporary dance. Music helps me stay creative and focused.",
      color: "text-purple-400"
    },
    {
      icon: Utensils,
      title: "Cooking & Culinary Arts",
      description: "Experimenting with international cuisines and molecular gastronomy. Cooking is like programming - precision meets creativity.",
      color: "text-orange-400"
    },
    {
      icon: Gamepad2,
      title: "Gaming & Strategy",
      description: "Strategy games, chess, and indie game development. Gaming enhances problem-solving and strategic thinking.",
      color: "text-green-400"
    }
  ];

  const interests = [
    "Open Source Contributing",
    "Tech Blogging",
    "Data Visualization Art",
    "Machine Learning Research",
    "Web3 & Blockchain",
    "Photography",
    "Hiking & Nature",
    "Chess & Strategy Games"
  ];

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop')"
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full mx-auto mb-6 flex items-center justify-center hover:scale-110 transition-transform duration-500">
              <User size={48} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-950 animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A passionate Data Science student and Web Developer who bridges the gap between 
            data insights and digital experiences. I love turning complex problems into elegant, 
            data-driven solutions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { label: "Projects Completed", value: "25+" },
            { label: "Technologies Mastered", value: "30+" },
            { label: "Years of Experience", value: "3+" },
            { label: "Blog Articles", value: "15+" }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-slate-700 text-center hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Personal Hobbies Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Personal Hobbies & Interests</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {hobbies.map((hobby, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl group">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-slate-700/50 mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <hobby.icon className={`h-6 w-6 ${hobby.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-blue-300 transition-colors duration-300">{hobby.title}</h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {hobby.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - About & Education */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Story */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">My Journey</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  My journey into technology began with curiosity about how data shapes our world. 
                  As a Data Science student, I've discovered the power of extracting meaningful 
                  insights from complex datasets and translating them into actionable solutions.
                </p>
                <p>
                  Parallel to my academic pursuits, I've been building my expertise in web development, 
                  creating digital experiences that bring data to life. This unique combination allows 
                  me to build end-to-end solutions - from data analysis and machine learning models 
                  to interactive web applications that showcase insights beautifully.
                </p>
                <p>
                  I believe in the intersection of design and data, where aesthetic meets analytics. 
                  Whether it's building a machine learning dashboard or developing a full-stack 
                  web application, I strive to create solutions that are both technically robust 
                  and user-friendly.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Education</h2>
              <div className="space-y-6">
                {[
                  {
                    degree: "Bachelor of Science in Data Science",
                    institution: "University of Technology",
                    period: "2022 - Present",
                    status: "Currently Pursuing",
                    description: "Focusing on machine learning, statistical analysis, and data visualization with hands-on projects in predictive modeling and data mining."
                  },
                  {
                    degree: "Web Development Certification",
                    institution: "Tech Academy Online",
                    period: "2023",
                    status: "Completed",
                    description: "Comprehensive full-stack web development program covering modern frameworks, backend technologies, and database management."
                  }
                ].map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-6 hover:border-blue-400 transition-colors duration-300">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <Badge className={
                        edu.status === "Completed" 
                          ? "bg-green-900 text-green-400 border-green-700"
                          : "bg-blue-900 text-blue-400 border-blue-700"
                      }>
                        {edu.status}
                      </Badge>
                    </div>
                    <div className="text-gray-400 mb-2">
                      {edu.institution} • {edu.period}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Technical Skills</h2>
              <div className="space-y-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3 text-gray-200">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-slate-700 rounded-full text-sm text-gray-300 hover:bg-slate-600 hover:scale-105 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Info */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:scale-105 transition-all duration-300">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:scale-105 transition-all duration-300">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Certifications</h3>
              <div className="space-y-2">
                {[
                  "AWS Cloud Practitioner",
                  "Google Analytics Certified",
                  "Python for Data Science (Coursera)",
                  "React Developer Certification",
                  "Machine Learning Specialization"
                ].map((cert, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300 hover:text-gray-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">More Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300 hover:bg-slate-600 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50 hover:border-blue-500/70 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold mb-3 text-blue-300">Fun Fact</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                I once built a machine learning model that predicts the best time to take photos 
                based on weather data and social media engagement - combining my love for 
                photography with data science! 📸📊
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
