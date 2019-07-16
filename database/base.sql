CREATE DATABASE db_Articulos;

USE db_Articulos;

-- TABLA USUARIOS
-- todas las contraseñas seran incriptadas
CREATE TABLE usuarios (
  id INT(11) NOT NULL,
  nombreUsuario VARCHAR(16) NOT NULL,
  contrasena VARCHAR(60) NOT NULL,
  nombreCompleto VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

ALTER TABLE usuarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE usuarios;

INSERT INTO usuarios (id, nombreUsuario, contrasena, nombreCompleto) 
  VALUES (1, 'calix', 'nose', 'Eduardo Calix');

SELECT * FROM usuarios;

-- Tabla de Articulos
CREATE TABLE Articulos (
  idArticulo INT(11) NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  articuloEscrito TEXT NOT NULL,
  url VARCHAR(255) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  idUsuario INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_usuarios_articulos FOREIGN KEY(idUsuario) REFERENCES usuarios(id)
);

ALTER TABLE Articulos
  ADD PRIMARY KEY (idArticulo);

ALTER TABLE Articulos
  MODIFY idArticulo INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE Articulos;

-- Tabla de Comentario
CREATE TABLE Comentario (
  idComentario INT(11) NOT NULL,
  comentarioEscrito TEXT NOT NULL,
  fecha DATETIME,
  idUsuario INT(11),
  idArticulo INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_comentario_articulos FOREIGN KEY(idArticulo) REFERENCES Articulos(idArticulo),
  CONSTRAINT fk_comentario_usuario FOREIGN KEY(idUsuario) REFERENCES usuarios(id)
);

ALTER TABLE Comentario
  ADD PRIMARY KEY (idComentario);

ALTER TABLE Comentario
  MODIFY idComentario INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE Comentario;