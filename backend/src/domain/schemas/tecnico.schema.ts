import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as forge from 'node-forge';

const SALT_ROUND = 10;

/*
    Tecnico:
      - nombretecnico: nombre de usuario único
      - nombre
      - apellidos
      - idtrabajador: se cifra
      - contrasena: se cifra
      - correo: se usará para generar el certificado
      - telefono
      - certificado: certificado digital generado y firmado
*/

export const TecnicoSchema = new Schema({
  nombretecnico: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  idtrabajador: { type: String, required: true },
  contrasena: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  departamento: { type: String, required: true },
  localizacion:{ type: String, required: true },
  certificado: { type: String },
  
});

// Función para generar un certificado digital usando node-forge
function generateDigitalCertificate(email: string): string {
  const pki = forge.pki;
  // Generamos el par de llaves RSA
  const keys = pki.rsa.generateKeyPair(2048);
  // Creamos un nuevo certificado
  const cert = pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = (new Date().getTime()).toString(); // número serial único
  const now = new Date();
  cert.validity.notBefore = now;
  cert.validity.notAfter = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  
  // Definimos atributos; en este caso, usamos el correo de la organización en el commonName
  const attrs = [
    { name: 'commonName', value: email },
    { name: 'countryName', value: 'ES' },
    { name: 'organizationName', value: 'Organización del Técnico' },
    { name: 'organizationalUnitName', value: 'Firma Digital' }
  ];
  
  cert.setSubject(attrs);
  cert.setIssuer(attrs); // self-signed
  cert.sign(keys.privateKey);
  
  // Convertimos el certificado a formato PEM
  const pemCert = pki.certificateToPem(cert);
  return pemCert;
}

TecnicoSchema.pre('save', async function (next) {
  const tecnico = this;

  // Encriptar la contraseña si fue modificada
  if (tecnico.isModified('contrasena')) {
    try {
      const hash = await bcrypt.hash(tecnico.contrasena, SALT_ROUND);
      tecnico.contrasena = hash;
    } catch (err) {
      return next(err);
    }
  }
  
  // Encriptar idtrabajador si fue modificado
  if (tecnico.isModified('idtrabajador')) {
    try {
      const hash = await bcrypt.hash(tecnico.idtrabajador, SALT_ROUND);
      tecnico.idtrabajador = hash;
    } catch (err) {
      return next(err);
    }
  }
  
  // Generar y asignar el certificado digital 
  if (!tecnico.certificado) {
    try {
      const cert = generateDigitalCertificate(tecnico.correo);
      tecnico.certificado = cert;
    } catch (err) {
      return next(err);
    }
  }
  
  next();
});

// Propiedad virtual "id" para mostrar _id en formato string
TecnicoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TecnicoSchema.set('toJSON', { virtuals: true });
