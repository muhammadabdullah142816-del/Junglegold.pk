"use client";

import { useState, useEffect } from "react";
import { fetchLegacyMilestones } from "@/lib/api";
import type { LegacyMilestone } from "@/types/database";
import { BookOpen } from "lucide-react";

export default function LegacySection() {
  const [milestones, setMilestones] = useState<LegacyMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLegacyMilestones()
      .then(setMilestones)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-4 bg-forest/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border border-gold/20">
            <BookOpen size={14} /> Our Journey & Heritage
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-4 leading-tight">
            The Jungle Gold Legacy
          </h2>
          <p className="text-cream/70 text-base sm:text-lg">
            Harvested from untouched high-altitude forests in Swat, Margalla & Skardu — built on generations of trust and pure raw honey.
          </p>
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-56 sm:h-64 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : milestones.length === 0 ? (
          <div className="text-center py-12 text-cream/40">No legacy milestones added yet.</div>
        ) : (
          <div className="relative">
            {/* Center vertical connector line for desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gold/20 hidden md:block" />

            <div className="flex flex-col gap-8 sm:gap-14">
              {milestones.map((milestone, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={milestone.id}
                    className={`flex flex-col md:flex-row items-center gap-5 sm:gap-8 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <div className="flex-1 glass-card p-5 sm:p-8 rounded-2xl border border-gold/20 shadow-xl relative group hover:border-gold/50 transition-all w-full">
                      <span className="inline-block bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                        {milestone.year_or_date}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-2 group-hover:text-gold transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-cream/70 text-xs sm:text-sm md:text-base leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Center Timeline Node */}
                    <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-gold border-4 border-forest items-center justify-center z-10 shadow-gold-glow">
                      <div className="w-3 h-3 rounded-full bg-forest" />
                    </div>

                    {/* Photo Card */}
                    <div className="flex-1 w-full">
                      {milestone.image_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={milestone.image_url}
                          alt={milestone.title}
                          loading="lazy"
                          className="w-full h-48 sm:h-64 object-cover rounded-2xl border border-gold/20 shadow-lg hover:scale-[1.02] transition-transform duration-300"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== "/harvest.jpg") {
                              target.src = "/harvest.jpg";
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 sm:h-64 rounded-2xl bg-white/5 border border-gold/10 flex items-center justify-center">
                          <span className="text-cream/20 text-sm">Jungle Gold Legacy</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
