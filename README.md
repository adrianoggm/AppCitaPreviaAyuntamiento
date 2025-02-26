# AppCitaPreviaAyuntamiento

Este repositorio contiene la aplicación genérica de cita previa para ayuntamientos, organizada como un mono-repo con dos partes principales:

- **Back-end:**  
  Implementado en TypeScript utilizando NestJS y siguiendo una arquitectura hexagonal para mantener una clara separación de responsabilidades (dominio, aplicación, infraestructura y compartido). Se utiliza MongoDB para la persistencia, con Mongoose para el manejo de modelos y validaciones, y se implementan técnicas de encriptación para datos sensibles.

- **Front-end:**  
  Implementado en Angular 19. La aplicación consume la API del back-end para gestionar las operaciones de cita previa.

---

