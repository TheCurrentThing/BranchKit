"use client";

import { useState, useTransition } from "react";
import {
  saveOfferingAction,
  deleteOfferingAction,
} from "@/app/admin/actions";
import type { ServiceOffering } from "@/types/site";

type OfferingDraft = {
  id: string | null;
  title: string;
  shortDescription: string;
  startingPrice: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
};

const EMPTY_DRAFT: OfferingDraft = {
  id: null,
  title: "",
  shortDescription: "",
  startingPrice: "",
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
};

function offeringToDraft(o: ServiceOffering): OfferingDraft {
  return {
    id: o.id,
    title: o.title,
    shortDescription: o.shortDescription ?? "",
    startingPrice: o.startingPrice ?? "",
    isFeatured: o.isFeatured,
    isActive: o.isActive,
    sortOrder: o.sortOrder,
  };
}

export function OfferingsEditorClient({
  initialOfferings,
}: {
  initialOfferings: ServiceOffering[];
}) {
  const [offerings, setOfferings] = useState(initialOfferings);
  const [draft, setDraft] = useState<OfferingDraft | null>(null);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  function openNew() {
    setDraft({ ...EMPTY_DRAFT, sortOrder: offerings.length });
    setStatusMsg(null);
  }

  function openEdit(o: ServiceOffering) {
    setDraft(offeringToDraft(o));
    setStatusMsg(null);
  }

  function closeDraft() {
    setDraft(null);
  }

  function handleSave() {
    if (!draft) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("redirect_to", "/admin/offerings");
      if (draft.id) fd.set("offering_id", draft.id);
      fd.set("title", draft.title);
      fd.set("short_description", draft.shortDescription);
      fd.set("starting_price", draft.startingPrice);
      fd.set("sort_order", String(draft.sortOrder));
      if (draft.isFeatured) fd.set("is_featured", "on");
      if (draft.isActive) fd.set("is_active", "on");
      await saveOfferingAction(fd);
      // optimistic update
      if (draft.id) {
        setOfferings((prev) =>
          prev.map((o) =>
            o.id === draft.id
              ? { ...o, title: draft.title, shortDescription: draft.shortDescription || null, startingPrice: draft.startingPrice || null, isFeatured: draft.isFeatured, isActive: draft.isActive, sortOrder: draft.sortOrder }
              : o,
          ),
        );
      } else {
        setOfferings((prev) => [
          ...prev,
          { id: `temp-${Date.now()}`, title: draft.title, shortDescription: draft.shortDescription || null, startingPrice: draft.startingPrice || null, isFeatured: draft.isFeatured, isActive: draft.isActive, sortOrder: draft.sortOrder },
        ]);
      }
      setStatusMsg("Saved.");
      setDraft(null);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("redirect_to", "/admin/offerings");
      fd.set("offering_id", id);
      await deleteOfferingAction(fd);
      setOfferings((prev) => prev.filter((o) => o.id !== id));
      setStatusMsg("Deleted.");
      if (draft?.id === id) setDraft(null);
    });
  }

  return (
    <div style={{ display: "flex", gap: 12, height: "100%", overflow: "hidden", padding: 2 }}>
      {/* List panel */}
      <div style={{ width: 260, minWidth: 260, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
        <div className="panel-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="label-upper">Offerings ({offerings.length})</span>
          <button type="button" onClick={openNew} className="btn-primary" style={{ padding: "4px 12px", fontSize: 11 }}>
            + Add
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 6 }}>
          {offerings.length === 0 && (
            <div style={{ padding: "28px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "var(--admin-text-muted)", margin: "0 0 12px" }}>No offerings yet.</p>
              <button type="button" onClick={openNew} style={{ fontSize: 11, color: "#d97706", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                Add your first offering →
              </button>
            </div>
          )}
          {offerings.map((o) => (
            <div
              key={o.id}
              onClick={() => openEdit(o)}
              style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 10px", borderRadius: 8, marginBottom: 2, background: draft?.id === o.id ? "rgba(217,119,6,0.09)" : "transparent", border: draft?.id === o.id ? "1px solid rgba(217,119,6,0.2)" : "1px solid transparent", cursor: "pointer" }}
            >
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: o.isActive ? "#4ade80" : "#2e2e35", flexShrink: 0, marginTop: 4 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--admin-text)", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {o.title}
                </p>
                {o.startingPrice && (
                  <p style={{ fontSize: 11, color: "var(--admin-text-muted)", margin: 0 }}>From {o.startingPrice}</p>
                )}
              </div>
              {o.isFeatured && (
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d97706", background: "rgba(217,119,6,0.1)", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>
                  Featured
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Editor panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
        {!draft ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              {statusMsg && <p style={{ fontSize: 13, color: "#4ade80", marginBottom: 16 }}>{statusMsg}</p>}
              <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: "0 0 12px" }}>
                {offerings.length === 0 ? "Add your first offering to get started." : "Select an offering to edit, or add a new one."}
              </p>
              <button type="button" onClick={openNew} className="btn-primary">
                Add Offering
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="panel-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--admin-text)" }}>
                {draft.id ? "Edit Offering" : "New Offering"}
              </span>
              <button type="button" onClick={closeDraft} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--admin-text-muted)", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14, maxWidth: 560 }}>
              <div>
                <span className="label-upper" style={{ display: "block", marginBottom: 7 }}>Title *</span>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft((p) => p ? { ...p, title: e.target.value } : p)}
                  className="ctrl-input"
                  placeholder="e.g. Logo Design"
                />
              </div>
              <div>
                <span className="label-upper" style={{ display: "block", marginBottom: 7 }}>Short Description</span>
                <textarea
                  value={draft.shortDescription}
                  onChange={(e) => setDraft((p) => p ? { ...p, shortDescription: e.target.value } : p)}
                  rows={3}
                  className="ctrl-input"
                  style={{ resize: "none" }}
                  placeholder="Brief description of this offering"
                />
              </div>
              <div>
                <span className="label-upper" style={{ display: "block", marginBottom: 7 }}>Starting Price</span>
                <input
                  value={draft.startingPrice}
                  onChange={(e) => setDraft((p) => p ? { ...p, startingPrice: e.target.value } : p)}
                  className="ctrl-input"
                  placeholder="e.g. $500 or Starting at $200/mo"
                />
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={draft.isFeatured}
                    onChange={(e) => setDraft((p) => p ? { ...p, isFeatured: e.target.checked } : p)}
                  />
                  <span style={{ fontSize: 12, color: "var(--admin-text)" }}>Featured</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={draft.isActive}
                    onChange={(e) => setDraft((p) => p ? { ...p, isActive: e.target.checked } : p)}
                  />
                  <span style={{ fontSize: 12, color: "var(--admin-text)" }}>Active (visible on site)</span>
                </label>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
              {draft.id ? (
                <button
                  type="button"
                  onClick={() => draft.id && handleDelete(draft.id)}
                  disabled={isPending}
                  style={{ padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.18)", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  Delete
                </button>
              ) : <span />}
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={closeDraft} disabled={isPending} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", background: "transparent", color: "var(--admin-text-muted)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  Cancel
                </button>
                <button type="button" onClick={handleSave} disabled={isPending || !draft.title.trim()} className="btn-primary">
                  {isPending ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
