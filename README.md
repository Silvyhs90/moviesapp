# Movies App

Aplicación React para buscar películas y series usando The Movie Database.

## Cómo correrla

```bash
npm install
npm start
```

En Windows, si PowerShell bloquea `npm`, usá:

```bash
npm.cmd install
npm.cmd start
```

Si usás Node 17 o superior y aparece `ERR_OSSL_EVP_UNSUPPORTED`, ejecutá antes:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm.cmd start
```

## Novedades de esta versión

- Home modernizada.
- Búsqueda de películas y series.
- Cards con puntuación visual.
- Botón de favoritos con guardado en localStorage.
- Sección Favoritos.
- Modal “Dónde ver” con opciones legales de streaming para Argentina.
- Tráiler de YouTube embebido cuando está disponible.
