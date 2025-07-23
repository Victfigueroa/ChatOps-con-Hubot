# ChatOps con Hubot y Slack

Grupo 5:  
Juan Villaman  
Cristóbal de Jesus  
Víctor Figueroa

**Módulo 7: Despliegue y monitoreo continuo**  
**Ejercicio Guiado: Implementación de ChatOps con Hubot y Slack**

---
## Descripción
Durante este ejercicio desarrollamos un bot de ChatOps utilizando Hubot, que permite a los usuarios consultar el estado de un servicio backend directamente desde un canal de comunicación (Slack o consola). Esto lo logramos conectando Hubot con un backend vía HTTP y exponiendo este servicio a través de Ngrok para pruebas remotas.

## Objetivo
El objetivo del ejercicio fue experimentar una integración básica de ChatOps, automatizando la validación del estado de un servicio, lo cual es esencial en contextos DevOps para responder rápidamente ante caídas o errores.

---

# Monitoreo de Servicios con Hubot: Integración de ChatOps para Validación de Estado

Este bot responde al comando `estado del servicio` y consulta el estado de un backend expuesto en un endpoint público.

## Requisitos

- Node.js  
- Redis (corriendo localmente o en un servicio)  
- Ngrok  
- Hubot  

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/victfigueroa/chatops-hubot-monitor.git
cd chatops-hubot-monitor
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `estado.js` en `/scripts`

Este script responde al comando `estado del servicio` y consulta el endpoint del backend.

```javascript
module.exports = (robot) => {
  robot.respond(/estado del servicio/i, async (res) => {
    try {
      const response = await fetch('https://3d9ed118b40a.ngrok-free.app/status');
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.send('Error al consultar el estado del backend.');
    }
  });
};
```

### 4. Iniciar el backend (en otro terminal)

```bash
PORT=4000 node server.js
```

### 5. Exponer el backend con ngrok

```bash
ngrok http 4000
```

### 6. Reiniciar Hubot

```bash
$env:PORT=4000
.\bin\hubot.cmd
```

### 7. Probar comando en consola de Hubot

```bash
hubot> estado del servicio
```

✅ Resultado esperado  
Cuando escribes `estado del servicio`, Hubot debe consultar el backend y responder con el estado actual:  
**"El backend está corriendo y saludable"**

---

## 🌐 URL Pública

**https://3d9ed118b40a.ngrok-free.app/status**  
Esta URL corresponde al endpoint del backend expuesto mediante ngrok. Su función es entregar el estado del servicio ("OK", "Saludable", o similar) que será consultado por Hubot al ejecutar el comando.

---

## 📸 Evidencias

1. **Respuesta en PowerShell:**
 <img width="1366" height="727" alt="powershell" src="https://github.com/user-attachments/assets/aae5b5b5-f0a4-43ed-a946-76dd219bb0fc" />

Se muestra "El backend está corriendo y saludable" al ejecutar el comando en consola.

2. **Respuesta en Slack:**
 <img width="680" height="332" alt="slack" src="https://github.com/user-attachments/assets/bc3762ff-ed54-4edf-8f39-56b6d7e56996" />

Hubot responde correctamente al comando `estado del servicio` directamente en un canal de Slack, integrando la funcionalidad con la herramienta de comunicación.

---

## Preguntas finales

- **¿Qué beneficios aporta ChatOps en un flujo de trabajo DevOps?**  
ChatOps mejora la colaboración y visibilidad en tiempo real de los eventos operativos. Por ejemplo, consultar el estado de un servicio sin salir del chat permite decisiones más rápidas y compartidas.

- **¿Qué tipo de tareas serían útiles automatizar en un canal de comunicación?**  
Monitoreo de servicios, reinicio de pods, alertas de errores, ejecución de pipelines, despliegues controlados. Automatizar tareas reduce errores manuales y acelera la respuesta en incidentes.

- **¿Qué retos podrían surgir al usar bots como interfaz de operación?**  
Podrían surgir riesgos de seguridad si se exponen comandos sensibles, o ambigüedades en los comandos. Además, requiere una buena configuración de permisos y validaciones para evitar acciones no deseadas.

