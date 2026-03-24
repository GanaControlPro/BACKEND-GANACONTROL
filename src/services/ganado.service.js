import api from "./api";

export const listarGanado = async () => {
  try {
    const res = await api("/ganado", {
      method: "GET",
    });

    return {
      ok: res?.ok ?? false,
      mensaje: res?.mensaje?.mensaje || "Listado obtenido",
      data: res?.mensaje?.data || [],
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error?.mensaje || "No se pudo listar el ganado.",
      data: [],
    };
  }
};

export const obtenerGanadoPorId = async (id) => {
  try {
    const res = await api(`/ganado/${id}`, {
      method: "GET",
    });

    return {
      ok: res?.ok ?? false,
      mensaje: res?.mensaje?.mensaje || "Ganado encontrado",
      data: res?.mensaje?.data || null,
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error?.mensaje || "No se pudo obtener el registro.",
      data: null,
    };
  }
};

export const crearGanado = async (payload) => {
  try {
    const res = await api("/ganado", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      ok: res?.ok ?? false,
      mensaje: res?.mensaje?.mensaje || "Ganado creado",
      data: res?.mensaje?.data || null,
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error?.mensaje || "No se pudo crear el registro.",
      errores: error?.errores || [],
      data: null,
    };
  }
};

export const actualizarGanado = async (id, payload) => {
  try {
    const res = await api(`/ganado/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return {
      ok: res?.ok ?? false,
      mensaje: res?.mensaje?.mensaje || "Ganado actualizado",
      data: res?.mensaje?.data || null,
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error?.mensaje || "No se pudo actualizar el registro.",
      errores: error?.errores || [],
      data: null,
    };
  }
};

export const eliminarGanado = async (id) => {
  try {
    const res = await api(`/ganado/${id}`, {
      method: "DELETE",
    });

    return {
      ok: res?.ok ?? false,
      mensaje: res?.mensaje?.mensaje || "Ganado eliminado",
      data: res?.mensaje?.data || null,
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error?.mensaje || "No se pudo eliminar el registro.",
      data: null,
    };
  }
};