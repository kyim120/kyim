
import { useState } from "react";
import { Save, X, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  post: any;
  onSave: (id: number, updatedPost: any) => void;
  onClose: () => void;
}

const CodeEditor = ({ post, onSave, onClose }: CodeEditorProps) => {
  const [editedPost, setEditedPost] = useState(post);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    onSave(post.id, editedPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-600 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600/20 p-2 rounded-lg">
              <Code className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Code Editor</h3>
              <p className="text-sm text-gray-400">Editing: {post.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setPreviewMode(!previewMode)}
              size="sm"
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={onClose} size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Editor Panel */}
          <div className={`${previewMode ? "w-1/2" : "w-full"} border-r border-slate-700 flex flex-col`}>
            <div className="p-4 border-b border-slate-700 bg-slate-900/30">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Post Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={editedPost.title}
                  onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
                  className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Post Title"
                />
                <select
                  value={editedPost.category}
                  onChange={(e) => setEditedPost({...editedPost, category: e.target.value})}
                  className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="blog">Blog</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
              <textarea
                value={editedPost.content}
                onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
                className="w-full h-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm leading-relaxed"
                placeholder="Write your content here..."
              />
            </div>
          </div>

          {/* Preview Panel */}
          {previewMode && (
            <div className="w-1/2 flex flex-col">
              <div className="p-4 border-b border-slate-700 bg-slate-900/30">
                <h4 className="text-sm font-medium text-gray-300">Live Preview</h4>
              </div>
              <div className="flex-1 p-6 overflow-y-auto bg-slate-900/20">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  {editedPost.image && (
                    <img src={editedPost.image} alt={editedPost.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      editedPost.category === 'blog' ? 'bg-blue-900/50 text-blue-400' : 'bg-purple-900/50 text-purple-400'
                    }`}>
                      {editedPost.category}
                    </span>
                    <span className="text-xs text-gray-500">{editedPost.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{editedPost.title || "Untitled Post"}</h3>
                  <div className="prose prose-gray prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {editedPost.content || "No content yet..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
