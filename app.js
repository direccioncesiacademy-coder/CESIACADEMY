// ==========================================
// CESI ACADEMY - APLICACIÓN PRINCIPAL v3
// ==========================================
// Verificar autenticación
firebase.auth().onAuthStateChanged(user => {
    if(!user) {
        console.log("No autenticado, redirigiendo a login");
        window.location.href = 'login.html';
    } else {
        console.log("✅ Usuario autenticado:", user.email);
        // Inicializar la app solo si está autenticado
        window.app = new CESIApp();
    }
});




class CESIApp {
    constructor() {
        this.data = {
            currentYear: 2026,
            departments_2026: [],
            departments_2027: [],
            tasks: [],
            meetings: [],
            notes: [],
            communications: [],
            attendance: {}
        };
        
        this.currentEditingDeptId = null;
        this.currentEditingMemberId = null;
        this.communicationType = 'announcement';
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.initializeCESIData();
        this.render();
    }

    // ==========================================
    // DATOS INICIALES
    // ==========================================

    initializeCESIData() {
        if(this.data.departments_2026.length > 0) return;

        this.data.departments_2026 = [
            {
                id: 1, name: 'EQUIPO DIRECTIVO', desc: 'Junta directiva', year: 2026,
                members: [
                    { id: 101, name: 'Norma', role: 'Fundador', email: 'direccion.cesiacademy@gmail.com', fecha: '15/6/2025', frase: 'Un equipo de voluntarios sin recibir un euro', trayectoria: 'Fundó CESI' },
                    { id: 102, name: 'Martina', role: 'Co-Fundadora', email: '', fecha: '15/6/2025', frase: '', trayectoria: '' },
                    { id: 103, name: 'Evan', role: 'Subdirector', email: 'evan.cesiacademy@gmail.com', fecha: '', frase: 'Hago que las cosas difíciles parezcan fáciles', trayectoria: 'Dueño de trufahost' },
                    { id: 104, name: 'Katary', role: 'Coordinador Académico', email: '', fecha: '15/4/2026', frase: 'Aprender, construir y avanzar', trayectoria: 'Coordinadora Académica' },
                    { id: 105, name: 'Sergio', role: 'Secretario', email: '', fecha: '11/9/2026', frase: '', trayectoria: '' }
                ]
            },
            {
                id: 2, name: 'EQUIPO ALIANZAS', desc: 'Alianzas estratégicas', year: 2026,
                members: [
                    { id: 201, name: 'David', role: 'Jefe de Alianzas', email: 'goldenretrive2354@gmail.com', fecha: '27/6/2026', frase: 'WELCOME TO REALITY', trayectoria: '' }
                ]
            },
            {
                id: 3, name: 'EQUIPO MODERACIÓN', desc: 'Moderadores', year: 2026,
                members: [
                    { id: 301, name: 'Gian', role: 'Mod', email: 'elavispado88@gmail.com', fecha: '14/8/2026', frase: 'Todo se puede hacer con perseverancia', trayectoria: '' },
                    { id: 302, name: 'Lark', role: 'Mod', email: '', fecha: '28/8/2026', frase: '', trayectoria: '' }
                ]
            },
            {
                id: 4, name: 'EQUIPO EVENTOS', desc: 'Eventos', year: 2026,
                members: []
            },
            {
                id: 5, name: 'EQUIPO MEDIA', desc: 'Media y Diseño', year: 2026,
                members: [
                    { id: 501, name: 'Nox', role: 'Diseñador', email: 'studioethereal01@gmail.com', fecha: '23/2/2026', frase: 'Nunca hay que rendirse', trayectoria: 'Studio Ethereal' }
                ]
            },
            {
                id: 6, name: 'EQUIPO TÉCNICO', desc: 'Desarrollo', year: 2026,
                members: [
                    { id: 601, name: 'Mane', role: 'Soporte Técnico', email: 'henrique@wirelinksys.com', fecha: '', frase: 'Si no existe, intento crearlo', trayectoria: 'WireLink Systems' }
                ]
            },
            {
                id: 7, name: 'EQUIPO VERIFICACIÓN', desc: 'Verificación', year: 2026,
                members: [
                    { id: 701, name: 'Mane', role: 'Jefe Verificación', email: 'henrique@wirelinksys.com', fecha: '', frase: '', trayectoria: '' }
                ]
            },
            {
                id: 8, name: 'EQUIPO RECLUTAMIENTO', desc: 'Reclutamiento', year: 2026,
                members: [
                    { id: 801, name: 'Katary', role: 'Jefe Reclutamiento', email: '', fecha: '15/4/2026', frase: '', trayectoria: '' },
                    { id: 802, name: 'Javier', role: 'Entrevistador', email: '', fecha: '27/7/2026', frase: '', trayectoria: '' },
                    { id: 803, name: 'Lark', role: 'Entrevistador', email: '', fecha: '28/8/2026', frase: '', trayectoria: '' },
                    { id: 804, name: 'Juan', role: 'Revisor', email: 'juannpcj@gmail.com', fecha: '12/8/2026', frase: 'Apasionado por el aprendizaje', trayectoria: 'Fundador de CEA' }
                ]
            },
            {
                id: 9, name: 'EQUIPO FINANZAS', desc: 'Finanzas', year: 2026,
                members: [
                    { id: 901, name: 'Daniel', role: 'Finanzas', email: '', fecha: '', frase: '', trayectoria: '' }
                ]
            },
            {
                id: 10, name: 'EQUIPO RADIO', desc: 'Radio', year: 2026,
                members: [
                    { id: 1001, name: 'Evan', role: 'Técnico Radio', email: 'evan.cesiacademy@gmail.com', fecha: '', frase: '', trayectoria: '' }
                ]
            },
            {
                id: 11, name: 'EQUIPO PROFESORES', desc: 'Profesores', year: 2026,
                members: [
                    { id: 1101, name: 'Rico', role: 'Profesor', email: '', fecha: '', frase: '', trayectoria: '' },
                    { id: 1102, name: '!', role: 'Profesor', email: '', fecha: '5/9/2026', frase: '', trayectoria: '' },
                    { id: 1103, name: 'Dev', role: 'Profesor', email: 'nick21mod@gmail.com', fecha: '', frase: '', trayectoria: '' },
                    { id: 1104, name: 'Parxeao', role: 'Profesor', email: '', fecha: '11/9/2026', frase: '', trayectoria: '' },
                    { id: 1105, name: 'Dev Sebas', role: 'Profesor', email: '', fecha: '10/9/2026', frase: '', trayectoria: '' },
                    { id: 1106, name: 'Max', role: 'Profesor', email: '', fecha: '', frase: '', trayectoria: '' },
                    { id: 1107, name: 'Nico', role: 'Profesor', email: '', fecha: '', frase: '', trayectoria: '' },
                    { id: 1108, name: 'Gabriel', role: 'Profesor', email: '', fecha: '5/9/2026', frase: '', trayectoria: '' }
                ]
            },
            {
                id: 12, name: 'SOCIOS', desc: 'Socios', year: 2026,
                members: [
                    { id: 1201, name: 'Nox', role: 'Socio', email: 'studioethereal01@gmail.com', fecha: '23/2/2026', frase: '', trayectoria: 'Studio Ethereal' }
                ]
            }
        ];

        this.data.departments_2027 = this.data.departments_2026.map(dept => ({
            id: dept.id,
            name: dept.name,
            desc: dept.desc,
            year: 2027,
            members: []
        }));

        this.saveData();
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    setupEventListeners() {
        // Cambio de año
        document.getElementById('yearSelector')?.addEventListener('change', () => this.changeYear());

        // Navegación de tabs
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        // Cerrar modales
        window.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    // ==========================================
    // NAVEGACIÓN
    // ==========================================

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        const tab = document.getElementById(tabName);
        if(tab) {
            tab.classList.add('active');
            event.target.classList.add('active');
            
            if(tabName === 'tasks') this.renderTasks();
        }
    }

    changeYear() {
        const year = document.getElementById('yearSelector')?.value;
        if(year) {
            this.data.currentYear = parseInt(year);
            document.getElementById('addDeptBtn').style.display = year === '2026' ? 'block' : 'none';
            this.renderDepartments();
            this.saveData();
        }
    }

    // ==========================================
    // UTILIDADES
    // ==========================================

    getCurrentYearDepartments() {
        return this.data.currentYear === 2026 ? this.data.departments_2026 : this.data.departments_2027;
    }

    openModal(modalId, type = null) {
        const modal = document.getElementById(modalId);
        if(modal) {
            modal.classList.add('active');
            if(type) this.communicationType = type;
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if(modal) {
            modal.classList.remove('active');
            const form = modal.querySelector('form');
            if(form) form.reset();
        }
    }

    // ==========================================
    // ALMACENAMIENTO
    // ==========================================

    saveData() {
        // Guardar en localStorage (respaldo local)
        localStorage.setItem('cesiData', JSON.stringify(this.data));
        
        // Guardar en Firebase (sincronización compartida)
        if(typeof db !== 'undefined' && db !== null && firebaseReady) {
            db.ref('cesiData').set(JSON.stringify(this.data))
                .then(() => {
                    console.log("✅ Datos guardados en Firebase");
                })
                .catch(error => {
                    console.error("❌ Error guardando en Firebase:", error);
                });
        } else {
            console.log("⚠️ Firebase no disponible, guardando en localStorage");
        }
    }

    loadData() {
        // Intentar cargar de Firebase primero
        if(typeof db !== 'undefined' && db !== null && firebaseReady) {
            db.ref('cesiData').once('value')
                .then(snapshot => {
                    if(snapshot.exists()) {
                        try {
                            const firebaseData = JSON.parse(snapshot.val());
                            Object.assign(this.data, firebaseData);
                            console.log("✅ Datos cargados desde Firebase");
                        } catch(error) {
                            console.error("Error parseando Firebase:", error);
                            this.loadFromLocalStorage();
                        }
                    } else {
                        console.log("ℹ️ No hay datos en Firebase, usando localStorage");
                        this.loadFromLocalStorage();
                    }
                    
                    // Escuchar cambios en tiempo real después de cargar
                    this.setupRealtimeSync();
                })
                .catch(error => {
                    console.error("Error cargando de Firebase:", error);
                    this.loadFromLocalStorage();
                });
        } else {
            console.log("⚠️ Firebase no disponible, usando localStorage");
            this.loadFromLocalStorage();
        }
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('cesiData');
        if(saved) {
            try {
                Object.assign(this.data, JSON.parse(saved));
                console.log("✅ Datos cargados desde localStorage");
            } catch(error) {
                console.error("Error parseando localStorage:", error);
            }
        }
    }

    setupRealtimeSync() {
        // Escuchar cambios en tiempo real
        if(typeof db === 'undefined' || db === null || !firebaseReady) return;
        
        db.ref('cesiData').on('value', snapshot => {
            if(snapshot.exists()) {
                try {
                    const firebaseData = JSON.parse(snapshot.val());
                    
                    // Comparar si cambió algo
                    const localJSON = JSON.stringify(this.data);
                    const firebaseJSON = JSON.stringify(firebaseData);
                    
                    if(localJSON !== firebaseJSON) {
                        console.log("🔄 Sincronizando cambios desde Firebase...");
                        Object.assign(this.data, firebaseData);
                        this.render();
                    }
                } catch(error) {
                    console.error("Error en sincronización:", error);
                }
            }
        });
    }

    // ==========================================
    // RENDER
    // ==========================================

    render() {
        this.renderDepartments();
    }

    renderDepartments() {
        const departments = this.getCurrentYearDepartments();
        const container = document.getElementById('departmentsContainer');
        
        if(!container) return;

        container.innerHTML = departments.length === 0 
            ? '<div class="empty-state"><i class="fas fa-inbox"></i><p>No hay departamentos</p></div>'
            : departments.map(dept => this.createDepartmentCard(dept)).join('');
    }

    createDepartmentCard(dept) {
        return `
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-users"></i> ${dept.name}
                </div>
                <div class="card-desc">${dept.desc || ''}</div>
                
                <div class="section-divider"></div>
                
                <div class="members-list">
                    <strong style="color: var(--primary); font-size: 12px;">👥 Miembros (${dept.members.length})</strong>
                    ${dept.members.length === 0 
                        ? '<p style="color: var(--text-light); font-size: 13px; text-align: center; padding: 20px 0;"><i class="fas fa-user-slash"></i> Sin miembros</p>'
                        : dept.members.map(m => this.createMemberCard(m, dept.id)).join('')
                    }
                </div>

                <div class="btn-group">
                    <button class="btn-primary btn-small" onclick="app.openModal('addMemberModal'); app.currentEditingDeptId = ${dept.id};">
                        <i class="fas fa-user-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
    }

    createMemberCard(member, deptId) {
        const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        return `
            <div class="member-card">
                <div class="member-header">
                    <div class="member-info">
                        <div class="member-avatar">${initials}</div>
                        <div class="member-name">
                            <strong>${member.name}</strong>
                            <span class="member-role">${member.role}</span>
                        </div>
                    </div>
                    <div class="member-actions">
                        <button class="btn-secondary btn-small" onclick="app.editMember(${deptId}, ${member.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-danger btn-small" onclick="app.removeMember(${deptId}, ${member.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${member.email ? `<div class="member-detail"><i class="fas fa-envelope"></i> <a href="mailto:${member.email}" style="color: var(--primary); text-decoration: none;">${member.email}</a></div>` : ''}
                ${member.fecha ? `<div class="member-detail"><i class="fas fa-calendar"></i> ${member.fecha}</div>` : ''}
                ${member.frase ? `<div style="background: white; border-left: 3px solid var(--secondary); padding: 8px; border-radius: 4px; font-style: italic; color: var(--text-secondary); font-size: 12px; margin-top: 8px;">"${member.frase}"</div>` : ''}
            </div>
        `;
    }

    renderTasks() {
        const container = document.getElementById('tasksContainer');
        if(!container) return;

        const departments = this.getCurrentYearDepartments();
        
        let html = '<div class="section">';
        html += '<div class="section-title"><i class="fas fa-tasks"></i> Tareas Generales (Para Todos)</div>';
        
        const generalTasks = this.data.tasks.filter(t => t.type === 'general');
        if(generalTasks.length === 0) {
            html += '<div class="empty-state"><p><i class="fas fa-check-circle"></i> No hay tareas generales</p></div>';
        } else {
            html += generalTasks.map(t => this.createTaskCard(t, departments)).join('');
        }
        html += '</div>';

        // Tareas por departamento
        departments.forEach(dept => {
            html += `<div class="section">`;
            html += `<div class="section-title"><i class="fas fa-folder-open"></i> ${dept.name}</div>`;
            
            const deptTasks = this.data.tasks.filter(t => t.deptId === dept.id);
            if(deptTasks.length === 0) {
                html += '<div class="empty-state"><p><i class="fas fa-tasks"></i> Sin tareas pendientes</p></div>';
            } else {
                html += deptTasks.map(t => this.createTaskCard(t, departments)).join('');
            }
            
            html += `<button class="btn-primary" onclick="app.openAddTaskModal(${dept.id})"><i class="fas fa-plus"></i> Agregar Tarea</button>`;
            html += `</div>`;
        });

        container.innerHTML = html;
    }

    createTaskCard(task, departments) {
        const dept = departments.find(d => d.id === task.deptId);
        const assigneeList = task.assignedTo && task.assignedTo.length > 0
            ? task.assignedTo.map(id => {
                const member = dept?.members.find(m => m.id === id);
                return member?.name || 'Desconocido';
            }).join(', ')
            : 'Departamento completo';

        return `
            <div class="task-card ${task.status}">
                <div class="task-header">
                    <input type="checkbox" class="task-checkbox" ${task.status === 'completed' ? 'checked' : ''} 
                           onchange="app.updateTaskStatus(${task.id})">
                    <span class="task-title">${task.title}</span>
                    <span class="task-status status-${task.status}">
                        ${task.status === 'pending' ? 'Pendiente' : task.status === 'in-progress' ? 'En progreso' : 'Completada'}
                    </span>
                </div>
                ${task.desc ? `<p style="margin: 8px 0; color: var(--text-secondary); font-size: 13px;">${task.desc}</p>` : ''}
                <div class="task-meta">
                    <span><i class="fas fa-user"></i> ${assigneeList}</span>
                    ${task.author ? `<span><i class="fas fa-pen"></i> Escrito por: ${task.author}</span>` : ''}
                    <span><i class="fas fa-calendar"></i> ${task.createdAt}</span>
                </div>
                <div style="margin-top: 10px; display: flex; gap: 8px;">
                    <button class="btn-secondary btn-small" onclick="app.changeTaskStatus(${task.id})">
                        ${task.status === 'pending' ? 'Iniciar' : task.status === 'in-progress' ? 'Completar' : 'Reabrir'}
                    </button>
                    <button class="btn-danger btn-small" onclick="app.deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // ==========================================
    // MIEMBROS
    // ==========================================

    editMember(deptId, memberId) {
        const departments = this.getCurrentYearDepartments();
        const dept = departments.find(d => d.id === deptId);
        const member = dept?.members.find(m => m.id === memberId);
        
        if(!member) return;
        
        this.currentEditingDeptId = deptId;
        this.currentEditingMemberId = memberId;
        document.getElementById('memberModalTitle').textContent = 'Editar Miembro';
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberRole').value = member.role;
        document.getElementById('memberEmail').value = member.email || '';
        document.getElementById('memberFecha').value = member.fecha || '';
        document.getElementById('memberFrase').value = member.frase || '';
        document.getElementById('memberTrayectoria').value = member.trayectoria || '';
        this.openModal('addMemberModal');
    }

    removeMember(deptId, memberId) {
        if(!confirm('¿Eliminar este miembro?')) return;
        const departments = this.getCurrentYearDepartments();
        const dept = departments.find(d => d.id === deptId);
        if(dept) {
            dept.members = dept.members.filter(m => m.id !== memberId);
            this.renderDepartments();
            this.saveData();
        }
    }

    // ==========================================
    // TAREAS
    // ==========================================

    openAddTaskModal(deptId) {
        this.currentEditingDeptId = deptId;
        this.populateMembersCheckboxes(deptId);
        this.openModal('addTaskModal');
    }

    updateAssignmentDisplay() {
        const assignType = document.querySelector('input[name="assignType"]:checked').value;
        document.getElementById('specificMembersGroup').style.display = assignType === 'specific' ? 'block' : 'none';
    }

    populateMembersCheckboxes(deptId) {
        const departments = this.getCurrentYearDepartments();
        const dept = departments.find(d => d.id === deptId);
        if(!dept) return;

        const container = document.getElementById('membersCheckboxes');
        container.innerHTML = dept.members.map(member => `
            <label class="member-checkbox">
                <input type="checkbox" value="${member.id}" name="assignMembers">
                <label>${member.name}</label>
            </label>
        `).join('');
    }

    createGeneralTask(e) {
        e.preventDefault();
        const task = {
            id: Date.now(),
            title: document.getElementById('generalTaskTitle').value,
            desc: document.getElementById('generalTaskDesc').value,
            author: document.getElementById('generalTaskAuthor').value,
            type: 'general',
            deptId: null,
            assignedTo: [],
            status: 'pending',
            createdAt: new Date().toLocaleDateString('es-ES')
        };
        this.data.tasks.push(task);
        this.closeModal('addTaskGeneralModal');
        this.renderTasks();
        this.saveData();
    }

    createDepartmentTask(e) {
        e.preventDefault();
        
        const assignType = document.querySelector('input[name="assignType"]:checked').value;
        let assignedTo = [];
        
        if(assignType === 'specific') {
            assignedTo = Array.from(document.querySelectorAll('input[name="assignMembers"]:checked')).map(cb => parseInt(cb.value));
        }

        const task = {
            id: Date.now(),
            title: document.getElementById('deptTaskTitle').value,
            desc: document.getElementById('deptTaskDesc').value,
            author: document.getElementById('deptTaskAuthor').value,
            type: 'department',
            deptId: this.currentEditingDeptId,
            assignedTo: assignedTo,
            status: 'pending',
            createdAt: new Date().toLocaleDateString('es-ES')
        };

        this.data.tasks.push(task);
        this.closeModal('addTaskModal');
        this.renderTasks();
        this.saveData();
    }

    saveMember(e) {
        e.preventDefault();
        const departments = this.getCurrentYearDepartments();
        const dept = departments.find(d => d.id === this.currentEditingDeptId);
        if(!dept) return;

        const memberData = {
            name: document.getElementById('memberName').value,
            role: document.getElementById('memberRole').value,
            email: document.getElementById('memberEmail').value,
            fecha: document.getElementById('memberFecha').value,
            frase: document.getElementById('memberFrase').value,
            trayectoria: document.getElementById('memberTrayectoria').value
        };

        if(this.currentEditingMemberId) {
            const member = dept.members.find(m => m.id === this.currentEditingMemberId);
            if(member) Object.assign(member, memberData);
        } else {
            dept.members.push({ id: Date.now(), ...memberData });
        }

        this.closeModal('addMemberModal');
        this.renderDepartments();
        this.saveData();
    }

    updateTaskStatus(taskId) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if(task) {
            task.status = task.status === 'completed' ? 'pending' : 'completed';
            this.renderTasks();
            this.saveData();
        }
    }

    changeTaskStatus(taskId) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if(task) {
            if(task.status === 'pending') task.status = 'in-progress';
            else if(task.status === 'in-progress') task.status = 'completed';
            else task.status = 'pending';
            this.renderTasks();
            this.saveData();
        }
    }

    deleteTask(taskId) {
        if(!confirm('¿Eliminar esta tarea?')) return;
        this.data.tasks = this.data.tasks.filter(t => t.id !== taskId);
        this.renderTasks();
        this.saveData();
    }

    // ==========================================
    // REUNIONES
    // ==========================================

    createMeeting(e) {
        e.preventDefault();
        const meeting = {
            id: Date.now(),
            deptId: document.getElementById('meetingDept').value,
            title: document.getElementById('meetingTitle').value,
            date: document.getElementById('meetingDate').value,
            time: document.getElementById('meetingTime').value,
            topics: document.getElementById('meetingTopics').value.split('\n').filter(t => t.trim()),
            organizer: document.getElementById('meetingOrganizer').value,
            createdAt: new Date().toLocaleDateString('es-ES'),
            createdTime: new Date().toLocaleTimeString('es-ES')
        };
        this.data.meetings.push(meeting);
        this.closeModal('addMeetingModal');
        this.renderMeetings();
        this.saveData();
    }

    renderMeetings() {
        const container = document.getElementById('meetingsContainer');
        if(!container) return;

        const departments = this.getCurrentYearDepartments();
        
        if(this.data.meetings.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-calendar"></i><p>No hay reuniones programadas</p></div>';
            return;
        }

        container.innerHTML = this.data.meetings.map(meeting => {
            const dept = departments.find(d => d.id == meeting.deptId);
            return `
                <div class="section">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <div class="section-title">${meeting.title}</div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0;">
                                <div><strong><i class="fas fa-building"></i> Departamento:</strong><br>${dept?.name || 'N/A'}</div>
                                <div><strong><i class="fas fa-calendar"></i> Fecha:</strong><br>${meeting.date}</div>
                                <div><strong><i class="fas fa-clock"></i> Hora:</strong><br>${meeting.time}</div>
                                <div><strong><i class="fas fa-user"></i> Organizador:</strong><br>${meeting.organizer}</div>
                            </div>
                            ${meeting.topics.length > 0 ? `
                                <div style="margin: 15px 0; padding: 12px; background: var(--light); border-radius: var(--radius-sm);">
                                    <strong><i class="fas fa-list"></i> Temas:</strong>
                                    <ul style="margin-top: 8px; margin-left: 20px;">
                                        ${meeting.topics.map(t => `<li>${t}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            <small style="color: var(--text-light);">Creado: ${meeting.createdAt} ${meeting.createdTime}</small>
                        </div>
                        <button class="btn-danger btn-small" onclick="app.deleteMeeting(${meeting.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    deleteMeeting(meetingId) {
        if(!confirm('¿Eliminar esta reunión?')) return;
        this.data.meetings = this.data.meetings.filter(m => m.id !== meetingId);
        this.renderMeetings();
        this.saveData();
    }

    exportMeetingsPDF() {
        const departments = this.getCurrentYearDepartments();
        let html = `<h2>Reporte de Reuniones - ${this.data.currentYear}</h2><p>Generado: ${new Date().toLocaleDateString('es-ES')}</p>`;
        
        this.data.meetings.forEach(meeting => {
            const dept = departments.find(d => d.id == meeting.deptId);
            html += `<h3>${meeting.title}</h3>
                <table border="1" cellpadding="8" style="width: 100%; margin-bottom: 20px;">
                    <tr><td><strong>Departamento:</strong></td><td>${dept?.name || 'N/A'}</td></tr>
                    <tr><td><strong>Fecha:</strong></td><td>${meeting.date}</td></tr>
                    <tr><td><strong>Hora:</strong></td><td>${meeting.time}</td></tr>
                    <tr><td><strong>Organizador:</strong></td><td>${meeting.organizer}</td></tr>
                    <tr><td><strong>Temas:</strong></td><td>${meeting.topics.join(', ') || 'Sin temas'}</td></tr>
                </table>`;
        });

        const win = window.open('', '', 'width=900,height=600');
        win.document.write(html);
        win.print();
    }

    exportMeetingsCSV() {
        const departments = this.getCurrentYearDepartments();
        let csv = 'Título,Departamento,Fecha,Hora,Organizador,Temas,Fecha Creación\n';
        
        this.data.meetings.forEach(meeting => {
            const dept = departments.find(d => d.id == meeting.deptId);
            csv += `"${meeting.title}","${dept?.name || ''}","${meeting.date}","${meeting.time}","${meeting.organizer}","${meeting.topics.join('; ')}","${meeting.createdAt}"\n`;
        });

        this.downloadCSV(csv, `reuniones_${new Date().getTime()}.csv`);
    }

    // ==========================================
    // MURAL
    // ==========================================

    createNote(e) {
        e.preventDefault();
        const note = {
            id: Date.now(),
            title: document.getElementById('noteTitle').value,
            content: document.getElementById('noteContent').value,
            author: document.getElementById('noteAuthor').value,
            createdAt: new Date().toLocaleDateString('es-ES'),
            createdTime: new Date().toLocaleTimeString('es-ES')
        };
        this.data.notes.push(note);
        this.closeModal('addNoteModal');
        this.renderMural();
        this.saveData();
    }

    renderMural() {
        const container = document.getElementById('muralContainer');
        if(!container) return;

        if(this.data.notes.length === 0) {
            container.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><i class="fas fa-sticky-note"></i><p>El mural está vacío</p></div>';
            return;
        }

        container.innerHTML = this.data.notes.map(note => `
            <div class="card" style="background: #fff9c4; border-left: 4px solid #fbc02d;">
                <div class="card-title" style="color: #333;">${note.title}</div>
                <p style="color: #555; margin: 12px 0; line-height: 1.5;">${note.content}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
                    <div style="font-size: 12px;">
                        <div><strong style="color: #333;"><i class="fas fa-user"></i> ${note.author}</strong></div>
                        <small style="color: var(--text-light);">${note.createdAt} ${note.createdTime}</small>
                    </div>
                    <button class="btn-danger btn-small" onclick="app.deleteNote(${note.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    deleteNote(noteId) {
        if(!confirm('¿Eliminar esta nota?')) return;
        this.data.notes = this.data.notes.filter(n => n.id !== noteId);
        this.renderMural();
        this.saveData();
    }

    exportMuralPDF() {
        let html = `<h2>Mural - ${this.data.currentYear}</h2><p>Generado: ${new Date().toLocaleDateString('es-ES')}</p>`;
        
        this.data.notes.forEach(note => {
            html += `<div style="border: 1px solid #ccc; padding: 15px; margin: 10px 0; background: #fffacd;">
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <p style="color: #666; font-size: 12px;"><strong>Autor:</strong> ${note.author}<br><strong>Fecha:</strong> ${note.createdAt} ${note.createdTime}</p>
            </div>`;
        });

        const win = window.open('', '', 'width=900,height=600');
        win.document.write(html);
        win.print();
    }

    exportMuralCSV() {
        let csv = 'Asunto,Contenido,Autor,Fecha,Hora\n';
        
        this.data.notes.forEach(note => {
            csv += `"${note.title}","${note.content.replace(/"/g, '""')}","${note.author}","${note.createdAt}","${note.createdTime}"\n`;
        });

        this.downloadCSV(csv, `mural_${new Date().getTime()}.csv`);
    }

    // ==========================================
    // ASISTENCIA
    // ==========================================

    renderAttendance() {
        const today = document.getElementById('attendanceDatePicker')?.value || new Date().toISOString().split('T')[0];
        document.getElementById('attendanceDatePicker').value = today;

        const departments = this.getCurrentYearDepartments();
        const container = document.getElementById('attendanceContainer');
        
        let html = '';
        departments.forEach(dept => {
            if(dept.members.length === 0) return;
            
            html += `
                <div style="margin-bottom: 25px;">
                    <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 15px; border-radius: var(--radius-sm); font-weight: 600; margin-bottom: 12px;">
                        ${dept.name}
                    </div>
                    ${dept.members.map(member => {
                        const attendanceKey = `${today}-${member.id}`;
                        const isPresent = this.data.attendance[attendanceKey] === true;
                        const isAbsent = this.data.attendance[attendanceKey] === false;
                        return `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9f9f9; margin-bottom: 8px; border-radius: var(--radius-sm);">
                                <div>
                                    <strong>${member.name}</strong>
                                    <div style="font-size: 12px; color: var(--text-light);">${member.role}</div>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    <button class="btn-success btn-small" style="background: ${isPresent ? 'var(--success)' : '#e0e0e0'}; color: ${isPresent ? 'white' : 'var(--text-light)'};" onclick="app.markAttendance('${attendanceKey}', true)">
                                        <i class="fas fa-check"></i> Presente
                                    </button>
                                    <button class="btn-danger btn-small" style="background: ${isAbsent ? 'var(--danger)' : '#e0e0e0'}; color: ${isAbsent ? 'white' : 'var(--text-light)'};" onclick="app.markAttendance('${attendanceKey}', false)">
                                        <i class="fas fa-times"></i> Ausente
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        });
        
        container.innerHTML = html || '<div class="empty-state"><p>No hay miembros para marcar asistencia</p></div>';
    }

    markAttendance(key, present) {
        this.data.attendance[key] = present;
        this.saveData();
        this.renderAttendance();
    }

    exportAttendancePDF() {
        const today = document.getElementById('attendanceDatePicker').value || new Date().toISOString().split('T')[0];
        const departments = this.getCurrentYearDepartments();
        let html = `<h2>Asistencia - ${new Date(today).toLocaleDateString('es-ES')}</h2>`;
        
        departments.forEach(dept => {
            if(dept.members.length === 0) return;
            html += `<h3>${dept.name}</h3><table border="1" cellpadding="8">
                <tr><th>Miembro</th><th>Rol</th><th>Asistencia</th></tr>`;
            
            dept.members.forEach(m => {
                const attendanceKey = `${today}-${m.id}`;
                const status = this.data.attendance[attendanceKey] === true ? 'Presente' : this.data.attendance[attendanceKey] === false ? 'Ausente' : 'Sin marcar';
                html += `<tr><td>${m.name}</td><td>${m.role}</td><td>${status}</td></tr>`;
            });
            html += '</table><br>';
        });

        const win = window.open('', '', 'width=900,height=600');
        win.document.write(html);
        win.print();
    }

    exportAttendanceCSV() {
        const today = document.getElementById('attendanceDatePicker').value || new Date().toISOString().split('T')[0];
        const departments = this.getCurrentYearDepartments();
        let csv = 'Departamento,Miembro,Rol,Asistencia,Fecha\n';
        
        departments.forEach(dept => {
            dept.members.forEach(m => {
                const attendanceKey = `${today}-${m.id}`;
                const status = this.data.attendance[attendanceKey] === true ? 'Presente' : this.data.attendance[attendanceKey] === false ? 'Ausente' : 'Sin marcar';
                csv += `"${dept.name}","${m.name}","${m.role}","${status}","${today}"\n`;
            });
        });

        this.downloadCSV(csv, `asistencia_${today}.csv`);
    }

    // ==========================================
    // COMUNICADOS
    // ==========================================

    createCommunication(e) {
        e.preventDefault();
        const comm = {
            id: Date.now(),
            type: this.communicationType,
            title: document.getElementById('communicationTitle').value,
            content: document.getElementById('communicationContent').value,
            author: document.getElementById('communicationAuthor').value,
            dept: this.communicationType === 'request' ? document.getElementById('communicationDept').value : '',
            createdAt: new Date().toLocaleDateString('es-ES'),
            createdTime: new Date().toLocaleTimeString('es-ES')
        };
        this.data.communications.push(comm);
        this.closeModal('addCommunicationModal');
        this.renderCommunications();
        this.saveData();
    }

    renderCommunications() {
        const container = document.getElementById('communicationsContainer');
        if(!container) return;

        if(this.data.communications.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-bell"></i><p>No hay comunicados</p></div>';
            return;
        }

        const departments = this.getCurrentYearDepartments();
        const typeLabel = {
            'announcement': '📢 Comunicado',
            'request': '🤝 Solicitud de Reunión',
            'idea': '💡 Idea'
        };
        const typeColor = {
            'announcement': '#667eea',
            'request': '#ffc107',
            'idea': '#764ba2'
        };

        container.innerHTML = this.data.communications.map(comm => {
            const dept = comm.dept ? departments.find(d => d.id == comm.dept) : null;
            
            return `
                <div class="section">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                        <span style="background: ${typeColor[comm.type]}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                            ${typeLabel[comm.type] || comm.type}
                        </span>
                        <div class="section-title" style="margin: 0; flex: 1;">${comm.title}</div>
                    </div>
                    <p style="color: var(--text-secondary); margin: 12px 0; line-height: 1.6;">${comm.content}</p>
                    ${dept ? `<p style="color: var(--primary); font-size: 13px; margin: 10px 0;"><i class="fas fa-building"></i> <strong>Departamento:</strong> ${dept.name}</p>` : ''}
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">
                        <div style="font-size: 12px; color: var(--text-light);">
                            <strong><i class="fas fa-user"></i> ${comm.author}</strong> - ${comm.createdAt} ${comm.createdTime}
                        </div>
                        <button class="btn-danger btn-small" onclick="app.deleteCommunication(${comm.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    deleteCommunication(commId) {
        if(!confirm('¿Eliminar este comunicado?')) return;
        this.data.communications = this.data.communications.filter(c => c.id !== commId);
        this.renderCommunications();
        this.saveData();
    }

    // ==========================================
    // UTILIDADES
    // ==========================================

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    populateDeptSelects() {
        const departments = this.getCurrentYearDepartments();
        const meetingDeptSelect = document.getElementById('meetingDept');
        const commDeptSelect = document.getElementById('communicationDept');
        
        if(meetingDeptSelect) {
            meetingDeptSelect.innerHTML = '<option value="">Seleccionar departamento</option>';
            departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.id;
                option.textContent = dept.name;
                meetingDeptSelect.appendChild(option);
            });
        }

        if(commDeptSelect) {
            commDeptSelect.innerHTML = '<option value="">Seleccionar</option>';
            departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.id;
                option.textContent = dept.name;
                commDeptSelect.appendChild(option);
            });
        }
    }

    // Handlers para modales
    editMember(deptId, memberId) {
        const departments = this.getCurrentYearDepartments();
        const dept = departments.find(d => d.id === deptId);
        const member = dept?.members.find(m => m.id === memberId);
        
        if(!member) return;
        
        this.currentEditingDeptId = deptId;
        this.currentEditingMemberId = memberId;
        document.getElementById('memberModalTitle').textContent = 'Editar Miembro';
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberRole').value = member.role;
        document.getElementById('memberEmail').value = member.email || '';
        document.getElementById('memberFecha').value = member.fecha || '';
        document.getElementById('memberFrase').value = member.frase || '';
        document.getElementById('memberTrayectoria').value = member.trayectoria || '';
        this.openModal('addMemberModal');
    }

    removeMember(deptId, memberId) {
        if(!confirm('¿Eliminar este miembro?')) return;
        const departments = this.getCurrentYearDepartments();
        const dept = departments.find(d => d.id === deptId);
        if(dept) {
            dept.members = dept.members.filter(m => m.id !== memberId);
            this.renderDepartments();
            this.saveData();
        }
    }

    // ==========================================
    // DEPARTAMENTOS
    // ==========================================

    createDepartment(e) {
        e.preventDefault();
        const dept = {
            id: Date.now(),
            name: document.getElementById('deptName').value,
            desc: document.getElementById('deptDesc').value,
            year: this.data.currentYear,
            members: []
        };
        this.getCurrentYearDepartments().push(dept);
        this.closeModal('addDeptModal');
        this.renderDepartments();
        this.saveData();
    }

    openAddMemberModal(deptId) {
        this.currentEditingDeptId = deptId;
        this.currentEditingMemberId = null;
        document.getElementById('memberModalTitle').textContent = 'Agregar Miembro';
        document.getElementById('memberName').value = '';
        document.getElementById('memberRole').value = '';
        document.getElementById('memberEmail').value = '';
        document.getElementById('memberFecha').value = '';
        document.getElementById('memberFrase').value = '';
        document.getElementById('memberTrayectoria').value = '';
        this.openModal('addMemberModal');
    }
}

// Inicializar aplicación
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CESIApp();
});
