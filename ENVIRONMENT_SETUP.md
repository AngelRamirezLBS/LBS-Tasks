# Configuración de Entornos

Este proyecto está configurado para usar diferentes APIs según el entorno de build.

## Entornos Disponibles

### 1. Development (Desarrollo)
- **API URL**: `http://localhost:5050` (Tu url del backend corriendo localmente)
- **Comando**: `ng serve` o `ng build --configuration=development`
- **Archivo**: `src/environments/environment.dev.ts`

### 2. Staging (Pre-producción)
- **API URL**: `https://dev.alfalbs.app/ApiOmega`
- **Comando**: `ng serve --configuration=staging` o `ng build --configuration=staging`
- **Archivo**: `src/environments/environment.stg.ts`

### 3. Production (Producción)
- **API URL**: `https://www.alfalbs.app/ApiOmega`
- **Comando**: `ng build` o `ng build --configuration=production`
- **Archivo**: `src/environments/environment.prod.ts`

## Comandos de Uso

### Para desarrollo local:
```bash
ng serve
# o
ng serve --configuration=development
```

### Para staging:
```bash
ng serve --configuration=staging
ng build --configuration=staging
```

### Para producción:
```bash
ng build
# o
ng build --configuration=production
```

## Estructura de Archivos

```
src/environments/
├── environment.ts              # Archivo base (desarrollo por defecto)
├── environment.interface.ts    # Interfaz TypeScript
├── environment.dev.ts          # Configuración de desarrollo
├── environment.stg.ts          # Configuración de staging
└── environment.prod.ts         # Configuración de producción
```

## Cómo Funciona

El sistema utiliza `fileReplacements` en `angular.json` para reemplazar automáticamente el archivo `environment.ts` con el archivo correspondiente según la configuración seleccionada durante el build.

## Uso en el Código

Para usar la configuración en tu código, simplemente importa el archivo environment:

```typescript
import { environment } from '../environments/environment';

// Usar la URL base
const apiUrl = environment.baseURL;
``` 
