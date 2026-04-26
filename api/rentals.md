# Rentals API Documentation

The Rentals API provides endpoints to fetch available vacation and rental properties. These APIs return data formatted as JSON.

## Get All Rentals

Returns a complete list of all active or approved rentals, including their rates, amenities, and images.

**Endpoint:**
`GET /api/rentals`

**Example Request:**
```http
GET https://340realestate.com/api/rentals
```

**Success Response (200 OK):**
```json
{
  "rentals": [
    {
      "id": "rent-1234abcd5678",
      "title": "Oceanfront Seaside Cottage",
      "type": "villa",
      "status": "active",
      "address": "45 Beachside Rd",
      "slug": "oceanfront-seaside-cottage",
      "bedrooms": 2,
      "bathrooms": "2.0",
      "max_occupancy": 4,
      "cover_image": "/api/uploads/cottage.jpg",
      "children": true,
      "pets": false,
      "smoking": false,
      "images": [
        "/api/uploads/cottage.jpg",
        "https://example.com/cottage2.jpg"
      ],
      "amenities": [
        "Wi-Fi",
        "Air Conditioning"
      ],
      "rates": [
        {
          "season": "in_season",
          "guests_range": "one_to_four",
          "amount": 450.00
        },
        {
          "season": "off_season",
          "guests_range": "one_to_four",
          "amount": 300.00
        }
      ]
    }
  ]
}
```

**Error Responses:**
- `500 Server Error`: Returns `{"error": "Failed to load rentals"}` in case of a database error.
