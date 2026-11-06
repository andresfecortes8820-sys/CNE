# Validación del MVP

Fecha: 5 de noviembre de 2026, America/Bogota.

## Resultados

- `npm install`: correcto. Lockfile incluido.
- Auditoría final de instalación: **0 vulnerabilidades reportadas**. Se sustituyó SheetJS por ExcelJS y se actualizó jsPDF. Overrides: minimatch 11 para tooling y uuid 11 para ExcelJS; la descarga XLSX se verificó después del cambio.
- `npm test`: **4 pruebas aprobadas**. Búsqueda booleana, separación demo, filtros combinados y migración SQL repetible/deduplicación/estado inválido con PostgreSQL embebido PGlite.
- `npm run lint`: aprobado sin errores ni advertencias.
- `npm run build`: aprobado con Next.js 16.4.5 y Webpack; rutas `/`, `/api/snapshot`, `/api/sync`.
- `npm start`: servidor de producción iniciado correctamente en 127.0.0.1:3000.
- API snapshot: HTTP 200, registros reales vacíos y fuentes unavailable al no configurar base de datos.
- API sync sin token: HTTP 401.
- RSS público: HTTP 200; parseo real de 10 entradas de El Tiempo Política, cero coincidencias CNE al verificar. No se generaron menciones ficticias como sustituto.
- Navegador: demo identificada, 42 registros; seleccionar X reduce KPI a 7 y quitar filtro restaura 42. Navegación Reportes y móvil verificadas. Exportaciones XLSX y PDF descargadas con 42 registros demo.
- Interfaz revisada en viewport móvil 390 × 844 y distribución de escritorio. Captura en outputs/dashboard-demo.png.

## Límites de la verificación

No se detectaron comandos Docker ni psql en PATH. No se configuró ni arrancó un servidor PostgreSQL externo. La migración se probó con el motor PostgreSQL embebido PGlite, pero la ingesta completa con pg.Pool, bloqueo asesor, worker y persistencia en servidor externo requiere validación al configurar DATABASE_URL.

CSV tiene implementación y escape de fórmulas, pero no se probó su descarga en navegador. No se probaron APIs sociales ni IA porque no están implementadas. La descarga PDF fue comprobada; no hubo revisión visual página por página del documento exportado.

El primer build con Turbopack falló por creación de junctions restringida en Windows. Los scripts usan Webpack. Un primer intento de prerender falló por un permiso transitorio al crear un directorio; al repetir el build completó correctamente, sin modificar controles del sistema.

La evaluación no equivale a auditoría de seguridad ni certificación de disponibilidad. Consulte los pendientes de producción en README.md.
