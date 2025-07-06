# Proyecto Expo

Este repositorio contiene una aplicación desarrollada con **Expo** y **React Native**. A continuación se detallan los pasos para instalar dependencias, configurar variables de entorno y ejecutar el proyecto.

---

## Requisitos previos

* Node.js (versión 16 o superior)
* npm o Yarn
* Expo CLI instalado globalmente:

  ```bash
  npm install -g expo-cli
  # o si usas Yarn:
  yarn global add expo-cli
  ```
* Acceso a un emulador o dispositivo físico con Expo Go instalado

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TU_USUARIO/tu-proyecto-expo.git
   cd tu-proyecto-expo
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o con Yarn:
   yarn install
   ```

3. Copia el archivo de variables de entorno:

   ```bash
   cp .env.sample .env
   ```

   * Edita el archivo `.env` según tus valores locales (por ejemplo `API_URL`, claves, etc.).

---

## Variables de entorno

El proyecto utiliza un archivo `.env` en la raíz. Asegúrate de definir al menos las siguientes variables:

```ini
# .env
API_URL=http://192.168.x.x:8081
# Otras variables que necesite tu proyecto...
```

---

## Ejecutar la aplicación

* Para iniciar en modo desarrollo:

  ```bash
  expo start
  ```

  Se abrirá Expo DevTools en tu navegador.

* Para probar en un emulador Android:

  ```bash
  expo run:android
  ```

* Para probar en un emulador iOS (macOS):

  ```bash
  expo run:ios
  ```

* Para probar en un dispositivo físico, escanea el QR con Expo Go o usa el modo Tunnel:

  ```bash
  expo start --tunnel
  ```

---

## Construir para producción

* Android (APK/AAB):

  ```bash
  expo build:android
  ```

* iOS (IPA):

  ```bash
  expo build:ios
  ```

> Para más detalles sobre opciones de construcción, consulta la documentación oficial de Expo.

---

## Estructura del proyecto

```
app/
├── api/
│   ├── contenidos+api.ts
│   ├── generos+api.ts
│   └── tipos+api.ts
├── detail/
│   └── [id].tsx
├── games/
│   └── hangman/
│       ├── game.tsx
│       └── start-screen.tsx
├── index.tsx
└── _layout.tsx

src/
├── common/
│   └── constants.ts
├── context/
│   ├── Contenidos.tsx
│   ├── Filter.tsx
│   └── PlayerName.tsx
├── data/
│   ├── contenidosAudiovisuales.ts
│   ├── generosContenidoAudiovisual.ts
│   └── tiposContenidoAudiovisual.ts
├── navigation/
│   └── routes.tsx
├── screens/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── CajaJuego.tsx
│   │   ├── ContenidoPorTipo.tsx
│   │   ├── Contenido.tsx
│   │   ├── FilterModal.tsx
│   │   ├── ListaGeneros.tsx
│   │   ├── Tag.tsx
│   │   ├── TarjetaProducto.tsx
│   │   └── TextPressStart2P.tsx
│   ├── DetailScreen.tsx
│   ├── games/
│   │   └── hangman/
│   │       ├── components/
│   │       ├── GameScreen.tsx
│   │       └── utils/
│   └── HomeScreen.tsx
└── services/
    └── servicios.ts
```

