"use client";

import { useState, useTransition } from "react";
import {
  saveServiceAreaAction,
  deleteServiceAreaAction,
} from "@/app/admin/actions";
import type { ServiceArea } from "@/types/site";

export function ServiceAreasEditorClient({
  initialAreas,
}: {
  initialAreas: ServiceArea[];
}) {
  const [areas, setAreas] = useState(initialAreas);
  const [newName, setNewName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("redirect_to", "/admin/service-areas");
      fd.set("name", name);
      fd.set("sort_order", String(areas.length));
      fd.set("is_active", "on");
      await saveServiceAreaAction(fd);
      setAreas((prev) => [...prev, { id: `temp-${Date.now()}`, name, sortOrder: prev.length, isActive: true }]);
      setNewName("");
      setStatusMsg(`"${name}" added.`);
    });
  }

  function handleToggle(area: ServiceArea) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("redirect_to", "/admin/service-areas");
      fd.set("area_id", area.id);
      fd.set("name", area.name);
      fd.set("sort_order", String(area.sortOrder));
      if (!area.isActive) fd.set("is_active", "on");
      await saveServiceAreaAction(fd);
      setAreas((prev) => prev.map((a) => a.id === area.id ? { ...a, isActive: !a.isActive } : a));
    });
  }

  function handleDelete(id: string, name: string) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("redirect_to", "/admin/service-areas");
      fd.set("area_id", id);
      await deleteServiceAreaAction(fd);
      setAreas((prev) => prev.filter((a) => a.id !== id));
      setStatusMsg(`"${name}" removed.`);
    });
  }

  return (
    <div style={{ maxWidth: 560 }}>
      {/* Add area */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          className="ctrl-input"
          style={{ flex: 1 }}
          placeholder="e.g. Austin, TX or Travis County"
          disabled={isPending}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isPending || !newName.trim()}
          className="btn-primary"
        >
          Add
        </button>
      </div>

      {statusMsg && (
        <p style={{ fontSize: 12, color: "#4ade80", marginBottom: 12 }}>{statusMsg}</p>
      )}

      {areas.length === 0 ? (
        <div style={{ padding: "32px 20px", borderRadius: 10, border: "1px dashed rgba(255,255,255,0.08)", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: 0 }}>
            No service areas yet. Add cities, counties, or ZIP codes you serve.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {areas.map((area) => (
            <div
              key={area.id}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: area.isActive ? "#4ade80" : "#2e2e35", flexShrink: 0, cursor: "pointer" }}
                onClick={() => handleToggle(area)}
                title={area.isActive ? "Click to hide" : "Click to show"}
              />
              <span style={{ flex: 1, fontSize: 13, color: area.isActive ? "var(--admin-text)" : "var(--admin-text-muted)" }}>
                {area.name}
              </span>
              <button
                type="button"
                onClick={() => handleToggle(area)}
                disabled={isPending}
                style={{ padding: "3px 10px", borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: "pointer", background: area.isActive ? "rgba(239,68,68,0.07)" : "rgba(74,222,128,0.07)", color: area.isActive ? "#f87171" : "#4ade80", border: `1px solid ${area.isActive ? "rgba(239,68,68,0.15)" : "rgba(74,222,128,0.18)"}`, textTransform: "uppercase", letterSpacing: "0.07em" }}
              >
                {area.isActive ? "Hide" : "Show"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(area.id, area.name)}
                disabled={isPending}
                style={{ padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: "pointer", background: "rgba(239,68,68,0.07)", color: "#f87171", border: "1px solid rgba(239,68,68,0.15)", textTransform: "uppercase", letterSpacing: "0.07em" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
