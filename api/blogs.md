# Blogs API Documentation

The Blogs API provides endpoints to fetch published blog posts. These APIs return data formatted as JSON.

## Get All Published Blogs

Returns a list of all blogs that have a status of `'published'`, sorted by their publication date (newest first).

**Endpoint:**
`GET /api/blogs`

**Example Request:**
```http
GET https://340realestate.com/api/blogs
```

**Success Response (200 OK):**
```json
{
  "blogs": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Top 10 Things to do in St. John",
      "slug": "top-10-things-st-john",
      "excerpt": "Discover the most amazing activities.",
      "cover_image": "/api/uploads/beach.jpg",
      "author": "340 Real Estate",
      "published_at": "2026-03-01T12:00:00.000Z",
      "updated_at": "2026-03-02T15:00:00.000Z"
    }
  ]
}
```

---

## Get Single Blog

Returns the full details and content of a single published blog post identified by its unique slug.

**Endpoint:**
`GET /api/blogs/[slug]`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | The URL-friendly identifier of the blog post. |

**Example Request:**
```http
GET https://340realestate.com/api/blogs/top-10-things-st-john
```

**Success Response (200 OK):**
```json
{
  "blog": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Top 10 Things to do in St. John",
    "slug": "top-10-things-st-john",
    "excerpt": "Discover the most amazing activities.",
    "cover_image": "/api/uploads/beach.jpg",
    "author": "340 Real Estate",
    "status": "published",
    "content_blocks": [
      {
        "type": "paragraph",
        "data": {
          "text": "The beaches in St. John are unlike any other..."
        }
      }
    ],
    "published_at": "2026-03-01T12:00:00.000Z",
    "created_at": "2026-03-01T10:00:00.000Z",
    "updated_at": "2026-03-02T15:00:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Returns `{"error": "Blog not found"}` if the blog doesn't exist or is not published.
- `500 Server Error`: Returns `{"error": "Failed to load blog"}` in case of a database error.
