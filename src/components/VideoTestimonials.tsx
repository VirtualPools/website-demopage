import { useState } from "react";
import { VIDEO_TESTIMONIALS } from "../data/content";

function VideoCard({ id, title }: { id: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-9/16 overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
      {loaded ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* Lazy: only the thumbnail loads until the user clicks — the iframe never mounts up front. */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:opacity-80"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-blue shadow-lg transition group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 translate-x-px"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function VideoTestimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-brand-ink sm:text-4xl">
          Pool builders like you love VirtualPools!
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {VIDEO_TESTIMONIALS.map((v) => (
            <VideoCard key={v.id} id={v.id} title={v.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
