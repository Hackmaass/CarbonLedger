"""Footprint calculation and insights endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Request

from app.carbon.calculator import calculate_footprint
from app.config import Settings, get_settings
from app.insights.gemini import generate_insights
from app.models import CarbonInput, FootprintResult, InsightsResponse

router = APIRouter(prefix="/api", tags=["footprint"])


@router.post("/calculate", response_model=FootprintResult)
def calculate(request: Request, payload: CarbonInput) -> FootprintResult:
    """Compute the annual carbon footprint breakdown for the supplied inputs."""
    # Note: The actual rate limiting is applied via the limiter middleware
    # and the default_limits defined in main.py. If we wanted specific
    # limits for this route, we would use @limiter.limit("5/minute").
    return calculate_footprint(payload)


@router.post("/insights", response_model=InsightsResponse)
def insights(
    request: Request, payload: CarbonInput, settings: Settings = Depends(get_settings)
) -> InsightsResponse:
    """Return personalized reduction advice (Gemini, with rule-based fallback)."""
    result = calculate_footprint(payload)
    return generate_insights(payload, result, settings)
