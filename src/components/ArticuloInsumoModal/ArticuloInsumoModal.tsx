import { Button, Form, Modal } from "react-bootstrap";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { ModalType } from "../../types/ModalType";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ArticuloInsumoService } from "../../services/ArticuloInsumoService";
import { toast } from "react-toastify";

type ArticuloInsumoModalProps = {
    show: boolean;
    onHide: () => void;
    denominacion: string;
    modalType: ModalType;
    artInsumo: ArticuloInsumo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticuloInsumoModal = ({show, onHide, denominacion, modalType, artInsumo, refreshData}: ArticuloInsumoModalProps) => {
    
    const handleSaveUpdate =async (artIns:ArticuloInsumo) => {
        try {
            const isNew = artIns.id === 0;
            if (isNew) {
                await ArticuloInsumoService.createArticuloInsumo(artIns);
            } else {
                await ArticuloInsumoService.updateArticuloInsumo(artIns.id, artIns);
            }
            toast.success(isNew ? "Insumo creado":"Insumo actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ocurrio un error');
        }
    };

    const handleDelete = async () => {
        try {
            await ArticuloInsumoService.deleteArticuloInsumo(artInsumo.id);
            toast.success("Insumo Borrado", {
                position: "top-center",
              });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un Error');
        }
    }

    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required("La denominacion es requerida"),
            precioCompra: Yup.number().min(0).required("El precio es requerido"),
            stockActual: Yup.number().min(0).required("El Stock Actual es requerido"),
            stockMinimo: Yup.number().min(0).required("El Stock Minimo es requerido"),
            urlImagen: Yup.string().required("La imagen es requerida"),
        });
    };

    const formik = useFormik({
        initialValues: artInsumo,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: ArticuloInsumo) => handleSaveUpdate(obj),
    });
    
    return(
        <>
            {modalType === ModalType.DELETE ? (
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>{denominacion}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Está seguro que desea eliminar el Insumo?<br/> <strong>{artInsumo.denominacion}</strong>?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                        Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                        Borrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                </>
            ):(
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-x1">
                    <Modal.Header closeButton>
                        <Modal.Title>{denominacion}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {"Formulario"}
                        <Form onSubmit={formik.handleSubmit}>

                            <Form.Group controlId="formDenominacion">
                            <Form.Label>Denominacion</Form.Label>
                                <Form.Control
                                    name="denominacion"
                                    type="text"
                                    value={formik.values.denominacion || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(
                                    formik.errors.denominacion && formik.touched.denominacion)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.denominacion}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPrecioCompra">
                            <Form.Label>PrecioCompra</Form.Label>
                                <Form.Control
                                    name="precioCompra"
                                    type="number"
                                    value={formik.values.precioCompra || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(
                                    formik.errors.precioCompra && formik.touched.precioCompra)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.precioCompra}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formStockActual">
                            <Form.Label>StockActual</Form.Label>
                                <Form.Control
                                    name="stockActual"
                                    type="number"
                                    value={formik.values.stockActual || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(
                                    formik.errors.stockActual && formik.touched.stockActual)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.stockActual}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formStockMinimo">
                            <Form.Label>StockMinimo</Form.Label>
                                <Form.Control
                                    name="stockMinimo"
                                    type="number"
                                    value={formik.values.stockMinimo || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(
                                    formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.stockMinimo}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formImagen">
                            <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    name="urlImagen"
                                    type="text"
                                    value={formik.values.urlImagen || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(
                                    formik.errors.urlImagen && formik.touched.urlImagen)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.urlImagen}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Modal.Footer className="mt-4">
                                <Button variant="secondary" onClick={onHide}>
                                Cancelar
                                </Button>
                                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                Guardar
                                </Button>
                            </Modal.Footer>

                        </Form>
                    </Modal.Body>
                </Modal>
                </>
            )}
        </>
    );
};

export default ArticuloInsumoModal;