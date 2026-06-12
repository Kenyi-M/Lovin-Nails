# 💅 Lovin' Nails by Daniela Moreno – Sitio Web

Sitio web completo, responsivo y listo para usar para el estudio de uñas **Lovin' Nails by Daniela Moreno**.

Construido con **HTML5 semántico + CSS3 puro + JavaScript Vanilla** (sin frameworks ni dependencias externas, excepto Google Fonts).

---

## 📁 Estructura de archivos

```
lovin_nails_web/
├── index.html          → Página principal (todas las secciones)
├── css/
│   └── style.css       → Hoja de estilos completa (design system)
├── js/
│   └── main.js          → Interactividad (nav, galería, slider, formulario)
└── img/
    ├── hero-main.jpg     → Imagen principal del hero (900x1100 recomendado)
    ├── hero-accent.jpg   → Imagen secundaria del hero (700x700 recomendado)
    └── gallery-01..08.jpg → Imágenes de la galería de diseños
```

> Las imágenes incluidas son **placeholders con los colores de la marca**.
> Reemplázalas por fotos reales del estudio manteniendo los mismos nombres
> de archivo (o actualiza las rutas en `index.html`).

---

## 🎨 Secciones incluidas

1. **Navegación fija** – Logo + menú + botón "Reservar cita" + menú hamburguesa en móvil
2. **Hero / Inicio** – Título en script dorado, CTA, mosaico de imágenes, estadísticas
3. **Servicios** – 8 tarjetas con icono, descripción, precio y duración
4. **Galería** – Grid tipo mosaico con filtros por categoría + lightbox al hacer clic
5. **Testimonios** – Slider/carrusel automático con controles y dots
6. **Horarios + Mapa** – Tabla de horarios, datos de contacto y mapa de Google embebido
7. **Formulario de contacto** – Validación en cliente con mensajes de error y éxito
8. **CTA + Redes sociales** – Banner con enlaces a Instagram, WhatsApp, Facebook, TikTok
9. **Footer** – Información completa, enlaces de navegación y datos legales

---

## ▶️ Cómo usarlo

1. Descomprime el archivo.
2. Abre `index.html` directamente en tu navegador, **o** usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Luego visita
http://localhost:8000
```

No requiere instalación de dependencias ni build steps.

---

## 🖼️ Cómo reemplazar las imágenes

1. Coloca tus fotos en la carpeta `img/`.
2. Usa los mismos nombres (`hero-main.jpg`, `gallery-01.jpg`, etc.) **o**
   actualiza el atributo `src` correspondiente en `index.html`.
3. Recomendaciones de tamaño:
   - `hero-main.jpg`: 900×1100px (vertical)
   - `hero-accent.jpg`: 700×700px (cuadrada)
   - `gallery-XX.jpg`: 600×440px (horizontal) o 600×920px (vertical, para los ítems "tall")
4. Comprime las imágenes antes de subirlas (recomendado: [squoosh.app](https://squoosh.app) o TinyPNG) para mantener buen rendimiento.

---

## 🗺️ Configurar el mapa

Reemplaza el `src` del `<iframe>` en la sección de **Horarios & Ubicación**
con el código embed real de Google Maps para la dirección del estudio:

1. Ve a [Google Maps](https://maps.google.com)
2. Busca la dirección del local
3. Clic en **Compartir → Insertar un mapa**
4. Copia la URL del `src` del iframe y pégala en `index.html`

---

## ✉️ Activar el formulario de contacto

El formulario actualmente **simula** el envío (validación + mensaje de éxito,
sin enviar datos a ningún servidor). Para activarlo de verdad, tienes varias opciones:

### Opción A – EmailJS (sin backend)
1. Crea una cuenta en [emailjs.com](https://www.emailjs.com)
2. Agrega su script al `<head>` de `index.html`
3. En `js/main.js`, dentro de `initContactForm()`, reemplaza el `setTimeout`
   de simulación por la llamada `emailjs.send(...)`

### Opción B – Backend propio (Flask/Node/etc.)
1. Cambia el `submit` del formulario para hacer `fetch('/contacto', { method: 'POST', body: ... })`
2. Crea el endpoint correspondiente en tu servidor para procesar y enviar el correo

---

## 🔧 Próximas funcionalidades sugeridas (escalabilidad)

El código está organizado para facilitar agregar:

- **Sistema de reservas en línea** → puede integrarse un calendario interactivo
  reutilizando la sección `#contacto` o agregando una nueva sección `#reservas`
- **Blog / Noticias** → agregar nueva sección con `.card` reutilizando estilos de `.service-card`
- **Multilenguaje** → estructura semántica permite duplicar contenido con `lang` attributes
- **CMS / Backend** → los datos de servicios y galería pueden moverse a JSON/API
  y renderizarse dinámicamente con JS

---

## ✅ Accesibilidad (WCAG 2.1 básico)

- HTML semántico (`nav`, `main`, `section`, `article`, `footer`)
- Atributos `alt` descriptivos en todas las imágenes de contenido
- `aria-label`, `aria-expanded`, `aria-modal`, `role="dialog"` donde corresponde
- Contraste de color verificado en textos sobre fondos claros y oscuros
- Navegación por teclado: foco visible (`:focus-visible`) en botones y enlaces
- Soporte para cerrar el lightbox con la tecla `Esc`

---

## 🎨 Paleta de colores (variables CSS)

Definidas en `:root` dentro de `css/style.css`:

| Variable | Color | Uso |
|---|---|---|
| `--blush-200` a `--blush-500` | Rosas | Acentos, botones secundarios, badges |
| `--gold` / `--gold-rich` | Dorado | Títulos, CTAs, bordes decorativos |
| `--cream` / `--ivory` | Cremas | Fondos de sección |
| `--warm-dark` | Marrón oscuro | Textos principales, footer, CTA banner |

---

## 📞 Información del negocio (editable)

Busca y reemplaza estos datos en `index.html` y `css` según corresponda:

- **Dirección:** Calle 123 #45-67, Bogotá, Colombia
- **WhatsApp:** 314 317 1650
- **Instagram:** @lovi.nails
- **Email:** contacto@lovinnails.com
- **Horarios:** Lunes-Viernes 9am-6pm, Sábados 9am-4pm, Domingos cerrado
