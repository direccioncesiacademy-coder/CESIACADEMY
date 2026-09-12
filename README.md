# 🎓 CESI Academy - Sistema de Gestión v3.0

## 📦 Estructura de Archivos

```
cesi-system/
├── index.html          # Archivo HTML principal
├── styles.css         # Estilos CSS avanzados
├── app.js             # Lógica JavaScript modular
└── README.md          # Esta documentación
```

## 🚀 Inicio Rápido

### Opción 1: Con Servidor Web (Recomendado)
```bash
# En la carpeta del proyecto, ejecuta:
python -m http.server 8000

# Luego abre en tu navegador:
http://localhost:8000/index.html
```

### Opción 2: Directamente desde Archivo
Simplemente **abre `index.html` en tu navegador** (sin servidor necesario para funcionalidad local).

### Opción 3: Alternativa con PHP
```bash
php -S localhost:8000
# Abre: http://localhost:8000/index.html
```

## 📋 Archivos Explicados

### `index.html`
- Estructura HTML5 semántica
- Integra Font Awesome para iconos
- Carga estilos y scripts externos
- Define modales para todas las funciones
- **No contiene lógica**, solo estructura

### `styles.css`
- CSS3 avanzado con variables CSS (`--primary`, `--secondary`, etc.)
- Diseño responsive con Mobile-First
- Animaciones suaves (`fadeIn`, `slideUp`, etc.)
- Sistema de grid flexible
- Componentes reutilizables (cards, buttons, forms)
- **~600 líneas de CSS limpio y modular**

### `app.js`
- Clase `CESIApp` que encapsula toda la lógica
- Métodos organizados por sección:
  - `initializeCESIData()` - Carga datos iniciales
  - `renderDepartments()` - Renderiza departamentos
  - `renderTasks()` - Renderiza tareas
  - Métodos para agregar, editar, eliminar
- Almacenamiento en localStorage
- **~400 líneas de JavaScript moderno (ES6+)**

## 🎨 Arquitectura CSS

### Variables Personalizadas
```css
--primary: #667eea (Morado claro)
--secondary: #764ba2 (Morado oscuro)
--success: #51cf66 (Verde)
--warning: #ffc107 (Amarillo)
--danger: #ff6b6b (Rojo)
```

### Sistema de Componentes
- **Botones**: `.btn-primary`, `.btn-secondary`, `.btn-danger`, etc.
- **Cards**: `.card`, `.card-title`, `.card-desc`
- **Grids**: `.grid`, `.grid-2`, `.grid-3`
- **Forms**: `.form-group`, `.form-actions`

### Animaciones
- `fadeIn` - Desvanecimiento
- `slideDown` - Deslizar hacia abajo
- `slideUp` - Deslizar hacia arriba
- `slideInLeft` - Deslizar desde izquierda

## 🏗️ Arquitectura JavaScript

### Clase CESIApp
```javascript
class CESIApp {
  - data: objeto con todos los datos
  - currentYear: año actual (2026/2027)
  - init(): inicializa la app
  - switchTab(): cambia entre pestañas
  - renderDepartments(): muestra departamentos
  - createDepartmentCard(): crea tarjeta de dept
  - // ... más métodos
}
```

### Estructura de Datos
```javascript
data = {
  currentYear: 2026,
  departments_2026: [...],
  departments_2027: [...],
  tasks: [...],
  meetings: [...],
  notes: [...],
  communications: [...],
  attendance: {}
}
```

## 🎯 Funcionalidades Principales

### 1. Gestión de Departamentos
- ✅ Ver todos los departamentos
- ✅ Agregar miembros
- ✅ Editar miembros (rol, email, info)
- ✅ Eliminar miembros
- ✅ 12 departamentos predefinidos para 2026
- ✅ Estructura lista para 2027

### 2. Sistema de Tareas (NUEVO v3)
```
TAREAS GENERALES
├─ Para todo el equipo CESI
├─ Muestra autor
└─ Estados: Pendiente / En Progreso / Completada

TAREAS POR DEPARTAMENTO
├─ Específicas de cada equipo
├─ Asignar a: TODO el depto O miembros específicos
├─ Muestra quién las creó
└─ Exportables
```

### 3. Reuniones
- Crear reuniones
- Asignar organizador
- Registrar temas
- Exportar PDF/CSV

### 4. Mural
- Notas con autor y fecha
- Exportar para todos
- Histórico completo

### 5. Asistencia
- Marcar presente/ausente
- Por departamento
- Guardado automático
- Exportable

### 6. Comunicados
- Comunicados generales
- Solicitudes de reunión
- Ideas y propuestas
- Con autor y fecha

## 🛠️ Cómo Extender

### Agregar Nueva Sección

1. **Agregar Tab en HTML**:
```html
<button class="nav-btn" data-tab="newsection">
    <i class="fas fa-icon"></i> Nueva Sección
</button>

<div id="newsection" class="tab-content">
    <!-- Contenido -->
</div>
```

2. **Agregar CSS** (en `styles.css`):
```css
.newsection-specific {
    /* estilos específicos */
}
```

3. **Agregar Métodos en JavaScript** (en `app.js`):
```javascript
renderNewSection() {
    const container = document.getElementById('newsection');
    // Código de renderizado
}
```

### Agregar Nuevo Campo a Miembro

1. **En HTML (`addMemberModal`)**: Agregar `<input>` o `<textarea>`
2. **En `saveMember()`**: Extraer valor del nuevo campo
3. **En `createMemberCard()`**: Mostrar el nuevo campo

## 🔒 Seguridad y Datos

### Almacenamiento
- **LocalStorage**: Datos persistentes en navegador
- **No hay servidor**: Todo es local
- **Respaldo**: Exportar a CSV regularmente

### Privacidad
- ✅ Datos solo en tu navegador
- ✅ No se envía a ningún servidor
- ✅ Solo accesible desde ese navegador

## 📊 Rendimiento

### Optimizaciones
- CSS modular y eficiente
- JavaScript con clase (no código global)
- Uso de `const` y `let` (no `var`)
- Event listeners delegados
- LocalStorage en lugar de base de datos

### Velocidad
- Carga instantánea (archivos locales)
- Animaciones suaves a 60fps
- Responsive sin frameworks pesados

## 🐛 Troubleshooting

### "Los archivos CSS/JS no cargan"
**Solución**: Asegúrate que `styles.css` y `app.js` estén en la misma carpeta que `index.html`

### "Las tareas no se guardan"
**Solución**: Verifica que JavaScript esté habilitado. Abre Consola (F12) para ver errores.

### "Aparece en blanco"
**Solución**: Abre Consola (F12) → Verifica errores → Recarga la página

### "Perdí los datos"
**Solución**: Los datos están en localStorage. Si se limpió:
1. Exporta regularmente a CSV
2. Guarda respaldos
3. Usa cloud sincronizado si necesitas respaldo

## 📱 Responsive

### Breakpoints
- **Móvil**: < 768px - Una columna
- **Tablet**: 768px - 1200px - Dos columnas
- **Desktop**: > 1200px - Múltiples columnas

### Dispositivos Soportados
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablets (iPad, Android)
- ✅ Móviles (iPhone, Android)

## 🔄 Workflow Recomendado

### Inicio del Día
1. Abre `index.html`
2. Verifica año (2026 o 2027)
3. Ve a ASISTENCIA → Marca presencia
4. Lee COMUNICADOS
5. Revisa TAREAS asignadas

### Durante el Día
1. Actualiza estado de tareas
2. Publica en MURAL si es necesario
3. Solicita reunión si es urgente
4. Agrega tareas nuevas

### Fin del Día
1. Exporta tareas (CSV)
2. Exporta reuniones (PDF)
3. Cierra navegador

## 📚 Documentación Adicional

Ver también:
- `GUIA_V2_COMPLETA.md` - Funcionalidades detalladas
- `CESI_2026_2027.md` - Información de miembros
- `ESTRUCTURA_CESI.md` - Organización

## 👥 Estructura de Datos - Miembro

```javascript
{
    id: 123456789,              // Timestamp único
    name: "Juan García",         // Nombre completo
    role: "Desarrollador Web",   // Posición
    email: "juan@email.com",     // Contacto
    fecha: "15/09/2026",         // Entrada a CESI
    frase: "Siempre aprender",   // Lema personal
    trayectoria: "3 años exp"    // Background
}
```

## 📈 Escala

### Límites Teóricos
- **Miembros**: Ilimitados (rendimiento depende del navegador)
- **Tareas**: 1000+ sin problema
- **Historial**: Ilimitado (localStorage ~5-10MB)
- **Usuarios**: 1 por navegador (es local)

### Recomendaciones
- Más de 500 miembros: Agregar búsqueda
- Más de 2000 tareas: Archivar antiguas
- Datos críticos: Respaldar en CSV mensual

## 🎓 Aprendizaje

### Tecnologías Usadas
- **HTML5**: Semántica moderna
- **CSS3**: Variables, Grid, Flexbox
- **JavaScript ES6+**: Clases, Arrow Functions, Destructuring
- **LocalStorage API**: Persistencia de datos

### Para Aprender
1. Lee `app.js` - Entiende la clase
2. Modifica `styles.css` - Cambia colores
3. Agrega un nuevo campo - Practica
4. Crea una nueva sección - Completo

## 📞 Soporte

### Problemas Comunes

**P: ¿Qué navegador usar?**
R: Chrome, Firefox, Safari o Edge - Cualquiera moderno

**P: ¿Se sincronizan los datos?**
R: No. Cada navegador tiene sus propios datos

**P: ¿Puedo compartir datos?**
R: Sí, exporta a CSV y comparte

**P: ¿Qué pasa si borro los datos?**
R: Se pierden. Por eso exporta regularmente

---

**Versión**: 3.0  
**Última actualización**: Septiembre 2026  
**Desarrollador**: CESI Academy Team  
**Licencia**: Uso interno CESI
