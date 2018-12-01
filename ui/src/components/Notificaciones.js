import {message} from "antd";

export const success = () => {
    message.destroy();
    message.success('Guardado con Éxito');
};

export const eliminada = (item, genero) => {
    message.destroy();
    if (genero === "m") {
        message.success(item + ' eliminado con Éxito');
    } else {
        message.success(item + ' eliminada con Éxito');

    }
};

export const saving = () => {
    message.destroy();
    message.loading('Guardando...', 0);
};

export const error = (err) => {
    message.destroy();
    message.error('Error Guardando ' + err);
};

export const warning = (war) => {
    message.destroy();
    message.warning('Revisa los campos ' + war);
};

export const cancel = () => {
    message.destroy();
    message.info('Acción Cancelada');
};