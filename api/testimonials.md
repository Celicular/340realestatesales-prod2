# Testimonials API Documentation

The Testimonials API provides endpoints to fetch approved customer reviews and submit new reviews for admin approval. These APIs use JSON for requests and responses.

## Submit Testimonial

Submits a new customer testimonial. The testimonial is saved with a status of `'pending'` and needs to be approved by an administrator before it is publicly visible.

**Endpoint:**
`POST /api/testimonials`

**Request Headers:**
`Content-Type: application/json`

**Request Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | The name of the reviewer. |
| `rating` | integer | Yes | A rating out of 5. Values must be between `1` and `5`. |
| `review` | string | Yes | The text content of the user's review. |

**Example Request:**
```http
POST https://340realestate.com/api/testimonials
Content-Type: application/json

{
  "name": "Jane Smith",
  "rating": 5,
  "review": "The team at 340 Real Estate helped me find the perfect home in St. John. Highly recommended!"
}
```

**Success Response (200 OK):**
```json
{
  "testimonial": {
    "id": "abc12345-e89b-12d3-a456-426614174000",
    "name": "Jane Smith",
    "rating": 5,
    "review": "The team at 340 Real Estate helped me find the perfect home in St. John. Highly recommended!",
    "status": "pending",
    "created_at": "2026-03-05T12:00:00.000Z",
    "updated_at": "2026-03-05T12:00:00.000Z"
  },
  "message": "Testimonial submitted for review"
}
```

**Error Responses:**
- `400 Bad Request`: Returns `{"error": "Invalid data"}` if validation fails (e.g. missing name, invalid rating format).
- `500 Server Error`: Returns `{"error": "Failed to submit testimonial"}`.

---

## Get Approved Testimonials

Fetches all publicly visible testimonials that have an `'approved'` status.

**Endpoint:**
`GET /api/testimonials`

**Example Request:**
```http
GET https://340realestate.com/api/testimonials
```

**Success Response (200 OK):**
```json
{
  "testimonials": [
    {
      "id": "abc12345-e89b-12d3-a456-426614174000",
      "name": "Jane Smith",
      "rating": 5,
      "review": "The team at 340 Real Estate helped me find the perfect home in St. John. Highly recommended!",
      "status": "approved",
      "created_at": "2026-03-05T12:00:00.000Z",
      "updated_at": "2026-03-05T12:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `500 Server Error`: Returns `{"error": "Failed to load testimonials"}` in case of a database issue.
