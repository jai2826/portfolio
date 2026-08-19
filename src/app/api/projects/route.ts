import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from '@/lib/projects-store';
import { ProjectFormData } from '@/types/project';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const AUTH_COOKIE_NAME = 'admin_auth_token';

function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const expectedToken = Buffer.from(`admin-session:${ADMIN_PASSWORD}:auth-key`).toString('base64');
  return !!token && token === expectedToken;
}

// GET /api/projects - Public: fetch all active projects
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to get projects:', error);
    return NextResponse.json({ message: 'Failed to retrieve projects' }, { status: 500 });
  }
}

// POST /api/projects - Admin: create new project
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, tagline, technologies, bullets, links, order, featured } = body;

    if (!title || !tagline) {
      return NextResponse.json({ message: 'Title and tagline are required' }, { status: 400 });
    }

    const projectData: ProjectFormData = {
      title,
      tagline,
      technologies: Array.isArray(technologies) ? technologies : [],
      bullets: Array.isArray(bullets) ? bullets : [],
      links: Array.isArray(links) ? links : [],
      order: typeof order === 'number' ? order : undefined,
      featured: typeof featured === 'boolean' ? featured : true,
    };

    const newProject = await createProject(projectData);
    revalidatePath('/');

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ message: 'Failed to create project' }, { status: 500 });
  }
}

// PUT /api/projects - Admin: update project or reorder
export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Check if this is a reorder action
    if (body.action === 'reorder' && Array.isArray(body.orderedIds)) {
      const updated = await reorderProjects(body.orderedIds);
      revalidatePath('/');
      return NextResponse.json(updated);
    }

    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    const updated = await updateProject(id, data);
    if (!updated) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    revalidatePath('/');
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ message: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects - Admin: delete project by id
export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    const success = await deleteProject(id);
    if (!success) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    revalidatePath('/');
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ message: 'Failed to delete project' }, { status: 500 });
  }
}
