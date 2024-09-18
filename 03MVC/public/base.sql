-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema examen2appweb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema examen2appweb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `examen2appweb` DEFAULT CHARACTER SET utf8 ;
USE `examen2appweb` ;

-- -----------------------------------------------------
-- Table `examen2appweb`.`talleres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examen2appweb`.`talleres` (
  `taller_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `ubicacion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`taller_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `examen2appweb`.`participantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examen2appweb`.`participantes` (
  `participante_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`participante_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `examen2appweb`.`inscripciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examen2appweb`.`inscripciones` (
  `inscripcion_id` INT NOT NULL AUTO_INCREMENT,
  `estado` INT NOT NULL COMMENT 'Campo para saber el estado del taller\n\n1=activo\n0=inactivo',
  `fecha_inscripcion` DATETIME NOT NULL,
  `valor_inscripcion` INT NOT NULL,
  `cupos` INT NOT NULL COMMENT 'Cantidad de cupos disponibles para inscribir',
  `talleres_taller_id` INT NOT NULL,
  `participantes_participante_id` INT NOT NULL,
  PRIMARY KEY (`inscripcion_id`),
  INDEX `fk_inscripciones_talleres_idx` (`talleres_taller_id` ASC) ,
  INDEX `fk_inscripciones_participantes1_idx` (`participantes_participante_id` ASC) ,
  CONSTRAINT `fk_inscripciones_talleres`
    FOREIGN KEY (`talleres_taller_id`)
    REFERENCES `examen2appweb`.`talleres` (`taller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inscripciones_participantes1`
    FOREIGN KEY (`participantes_participante_id`)
    REFERENCES `examen2appweb`.`participantes` (`participante_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;