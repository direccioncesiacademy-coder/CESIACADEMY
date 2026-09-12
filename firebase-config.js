// ==========================================
// CONFIGURACIÓN FIREBASE - CESI ACADEMY
// ==========================================

// ✅ Tu configuración de Firebase (YA CONFIGURADA)
const firebaseConfig = {
  apiKey: "AIzaSyDYWm48B11FU1yZKamC2T0rrvtBVl9Oa30",
  authDomain: "cesi-academy.firebaseapp.com",
  databaseURL: "https://cesi-academy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cesi-academy",
  storageBucket: "cesi-academy.firebasestorage.app",
  messagingSenderId: "614757970775",
  appId: "1:614757970775:web:b8452faff2fb529f048412"
};

// ==========================================
// INICIALIZAR FIREBASE
// ==========================================

let db = null;
let firebaseReady = false;

// Función para inicializar Firebase
function initializeFirebase() {
    try {
        // Verificar que Firebase esté disponible globalmente
        if(typeof firebase === 'undefined') {
            console.error("❌ Firebase SDK no está cargado. Verifica que incluyas los scripts CDN en el HTML");
            return false;
        }
        
        // Inicializar Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Obtener referencia a la base de datos
        db = firebase.database();
        
        firebaseReady = true;
        console.log("✅ Firebase inicializado correctamente");
        console.log("📍 Base de datos URL:", firebaseConfig.databaseURL);
        
        return true;
    } catch(error) {
        console.error("❌ Error inicializando Firebase:", error);
        return false;
    }
}

// ==========================================
// FUNCIONES PRINCIPALES
// ==========================================

// Guardar datos en Firebase
function saveToFirebase(path, data) {
    if(!firebaseReady || !db) {
        console.warn("⚠️ Firebase no está listo. Intentando de nuevo...");
        if(!initializeFirebase()) {
            console.error("❌ No se pudo inicializar Firebase");
            return Promise.reject("Firebase no disponible");
        }
    }
    
    return db.ref(path).set(data)
        .then(() => {
            console.log(`✅ Datos guardados en: ${path}`);
            return true;
        })
        .catch(error => {
            console.error(`❌ Error guardando en ${path}:`, error);
            return false;
        });
}

// Cargar datos de Firebase (una sola vez)
function loadFromFirebase(path) {
    if(!firebaseReady || !db) {
        console.error("❌ Firebase no está listo");
        return Promise.reject("Firebase no disponible");
    }
    
    return db.ref(path).once('value')
        .then(snapshot => {
            if(snapshot.exists()) {
                console.log(`✅ Datos cargados desde: ${path}`);
                return snapshot.val();
            } else {
                console.log(`ℹ️ No hay datos en: ${path}`);
                return null;
            }
        })
        .catch(error => {
            console.error(`❌ Error cargando de ${path}:`, error);
            return null;
        });
}

// Escuchar cambios en tiempo real
function listenToFirebaseChanges(path, callback) {
    if(!firebaseReady || !db) {
        console.error("❌ Firebase no está listo");
        return;
    }
    
    db.ref(path).on('value', 
        snapshot => {
            if(snapshot.exists()) {
                console.log(`🔄 Cambios detectados en: ${path}`);
                callback(snapshot.val());
            }
        }, 
        error => {
            console.error(`❌ Error escuchando cambios en ${path}:`, error);
        }
    );
}

// Detener escucha de cambios
function stopListeningToFirebase(path) {
    if(!firebaseReady || !db) return;
    
    db.ref(path).off();
    console.log(`⏹️ Se dejó de escuchar cambios en: ${path}`);
}

// ==========================================
// FUNCIONES DE SINCRONIZACIÓN
// ==========================================

// Sincronización bidireccional completa
function syncWithFirebase(dataObject) {
    if(!firebaseReady || !db) {
        console.error("❌ Firebase no está listo para sincronizar");
        return;
    }
    
    const path = 'cesiData';
    
    // 1. Guardar datos locales en Firebase
    console.log("📤 Sincronizando datos locales a Firebase...");
    saveToFirebase(path, JSON.stringify(dataObject));
    
    // 2. Escuchar cambios en tiempo real
    console.log("👂 Escuchando cambios en Firebase...");
    listenToFirebaseChanges(path, function(firebaseData) {
        if(firebaseData) {
            try {
                // Parsear datos si vienen como JSON string
                const parsed = typeof firebaseData === 'string' 
                    ? JSON.parse(firebaseData) 
                    : firebaseData;
                
                // Actualizar objeto local
                Object.assign(dataObject, parsed);
                console.log("🔄 Datos sincronizados desde Firebase");
                
                // Re-renderizar UI si está disponible
                if(typeof window !== 'undefined' && window.app && window.app.render) {
                    window.app.render();
                    console.log("🎨 UI actualizada");
                }
            } catch(error) {
                console.error("❌ Error parseando datos de Firebase:", error);
            }
        }
    });
}

// Verificar conexión a Firebase
function checkFirebaseConnection() {
    if(!firebaseReady || !db) {
        console.error("❌ Firebase no está inicializado");
        return;
    }
    
    try {
        const connectedRef = firebase.database().ref('.info/connected');
        connectedRef.on('value', snapshot => {
            if(snapshot.val() === true) {
                console.log("✅ Conectado a Firebase en tiempo real");
            } else {
                console.log("⏱️ Desconectado de Firebase (intentando reconectar)");
            }
        });
    } catch(error) {
        console.error("❌ Error verificando conexión:", error);
    }
}

// Obtener estado de Firebase
function getFirebaseStatus() {
    return {
        ready: firebaseReady,
        connected: firebaseReady ? "verificando..." : "no inicializado",
        timestamp: new Date().toLocaleTimeString('es-ES')
    };
}

// ==========================================
// INICIALIZACIÓN AUTOMÁTICA
// ==========================================

// Esperar a que el DOM esté listo
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("🚀 DOM cargado - Inicializando Firebase...");
        initializeFirebase();
        checkFirebaseConnection();
    });
} else {
    // Si el DOM ya está listo (script cargado tarde)
    console.log("🚀 Inicializando Firebase directamente...");
    initializeFirebase();
    checkFirebaseConnection();
}

// ==========================================
// EXPORTAR PARA USO EN OTROS SCRIPTS
// ==========================================

// Esto permite que otros scripts accedan a estas funciones
if(typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeFirebase,
        saveToFirebase,
        loadFromFirebase,
        listenToFirebaseChanges,
        stopListeningToFirebase,
        syncWithFirebase,
        checkFirebaseConnection,
        getFirebaseStatus
    };
}
