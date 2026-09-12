// ==========================================
// CONFIGURACIÓN FIREBASE
// ==========================================

// PASO 1: Reemplaza esto con tu configuración de Firebase
// (Los datos los consigues en Firebase Console)

const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const db = firebase.database();

// ==========================================
// FUNCIONES FIREBASE
// ==========================================

// Guardar datos en Firebase
function saveToFirebase(path, data) {
    db.ref(path).set(data).catch(error => {
        console.error("Error guardando en Firebase:", error);
    });
}

// Cargar datos de Firebase
function loadFromFirebase(path, callback) {
    db.ref(path).on('value', snapshot => {
        if(snapshot.exists()) {
            callback(snapshot.val());
        } else {
            callback(null);
        }
    });
}

// Sincronización en tiempo real
function syncWithFirebase(localData) {
    // Guardar datos locales a Firebase
    saveToFirebase('cesiData', localData);
    
    // Cargar datos de Firebase localmente
    loadFromFirebase('cesiData', function(firebaseData) {
        if(firebaseData) {
            // Actualizar datos locales con los de Firebase
            Object.assign(localData, firebaseData);
            // Volver a renderizar la UI
            if(window.app) {
                app.render();
            }
        }
    });
}
