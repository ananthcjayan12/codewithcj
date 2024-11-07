# API Implementation Plan

## Base Configuration
- Environment Variables:  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  API_SECRET_KEY=your-api-key  ```

## Projects API

### 1. GET /api/projects
- Public endpoint
- Query Parameters:
  - status: 'draft' | 'published'
  - category: string
  - tag: string
- Response: Array of projects
- Implementation Status: ✅

### 2. POST /api/projects
- Protected (API key required)
- Request Body:  ```typescript
  {
    title: string
    description: string
    long_description?: string
    icon?: string
    tags: string[]
    category?: string
    status: 'draft' | 'published'
    technical_details?: string
    key_features?: string[]
    challenges?: string
    solutions?: string
    github_url?: string
    live_url?: string
  }  ```
- Response: Created project
- Implementation Status: ✅

### 3. PUT /api/projects
- Protected (API key required)
- Request Body: Same as POST + id field
- Response: Updated project
- Implementation Status: ✅

### 4. DELETE /api/projects
- Protected (API key required)
- Query Parameters:
  - id: string (required)
- Response: 204 No Content
- Implementation Status: ✅

## Blog API

### 1. GET /api/blog
- Public endpoint
- Query Parameters:
  - status: 'draft' | 'published'
  - tag: string
- Response: Array of blog posts
- Implementation Status: ✅

### 2. POST /api/blog
- Protected (API key required)
- Request Body:  ```typescript
  {
    title: string
    content: string
    excerpt: string
    featured_image?: string
    tags: string[]
    status: 'draft' | 'published'
  }  ```
- Response: Created blog post
- Implementation Status: ✅

### 3. PUT /api/blog
- Protected (API key required)
- Request Body: Same as POST + id field
- Response: Updated blog post
- Implementation Status: ✅

### 4. DELETE /api/blog
- Protected (API key required)
- Query Parameters:
  - id: string (required)
- Response: 204 No Content
- Implementation Status: ✅

## Authentication
- All protected endpoints require x-api-key header
- API key must match API_SECRET_KEY environment variable
- No session-based auth needed

## Error Handling
- 400: Bad Request (invalid input)
- 401: Unauthorized (missing/invalid API key)
- 404: Not Found
- 500: Server Error

## Testing Steps
1. Set up environment variables
2. Test GET endpoints (no auth)
3. Test POST with API key
4. Test PUT with API key
5. Test DELETE with API key
6. Verify error responses

## Postman Collection
- Import projects.json
- Set environment variables:
  - base_url: http://localhost:3000
  - apiKey: your-api-key-here