import pytest
from fastapi.testclient import TestClient
from io import BytesIO

def test_extract_data_success(client, monkeypatch):
    """Test successful data extraction from an image."""
    from app.routes import audit
    
    # Mock extract_from_image in the route module where it's imported
    mock_data = {
        "home": {"electricity_kwh_per_month": 500},
        "consumption": {"goods_spend_usd_per_month": 200}
    }
    monkeypatch.setattr(audit, "extract_from_image", lambda *args: mock_data)

    # Create a dummy image
    file_content = b"fake-image-content"
    files = {"file": ("test.png", file_content, "image/png")}
    
    response = client.post("/api/audit/extract", files=files)
    
    assert response.status_code == 200
    assert response.json() == mock_data

def test_extract_data_invalid_type(client):
    """Test rejection of unsupported file types."""
    files = {"file": ("test.txt", b"not-an-image", "text/plain")}
    
    response = client.post("/api/audit/extract", files=files)
    
    assert response.status_code == 400
    assert "Unsupported file type" in response.json()["detail"]

def test_extract_data_too_large(client):
    """Test rejection of oversized files."""
    # 11MB file
    content = b"a" * (11 * 1024 * 1024)
    files = {"file": ("large.png", content, "image/png")}
    
    response = client.post("/api/audit/extract", files=files)
    
    assert response.status_code == 413
    assert "File too large" in response.json()["detail"]
