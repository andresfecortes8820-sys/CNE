# CNE Intelligence Monitor

MVP local con Next.js, TypeScript, Tailwind CSS y PostgreSQL. Español y America/Bogota. Identidad ilustrativa, no es un sitio oficial del CNE.

## Inicio

Requisitos: Node.js 22.16+ y PostgreSQL 17 o Docker.

```powershell
npm install
Copy-Item .env.example .env.local
# Edite .env.local: API_TOKEN debe tener al menos 24 caracteres aleatorios.
docker compose up -d
npm run migrate
npm run dev
```

Abra http://localhost:3000. En otra terminal ejecute `npm run worker`. Sin PostgreSQL se puede explorar la demo con el interruptor. El modo predeterminado REAL está vacío hasta una ingesta exitosa. Los ejemplos son ficticios, separados de los registros reales, sin enlaces originales.

## Implementado

- Dashboard responsive, modo claro/oscuro, color configurable y nueve secciones.
- Filtros combinados de publicación/captura, hoy/ayer, 24 h, 7/30/90 días, rango en Bogotá, plataforma, tema, sentimiento, relevancia y autor.
- Búsqueda AND/OR/NOT, frases y paréntesis; precedencia NOT > AND > OR. AND implícito entre términos.
- Vistas y preferencias en navegador. Gráficos y KPI recalculados, registros ordenables, paginación visual. Corrección de tono en memoria de sesión.
- Exportaciones PDF, Excel y CSV con etiquetas demo y referencias. CSV neutraliza fórmulas.
- Conector RSS HTTPS: solo feed, sin scraping ni acceso a paywalls. Filtra CNE, Consejo Nacional Electoral y CNE_COLOMBIA. Conserva metadatos, extractos, enlace, publicación y captura. Sin métricas inventadas.
- Deduplicación exacta por URL normalizada y hash. Worker secuencial, intervalo 15 min, backoff hasta una hora, bloqueo asesor PostgreSQL, mínimo un minuto entre intentos. Estados y errores visibles en Fuentes.
- Consulta de dashboard cada 60 segundos: no significa ingesta en tiempo real.
- Migración idempotente con fuentes, menciones, autores, temas, etiquetas, métricas, usuarios, reglas, alertas, reportes, sincronizaciones y auditoría. Varias tablas preparan módulos pendientes.
- GET /api/snapshot; POST /api/sync con Authorization: Bearer API_TOKEN. Token solo servidor y memoria al introducirlo en interfaz.

## Fuente RSS

Catálogo del editor: https://www.eltiempo.com/rss. Feed: https://www.eltiempo.com/rss/politica.xml. Disponibilidad y condiciones dependen del editor. La publicación de un RSS no concede licencia general de redistribución: revise condiciones para uso institucional. Si no hay coincidencias CNE, se guardan cero menciones. RSS_URL debe ser una fuente HTTPS de confianza configurada por el operador, nunca entrada arbitraria de un usuario.

## Verificar

```powershell
npm test
npm run lint
npm run build
```

Resultados observados en VALIDATION.md.

## Desplegar

```powershell
npm ci
npm run migrate
npm run build
npm start
# Proceso separado supervisado:
npm run worker
```

Escucha en 127.0.0.1. Antes de exponerlo, complete autenticación o use proxy TLS autenticado, PostgreSQL administrado, secretos del proveedor y backups. Compose y contraseña incluida son solo para desarrollo. Use un worker supervisado; el bloqueo evita ingestas RSS concurrentes. No hay cola distribuida: se reintenta en el siguiente ciclo. Los registros insertados antes de un fallo se deduplican al reintentar.

## Límites y pendientes

- X, Meta, TikTok, YouTube: estados visibles, SIN adaptadores. Requieren desarrollo, permisos y licencias; introducir credenciales no basta.
- IA contextual, entidades, narrativas semánticas, picos y revisión de afirmaciones: pendientes. RSS ingresa neutral, confianza nula y tema Por revisar. La síntesis disponible es determinista, identificada como tal.
- Alertas: umbrales locales sobre el filtro. Sin anomalías estadísticas, eventos persistidos, historial, deduplicación de alertas ni correo.
- Login, SSO, RBAC efectivo y auditoría editorial: pendientes. Lectura API sin autenticación; roles SQL no implementan autorización. Mantener en localhost o detrás de proxy autenticado. Token protege solo sincronización.
- Comparaciones con período anterior, alcance, engagement, región fiable, agrupación semántica y evolución del sentimiento: pendientes. Datos ausentes N/D, sin estimaciones.
- Reportes diarios/semanales/mensuales automáticos: pendientes; exportación a solicitud.
- Catálogo editable, keywords y voceros por interfaz: pendiente. RSS_URL configurable; detección en lib/rss.ts.
- Correcciones editoriales solo en sesión, vistas por navegador; falta persistencia por usuario.
- Paginación cliente. API devuelve hasta 10.000 registros recientes; métricas y exportación abarcan ese conjunto. Falta paginación y agregación servidor para mayor volumen.
- Sin caching (no-store), cola distribuida, DLQ o tabla de jobs.
- Sin garantía de cobertura total ni tiempo real. Antes de uso institucional: revisión jurídica de protección de datos, retención, finalidades y auditoría de seguridad.

## Estructura

app/ interfaz y API; lib/ tipos, filtros, demo, DB, RSS y autorización; migrations/ SQL; scripts/ migración y worker; tests/ pruebas básicas.
