-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  images JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100),
  image_data BYTEA NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Insert sample projects for demonstration
INSERT INTO projects (name, description) VALUES
  (
    'Luxury Dubai Penthouse',
    'A stunning 5-bedroom penthouse in Downtown Dubai featuring floor-to-ceiling windows, infinity pool, and panoramic city views. High-end 3D visualization and technical detailing.'
  ),
  (
    'Cairo Modern Office Complex',
    'Contemporary office space in New Cairo with sustainable design principles, open-plan layouts, and integrated green spaces.'
  ),
  (
    'Abu Dhabi Residential Development',
    'Large-scale residential project featuring multiple villa types with modern architecture and sophisticated exterior design.'
  );
