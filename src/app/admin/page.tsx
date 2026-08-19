'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Project, ProjectLink } from '@/types/project';

const DEFAULT_TECH_SUGGESTIONS = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui',
  'Node.js', 'Hono', 'Appwrite', 'Convex', 'MongoDB', 'PostgreSQL',
  'RAG', 'Vapi', 'Vercel AI SDK', 'TanStack Query', 'Python', 'Docker'
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    tagline: string;
    technologies: string[];
    bullets: string[];
    links: ProjectLink[];
  }>({
    title: '',
    tagline: '',
    technologies: [],
    bullets: [''],
    links: [{ label: 'Live Dashboard', url: '' }],
  });

  const [newTechInput, setNewTechInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data: Project[] = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
      showNotification('Failed to load projects from server', 'error');
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function initSession() {
      try {
        const res = await fetch('/api/admin/auth');
        if (!ignore) {
          if (res.ok) {
            setIsAuthenticated(true);
            loadProjects();
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch {
        if (!ignore) {
          setIsAuthenticated(false);
        }
      }
    }

    initSession();

    return () => {
      ignore = true;
    };
  }, [loadProjects]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        loadProjects();
        showNotification('Welcome back! Logged in as Admin.');
      } else {
        setAuthError(data.message || 'Invalid password');
      }
    } catch {
      setAuthError('An error occurred during authentication');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setPassword('');
  };

  const openCreateModal = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      tagline: '',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      bullets: [''],
      links: [
        { label: 'Live Dashboard', url: '' },
        { label: 'GitHub', url: '' }
      ],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title,
      tagline: project.tagline,
      technologies: [...project.technologies],
      bullets: project.bullets && project.bullets.length > 0 ? [...project.bullets] : [''],
      links: project.links && project.links.length > 0 ? project.links.map(l => ({ ...l })) : [{ label: 'Live Demo', url: '' }],
    });
    setIsModalOpen(true);
  };

  const handleAddTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !formData.technologies.includes(trimmed)) {
      setFormData(prev => ({ ...prev, technologies: [...prev.technologies, trimmed] }));
    }
    setNewTechInput('');
  };

  const handleRemoveTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleAddBullet = () => {
    setFormData(prev => ({ ...prev, bullets: [...prev.bullets, ''] }));
  };

  const handleUpdateBullet = (index: number, value: string) => {
    setFormData(prev => {
      const updated = [...prev.bullets];
      updated[index] = value;
      return { ...prev, bullets: updated };
    });
  };

  const handleRemoveBullet = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bullets: prev.bullets.filter((_, i) => i !== index),
    }));
  };

  const handleAddLink = () => {
    setFormData(prev => ({ ...prev, links: [...prev.links, { label: 'GitHub', url: '' }] }));
  };

  const handleUpdateLink = (index: number, field: 'label' | 'url', value: string) => {
    setFormData(prev => {
      const updated = [...prev.links];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, links: updated };
    });
  };

  const handleRemoveLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.tagline) {
      showNotification('Title and Tagline are required', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const cleanedBullets = formData.bullets.map(b => b.trim()).filter(Boolean);
      const cleanedLinks = formData.links.map(l => ({ label: l.label.trim(), url: l.url.trim() })).filter(l => l.label && l.url);

      const payload = {
        title: formData.title.trim(),
        tagline: formData.tagline.trim(),
        technologies: formData.technologies,
        bullets: cleanedBullets,
        links: cleanedLinks,
      };

      if (editingProjectId) {
        // Update
        const res = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProjectId, ...payload }),
        });

        if (res.ok) {
          showNotification('Project updated successfully!');
          setIsModalOpen(false);
          loadProjects();
        } else {
          const err = await res.json();
          showNotification(err.message || 'Failed to update project', 'error');
        }
      } else {
        // Create
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          showNotification('New project added successfully!');
          setIsModalOpen(false);
          loadProjects();
        } else {
          const err = await res.json();
          showNotification(err.message || 'Failed to create project', 'error');
        }
      }
    } catch {
      showNotification('Network error while saving project', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showNotification('Project deleted');
        setDeleteConfirmId(null);
        loadProjects();
      } else {
        const err = await res.json();
        showNotification(err.message || 'Failed to delete project', 'error');
      }
    } catch {
      showNotification('Network error while deleting project', 'error');
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const reordered = [...projects];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setProjects(reordered);

    try {
      const orderedIds = reordered.map(p => p.id);
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reorder', orderedIds }),
      });
      showNotification('Order updated');
    } catch {
      showNotification('Failed to update order', 'error');
      loadProjects();
    }
  };

  // 1. Loading screen during initial auth verification
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-zinc-400">Verifying session...</span>
        </div>
      </div>
    );
  }

  // 2. Login Gateway
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-50 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00D9FF]/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#a855f7]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-[#121215]/90 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-9 w-9 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Portfolio Admin</h1>
              <p className="text-xs text-zinc-400 font-mono">Manage projects & portfolio data</p>
            </div>
          </div>

          {authError && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <span>⚠</span>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">Admin Passkey</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(0,217,255,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAuthLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Unlocking...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
            <Link href="/" className="hover:text-[#00D9FF] transition-colors flex items-center gap-1">
              <span>← Back to Portfolio</span>
            </Link>
            <span className="font-mono">v1.0</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Admin Dashboard Studio
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-50 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {notification && (
        <div 
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm flex items-center gap-2 animate-bounce-short ${
            notification.type === 'success' 
              ? 'bg-[#00D9FF]/10 border-[#00D9FF]/40 text-[#00D9FF]' 
              : 'bg-red-500/10 border-red-500/40 text-red-400'
          }`}
        >
          <span>{notification.type === 'success' ? '✓' : '⚠'}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-white tracking-tight hover:text-[#00D9FF] transition-colors flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse" />
              <span>Portfolio Studio</span>
            </Link>
            <span className="text-xs font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
              CMS Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1.5 border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 rounded-lg"
            >
              <span>View Live Portfolio</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Header Hero Stats & Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-zinc-800/80">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Projects Management</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Add, update, reorder, or remove projects shown on your live portfolio.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(0,217,255,0.4)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add New Project</span>
            </button>
          </div>
        </div>

        {/* Projects List */}
        {isLoadingProjects ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-mono text-zinc-400">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center flex flex-col items-center">
            <p className="text-zinc-400 mb-4">No projects found. Add your first project!</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm"
            >
              + Create First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative rounded-2xl border border-zinc-800/80 bg-[#101014]/90 p-6 md:p-8 hover:border-[#38BDF8]/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-400">
                          #{index + 1}
                        </span>
                        <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                      </div>
                      <p className="text-[#00D9FF] text-sm font-mono mt-1">{project.tagline}</p>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2">
                      {/* Reorder Buttons */}
                      <div className="flex items-center border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/60">
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveOrder(index, 'up')}
                          className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
                          title="Move Up"
                        >
                          ▲
                        </button>
                        <button
                          disabled={index === projects.length - 1}
                          onClick={() => handleMoveOrder(index, 'down')}
                          className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
                          title="Move Down"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(project)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                        </svg>
                        <span>Edit</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => setDeleteConfirmId(project.id)}
                        className="p-2 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 text-xs transition-colors"
                        title="Delete Project"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/90 px-2.5 py-0.5 text-xs font-mono text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bullet points */}
                  {project.bullets && project.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {project.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                          <span className="text-[#00D9FF] text-xs mt-1 shrink-0">◆</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Links */}
                {project.links && project.links.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-zinc-500 mr-2">LINKS:</span>
                    {project.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-zinc-700/80 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#38BDF8]/40 transition-colors"
                      >
                        <span>{link.label}</span>
                        <span className="text-[10px] text-zinc-500">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-[#121215] border border-red-500/30 rounded-2xl p-6 shadow-2xl animate-fade-in">
            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete this project? This action will immediately remove it from your live portfolio.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Project Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#121215] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingProjectId ? 'Edit Project' : 'Add New Project'}
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Configure details, technology badges, key accomplishments, and links
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-6">
              {/* Title & Tagline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Fynco"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Subtitle / Tagline *</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    placeholder="e.g. SaaS Task Management Platform"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              {/* Technologies Input & Chips */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Technologies / Stack</label>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="text"
                    value={newTechInput}
                    onChange={(e) => setNewTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech(newTechInput);
                      }
                    }}
                    placeholder="Type tech name and press Enter (e.g. Next.js)"
                    className="flex-1 px-4 py-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTech(newTechInput)}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-mono"
                  >
                    + Add
                  </button>
                </div>

                {/* Selected Tech Chips */}
                <div className="flex flex-wrap gap-2 min-h-[32px] p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
                  {formData.technologies.length === 0 ? (
                    <span className="text-xs text-zinc-500 font-mono">No tech tags added yet</span>
                  ) : (
                    formData.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-800 text-xs font-mono text-zinc-200"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(idx)}
                          className="text-zinc-400 hover:text-red-400 transition-colors"
                        >
                          ✕
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* Quick suggestions */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-zinc-500">Quick add:</span>
                  {DEFAULT_TECH_SUGGESTIONS.slice(0, 8).map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleAddTech(suggestion)}
                      className="text-[11px] font-mono text-zinc-400 hover:text-[#00D9FF] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                    >
                      +{suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bullet points builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-zinc-400">Key Highlights / Bullet Points</label>
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="text-xs font-mono text-[#00D9FF] hover:underline"
                  >
                    + Add Bullet Point
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#00D9FF] font-mono text-xs">#{idx + 1}</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                        placeholder={`Bullet ${idx + 1}: e.g. Implemented real-time Kanban board...`}
                        className="flex-1 px-4 py-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(idx)}
                        disabled={formData.bullets.length === 1}
                        className="p-2 text-zinc-500 hover:text-red-400 disabled:opacity-20 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-zinc-400">Action Links (Demo, GitHub, etc.)</label>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="text-xs font-mono text-[#00D9FF] hover:underline"
                  >
                    + Add Link
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.links.map((link, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleUpdateLink(idx, 'label', e.target.value)}
                        placeholder="Label (e.g. Live Dashboard)"
                        className="w-full sm:w-48 px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleUpdateLink(idx, 'url', e.target.value)}
                        placeholder="URL (e.g. https://... or #)"
                        className="flex-1 w-full px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(idx)}
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors self-end sm:self-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingProjectId ? 'Save Changes' : 'Create Project'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
