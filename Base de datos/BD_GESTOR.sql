CREATE DATABASE gestionTareas;
USE gestionTareas;

/*Tabla para los estudiantes*/
CREATE TABLE Estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(100),
    fecha_registro DATE
);

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    tipo_usuario ENUM('estudiante', 'docente') NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Estudiantes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Docentes(id) ON DELETE CASCADE
);


/*Tabla para los docentes*/
CREATE TABLE Docentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(100),
    fecha_registro DATE
);

/*Tabla para las asignaturas*/
CREATE TABLE Asignaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    docente_id INT,
    FOREIGN KEY (docente_id) REFERENCES Docentes(id)
);

/*Tabla para las tareas*/
CREATE TABLE Tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    fecha_entrega DATE,
    asignatura_id INT,
    FOREIGN KEY (asignatura_id) REFERENCES Asignaturas(id)
);


/*Tabla para las Entregas*/
CREATE TABLE Entregas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT,
    tarea_id INT,
    fecha_entrega DATE,
    archivo VARCHAR(255),
    calificacion DECIMAL(5, 2),
    FOREIGN KEY (estudiante_id) REFERENCES Estudiantes(id),
    FOREIGN KEY (tarea_id) REFERENCES Tareas(id)
);


/*Consultas del Crud*/

/*Registrar un nuevo estudiante:*/
INSERT INTO Estudiantes (nombre, apellido, email, fecha_registro)
VALUES ('Juan', 'Pérez', 'juan.perez@email.com', CURDATE());

/*Registrar un nuevo docente:*/
INSERT INTO Docentes (nombre, apellido, email, fecha_registro)
VALUES ('Carlos', 'Gómez', 'carlos.gomez@email.com', CURDATE());

/*Registrar una nueva Asignatura:*/
INSERT INTO Asignaturas (nombre, descripcion, docente_id)
VALUES ('Matemáticas', 'Curso de Matemáticas Básicas', 1);

/*Registrar una nueva Tarea:*/
INSERT INTO Tareas (nombre, descripcion, fecha_entrega, asignatura_id)
VALUES ('Trabajo Final', 'Desarrollar un proyecto de investigación', '2025-12-15', 1);

/*Registrar una entrega de tarea:*/
INSERT INTO Entregas (estudiante_id, tarea_id, fecha_entrega, archivo, calificacion)
VALUES (1, 1, '2025-12-14', 'trabajo_final.pdf', 9.5);

/*Registrar un usuario estudainte:*/
INSERT INTO Usuarios (username, password, tipo_usuario, usuario_id)
VALUES ('juanperez', 'contraseña_encriptada', 'estudiante', 1);

/*Registrar un usuario docente:*/
INSERT INTO Usuarios (username, password, tipo_usuario, usuario_id)
VALUES ('carlosgomez', 'contraseña_encriptada', 'docente', 1);




/*Consultas del Crud 2*/
/*Actualizar (Actualizar la fecha de entrega de una tarea:)*/
UPDATE Tareas
SET fecha_entrega = '2025-12-20'
WHERE id = 1;

/*Actualizar (Actualizar la calificación de un estudiante en una tarea:)*/
UPDATE Entregas
SET calificacion = 8.5
WHERE estudiante_id = 1 AND tarea_id = 1;


/*Consultas del Crud 3*/
DELETE FROM Tareas WHERE id = 1;

/*Eliminar una entrega de tarea:*/
DELETE FROM Entregas WHERE estudiante_id = 1 AND tarea_id = 1;


/*Consultas select*/

Select * from Estudiantes;
Select * from Docentes;
Select * from Entregas;
Select * from Tareas;
Select * from Asignaturas;

/*Ver todas las tareas de una asignatura:*/
SELECT * FROM Tareas WHERE asignatura_id = 1;

/*Ver todas las tareas de una asignatura:*/
SELECT e.nombre, e.apellido, t.nombre AS tarea, en.fecha_entrega, en.calificacion
FROM Entregas en
JOIN Estudiantes e ON en.estudiante_id = e.id
JOIN Tareas t ON en.tarea_id = t.id
WHERE t.id = 1;

/*Consulta para Login (Verificación de Usuario y Contraseña)*/
SELECT * FROM Usuarios
WHERE username = 'juanperez' AND password = 'contraseña_encriptada';



