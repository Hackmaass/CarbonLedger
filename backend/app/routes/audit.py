"""Auditor endpoints: extract data from utility bills and receipts."""

from __future__ import annotations

from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile

from app.config import Settings, get_settings
from app.insights.gemini import extract_from_image

router = APIRouter(prefix="/api/audit", tags=["audit"])

_ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}


@router.post("/extract")
async def extract_data(
    request: Request,
    file: UploadFile = File(...),
    settings: Settings = Depends(get_settings),
) -> dict:
    """Extract footprint data from an uploaded image (bill or receipt)."""
    if file.content_type not in _ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Use JPEG, PNG, or WebP.",
        )

    # Read the file content.
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=413, detail="File too large. Max 10MB.")

    try:
        data = extract_from_image(content, file.content_type, settings)
        return data
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Data extraction failed: {exc}") from exc
