interface SlugifyProps {
  slug: string
}

export function slugify({ slug }: SlugifyProps): string {
  function removeAccents(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  return removeAccents(slug)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from the start of text
    .replace(/-+$/, '') // Trim - from the end of text
}
