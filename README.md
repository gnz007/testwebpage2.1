# Cykeo Argentina — Landing Page

Landing page estática del **Gabinete Médico RFID Cykeo**, distribuido en Argentina.
Diseño premium inspirado en Apple (referencia principal) con acentos editoriales de amp.

## Contenido del paquete

```
cykeo-argentina/
├── index.html          # Página completa (HTML + CSS + JS inline, sin dependencias)
├── logo.svg            # Logo Cykeo Argentina (vectorial, escalable)
├── favicon.svg         # Favicon derivado del glifo
├── README.md           # Este archivo
└── assets/
    ├── hero-cabinet.png    # Imagen principal del gabinete
    ├── scene-or.png        # Escena de quirófano
    ├── scene-pharmacy.png  # Escena de farmacia hospitalaria
    ├── detail-touch.png    # Close-up de pantalla táctil
    └── dark-band.png       # Imagen atmosférica para banda oscura
```

## Cómo publicar en GitHub Pages

### 1. Crear el repositorio
1. Andá a [github.com/new](https://github.com/new) y creá un repositorio nuevo (por ejemplo `cykeo-argentina`).
2. Subí todos los archivos de esta carpeta a la raíz del repositorio.

### 2. Activar GitHub Pages
1. En el repositorio, andá a **Settings** → **Pages**.
2. En **Source**, seleccioná **Deploy from a branch**.
3. En **Branch**, seleccioná `main` (o `master`) y carpeta `/ (root)`.
4. Guardá. En 1-2 minutos tu página estará online en:
   ```
   https://tu-usuario.github.io/cykeo-argentina/
   ```

### 3. (Opcional) Usar un dominio propio
En **Settings** → **Pages** → **Custom domain**, escribí tu dominio (ej: `cykeo.com.ar`)
y configurá un registro CNAME en tu DNS apuntando a `tu-usuario.github.io`.

## Cómo verlo localmente

No necesita instalación ni servidor. Simplemente **abrí `index.html`** en tu navegador.

Si querés servirlo con un servidor local (recomendado para probar todo):

```bash
# Con Python
python3 -m http.server 8000

# Con Node (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abrí `http://localhost:8000` en tu navegador.

## Personalización rápida

### Cambiar colores
Editá las variables CSS en `index.html` (dentro de `<style>`, bloque `:root`):

```css
:root {
  --ck-apple-blue: #0071e3;  /* Color primario (CTAs, acentos) */
  --ck-ink: #1d1d1f;          /* Texto principal */
  --ck-canvas: #f5f5f7;       /* Fondo de página */
  /* ... etc */
}
```

### Cambiar texto
Todo el contenido está en español (Argentina) dentro del `<body>` de `index.html`.
Buscá el texto que querés cambiar y editalo directamente.

### Cambiar imágenes
Reemplazá los archivos en `assets/` manteniendo los mismos nombres, o editá
las rutas `src="assets/..."` en `index.html`.

### Configurar el formulario
El formulario actualmente muestra un mensaje de éxito simulado. Para recibir
los envíos reales, conectalo a un servicio como:

- **[Formspree](https://formspree.io)** — gratis hasta 50 envíos/mes
- **[Getform](https://getform.io)** — gratis hasta 1 formulario
- **[Netlify Forms](https://www.netlify.com/products/forms/)** — gratis con deploy en Netlify

Buscá `initForm()` en el `<script>` y reemplazá la sección de "simulación de envío"
con un `fetch()` a tu endpoint.

## Stack técnico

- **HTML5** semántico y accesible (WCAG AA)
- **CSS3** con custom properties (variables), Grid, Flexbox, `clamp()` fluido
- **JavaScript vanilla** (sin frameworks ni dependencias)
- **SVG** para logo y favicon (vectorial, nítido a cualquier resolución)
- **Responsive** mobile-first (breakpoint en 768px)
- **`prefers-reduced-motion`** respetado (todas las animaciones colapsan)
- **SEO**: meta tags completos, Open Graph, Twitter Cards, lang `es-AR`

## Diseño

- **Referencia principal:** Apple (lienzo Frost, un solo Apple Blue, flatness,
  tipografía SF Pro, modelo full-bleed, solo 2 radios: 8px y 980px)
- **Acentos secundarios:** amp (accent rule editorial bajo headings, dark feature band)
- **Tipografía:** SF Pro Display + SF Pro Text vía system stack
- **Paleta:** monocromo + un solo azul (`#0071e3`)

## Licencia

© 2026 Cykeo Argentina. Todos los derechos reservados.
