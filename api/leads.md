# Leads API Documentation

The Leads API allows you to submit user inquiries and fetch a list of all submitted leads. These APIs use JSON for requests and responses.

## Submit a New Lead

Creates a new lead entry in the database. Typically used for contact forms or property inquiry submissions.

**Endpoint:**
`POST /api/leads`

**Request Headers:**
`Content-Type: application/json`

**Request Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | The name of the person inquiring. |
| `email` | string | Yes | The email address of the person inquiring. |
| `mobile` | string | No | The phone number. |
| `message` | string | No | The user's message or question. |
| `property_id` | string | No | The ID of the property they are inquiring about. |
| `property_title`| string | No | The title of the property. |
| `property_slug` | string | No | The URL-friendly slug of the property. |

**Example Request:**
```http
POST https://340realestate.com/api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "mobile": "555-0198",
  "message": "I would like to schedule a viewing.",
  "property_id": "prop-1234abcd5678",
  "property_title": "Beautiful Villa",
  "property_slug": "beautiful-villa-abcd"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "lead": {
    "id": "1",
    "submitted_at": "2026-03-05T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Returns `{"error": "Name and email are required."}` if validation fails.
- `500 Server Error`: Returns `{"error": "Failed to submit lead."}`.

---

## Get All Leads

Retrieves all leads submitted via the website. Leads are sorted descending by submission date. **Note:** This endpoint currently does not enforce authentication, but in production, ensure appropriate access control is implemented.

**Endpoint:**
`GET /api/leads`

**Example Request:**
```http
GET https://340realestate.com/api/leads
```

**Success Response (200 OK):**
```json
{
  "leads": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "mobile": "555-0198",
      "message": "I would like to schedule a viewing.",
      "property_id": "prop-1234abcd5678",
      "property_title": "Beautiful Villa",
      "property_slug": "beautiful-villa-abcd",
      "status": "new",
      "source": "website",
      "submitted_at": "2026-03-05T12:00:00.000Z",
      "contacted_at": null,
      "notes": null
    }
  ]
}
```

**Error Responses:**
- `500 Server Error`: Returns `{"error": "Failed to fetch leads."}` in case of a database error.
