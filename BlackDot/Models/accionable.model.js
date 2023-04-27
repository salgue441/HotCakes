/**
 * @file accionable.model.js
 * @brief Modelo de la tabla de Accionables
 * @author Yuna Chung
 * @version 1.0
 * @date 2023.03.21
 *
 * @copyright Copyright (c) 2023 - MIT License
 **/

const dataBase = require("../Utils/dataBase")

/**
 * @class Accionable
 * @classdesc Modelo de la tabla de Accionables
 * @property {int} idAccionable - Identificador del Accionable
 * @property {string} nombreAccionable - Nombre del Accionable
 * @property {int} storyPoints - StoryPoint asignado al Accionable
 * @property {string} labelAccionable - Label del Accionable
 * @property {enum} prioridadAccionable - Prioridad del Accionable
 * @property {enum} estadoAccioanble - Estado del Accionable
 * @property {enum} estadoIssue - Estado del issue
 * @property {string:Date} fechaCreacion - Fecha de creación del Accioanble
 * @property {string:Date} fechaFinalizacion - Fecha de finalización del Accionable
 **/

module.exports = class Accionable {
  /**
   * @brief
   * Accionable constructor.
   * @param {*} Accionable - Accionable object
   **/

  constructor(Accionable) {
    this.idAccionable = Accionable.idAccionable
    this.nombreAccionable = Accionable.nombreAccionable
    this.storyPoints = Accionable.storyPoints
    this.labelAccionable = Accionable.labelAccionable
    this.prioridadAccionable = Accionable.prioridadAccionable
    this.estadoAccionable = Accionable.estadoAccionable
    this.estadoIssue = Accionable.estadoIssue
    this.fechaCreacion = Accionable.fechaCreacion
    this.fechaFinalizacion = Accionable.fechaFinalizacion
  }

  /**
   * @brief
   * Recibe un Accionable de acuerdo con el ID.
   * @param {*} idAccionable - accionable id
   * @returns {object} -accioanble object
   **/

  static async getbyId(idAccionable) {
    const query = `SELECT * FROM accionable where idAccionable = ?`
    const [rows] = await dataBase.execute(query, [idAccionable])

    if (rows.length === 0) throw new Error("Accionable no encontrada")

    return new Accionable(rows[0])
  }

  /**
   * @brief
   * gets all accionables
   * @returns {Accionable[]} - array of accionables
   **/

  static async getAll() {
    const query = `SELECT * FROM accionable`
    const [rows, _] = await dataBase.execute(query)

    return rows
  }

  /**
   * @brief
   * gets last accionable id
   * @returns {int} - last accionable id
   */
  static async getLastId() {
    const query = `SELECT idAccionable FROM accionable ORDER BY idAccionable DESC LIMIT 1`

    const [idAccionable, _] = await dataBase.execute(query)

    const id = idAccionable[0].idAccionable

    return id
  }

  /**
   * @brief
   * save a new Accionable
   * @returns {Promise<Accionable>} - Query of new Accionable
   **/

  async save() {
    const query = `INSERT INTO accionable(nombreAccionable, storyPoints, labelAccionable) VALUES (?, ?, ?)`

    const [result] = await dataBase.execute(query, [
      this.nombreAccionable,
      this.storyPoints,
      this.labelAccionable,
    ])

    this.idAccionable = result.insertId
  }

  /**
   * @brief
   * updates content of an Accionable
   * @returns {Promise<Accionable>} - Query of modified Accionable
   * @throws {Error} - modified Accionable not found
   **/
  async update() {
    const query = `UPDATE accionable SET nombreAccionable = ?, storyPoints = ?, labelAccionable = ?, prioridadAccionable = ?, estadoAccionable = ?, estadoIssue = ?, fechaCreacion = ?, fechaFinalizacion = ? WHERE idAccionable = ?`

    await dataBase.execute(query, [
      this.nombreAccionable,
      this.storyPoints,
      this.labelAccionable,
      this.prioridadAccionable,
      this.estadoAccionable,
      this.estadoIssue,
      this.fechaCreacion,
      this.fechaFinalizacion,
    ])

    this.idAccionable = result.insertId
  }

  /**
   * @brief
   * modified Accionable state to "Aprobado"
   * @returns {Promise<Accionable>} - Query of modified Accionable
   * 
   **/

  async updateEstadoAprobado() {
    const query = `UPDATE accionable SET estadoAccionable = 'Aprobado' WHERE idAccionable = ?`
    await dataBase.execute(query, [this.idAccionable])
  }
}
