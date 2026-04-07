import { AuthAPI } from "../api";

const endpoint = "/general";

export const DesencriptarCodigo = async (
  codigoQR: string,

) => {
  try {
    const datos = {
     
      operacion: "decrypt",
      qrEncrypted: codigoQR,
     
    };


    const peticion = await AuthAPI.post(`${endpoint}/desencriptar`, datos);
    console.log(peticion.data)
    return peticion.data;
  } catch (error: any) {
    return error.response.data;
  }
};