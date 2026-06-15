"""In-memory EntryRepository for local development and tests.

Thread-safe enough for a single-process dev server; data is ephemeral and lost on
restart. Selected automatically when ``USE_FIRESTORE=false``.
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from app.blockchain import audit_service
from app.models import BlockchainInfo, CarbonInput, Entry, FootprintResult


class InMemoryEntryRepository:
    """EntryRepository backed by a process-local dictionary."""

    def __init__(self) -> None:
        """Start with an empty per-device store."""
        self._by_device: dict[str, list[Entry]] = {}

    def add(self, device_id: str, data: CarbonInput, result: FootprintResult) -> Entry:
        """Persist a new entry for the device and return it with id/timestamp."""
        # Calculate report hash and 'record' it on-chain for auditability.
        report_data = {
            "input": data.model_dump(mode="json"),
            "result": result.model_dump(mode="json"),
        }
        report_hash = audit_service.calculate_report_hash(report_data)
        receipt = audit_service.record_report(report_hash)
        blockchain = BlockchainInfo(
            transaction_hash=receipt.transaction_hash,
            block_number=receipt.block_number,
            report_hash=report_hash,
        )

        entry = Entry(
            id=uuid.uuid4().hex,
            created_at=datetime.now(timezone.utc).isoformat(),
            device_id=device_id,
            input=data,
            result=result,
            blockchain=blockchain,
        )
        self._by_device.setdefault(device_id, []).append(entry)
        return entry

    def list_for_device(self, device_id: str, limit: int = 50) -> list[Entry]:
        """Return the device's entries, newest first."""
        entries = self._by_device.get(device_id, [])
        # Newest first.
        return sorted(entries, key=lambda e: e.created_at, reverse=True)[:limit]
