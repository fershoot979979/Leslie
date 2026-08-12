# Álbum Bebé 3D por Meses — versión optimizada

Esta versión conserva la idea del álbum 3D, pero mejora el diseño y reduce efectos costosos para que el desplazamiento sea más fluido en celular, tablet y computadora.

## Mejoras de esta versión

- Nueva paleta bebé RGB más suave.
- Bordes y divisiones con sombra/glow discreto.
- Portada 3D más limpia.
- Panel interior tipo hoja de álbum.
- Tarjetas mensuales más elegantes.
- Menos blur y menos filtros costosos.
- Animaciones basadas principalmente en `transform` y `opacity`.
- Imágenes con `loading="lazy"` y `decoding="async"`.
- Delegación de eventos en JavaScript para usar menos listeners.
- `content-visibility` en los meses para ayudar al rendimiento.
- Adaptación para pantallas táctiles.
- Respeto a `prefers-reduced-motion`.

## Cómo abrirlo

Abre `index.html` directamente en el navegador o usa Live Server desde Visual Studio Code.

## Cambiar las fotos

Copia tus fotos dentro de `assets/`.

En `script.js`, cada mes se ve así:

```js
{
  number: 1,
  title: "Primer mes",
  cover: "assets/mes-01.svg",
  photos: [
    "assets/foto-01.svg",
    "assets/foto-02.svg",
    "assets/foto-03.svg",
    "assets/foto-04.svg"
  ]
}
```

Puedes reemplazar las rutas por tus fotos reales:

```js
{
  number: 1,
  title: "Primer mes",
  cover: "assets/mes1-portada.webp",
  photos: [
    "assets/mes1-01.webp",
    "assets/mes1-02.webp",
    "assets/mes1-03.webp",
    "assets/mes1-04.webp"
  ]
}
```

## Recomendación de rendimiento para fotos reales

Para que el álbum siga siendo rápido, usa WEBP cuando sea posible.

Una buena medida para las fotos del álbum es aproximadamente:

- 1200 px a 1600 px en el lado más largo.
- Calidad WEBP entre 75% y 85%.
- Evita subir directamente fotografías de 8 MB, 12 MB o más.

La fluidez del álbum dependerá mucho del peso de las fotografías reales.
