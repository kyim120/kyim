
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Star, Users } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
}

const Upcoming = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "AI-Powered Portfolio Analytics",
      description: "Advanced analytics dashboard for tracking portfolio performance with machine learning insights.",
      progress: 75,
      estimatedCompletion: "March 2024",
      status: "In Progress",
      technologies: ["React", "Python", "TensorFlow", "D3.js"],
      priority: "High",
      team: [
        { id: "1", name: "You", avatar: "/placeholder.svg" },
        { id: "2", name: "ML Engineer", avatar: "/placeholder.svg" }
      ] as User[],
      updates: [
        { date: "2024-01-15", message: "Completed data preprocessing pipeline" },
        { date: "2024-01-10", message: "Integrated ML model training" }
      ]
    },
    {
      id: 2,
      title: "Blockchain Portfolio Tracker",
      description: "Decentralized application for tracking cryptocurrency portfolio with real-time analytics.",
      progress: 45,
      estimatedCompletion: "April 2024",
      status: "In Progress",
      technologies: ["Solidity", "Web3.js", "React", "Node.js"],
      priority: "Medium",
      team: [
        { id: "1", name: "You", avatar: "/placeholder.svg" },
        { id: "3", name: "Blockchain Dev", avatar: "/placeholder.svg" }
      ] as User[],
      updates: [
        { date: "2024-01-12", message: "Smart contract development started" },
        { date: "2024-01-08", message: "UI mockups completed" }
      ]
    },
    {
      id: 3,
      title: "Neural Network Visualizer",
      description: "Interactive tool for visualizing neural network architectures and training processes.",
      progress: 20,
      estimatedCompletion: "May 2024",
      status: "Planning",
      technologies: ["Three.js", "Python", "Flask", "WebGL"],
      priority: "Low",
      team: [
        { id: "1", name: "You", avatar: "/placeholder.svg" }
      ] as User[],
      updates: [
        { date: "2024-01-05", message: "Research phase completed" },
        { date: "2024-01-01", message: "Project concept approved" }
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-900 text-red-400 border-red-700";
      case "Medium": return "bg-yellow-900 text-yellow-400 border-yellow-700";
      case "Low": return "bg-green-900 text-green-400 border-green-700";
      default: return "bg-gray-900 text-gray-400 border-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-900 text-blue-400 border-blue-700";
      case "Planning": return "bg-purple-900 text-purple-400 border-purple-700";
      default: return "bg-gray-900 text-gray-400 border-gray-700";
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upcoming Projects</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Current work in progress and upcoming projects. Stay tuned for exciting developments and innovations.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <Star className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors duration-200" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Expected: {project.estimatedCompletion}</span>
                </div>

                {/* Team */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>Team ({project.team.length})</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.map((member) => (
                      <div 
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs font-medium text-white hover:scale-110 transition-transform duration-200"
                      >
                        {member.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300 hover:bg-slate-600 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Recent Updates */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Recent Updates</h4>
                  <div className="space-y-1">
                    {project.updates.slice(0, 2).map((update, index) => (
                      <div key={index} className="text-xs text-gray-400 border-l-2 border-slate-700 pl-2">
                        <div className="font-medium">{update.date}</div>
                        <div>{update.message}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mt-16">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-blue-500/30 transition-all duration-300 p-8">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Stay Updated</CardTitle>
              <CardDescription className="text-gray-400 mb-6">
                Get notified about project updates and new releases. Be the first to know when exciting projects go live.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
