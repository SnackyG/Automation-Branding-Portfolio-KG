// Saml alle assets som URL'er (Vite rewrit’er og hasher korrekt)
export const images = import.meta.glob('./*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  as: 'url',
})

// Hjælp: hent via filnavn—case-sensitivt!
export function img(path) {
  // path kan være både 'MakeLogo.png' eller 'logos/MakeLogo.png' hvis du laver undermapper
  const key = path.startsWith('./') ? path : `./${path}`
  const url = images[key]
  if (!url) {
    console.warn('[assets] Not found:', key, 'Available:', Object.keys(images))
  }
  return url
}
