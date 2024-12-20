-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    summary TEXT NOT NULL,
    long_summary TEXT,
    contact JSONB NOT NULL DEFAULT '{}',
    social_links JSONB NOT NULL DEFAULT '{}',
    skills JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projects table with updated fields and constraints
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    icon TEXT,
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    category TEXT,
    slug TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    technical_details TEXT,
    key_features TEXT[],
    challenges TEXT,
    solutions TEXT,
    github_url TEXT,
    live_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    featured_image TEXT,
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Media table
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    path TEXT NOT NULL,
    size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Settings table (updated)
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    site_title TEXT,
    meta_description TEXT,
    keywords TEXT[],
    social_links JSONB DEFAULT '{}',
    contact_email TEXT,
    contact_phone TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- About content table (new)
CREATE TABLE about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '{}',
    experience JSONB NOT NULL DEFAULT '[]',
    education JSONB NOT NULL DEFAULT '[]',
    achievements TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Update home_content table to store avatar image path
DROP TABLE IF EXISTS home_content;

CREATE TABLE home_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    summary TEXT NOT NULL,
    long_summary TEXT,
    avatar_url TEXT,
    social_links JSONB,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Add trigger for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON home_content
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Add RLS policies
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Home content is viewable by everyone"
    ON home_content FOR SELECT
    USING (true);

CREATE POLICY "Home content is editable by admins"
    ON home_content FOR ALL
    USING (auth.role() = 'authenticated');

-- Create bucket for avatar images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to avatars bucket
CREATE POLICY "Avatar images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

-- Allow authenticated users to upload avatars
CREATE POLICY "Authenticated users can upload avatars"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Allow authenticated users to update avatars
CREATE POLICY "Authenticated users can update avatars"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete avatars
CREATE POLICY "Authenticated users can delete avatars"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON about_content
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Profiles are editable by admins"
    ON profiles FOR ALL
    USING (auth.role() = 'authenticated');

-- Projects policies
CREATE POLICY "Published projects are viewable by everyone"
    ON projects FOR SELECT
    USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Projects are editable by admins"
    ON projects FOR ALL
    USING (auth.role() = 'authenticated');

-- Blog posts policies
CREATE POLICY "Published posts are viewable by everyone"
    ON blog_posts FOR SELECT
    USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Posts are editable by admins"
    ON blog_posts FOR ALL
    USING (auth.role() = 'authenticated');

-- Media policies
CREATE POLICY "Media is viewable by everyone"
    ON media FOR SELECT
    USING (true);

CREATE POLICY "Media is editable by admins"
    ON media FOR ALL
    USING (auth.role() = 'authenticated');

-- Settings policies
CREATE POLICY "Settings are viewable by everyone"
    ON settings FOR SELECT
    USING (true);

CREATE POLICY "Settings are editable by admins"
    ON settings FOR ALL
    USING (auth.role() = 'authenticated');

-- About content policies
CREATE POLICY "About content is viewable by everyone"
    ON about_content FOR SELECT
    USING (true);

CREATE POLICY "About content is editable by admins"
    ON about_content FOR ALL
    USING (auth.role() = 'authenticated');

-- Create optimized indexes for better query performance
CREATE INDEX IF NOT EXISTS projects_slug_status_idx ON projects(slug, status);
CREATE INDEX IF NOT EXISTS projects_status_display_order_idx ON projects(status, display_order);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS home_content_featured_projects_idx ON home_content USING GIN (featured_project_ids);

-- Drop redundant single-column indexes since we have combined ones
DROP INDEX IF EXISTS projects_status_idx;
DROP INDEX IF EXISTS projects_slug_idx;