# Property API Documentation

## Overview

The Property API is a FastAPI-based REST API for managing and retrieving real estate property listings. The API automatically syncs property data from an MLS source every 2 hours to keep information current, while returning data instantly without blocking requests.

### Key Features

- **Auto-Resync**: Automatically checks and syncs properties every 2 hours (or when sufficient time has passed)
- **Non-blocking**: Returns data immediately while syncing happens in the background
- **Advanced Filtering**: Filter by price, beds, bathrooms, and property type
- **Pagination**: Built-in pagination support with configurable limits
- **Fast Retrieval**: Data is cached in JSON for instant access

## Getting Started

### Installation

```bash
pip install -r requirements.txt
```

### Starting the Server

```bash
# Initial sync (checks for resync if needed)
python main.py

# Start the API server
python -m uvicorn api:app --host 0.0.0.0 --port 8000
```

The API will be available at `https://flexmlsdatatammy.onrender.com:8000`

Interactive API documentation (Swagger UI) is available at `https://flexmlsdatatammy.onrender.com:8000/docs`

## API Endpoints

### 1. Root Endpoint

**GET** `/`

Returns API information and available endpoints.

#### Request

```bash
curl https://flexmlsdatatammy.onrender.com:8000/
```

#### Response

```json
{
  "message": "Property API",
  "total_properties": 272,
  "last_synced": "2026-02-22T03:33:15.079517",
  "endpoints": {
    "/filtered": "Get filtered properties (query params: pricemin, pricemax, beds, bathrooms, landpropertyonly)",
    "/paginated": "Get paginated properties (query params: page, limit, pricemin, pricemax, beds, bathrooms, landpropertyonly)",
    "/all": "Get all properties without pagination"
  }
}
```

#### Notes

- Automatically triggers background resync check (non-blocking)
- Returns instantly without waiting for resync to complete

---

### 2. Paginated Endpoint

**GET** `/paginated`

Returns properties with pagination support and optional filtering.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `limit` | integer | 10 | Items per page (1-100) |
| `pricemin` | float | null | Minimum price filter |
| `pricemax` | float | null | Maximum price filter |
| `beds` | integer | null | Number of bedrooms |
| `bathrooms` | float | null | Number of bathrooms |
| `landpropertyonly` | boolean | null | Only land properties (true/false) |

#### Examples

**Get first 5 properties:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?page=1&limit=5"
```

**Get properties between $400k-$800k with 2 bedrooms:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?page=1&limit=10&pricemin=400000&pricemax=800000&beds=2"
```

**Get page 3 with land properties only:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?page=3&limit=10&landpropertyonly=true"
```

#### Response

```json
{
  "total_count": 15,
  "total_pages": 2,
  "current_page": 1,
  "limit": 5,
  "count": 5,
  "filters_applied": {
    "pricemin": 400000,
    "pricemax": 800000,
    "beds": 2,
    "bathrooms": null,
    "landpropertyonly": null
  },
  "properties": [
    {
      "card_id": "20251122160943181749000000",
      "status": "Active",
      "address_line1": "10-9-3 Carolina",
      "address_line2": "St John, VI 00830",
      "CurrentPrice": 775000.0,
      "BedsTotal": "2",
      "BathsTotal": "2.0",
      "PropertyType": "Residential",
      "Latitude": 18.336948,
      "Longitude": -64.729183
      // ... additional property fields
    }
    // ... more properties
  ]
}
```

---

### 3. Filtered Endpoint

**GET** `/filtered`

Returns all matching properties without pagination.

#### Query Parameters

Same as `/paginated` (except `page` and `limit` are not applicable)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pricemin` | float | null | Minimum price filter |
| `pricemax` | float | null | Maximum price filter |
| `beds` | integer | null | Number of bedrooms |
| `bathrooms` | float | null | Number of bathrooms |
| `landpropertyonly` | boolean | null | Only land properties (true/false) |

#### Examples

**Get all land properties:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/filtered?landpropertyonly=true"
```

**Get properties between $500k-$1M:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/filtered?pricemin=500000&pricemax=1000000"
```

**Get properties with 3 bathrooms:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/filtered?bathrooms=3"
```

#### Response

```json
{
  "count": 167,
  "filters_applied": {
    "pricemin": null,
    "pricemax": null,
    "beds": null,
    "bathrooms": null,
    "landpropertyonly": true
  },
  "properties": [
    // ... all matching properties without pagination
  ]
}
```

---

### 4. All Endpoint

**GET** `/all`

Returns all properties with metadata but without pagination.

#### Query Parameters

Same as `/filtered`

#### Examples

**Get all properties with metadata:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/all"
```

**Get all properties with 2+ bedrooms:**

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/all?beds=2"
```

#### Response

```json
{
  "total_count": 272,
  "metadata": {
    "total_properties": 272,
    "property_type_breakdown": {
      "Unknown - Unknown": 272
    },
    "property_type_mapping": {
      "A": "Residential",
      "B": "Condo",
      "C": "Land",
      "D": "Commercial",
      "E": "Res - Other Island",
      "F": "Condo - Other Island",
      "G": "Land - Other Island",
      "H": "Comm - Other Island"
    },
    "last_synced": "2026-02-22T03:33:15.079517"
  },
  "filters_applied": {
    "pricemin": null,
    "pricemax": null,
    "beds": null,
    "bathrooms": null,
    "landpropertyonly": null
  },
  "properties": [
    // ... all properties
  ]
}
```

---

## Filtering Guide

### Filter Combinations

You can combine multiple filters in a single request:

```bash
# High-end properties with multiple bedrooms
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?pricemin=1000000&beds=3&bathrooms=2"

# Affordable land properties
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?pricemax=500000&landpropertyonly=true"
```

### Filter Behavior

- **Multiple filters**: All filters are applied with AND logic (must match ALL criteria)
- **NULL values**: If a filter is not provided, it's ignored
- **Price range**: Use `pricemin` and/or `pricemax` together for a range
- **Land only**: Set `landpropertyonly=true` to filter for land; omit or set to `false`/`null` for all types

---

## Data Sync

### Auto-Sync Behavior

The API automatically manages data synchronization:

1. **On Startup**: Checks if last sync was more than 2 hours ago; if so, syncs immediately
2. **Per Request**: Each API call triggers a background check and potential resync (non-blocking)
3. **Resync Prevention**: Won't resync if less than 2 hours have passed since last sync
4. **Instant Response**: Data is returned immediately; resync happens in the background

### Manual Sync

To manually trigger a sync:

```bash
python main.py
```

This command:
- Checks if 2+ hours have passed since last sync
- If yes, fetches all properties from MLS and updates `properties.json`
- Stores the sync timestamp in metadata

### Checking Sync Status

The `last_synced` timestamp is available in:
- Root endpoint response
- `/all` endpoint metadata

Example:
```bash
curl https://flexmlsdatatammy.onrender.com:8000/all | grep last_synced
```

---

## Property Fields

Each property object contains the following fields:

```json
{
  "card_id": "string (unique identifier)",
  "status": "string (e.g., 'Active')",
  "latitude": "string (decimal)",
  "longitude": "string (decimal)",
  "card_price": "string",
  "CurrentPrice": "float",
  "ListPrice": "float",
  "BedsTotal": "string",
  "BathsTotal": "string/float",
  "PropertyType": "string (Residential, Condo, Land, etc.)",
  "StreetNumber": "string",
  "StreetName": "string",
  "StreetSuffix": "string",
  "City": "string",
  "StateOrProvince": "string",
  "PostalCode": "string",
  "MlsStatus": "string",
  "StandardFields": {
    "PropertyType": "string",
    "CurrentPrice": "float",
    "StandardStatus": "string"
  },
  "address_line1": "string",
  "address_line2": "string",
  "mls_number": "string",
  "ui_price": "string (formatted price)",
  "Name": "string (property address)",
  "images": ["array of image URLs"],
  "card_fields": {
    "estate": "string",
    "parcel_number": "string",
    "total_bedrooms": "string",
    "total_bathrooms": "string"
  }
}
```

---

## Error Handling

### Page Out of Range

If you request a page that doesn't exist:

```json
{
  "error": "Page 100 out of range. Total pages: 5",
  "total_count": 50,
  "total_pages": 5,
  "current_page": 100,
  "limit": 10,
  "properties": []
}
```

### Empty Results

If no properties match your filters:

```json
{
  "count": 0,
  "filters_applied": {
    "pricemin": 10000000,
    "pricemax": 20000000,
    "beds": null,
    "bathrooms": null,
    "landpropertyonly": null
  },
  "properties": []
}
```

---

## Performance Tips

1. **Use pagination**: For large datasets, use `/paginated` with appropriate `limit` values instead of `/all`
2. **Combine filters**: Be specific with filters to reduce the amount of data processed
3. **Limit page results**: Keep `limit` between 10-50 for best performance
4. **Batch requests**: The API is designed to handle concurrent requests efficiently

---

## Configuration

### Resync Interval

To change the 2-hour resync interval, modify `main.py`:

```python
# Change from 2 to desired hours
manager.check_and_resync_if_needed(hours=4)  # 4 hours
```

### API Port

To change the API port from 8000:

```bash
python -m uvicorn api:app --host 0.0.0.0 --port 9000
```

### Default Pagination Limit

Request a specific limit in the query parameter:

```bash
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?page=1&limit=20"
```

---

## Interactive Documentation

FastAPI provides automatic, interactive API documentation:

- **Swagger UI**: `https://flexmlsdatatammy.onrender.com:8000/docs`
- **ReDoc**: `https://flexmlsdatatammy.onrender.com:8000/redoc`

These interfaces allow you to:
- Test endpoints directly
- View request/response schemas
- Explore available parameters

---

## Examples with curl and Python

### curl Examples

```bash
# Get root info
curl https://flexmlsdatatammy.onrender.com:8000/

# Get first 10 properties
curl https://flexmlsdatatammy.onrender.com:8000/paginated

# Get properties in price range
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?pricemin=300000&pricemax=600000"

# Get land properties only
curl "https://flexmlsdatatammy.onrender.com:8000/filtered?landpropertyonly=true"

# Get specific page
curl "https://flexmlsdatatammy.onrender.com:8000/paginated?page=5&limit=20"
```

### Python Examples

```python
import requests

BASE_URL = "https://flexmlsdatatammy.onrender.com:8000"

# Get root info
response = requests.get(f"{BASE_URL}/")
print(response.json())

# Get paginated data
params = {
    "page": 1,
    "limit": 10,
    "pricemin": 400000,
    "pricemax": 800000
}
response = requests.get(f"{BASE_URL}/paginated", params=params)
data = response.json()
print(f"Found {data['total_count']} properties")

# Get filtered results
params = {
    "landpropertyonly": True,
    "pricemax": 500000
}
response = requests.get(f"{BASE_URL}/filtered", params=params)
properties = response.json()["properties"]
```

---

## Troubleshooting

### No data returned?

1. Check if `properties.json` exists in the directory
2. Verify the file has been populated with `python main.py`
3. Check the `metadata.last_synced` timestamp

### Resync not happening?

1. Less than 2 hours may have passed since last sync
2. Check the terminal output for "no resync needed" messages
3. Force a resync by running `python main.py` directly

### JSON parsing errors?

The JSON file contains properties with duplicate key names (e.g., both lowercase 'latitude' and uppercase 'Latitude'). When using PowerShell's `ConvertFrom-Json`, you may encounter this error. Workaround:

```powershell
# Use Python to parse instead
python -c "import json; import sys; data = json.load(sys.stdin); print(len(data))"
```

---

## Support & Maintenance

- **Data Source**: Properties fetched from FlexMLS API
- **Update Frequency**: Every 2 hours (or manual sync)
- **Properties Count**: 272 active listings
- **Last Updated**: Check via root endpoint `/` or `/all`

---

## License & Usage

This API is built for internal property management purposes. All property data is sourced from authorized MLS feeds.



json example

{"card_id":"20250410021225645787000000","status":"Active","latitude":"18.319022","longitude":"-64.766644","card_price":"695000.0","href":"https://my.flexmls.com/tameladonnelly/search/idx_links/20211211180913981114000000/listings/20250410021225645787000000?from_filter=false","ListingKey":"20250410021225645787000000","ListAgentId":"20020115145243688202000000","MlsId":"20011203192944200995000000","BedsTotal":null,"BathsTotal":null,"StreetNumber":"15A-9-7","StreetDirPrefix":null,"StreetName":"Rendezvous & Ditleff","StreetSuffix":null,"StreetDirSuffix":null,"StreetAdditionalInfo":null,"City":"St John","StateOrProvince":"VI","PostalCode":"00830","ListingId":"25-109","CurrentPrice":695000.0,"ListPrice":695000.0,"MlsStatus":"Active","Latitude":18.319022,"Longitude":-64.766644,"StandardFields":{"Latitude":18.319022,"Longitude":-64.766644,"PropertyClass":null,"PropertyType":"Land","ListPriceLow":null,"ListPriceHigh":null,"StandardStatus":"Active","CurrentPrice":695000.0},"address_line1":"15A-9-7 Rendezvous & Ditleff","address_line2":"St John, VI 00830","mls_number":"#25-109","ui_price":"$695,000","card_fields":{"estate":"Rendezvous & Ditleff","parcel_number":"15A-9-7","total_bedrooms":"","total_bathrooms":"","lot_size_(+/-)_legacy":"","sold_price":""},"images":["https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021641969388000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250419024329840193000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642018588000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642115726000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642165265000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642213219000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642263633000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642313615000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642363284000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642409372000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642455747000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642501834000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410232036292810000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021642068713000000-o.jpg","https://cdn.resize.sparkplatform.com/stj/640x480/true/20250410021641902843000000-o.jpg"],"Name":"15A-9-7 Rendezvous & Ditleff"},