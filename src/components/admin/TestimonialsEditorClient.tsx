"use client";

import { useState, useTransition } from "react";
import {
  saveTestimonialAction,
  deleteTestimonialAction,
} from "@/app/admin/actions";
import type { Testimonial } from "@/types/site";

type TestimonialDraft = {
  id: string | null;
  authorName: string;
  body: string;
  rating: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
};

const EMPTY_DRAFT: TestimonialDraft = {
  id: null,
  authorName: "",
  body: "",
  rating: "",
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
};

function testimonialToDraft(t: Testimonial): TestimonialDraft {
  return {
    id: t.id,
    authorName: t.author,
    body: t.quote,
    rating: t.rating != null ? String(t.rating) : "",
    isFeatured: t.isFeatured ?? false,
    isActive: t.isActive,
    sortOrder: t.sortOrder,
  };
}

function StarRating({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(value === String(n) ? "" : String(n))}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 1px", fontSize: 20, color: Number(value) >= n ? "#d97706" : "rgba(255,255,255,0.15)", lineHeight: 1 }}
        >
          ★
        </button>
      ))}
      {value && (
        <button type="button" onClick={() => onChange("")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--admin-text-muted)", marginLeft: 4 }}>
          clear
        </button>
      )}
    </div>
  );
}

export function TestimonialsEditorClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [draft, setDraft] = useState<TestimonialDraft | null>(null);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  function openNew() {
    setDraft({ ...EMPTY_DRAFT, sortOrder: testimonials.length });
    setStatusMsg(null);
  }

  function openEdit(t: Testimonial) {
    setDraft(testimonialToDraft(t));
    setStatusMsg(null);
  }

  function closeDraft() {
    setDraft(null);
  }

  function handleSave() {
    if (!draft) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("redirect_to", "/admin/testimonials");
      if (draft.id) fd.set("testimonial_id", draft.id);
      fd.set("author_name", draft.authorName);
      fd.set("body", draft.body);
      if (draft.rating) fd.set("rating", draft.rating);
      fd.set("sort_order", String(draft.sortOrder));
      if (draft.isFeatured) fd.set("is_featured", "on");
      if (draft.isActive) fd.set("is_active", "on");
      await saveTestimonialAction(fd);
      const rating = draft.rating ? Number.parseInt(draft.rating, 10) : undefined;
      if (draft.id) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === draft.id
              ? { ...t, author: draft.authorName, quote: draft.body, rating, isFeatured: draft.isFeatured, isActive: draft.isActive, sortOrder: draft.sortOrder }
              : t,
          ),
        );
      } else {
        setTestimonials((prev) => [
          ...prev,
          { id: `temp-${Date.now()}`, author: draft.authorName, quote: draft.body, rating, isFeatured: draft.isFeatured, isActive: draft.isActive, sortOrder: draft.sortOrder },
        ]);
      }
      setStatusMsg("Saved.");
      setDraft(null);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("redirect_to", "/admin/testimonials");
      fd.set("testimonial_id", id);
      await deleteTestimonialAction(fd);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setStatusMsg("Deleted.");
      if (draft?.id === id) setDraft(null);
    });
  }

  return (
    <div style={{ display: "flex", gap: 12, height: "100%", overflow: "hidden", padding: 2 }}>
      {/* List panel */}
      <div style={{ width: 260, minWidth: 260, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
        <div className="panel-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="label-upper">Testimonials ({testimonials.length})</span>
          <button type="button" onClick={openNew} className="btn-primary" style={{ padding: "4px 12px", fontSize: 11 }}>
            + Add
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 6 }}>
          {testimonials.length === 0 && (
            <div style={{ padding: "28px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "var(--admin-text-muted)", margin: "0 0 12px" }}>No testimonials yet.</p>
              <button type="button" onClick={openNew} style={{ fontSize: 11, color: "#d97706", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                Add your first testimonial →
              </button>
            </div>
          )}
          {testimonials.map((t) => (
            <div
              key={t.id}
              onClick={() => openEdit(t)}
              style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 10px", borderRadius: 8, marginBottom: 2, background: draft?.id === t.id ? "rgba(217,119,6,0.09)" : "transparent", border: draft?.id === t.id ? "1px solid rgba(217,119,6,0.2)" : "1px solid transparent", cursor: "pointer" }}
            >
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: t.isActive ? "#4ade80" : "#2e2e35", flexShrink: 0, marginTop: 4 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--admin-text)", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.author}
                </p>
                <p style={{ fontSize: 11, color: "var(--admin-text-muted)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.quote}
                </p>
              </div>
              {t.isFeatured && (
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
                {testimonials.length === 0 ? "Add your first testimonial to build trust." : "Select a testimonial to edit, or add a new one."}
              </p>
              <button type="button" onClick={openNew} className="btn-primary">
                Add Testimonial
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="panel-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--admin-text)" }}>
                {draft.id ? "Edit Testimonial" : "New Testimonial"}
              </span>
              <button type="button" onClick={closeDraft} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--admin-text-muted)", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14, maxWidth: 560 }}>
              <div>
                <span className="label-upper" style={{ display: "block", marginBottom: 7 }}>Author Name *</span>
                <input
                  value={draft.authorName}
                  onChange={(e) => setDraft((p) => p ? { ...p, authorName: e.target.value } : p)}
                  className="ctrl-input"
                  placeholder="e.g. Sarah M."
                />
              </div>
              <div>
                <span className="label-upper" style={{ display: "block", marginBottom: 7 }}>Testimonial *</span>
                <textarea
                  value={draft.body}
                  onChange={(e) => setDraft((p) => p ? { ...p, body: e.target.value } : p)}
                  rows={4}
                  className="ctrl-input"
                  style={{ resize: "none" }}
                  placeholder="What did they say?"
                />
              </div>
              <div>
                <span className="label-upper" style={{ display: "block", marginBottom: 7 }}>Rating (optional)</span>
                <StarRating
                  value={draft.rating}
                  onChange={(v) => setDraft((p) => p ? { ...p, rating: v } : p)}
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
                <button type="button" onClick={handleSave} disabled={isPending || !draft.authorName.trim() || !draft.body.trim()} className="btn-primary">
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
