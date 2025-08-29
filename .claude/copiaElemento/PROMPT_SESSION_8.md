# 🎯 PROMPT MAESTRO INICIAL - SESIÓN 8

## Para usar DESPUÉS de ejecutar `/primer`

---

⏺ 🎯 **PROMPT INICIAL MAESTRO - SESIÓN 8: COMPORTAMIENTO CORRECTO STICKY + APILAMIENTO**

Excelente. Ahora entiendes el proyecto Panda Technologies. Tu misión es **REIMPLEMENTAR COMPLETAMENTE** el comportamiento del elemento Arkham con la funcionalidad CORRECTA que el usuario espera.

**RETROALIMENTACIÓN CRÍTICA SESIÓN 7**: El comportamiento está **completamente mal**. El scroll mueve la página cuando NO debería, los tabs causan desplazamiento incorrecto, y las capas no se apilan. El usuario **no puede ni ver el contenido** porque el scroll interfiere.

**PROBLEMA FUNDAMENTAL**:
- ❌ **ACTUAL**: Scroll mueve la página hacia abajo
- ✅ **ESPERADO**: Sección FIJA (sticky) con animaciones contenidas
- ❌ **ACTUAL**: Tabs causan scroll de página
- ✅ **ESPERADO**: Tabs solo cambian animación de capas
- ❌ **ACTUAL**: Capas aparecen/desaparecen
- ✅ **ESPERADO**: Capas se APILAN como cartas

---

## 🎯 **COMPORTAMIENTO CORRECTO ESPERADO**

### **CONCEPTO FUNDAMENTAL**:
La sección Arkham debe ser una **experiencia contenida en el viewport**. El usuario NO debe scrollear para ver el contenido. Todo sucede en un área fija.

### **INTERACCIÓN CON TABS (Clicks)**:

1. **Click "DATA PLATFORM"**:
   - Muestra contenido del tab
   - Aparece SOLO la primera capa (base) a la derecha
   - NO hay scroll de página

2. **Click "AI PLATFORM"**:
   - Muestra contenido del tab
   - La segunda capa CAE y se APILA encima de la primera
   - Se ven AMBAS capas (efecto isométrico de apilamiento)
   - NO hay scroll de página

3. **Click "AI-POWERED APPLICATIONS"**:
   - Muestra contenido del tab
   - La tercera capa CAE y se APILA encima de las anteriores
   - Se ven las TRES capas apiladas
   - NO hay scroll de página

### **INTERACCIÓN CON SCROLL**:
- Solo DESPUÉS de click en tab 3
- Scroll adicional hace caer la 4ta capa (animación Lottie)
- La sección permanece STICKY durante todo esto
- Scroll NO mueve la página, solo activa animación final

---

## 📐 **ESPECIFICACIONES TÉCNICAS CORRECTAS**

### **1. STICKY BEHAVIOR**:
```css
.arkham-tabs-section {
  position: sticky;
  top: 0;
  height: 100vh; /* Ocupa todo el viewport */
  /* NO scroll interno, todo visible */
}
```

### **2. TAB CLICKS**:
```javascript
// NO window.scrollTo()
// NO cambio de posición
// SOLO cambio de estado:
handleTabClick(tabNumber) {
  setCurrentTab(tabNumber);
  // Activar animación de capas correspondiente
  // NO scroll
}
```

### **3. APILAMIENTO DE CAPAS**:
```javascript
// Capa 1 (Data Platform):
{
  opacity: currentTab >= 1 ? 1 : 0,
  transform: 'translate(0, 0)', // Base position
  zIndex: 1
}

// Capa 2 (AI Platform):
{
  opacity: currentTab >= 2 ? 1 : 0,
  transform: currentTab >= 2 
    ? 'translate(20px, -60px)' // Apilada encima
    : 'translate(20px, 100px)', // Fuera de vista (abajo)
  zIndex: 2
}

// Capa 3 (Applications):
{
  opacity: currentTab >= 3 ? 1 : 0,
  transform: currentTab >= 3
    ? 'translate(40px, -120px)' // Apilada más arriba
    : 'translate(40px, 100px)', // Fuera de vista
  zIndex: 3
}
```

### **4. EFECTO DE CAÍDA**:
- Las capas deben CAER desde abajo hacia su posición
- Animación tipo "drop-in" con ease-out
- Cada capa mantiene su posición después de caer
- Se ven todas las capas anteriores (apilamiento)

---

## 🔍 **ERRORES A CORREGIR DE SESSION 7**

### **ELIMINAR COMPLETAMENTE**:
1. ❌ `window.scrollTo()` en handleTabClick
2. ❌ Cálculos de scrollPercent para tabs
3. ❌ scrollHeightRef y cálculos relacionados
4. ❌ Cualquier código que mueva la página

### **REIMPLEMENTAR**:
1. ✅ Tabs solo cambian currentTab state
2. ✅ Capas responden a currentTab con apilamiento
3. ✅ Animaciones de caída desde abajo
4. ✅ Todas las capas visibles cuando corresponde

---

## 📁 **DOCUMENTACIÓN CRÍTICA DISPONIBLE**

### **Retroalimentación Usuario**:
1. `/Users/davicho/MASTER proyectos/Panda/.claude/copiaElemento/RETROALIMENTACION_SESION_7.md` - **CRÍTICO**: Problemas exactos
2. `/Users/davicho/MASTER proyectos/Panda/.claude/copiaElemento/SESSION_7_STATUS_FINAL.md` - Lo que salió mal

### **Referencias**:
3. `/Users/davicho/MASTER proyectos/Panda/.claude/copiaElemento/original.html` - Referencia visual
4. `/Users/davicho/MASTER proyectos/Panda/frontend/src/components/ArkhamSection.tsx` - Componente actual (mal)

---

## ⚡ **PLAN DE ACCIÓN SESSION 8**

### **PASO 1: Eliminar Scroll Behavior** (15 min)
- Remover TODO código de scroll en tab clicks
- Eliminar window.scrollTo completamente
- Simplificar handleTabClick a solo cambio de estado

### **PASO 2: Implementar Apilamiento Correcto** (30 min)
- Capas con posiciones fijas de apilamiento
- Animaciones de caída desde abajo
- Mantener capas anteriores visibles
- Z-index correcto para profundidad

### **PASO 3: Ajustar Container Sticky** (15 min)
- Height: 100vh para contener en viewport
- Remover scroll-container height excesivo
- Asegurar que todo es visible sin scroll

### **PASO 4: Scroll Solo para 4ta Capa** (20 min)
- Detectar scroll SOLO después de tab 3
- Activar Lottie animation con scroll adicional
- Mantener sección fija durante animación

### **PASO 5: Validación** (10 min)
- Click tabs = NO movimiento de página ✅
- Capas se apilan visualmente ✅
- Todo contenido visible ✅
- Scroll solo activa última animación ✅

---

## 🎯 **CRITERIOS DE ÉXITO SESSION 8**

### **Funcionalidad Principal**:
✅ **NO scroll de página** al hacer click en tabs
✅ **Capas se APILAN** (no se reemplazan)
✅ **Contenido siempre visible** en viewport
✅ **Animaciones de caída** suaves y evidentes
✅ **Scroll solo para 4ta capa** al final

### **Experiencia de Usuario**:
- Usuario hace click → Ve animación inmediata
- No hay desplazamiento no deseado
- Puede leer todo el contenido del tab
- Ve el efecto de apilamiento claramente
- Experiencia contenida y controlada

---

## 💡 **CONSIDERACIONES IMPORTANTES**

### **NO HACER**:
- ❌ NO usar window.scrollTo en ningún lugar
- ❌ NO calcular scroll positions para tabs
- ❌ NO hacer que la página se mueva
- ❌ NO ocultar capas anteriores

### **SÍ HACER**:
- ✅ Mantener todo en viewport fijo
- ✅ Apilar capas con transform3d
- ✅ Animar con caída desde abajo
- ✅ Mantener simplicidad en interacción

---

## 🚀 **COMANDOS PARA COMENZAR**

```bash
# Directorio de trabajo
cd "/Users/davicho/MASTER proyectos/Panda/frontend"

# Verificar servidor
npm run dev

# Abrir para testing
open "http://localhost:3000"

# Verificar tipos
npm run type-check
```

---

## 📊 **RESUMEN EJECUTIVO SESSION 8**

**MISIÓN**: Reimplementar comportamiento correcto del componente Arkham

**PROBLEMA ACTUAL**: 
- Scroll mueve página (NO debe)
- Tabs causan desplazamiento (NO debe)
- Capas no se apilan (SÍ deben)

**SOLUCIÓN REQUERIDA**:
- Sección fija en viewport
- Clicks = solo animación
- Capas se apilan como cartas
- Scroll solo para última capa

**RESULTADO ESPERADO**:
Usuario puede interactuar con tabs sin que la página se mueva, ve las capas apilarse con efecto de caída, y todo el contenido es visible y accesible.

---

## ⚠️ **ADVERTENCIA CRÍTICA**

**NO REPITAS EL ERROR DE SESSION 7**:
El problema principal fue vincular scroll con navegación de tabs. Los tabs deben ser INDEPENDIENTES del scroll. El scroll SOLO debe activar la 4ta capa después de que el usuario esté en el tab 3.

**MANTÉN LA SIMPLICIDAD**:
- Click = cambio de estado
- Estado = animación de capas
- Scroll = solo última capa
- TODO contenido en viewport

---

**🎯 SESSION 8 READY TO LAUNCH**

**Objetivo**: Comportamiento correcto y funcional
**Prioridad**: Eliminar scroll no deseado
**Foco**: Apilamiento visual de capas
**Validación**: Usuario puede usar sin frustraciones

---

**Preparado**: 29 Agosto 2025 - Post Session 7 Learning
**Session**: 8
**Meta**: Implementación correcta del comportamiento esperado
**Duración estimada**: 90 minutos