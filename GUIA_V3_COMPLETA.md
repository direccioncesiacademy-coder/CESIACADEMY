# 📘 GUÍA COMPLETA - CESI Academy Sistema v3.0

## 🚀 Inicio Rápido

### Cómo Abrir el Sistema

**Opción 1: Directamente (Más Fácil)**
1. Descarga los 3 archivos: `index.html`, `styles.css`, `app.js`
2. Colócalos en la **misma carpeta**
3. Haz doble clic en `index.html` → Se abre en tu navegador
4. ¡Listo! El sistema funciona al instante

**Opción 2: Con Servidor Web (Mejor)**
```bash
# En Windows (Powershell):
python -m http.server 8000

# En Mac/Linux (Terminal):
python3 -m http.server 8000

# Luego abre en navegador: http://localhost:8000/index.html
```

---

## 📋 Estructura de la Aplicación

```
CESI Academy v3.0
├── 🏢 DEPARTAMENTOS (Gestión de equipos)
├── ✅ TAREAS (Sistema completo)
├── 📅 REUNIONES (Con organizador)
├── 📌 MURAL (Notas compartidas)
├── 📊 ASISTENCIA (Control de presencia)
└── 📢 COMUNICADOS (3 tipos)
```

---

## 🏢 SECCIÓN 1: DEPARTAMENTOS

### ¿Qué es?
Gestiona todos los equipos de CESI, sus miembros y roles.

### Funciones Principales

#### 1. Ver Departamentos
```
Pestaña DEPARTAMENTOS
├─ 12 departamentos predefinidos
├─ Cada uno con sus miembros
└─ 2026 con miembros, 2027 vacío
```

#### 2. Agregar Miembro a Departamento
```
Pasos:
1. Ve a pestaña DEPARTAMENTOS
2. Selecciona un departamento (tarjeta)
3. Presiona botón "+ Agregar"
4. Rellena el formulario:
   - Nombre * (obligatorio)
   - Rol * (obligatorio)
   - Email (opcional)
   - Fecha de Ingreso (opcional)
   - Frase o Lema (opcional)
   - Trayectoria (opcional)
5. Presiona "Guardar"
```

**Ejemplo:**
```
Nombre: María García
Rol: Desarrolladora Frontend
Email: maria@email.com
Fecha: 15/09/2026
Frase: "Código limpio, mente tranquila"
Trayectoria: "4 años en frontend"
```

#### 3. Editar Miembro
```
Pasos:
1. Ve a DEPARTAMENTOS
2. Encuentra al miembro en su departamento
3. Presiona el botón de LÁPIZ (✏️)
4. Modifica lo que desees
5. Presiona "Guardar"
```

**Qué puedes cambiar:**
- Nombre
- Rol (cambiar posición)
- Email
- Fecha
- Frase
- Trayectoria

#### 4. Eliminar Miembro
```
Pasos:
1. Ve a DEPARTAMENTOS
2. Busca al miembro
3. Presiona botón PAPELERA (🗑️)
4. Confirma eliminación
5. Miembro desaparece
```

#### 5. Agregar Nuevo Departamento (Solo 2026)
```
Pasos:
1. Selector de año en arriba: Selecciona 2026
2. Presiona "+ Nuevo Departamento"
3. Rellena:
   - Nombre *
   - Descripción (opcional)
4. Presiona "Crear"
5. Nuevo departamento aparece
```

---

## ✅ SECCIÓN 2: TAREAS (Sistema Completo v3)

### Estructura

```
TAREAS
├─ TAREAS GENERALES
│  └─ Para todo el equipo CESI
└─ TAREAS POR DEPARTAMENTO
   ├─ Asignar a TODO el depto
   └─ Asignar a miembros específicos
```

### Tipo 1: Tareas Generales (Para Todos)

#### Crear Tarea General
```
Pasos:
1. Pestaña TAREAS
2. Botón "+ Nueva Tarea General (Para Todos)"
3. Rellena:
   - Título * (nombre de la tarea)
   - Descripción (qué hay que hacer)
   - Tu Nombre (Autor) *
4. Presiona "Crear Tarea"
```

**Ejemplo:**
```
Título: Revisar documentación
Descripción: Revisar y actualizar toda la doc de CESI
Tu Nombre: Juan
```

**Resultado:**
- Aparece en sección "Tareas Generales (Para Todos)"
- Todo el equipo la ve
- Muestra quién la escribió

### Tipo 2: Tareas de Departamento

#### Crear Tarea de Departamento
```
Pasos:
1. Pestaña TAREAS
2. Selecciona un departamento en el dropdown
3. Presiona "+ Agregar Tarea"
4. Rellena:
   - Título *
   - Descripción
   - Tu Nombre (Autor) *
   - Asignar a:
     ☑ Todo el departamento → Todos lo ven
     ☐ Miembros específicos → Solo ciertos
5. Si seleccionas "Miembros específicos":
   - Aparecen checkboxes con todos los miembros
   - Marca los que deben hacerlo
6. Presiona "Crear Tarea"
```

**Ejemplo Opción 1 (Todos del depto):**
```
Título: Actualizar plataforma
Descripción: Actualizar a versión 2.1
Autor: Evan
Asignar a: [✓] Todo el departamento
```

**Ejemplo Opción 2 (Miembros específicos):**
```
Título: Revisar PR de login
Descripción: Revisar el nuevo sistema de login
Autor: Juan
Asignar a: [✓] Miembros específicos
Miembros: [✓] Mane
          [✓] Rico
          [ ] Dev
```

### Visualización de Tareas

#### Sección "Tareas Generales"
```
┌─────────────────────────────────┐
│ Actualizar documentación        │
│ Pendiente                       │
│                                 │
│ Escrito por: Juan              │
│ 15/09/2026                     │
└─────────────────────────────────┘
```

#### Sección por Departamento
```
┌─────────────────────────────────┐
│ EQUIPO TÉCNICO                  │
├─────────────────────────────────┤
│ Actualizar plataforma          │
│ En progreso                    │
│                                │
│ Asignado a: Mane, Rico         │
│ Escrito por: Evan              │
│ 15/09/2026                     │
└─────────────────────────────────┘
```

### Estados de Tareas

| Estado | Botón | Significa |
|--------|-------|-----------|
| **Pendiente** | Amarillo | No se ha iniciado |
| **En Progreso** | Azul | Se está trabajando |
| **Completada** | Verde | Terminada |

### Cambiar Estado

```
Pasos:
1. En la tarjeta de tarea
2. Presiona botón "Iniciar/Completar/Reabrir"
3. El estado cambia automáticamente

Ciclo:
Pendiente → En Progreso → Completada → Pendiente
```

### Marcar Completada (Checkbox)

```
Alternativa rápida:
1. Haz clic en el checkbox □
2. La tarea se marca completa
3. Se guarda automáticamente
```

### Eliminar Tarea

```
Pasos:
1. Presiona botón PAPELERA (🗑️)
2. Confirma eliminación
3. Tarea desaparece
```

### Filtros (Próximamente)
- Por departamento
- Por estado
- Por asignación

---

## 📅 SECCIÓN 3: REUNIONES

### Crear Reunión

```
Pasos:
1. Pestaña REUNIONES
2. Presiona "+ Nueva Reunión"
3. Rellena:
   - Departamento * (selecciona)
   - Título * (tema de reunión)
   - Fecha * (cuándo)
   - Hora * (a qué hora)
   - Temas a Tratar (lista)
   - Organizado por * (tu nombre)
4. Presiona "Crear Reunión"
```

**Ejemplo:**
```
Departamento: Equipo Técnico
Título: Planificación Sprint 5
Fecha: 20/09/2026
Hora: 15:30
Temas:
- Funcionalidades nuevas
- Bugs a arreglar
- Timeline
Organizado por: Evan
```

### Ver Reuniones

```
Aparecen todas las reuniones con:
├─ Título
├─ Departamento
├─ Fecha y Hora
├─ Temas listados
├─ Quién la organiza
└─ Cuándo se creó
```

### Exportar Reuniones

#### Exportar a PDF
```
Botón: PDF (lado derecho de Reuniones)

Resultado:
├─ Documento formateado
├─ Lista de todas las reuniones
├─ Se abre diálogo de impresión
└─ Puedes guardar como PDF o imprimir
```

#### Exportar a CSV
```
Botón: CSV (lado derecho)

Resultado:
├─ Se descarga archivo .csv
├─ Puedes abrirlo en Excel
├─ Datos listos para analizar
└─ Nombre: reuniones_[timestamp].csv
```

### Eliminar Reunión

```
1. Presiona botón PAPELERA (🗑️)
2. Confirma
3. Reunión se elimina
```

---

## 📌 SECCIÓN 4: MURAL

### Crear Nota

```
Pasos:
1. Pestaña MURAL
2. Presiona "+ Nueva Nota"
3. Rellena:
   - Asunto * (título)
   - Contenido * (el mensaje)
   - Tu Nombre (Autor) *
4. Presiona "Crear Nota"
```

**Ejemplo:**
```
Asunto: Cambio de horario
Contenido: Las clases ahora son de 18:00 a 19:30 en lugar de 18:30 a 19:30
Tu Nombre: Katary
```

### Ver Notas

```
Cada nota muestra:
├─ Título (asunto)
├─ Contenido
├─ Autor (quién la escribió)
├─ Fecha (cuándo)
├─ Hora (a qué hora)
└─ Botón eliminar
```

**Visualización:**
```
┌─────────────────────────────────────┐
│ Cambio de horario                  │
│                                     │
│ Las clases ahora son de 18:00      │
│ a 19:30 en lugar de 18:30 a 19:30 │
│                                     │
│ Katary - 15/09/2026 18:42:33       │
│ [Papelera]                          │
└─────────────────────────────────────┘
```

### Exportar Mural

#### A PDF
```
Botón: PDF
Resultado: Notas con estilo visual, listos para imprimir
```

#### A CSV
```
Botón: CSV
Resultado: Descarga archivo para Excel
Incluye: Asunto, Contenido, Autor, Fecha, Hora
```

---

## 📊 SECCIÓN 5: ASISTENCIA

### Marcar Asistencia

```
Pasos:
1. Pestaña ASISTENCIA
2. Selecciona la fecha (fecha picker)
3. Verás departamentos con miembros
4. Para cada miembro:
   - Presiona "Presente" (verde)
   - O "Ausente" (rojo)
5. Se guarda automáticamente
```

**Visualización:**
```
┌─ EQUIPO TÉCNICO ──────────────────┐
│ Mane    [Técnico]  [✓ Presente] [ Ausente]
│ Rico    [Soporte]  [ Presente] [✓ Ausente]
│ Dev     [Dev]      [✓ Presente] [ Ausente]
└───────────────────────────────────┘
```

### Ver Días Anteriores

```
Pasos:
1. Ve a ASISTENCIA
2. Cambia la fecha en el selector
3. Verás la asistencia de ese día
4. Los datos se mantienen guardados
```

**Ejemplo:**
```
Fecha actual: 15/09/2026
Cambio a: 14/09/2026
Veo: Quién fue presente/ausente el 14
```

### Exportar Asistencia

#### A PDF
```
Botón: PDF
Resultado: Tabla completa de asistencia del día
Muestra: Todos los departamentos y miembros
```

#### A CSV
```
Botón: CSV
Resultado: Archivo para Excel
Incluye: Departamento, Miembro, Rol, Asistencia, Fecha
```

---

## 📢 SECCIÓN 6: COMUNICADOS

### Estructura de Comunicados

**3 tipos disponibles:**

#### 1️⃣ Comunicado General (📢)
**Para:** Anuncios de toda la organización
**Destinado a:** Todo CESI Academy

```
Pasos:
1. Pestaña COMUNICADOS
2. Botón "Comunicado"
3. Rellena:
   - Asunto *
   - Descripción *
   - Tu Nombre *
4. Presiona "Enviar"
```

**Ejemplos:**
- "Se suspenden clases el viernes"
- "Nuevo sistema de pases"
- "Cambios en la plataforma"

#### 2️⃣ Solicitar Reunión (🤝)
**Para:** Pedir una reunión a un departamento
**Destinado a:** Jefe/responsables del depto

```
Pasos:
1. Pestaña COMUNICADOS
2. Botón "Solicitar Reunión"
3. Rellena:
   - Asunto * (tema)
   - Descripción * (por qué)
   - Tu Nombre *
   - Departamento * (a quién)
4. Presiona "Enviar"
```

**Ejemplo:**
```
Asunto: Reunión urgente
Descripción: Necesito hablar sobre el proyecto X
Tu Nombre: Juan
Departamento: Equipo Técnico
```

#### 3️⃣ Nueva Idea (💡)
**Para:** Proponer ideas o iniciativas
**Destinado a:** Directivos y equipo

```
Pasos:
1. Pestaña COMUNICADOS
2. Botón "Nueva Idea"
3. Rellena:
   - Asunto * (idea)
   - Descripción * (explicación)
   - Tu Nombre *
4. Presiona "Enviar"
```

**Ejemplo:**
```
Asunto: Crear grupo de estudio
Descripción: Propongo crear un grupo de React para aprender juntos
Tu Nombre: María
```

### Ver Comunicados

```
Todos los comunicados aparecen en la pestaña
con color según tipo:
- 📢 Azul: Comunicados
- 🤝 Amarillo: Solicitudes
- 💡 Morado: Ideas

Cada uno muestra:
├─ Tipo y título
├─ Contenido
├─ Autor
├─ Fecha y hora
└─ Botón eliminar
```

### Eliminar Comunicado

```
1. Presiona papelera 🗑️
2. Confirma
3. Desaparece
```

---

## ⚙️ CONFIGURACIÓN

### Selector de Año

```
Arriba a la derecha:
- 2026 (Actual) ← Con miembros reales
- 2027 (Proyectado) ← Estructura lista

Cambiar año:
1. Presiona dropdown
2. Selecciona año
3. Se actualiza todo
```

**Diferencias:**
- **2026:** Todos los miembros cargados, puedes agregar
- **2027:** Estructura sin miembros, listo para nuevo equipo

---

## 💾 GUARDADO Y DATOS

### Dónde Se Guardan Los Datos

```
Se guardan EN TU NAVEGADOR (localStorage)
├─ No se envía a ningún servidor
├─ Solo accesible desde este navegador
├─ Persisten al cerrar la pestaña
└─ Se pierden si limpias el caché
```

### Respaldar Datos

**Recomendación:** Exporta a CSV regularmente

```
Pasos:
1. Pestaña REUNIONES → Botón CSV
2. Pestaña MURAL → Botón CSV
3. Pestaña ASISTENCIA → Botón CSV
4. Guarda los archivos en tu PC
5. Tienes respaldo de los datos
```

### Si Se Pierden Datos

```
Solución:
1. Los datos están en localStorage
2. Si se limpió: se pierden
3. Por eso: respalda con CSV
4. Restaurar: importa manualmente
```

---

## 🎯 Flujo Recomendado de Uso Diario

### 🌅 Mañana (Inicio del Día)

```
1. Abre index.html
2. Verifica año: 2026 o 2027
3. ASISTENCIA: Marca presencia
4. COMUNICADOS: Lee qué necesitan
5. TAREAS: Revisa lo asignado
6. REUNIONES: Confirma asistencia
```

### 💼 Durante el Día

```
1. Actualiza estado de tareas
2. Publica en MURAL si es necesario
3. Solicita reunión si es urgente
4. Agrega tareas nuevas
5. Envía comunicados
```

### 🌆 Fin del Día

```
1. Exporta tareas (CSV)
2. Exporta reuniones (PDF)
3. Actualiza asistencia final
4. Publica notas importantes en mural
5. Cierra navegador
```

### 📋 Fin de Semana

```
1. Exporta ASISTENCIA (semana)
2. Exporta REUNIONES (semana)
3. Exporta MURAL (semana)
4. Crea respaldo de todo
5. Analiza reportes
```

---

## 📱 Versiones Compatible

✅ **Desktop:**
- Windows (Chrome, Firefox, Edge, Safari)
- Mac (Chrome, Firefox, Safari)
- Linux (Chrome, Firefox)

✅ **Móvil/Tablet:**
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)

---

## 🆘 Solucionar Problemas

### "No veo las tareas generales"
**Solución:** Recarga la página (F5) y verifica que creaste la tarea

### "Los datos no se guardan"
**Solución:** Abre Consola (F12) → Console → Busca errores rojos

### "No puedo editar en 2027"
**Solución:** Los datos 2027 están vacíos. Agrega miembros primero

### "Desapareció todo"
**Solución:** Probable que se limpió el cache. Usa respaldos CSV

### "El diseño se ve raro"
**Solución:** Asegúrate que `styles.css` esté en la misma carpeta que `index.html`

---

## 📊 Estadísticas de Uso

### Capacidad del Sistema

```
Miembros: Ilimitados
Tareas: 1000+ sin problema
Reuniones: 500+
Mural: 200+ notas
Comunicados: Ilimitados
Asistencia: Histórico completo
```

### Recomendaciones

```
- Más de 500 miembros: Agregar búsqueda
- Más de 2000 tareas: Archivar antiguas
- Datos críticos: Respaldar mensual
- Performance: Exporta regularmente
```

---

## 🎓 Tips Avanzados

### 1. Usar Comunicados como Documentación
```
En lugar de email:
- Escribe comunicado
- Todos lo ven en un lugar
- Queda registrado con fecha
- Fácil de exportar
```

### 2. Asistencia como Métrica
```
- Exporta mensual
- Identifica patrones
- Toma decisiones basadas en datos
- Genera reportes
```

### 3. Reuniones + Mural
```
- Convoca en COMUNICADOS
- Crea reunión en REUNIONES
- Publica resumen en MURAL
- Todo documentado
```

### 4. Tareas en Cascada
```
1. Tarea general → Todo el mundo
2. Tareas departamentos → Equipos
3. Tareas miembros → Específicas
4. Seguimiento en ASISTENCIA
```

---

## 📞 Soporte Rápido

| Problema | Solución |
|----------|----------|
| No abre el archivo | Asegúrate que los 3 archivos estén juntos |
| Se ve en blanco | Recarga con F5 o Ctrl+Shift+R |
| No guarda datos | Revisa consola (F12) para errores |
| Datos perdidos | Usa respaldos CSV |
| Lento en móvil | Usa versión desktop si es posible |

---

**Versión:** 3.0  
**Última actualización:** Septiembre 2026  
**Desarrollador:** CESI Academy  
**Licencia:** Uso Interno CESI  

¡Que disfrutes usando CESI Academy! 🎓✨
