export default (
  /** @type {{
  '@context': 'https://schema.org',
  '@type': string,
  [key: string]: any
}} */ data
) => '<script type="application/ld+json">' + JSON.stringify(data) + '</script>'
