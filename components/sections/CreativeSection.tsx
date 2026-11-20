import { CREATIVE_CONTENT } from "@/constants"
import { PhotoMarquee } from "@/components/PhotoMarquee"
import { SectionHeading } from "@/components/PortfolioShowcase"
import { VideoCard } from "@/components/VideoCard"

export function CreativeSection() {
  return (
    <section
      id="creative"
      className="scroll-mt-36 sm:scroll-mt-40 px-6 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow={CREATIVE_CONTENT.eyebrow}
          title={CREATIVE_CONTENT.title}
          description={CREATIVE_CONTENT.description}
        />

        <div className="pt-2">
          <PhotoMarquee photos={CREATIVE_CONTENT.photos} />
        </div>

        <div className="grid gap-6 pt-4 md:grid-cols-2">
          {CREATIVE_CONTENT.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
