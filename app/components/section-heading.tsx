interface SectionHeadingProps {
  title: string
  subtitle: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-light tracking-tight text-zinc-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg text-zinc-500">{subtitle}</p>
    </div>
  )
}
