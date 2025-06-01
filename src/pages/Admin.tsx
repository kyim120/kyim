import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Save, Plus, Upload, Eye, X, CheckCircle, Clock, Mail, DollarSign, User, Settings, BarChart3, MessageSquare, CreditCard, Code, LogOut, Search, Filter, Grid, List, Calendar, Tag, Image as ImageIcon, FileText, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PaymentModal from "@/components/PaymentModal";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import CodeEditor from "@/components/CodeEditor";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [codeEditorPost, setCodeEditorPost] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; post?: any }>({ isOpen: false });
  const [viewingDetail, setViewingDetail] = useState<any>(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [profilePic, setProfilePic] = useState("https://i.postimg.cc/V65vmM15/20250117-153417.jpg");

  
  // Global search state
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  
  // New states for enhanced posts functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "title" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Machine Learning in Healthcare",
      content: "Exploring AI applications in medical diagnosis...",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
      category: "blog",
      date: "2024-01-15",
      published: true
    },
    {
      id: 2,
      title: "E-commerce Analytics Dashboard",
      content: "Real-time sales and customer insights...",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      category: "project",
      date: "2024-01-10",
      published: true
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
    category: "blog"
  });

  const [messages, setMessages] = useState([]);
  const [payments, setPayments] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast({
      title: "Logged Out 👋",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: Date.now(),
        ...newPost,
        date: new Date().toISOString().split('T')[0],
        published: false
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "", image: "", category: "blog" });
      setShowCreatePostModal(false);
      toast({
        title: "Post Created! ✨",
        description: "New post has been added successfully.",
      });
    }
  };

  const handleEditPost = (id: number) => {
    setEditingPost(id);
  };

  const handleSavePost = (id: number, updatedPost: any) => {
    setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
    setEditingPost(null);
    toast({
      title: "Post Updated! 📝",
      description: "Changes have been saved successfully.",
    });
  };

  const handleDeletePost = (post: any) => {
    setDeleteConfirmation({ isOpen: true, post });
  };

  const handleCodeEditor = (post: any) => {
    setCodeEditorPost(post);
  };

  const confirmDeletePost = () => {
    if (deleteConfirmation.post) {
      setPosts(posts.filter(p => p.id !== deleteConfirmation.post.id));
      toast({
        title: "Post Deleted! 🗑️",
        description: "Post has been removed successfully.",
      });
    }
    setDeleteConfirmation({ isOpen: false });
  };

  const handleTogglePublish = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, published: !post.published } : post
    ));
    const post = posts.find(p => p.id === id);
    toast({
      title: `Post ${post?.published ? 'Unpublished' : 'Published'}! ${post?.published ? '📤' : '📢'}`,
      description: `Post is now ${post?.published ? 'hidden from' : 'visible on'} public pages.`,
    });
  };

  const handleDuplicatePost = (post: any) => {
    const duplicatedPost = {
      ...post,
      id: Date.now(),
      title: `${post.title} (Copy)`,
      published: false,
      date: new Date().toISOString().split('T')[0]
    };
    setPosts([duplicatedPost, ...posts]);
    toast({
      title: "Post Duplicated! 📋",
      description: "Post has been duplicated successfully.",
    });
  };

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setProfilePic(result);
          toast({
            title: "Profile Picture Updated! 📸",
            description: "Your profile picture has been updated successfully.",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string, setter: Function) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setter((prev: any) => ({ ...prev, image: result }));
          toast({
            title: "Image Uploaded! 🖼️",
            description: "Image has been uploaded successfully.",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const markMessageAsRead = (id: number) => {
    const updatedMessages = messages.map((msg: any) => 
      msg.id === id ? { ...msg, status: 'read' } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const updatePaymentStatus = (id: number, status: string) => {
    const updatedPayments = payments.map((payment: any) => 
      payment.id === id ? { ...payment, status } : payment
    );
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
    toast({
      title: "Payment Status Updated! 💰",
      description: `Payment marked as ${status}.`,
    });
  };

  // Filter and sort posts (now using globalSearchTerm when on posts tab)
  const filteredAndSortedPosts = posts
    .filter(post => {
      const searchToUse = activeTab === "posts" ? (searchTerm || globalSearchTerm) : globalSearchTerm;
      const matchesSearch = post.title.toLowerCase().includes(searchToUse.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchToUse.toLowerCase());
      const matchesCategory = filterCategory === "all" || post.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "date":
        default:
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Filter messages based on global search
  const filteredMessages = messages.filter((msg: any) => {
    if (!globalSearchTerm) return true;
    return msg.name.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
           msg.email.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
           msg.subject.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
           msg.message.toLowerCase().includes(globalSearchTerm.toLowerCase());
  });

  // Filter payments based on global search
  const filteredPayments = payments.filter((payment: any) => {
    if (!globalSearchTerm) return true;
    return payment.email.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
           payment.amount.toString().includes(globalSearchTerm) ||
           payment.status.toLowerCase().includes(globalSearchTerm.toLowerCase());
  });

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "posts", label: "Posts", icon: Edit },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const stats = [
    { label: "Total Posts", value: posts.length, icon: Edit, color: "bg-blue-500" },
    { label: "Published", value: posts.filter(p => p.published).length, icon: CheckCircle, color: "bg-green-500" },
    { label: "Messages", value: messages.length, icon: MessageSquare, color: "bg-purple-500" },
    { label: "Payments", value: payments.length, icon: DollarSign, color: "bg-yellow-500" }
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-blue-900/90" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">Manage your portfolio content and settings</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          {/* Global Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search across all content..."
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/70 backdrop-blur-md border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
            {globalSearchTerm && (
              <button
                onClick={() => setGlobalSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Tab Selector */}
        <div className="lg:hidden mb-6">
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>{tab.label}</option>
            ))}
          </select>
        </div>

        <div className="grid lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 border border-slate-600 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 text-left text-sm ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-slate-800/70 backdrop-blur-md rounded-xl p-4 border border-slate-600">
                      <div className="flex items-center space-x-3">
                        <div className={`${stat.color} p-2 rounded-lg`}>
                          <stat.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <p className="text-xs text-gray-400">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-600">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 text-blue-400 mr-2" />
                      Recent Messages
                    </h3>
                    <div className="space-y-3">
                      {filteredMessages.slice(0, 3).map((msg: any) => (
                        <div key={msg.id} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                          <Mail className="h-4 w-4 text-gray-400 mt-1" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                            <p className="text-xs text-gray-400 truncate">{msg.subject}</p>
                            <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleDateString()}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${msg.status === 'unread' ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-600">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 text-green-400 mr-2" />
                      Recent Payments
                    </h3>
                    <div className="space-y-3">
                      {filteredPayments.slice(0, 3).map((payment: any) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-white">${payment.amount}</p>
                            <p className="text-xs text-gray-400">{payment.email}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                            payment.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
                            'bg-red-900/50 text-red-400'
                          }`}>
                            {payment.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Posts Tab */}
            {activeTab === "posts" && (
              <div className="space-y-6">
                {/* Posts Header with Controls */}
                <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-slate-600">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                    <h3 className="text-xl font-semibold flex items-center">
                      <Edit className="h-6 w-6 text-blue-400 mr-2" />
                      Posts Management
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => setShowCreatePostModal(true)} className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Post
                      </Button>
                      <span className="text-sm text-gray-400">
                        {filteredAndSortedPosts.length} of {posts.length} posts
                      </span>
                    </div>
                  </div>

                  {/* Filter Controls (removed local search) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="all">All Categories</option>
                      <option value="blog">Blog Posts</option>
                      <option value="project">Projects</option>
                    </select>

                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setSortBy(field as "date" | "title" | "category");
                        setSortOrder(order as "asc" | "desc");
                      }}
                      className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="title-asc">Title A-Z</option>
                      <option value="title-desc">Title Z-A</option>
                      <option value="category-asc">Category A-Z</option>
                    </select>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setViewMode("grid")}
                        size="sm"
                        variant={viewMode === "grid" ? "default" : "outline"}
                        className="flex-1 sm:flex-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => setViewMode("list")}
                        size="sm"
                        variant={viewMode === "list" ? "default" : "outline"}
                        className="flex-1 sm:flex-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Posts Display */}
                <div className={`${
                  viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                }`}>
                  {filteredAndSortedPosts.map((post) => (
                    <div key={post.id} className={`bg-slate-800/70 backdrop-blur-md rounded-2xl border border-slate-600 overflow-hidden transition-all duration-300 hover:border-slate-500 ${
                      viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                    }`}>
                      {editingPost === post.id ? (
                        <EditPostForm 
                          post={post} 
                          onSave={handleSavePost} 
                          onCancel={() => setEditingPost(null)}
                          onImageUpload={handleImageUpload}
                        />
                      ) : (
                        <>
                          {post.image && (
                            <div className={`${viewMode === "list" ? "sm:w-48 h-32 sm:h-auto" : "h-48"} relative overflow-hidden`}>
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 flex gap-1">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  post.category === 'blog' ? 'bg-blue-600/80 text-blue-100' : 'bg-purple-600/80 text-purple-100'
                                }`}>
                                  <Tag className="h-3 w-3 inline mr-1" />
                                  {post.category}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  post.published ? 'bg-green-600/80 text-green-100' : 'bg-gray-600/80 text-gray-100'
                                }`}>
                                  {post.published ? 'Live' : 'Draft'}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          <div className="p-4 sm:p-6 flex-1">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <h4 className="text-lg font-semibold text-white line-clamp-2 flex-1">
                                {post.title}
                              </h4>
                              {!post.image && (
                                <div className="flex gap-1 flex-shrink-0">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    post.category === 'blog' ? 'bg-blue-900/50 text-blue-400' : 'bg-purple-900/50 text-purple-400'
                                  }`}>
                                    {post.category}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    post.published ? 'bg-green-900/50 text-green-400' : 'bg-gray-900/50 text-gray-400'
                                  }`}>
                                    {post.published ? 'Published' : 'Draft'}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                              {post.content}
                            </p>
                            
                            <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                              <FileText className="h-3 w-3 ml-2" />
                              <span>{post.content.length} chars</span>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" onClick={() => setViewingDetail(post)} className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" onClick={() => handleCodeEditor(post)} className="bg-purple-600 hover:bg-purple-700 text-xs px-3 py-1">
                                <Code className="h-3 w-3 mr-1" />
                                Code
                              </Button>
                              <Button size="sm" onClick={() => handleEditPost(post.id)} className="bg-yellow-600 hover:bg-yellow-700 text-xs px-3 py-1">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" onClick={() => handleDuplicatePost(post)} className="bg-indigo-600 hover:bg-indigo-700 text-xs px-3 py-1">
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </Button>
                              <Button size="sm" onClick={() => handleTogglePublish(post.id)} className={`${
                                post.published ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'
                              } text-xs px-3 py-1`}>
                                {post.published ? 'Unpublish' : 'Publish'}
                              </Button>
                              <Button size="sm" onClick={() => handleDeletePost(post)} className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1">
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {filteredAndSortedPosts.length === 0 && (
                  <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-12 border border-slate-600 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400 opacity-50" />
                    <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
                    <p className="text-gray-400 mb-6">
                      {globalSearchTerm || filterCategory !== "all" 
                        ? "Try adjusting your search or filter criteria." 
                        : "Get started by creating your first post."}
                    </p>
                    {!globalSearchTerm && filterCategory === "all" && (
                      <Button onClick={() => setShowCreatePostModal(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Post
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-600">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <MessageSquare className="h-5 w-5 text-blue-400 mr-2" />
                  Contact Messages
                  {globalSearchTerm && (
                    <span className="ml-2 text-sm text-gray-400">
                      ({filteredMessages.length} of {messages.length})
                    </span>
                  )}
                </h3>
                <div className="space-y-4">
                  {filteredMessages.map((msg: any) => (
                    <div key={msg.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                      msg.status === 'unread' 
                        ? 'bg-blue-900/20 border-blue-600/50' 
                        : 'bg-slate-700/30 border-slate-600'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{msg.name}</h4>
                          <p className="text-sm text-gray-400">{msg.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
                          {msg.status === 'unread' && (
                            <Button size="sm" onClick={() => markMessageAsRead(msg.id)} className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1">
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                      <h5 className="font-medium text-gray-300 mb-2">{msg.subject}</h5>
                      <p className="text-gray-400 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                  {filteredMessages.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{globalSearchTerm ? "No messages match your search" : "No messages yet"}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-600">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 text-green-400 mr-2" />
                    Payment Management
                    {globalSearchTerm && (
                      <span className="ml-2 text-sm text-gray-400">
                        ({filteredPayments.length} of {payments.length})
                      </span>
                    )}
                  </h3>
                  <Button onClick={() => setShowPaymentModal(true)} className="bg-blue-600 hover:bg-blue-700">
                    Setup Payment
                  </Button>
                </div>
                <div className="space-y-4">
                  {filteredPayments.map((payment: any) => (
                    <div key={payment.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Amount</p>
                          <p className="font-semibold text-white">${payment.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Email</p>
                          <p className="text-sm text-gray-300 truncate">{payment.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Method</p>
                          <p className="text-sm text-gray-300 capitalize">{payment.method}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Date</p>
                          <p className="text-sm text-gray-300">{new Date(payment.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {payment.screenshot && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-400 mb-2">Payment Screenshot</p>
                          <img src={payment.screenshot} alt="Payment proof" className="w-32 h-24 object-cover rounded border border-slate-600" />
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                          payment.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
                          'bg-red-900/50 text-red-400'
                        }`}>
                          {payment.status}
                        </span>
                        {payment.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => updatePaymentStatus(payment.id, 'completed')} className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1">
                              Approve
                            </Button>
                            <Button size="sm" onClick={() => updatePaymentStatus(payment.id, 'rejected')} className="bg-red-600 hover:bg-red-700 text-xs px-2 py-1">
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredPayments.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{globalSearchTerm ? "No payments match your search" : "No payments yet"}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Profile Settings */}
                <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <User className="h-5 w-5 text-blue-400 mr-2" />
                    Profile Settings
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400/30 mb-4">
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicUpload}
                        className="hidden"
                        id="profile-pic-upload"
                      />
                      <label htmlFor="profile-pic-upload" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors text-sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Update Photo
                      </label>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue="Alex Johnson"
                          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="alex.johnson@portfolio.dev"
                          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                        <textarea
                          defaultValue="Data Scientist & Full-Stack Developer passionate about turning data into insights and building amazing web experiences."
                          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none text-sm"
                          rows={3}
                        />
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePostModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-600">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Plus className="h-6 w-6 text-green-400 mr-2" />
                    Create New Post
                  </h3>
                  <Button onClick={() => setShowCreatePostModal(false)} size="sm" className="bg-slate-700 hover:bg-slate-600">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Post Title</label>
                      <input
                        type="text"
                        placeholder="Enter post title..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
                      >
                        <option value="blog">Blog Post</option>
                        <option value="project">Project</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                    <textarea
                      placeholder="Write your post content here..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none text-sm"
                      rows={6}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
                    <div className="flex flex-col gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'new', setNewPost)}
                        className="hidden"
                        id="create-post-image"
                      />
                      <label htmlFor="create-post-image" className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer transition-colors text-sm border border-slate-600">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Upload Cover Image
                      </label>
                      {newPost.image && (
                        <div className="relative">
                          <img src={newPost.image} alt="Cover preview" className="w-full h-48 object-cover rounded-lg border border-slate-600" />
                          <Button 
                            onClick={() => setNewPost({...newPost, image: ""})}
                            size="sm" 
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4 border-t border-slate-600">
                    <Button onClick={handleAddPost} className="bg-green-600 hover:bg-green-700 flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                    <Button onClick={() => setShowCreatePostModal(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {viewingDetail && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-600">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">{viewingDetail.title}</h3>
                  <Button onClick={() => setViewingDetail(null)} size="sm" className="bg-slate-700 hover:bg-slate-600">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {viewingDetail.image && (
                  <img src={viewingDetail.image} alt={viewingDetail.title} className="w-full h-48 object-cover rounded-lg mb-6" />
                )}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      viewingDetail.category === 'blog' ? 'bg-blue-900/50 text-blue-400' : 'bg-purple-900/50 text-purple-400'
                    }`}>
                      {viewingDetail.category}
                    </span>
                    <span className="text-sm text-gray-400">{viewingDetail.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      viewingDetail.published ? 'bg-green-900/50 text-green-400' : 'bg-gray-900/50 text-gray-400'
                    }`}>
                      {viewingDetail.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="prose prose-gray prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">{viewingDetail.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor Modal */}
        {codeEditorPost && (
          <CodeEditor
            post={codeEditorPost}
            onSave={handleSavePost}
            onClose={() => setCodeEditorPost(null)}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmation
          isOpen={deleteConfirmation.isOpen}
          onClose={() => setDeleteConfirmation({ isOpen: false })}
          onConfirm={confirmDeletePost}
          itemType="post"
          itemName={deleteConfirmation.post?.title || ""}
        />

        {/* Payment Modal */}
        {showPaymentModal && (
          <PaymentModal 
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            project={{
              title: "Admin Setup",
              price: "$0"
            }}
          />
        )}
      </div>
    </div>
  );
};

// Edit Post Form Component
const EditPostForm = ({ post, onSave, onCancel, onImageUpload }: any) => {
  const [editedPost, setEditedPost] = useState(post);

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
            placeholder="Post Title"
          />
          <select
            value={editedPost.category}
            onChange={(e) => setEditedPost({...editedPost, category: e.target.value})}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value="blog">Blog Post</option>
            <option value="project">Project</option>
          </select>
        </div>
        <textarea
          value={editedPost.content}
          onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none text-sm"
          rows={4}
          placeholder="Post Content"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageUpload(e, 'edit', setEditedPost)}
              className="hidden"
              id={`edit-image-${post.id}`}
            />
            <label htmlFor={`edit-image-${post.id}`} className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer transition-colors text-sm">
              <Upload className="h-4 w-4 mr-2" />
              Change Image
            </label>
            {editedPost.image && (
              <div className="mt-3">
                <img src={editedPost.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-slate-600" />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onSave(post.id, editedPost)} className="bg-green-600 hover:bg-green-700 text-sm px-4">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-sm px-4">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
