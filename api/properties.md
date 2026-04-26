# Properties API Documentation

The Properties API provides endpoints to fetch real estate listings available for sale. These APIs return data formatted as JSON.

## Get All Properties

Returns a list of all properties, optionally filtered by type or subcategory.

**Endpoint:**
`GET /api/properties`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | Filter by property type (e.g., `residential`, `commercial`, `land`). Case-insensitive. |
| `subcategory` | string | No | Filter by subcategory (e.g., `Single Family`, `Condo`). Case-insensitive. |

**Example Request:**
```http
GET https://340realestate.com/api/properties?type=residential
```

**Success Response (200 OK):**
```json
{
  "properties": [
    {
      "id": "prop-1234abcd5678",
      "title": "Beautiful Villa",
      "description": "A stunning villa with ocean views...",
      "subcategory": "Single Family",
      "property_type": "residential",
      "source": "internal",
      "price": "1500000.00",
      "square_feet": 2500,
      "bedrooms": 3,
      "bathrooms": "2.5",
      "has_pool": true,
      "show_package_details": false,
      "under_contract": false,
      "slug": "beautiful-villa-abcd",
      "created_at": "2026-03-05T12:00:00.000Z",
      "updated_at": "2026-03-06T14:30:00.000Z",
      "address": "123 Ocean Dr",
      "country": "VI",
      "latitude": "18.33000000",
      "longitude": "-64.73000000",
      "grade": "A+",
      "lot_size_sqft": 21780,
      "lot_size_acres": "0.50",
      "beds": 3,
      "baths": "2.5",
      "pool": true,
      "listing_type": "For Sale",
      "zoning": "R-1",
      "mls_list_date": "2026-01-15T00:00:00.000Z",
      "images": [
        "/api/uploads/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "amenities": [
        "Ocean View",
        "Private Pool"
      ]
    }
  ]
}
```

---

## Get Single Property

Returns the full details of a specific property identified by its unique slug.

**Endpoint:**
`GET /api/properties/[slug]`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | The unique URL-friendly string identifying the property. |

**Example Request:**
```http
GET https://340realestate.com/api/properties/beautiful-villa-abcd
```

**Success Response (200 OK):**
```json
{
  "property": {
    "id": "prop-1234abcd5678",
    "title": "Beautiful Villa",
    "description": "A stunning villa with ocean views...",
    "subcategory": "Single Family",
    "property_type": "residential",
    "source": "internal",
    "price": "1500000.00",
    "square_feet": 2500,
    "bedrooms": 3,
    "bathrooms": "2.5",
    "has_pool": true,
    "show_package_details": false,
    "under_contract": false,
    "slug": "beautiful-villa-abcd",
    "created_at": "2026-03-05T12:00:00.000Z",
    "updated_at": "2026-03-06T14:30:00.000Z",
    "address": "123 Ocean Dr",
    "country": "VI",
    "latitude": "18.33000000",
    "longitude": "-64.73000000",
    "grade": "A+",
    "lot_size_sqft": 21780,
    "lot_size_acres": "0.50",
    "beds": 3,
    "baths": "2.5",
    "pool": true,
    "listing_type": "For Sale",
    "zoning": "R-1",
    "road_assessment_year": 2023,
    "mls_list_date": "2026-01-15T00:00:00.000Z",
    "images": [
        "/api/uploads/image1.jpg",
        "https://example.com/image2.jpg"
    ],
    "amenities": [
        "Ocean View",
        "Private Pool"
    ]
  }
}
```

**Error Responses:**
- `404 Not Found`: Returns `{"error": "Property not found"}` if the slug is invalid.
- `500 Server Error`: Returns `{"error": "Failed to load property"}` in case of a database issue.
