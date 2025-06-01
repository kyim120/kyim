
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building a Machine Learning Dashboard with Streamlit",
      excerpt: "A comprehensive guide to creating interactive ML dashboards that showcase model predictions and performance metrics in real-time.",
      content: "Learn how to build production-ready machine learning dashboards using Streamlit, Python, and modern data visualization techniques...",
      category: "Data Science",
      tags: ["Python", "Streamlit", "Machine Learning", "Data Visualization"],
      publishDate: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "React Performance Optimization: Advanced Techniques",
      excerpt: "Deep dive into advanced React performance optimization techniques including memo, useMemo, useCallback, and code splitting strategies.",
      content: "Explore advanced React optimization patterns that can significantly improve your application's performance and user experience...",
      category: "Web Development",
      tags: ["React", "Performance", "JavaScript", "Optimization"],
      publishDate: "2024-01-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Data Analysis Pipeline with Python and Pandas",
      excerpt: "Step-by-step guide to building robust data analysis pipelines using Python, Pandas, and statistical analysis techniques.",
      content: "Master the art of data analysis by building efficient pipelines that handle data cleaning, transformation, and visualization...",
      category: "Data Science",
      tags: ["Python", "Pandas", "Data Analysis", "Statistics"],
      publishDate: "2024-01-05",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Building Scalable APIs with Node.js and Express",
      excerpt: "Learn how to design and implement scalable REST APIs using Node.js, Express, and modern backend development practices.",
      content: "Discover the best practices for building robust, scalable APIs that can handle high traffic and complex business logic...",
      category: "Web Development",
      tags: ["Node.js", "Express", "API", "Backend"],
      publishDate: "2024-01-01",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=300&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Introduction to Natural Language Processing",
      excerpt: "Getting started with NLP using Python, exploring text preprocessing, sentiment analysis, and machine learning for text data.",
      content: "Dive into the fascinating world of Natural Language Processing and learn how to extract insights from text data...",
      category: "Data Science",
      tags: ["NLP", "Python", "Machine Learning", "Text Analysis"],
      publishDate: "2023-12-28",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      featured: false
    }
  ];

  const categories = ["All", "Data Science", "Web Development"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Data Science": return "bg-blue-900 text-blue-400 border-blue-700";
      case "Web Development": return "bg-green-900 text-green-400 border-green-700";
      default: return "bg-gray-900 text-gray-400 border-gray-700";
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Technical Blog</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Insights, tutorials, and deep dives into data science, web development, 
            and the intersection of technology and innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-slate-700">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {selectedCategory === "All" && (
          <div className="mb-16">
            {blogPosts.filter(post => post.featured).map((post) => (
              <div 
                key={post.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-yellow-900 text-yellow-400 border-yellow-700">
                        Featured
                      </Badge>
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-2" />
                        <span className="mr-4">{post.publishDate}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured || selectedCategory !== "All").map((post) => (
            <article 
              key={post.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Post Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    <span className="mr-3">{post.publishDate}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                    Read <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mt-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Get notified when I publish new articles about data science, web development, and technology insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
