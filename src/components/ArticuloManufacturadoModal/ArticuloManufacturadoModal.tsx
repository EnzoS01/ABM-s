import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar formularios 
import * as Yup from 'yup';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";


//Notificaciones al usuario

type ArticuloManufacturadoModalProps={
    show: boolean;
    onHide:()=>void;
    denominacion: string;
    modalType: ModalType;
    art: ArticuloManufacturado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;


}


const ArticuloManufacturadoModal = ({show, onHide, denominacion, modalType, art, refreshData}:ArticuloManufacturadoModalProps) => {
    //CREATE - UPDATE
    const handleSaveUpdate = async (pro: ArticuloManufacturado) => {
        try {
            const isNew = pro.id === 0;
            if (isNew) {
                await ArticuloManufacturadoService.createArtManu(pro);
            } else {
                await ArticuloManufacturadoService.updateArtManu(pro.id, pro);
            }
            toast.success(isNew ? "Articulo Manufacturado Creado" : "Articulo Manufacturado Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        } 
    };

    //DELETE
    const handleDelete = async () => {
        try {
            await ArticuloManufacturadoService.deleteArtManu(art.id);
            toast.success("Articulo Manufacturado borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error");    
        }   
    }

    
    //Yup, esquema de validacion.
    const validationSchema=()=>{
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('La denominacion es requerido'),
            descripcion: Yup.string().required('La descripcion es requerida'),
            tiempoEstimadoCocina: Yup.number().integer().min(0).required('El tiempo estimado de cocina es requerido'),
            precioVenta: Yup.number().min(0).required('El precio de venta es requerido'),
            costo: Yup.number().min(0).required('El costo es requerido'),
            urlImagen: Yup.string().required('La URL de la imagen es requerida'),
        });
    };



    //Formik, utiliza el esquema de validacion para crear un formulario dinamico y que lo bloquee en caso de haber errores

    const formik = useFormik({
        initialValues: art,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: ArticuloManufacturado) => handleSaveUpdate(obj),
     });
  
    return (   
        <>
        {modalType === ModalType.DELETE ? (
            <> 
                <Modal show={show} onHide={onHide} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title> {denominacion}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>¿Está seguro que desea eliminar el producto? <br />
                        <strong> {art.denominacion}</strong>? </p>
                    </Modal.Body>

                    <Modal.Footer> 
                        <Button variant="secondary" onClick={onHide}> Cancelar</Button>
                        <Button variant="danger" onClick={handleDelete}> Eliminar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        ):(
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title> {denominacion}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                    {/*Form.Grroup por cada campo para dar de Alta o Modificar un producto */}
                        
                        {/*Denominacion */}
                        <Form.Group controlId="formDenominacion">
                            <Form.Label>Denominacion</Form.Label>
                            <Form.Control
                                name="denominacion"
                                type="text"
                                value={formik.values.denominacion || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.denominacion &&
                                formik.touched.denominacion)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.denominacion}
                             </Form.Control.Feedback>
                        </Form.Group>

                        {/*"Descripción"*/}                
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                name="descripcion"
                                type="text"
                                value={formik.values.descripcion || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.descripcion &&
                                formik.touched.descripcion)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.descripcion}
                             </Form.Control.Feedback>
                        </Form.Group>
                        
                        {/*"TiempoEstimadoCocina"*/}                    
                        <Form.Group controlId="formTiempoEstimadoCocina">
                            <Form.Label>Tiempo Estimado de Cocina</Form.Label>
                            <Form.Control
                                name="tiempoEstimadoCocina"
                                type="number"
                                value={formik.values.tiempoEstimadoCocina || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.tiempoEstimadoCocina &&
                                formik.touched.tiempoEstimadoCocina)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.tiempoEstimadoCocina}
                             </Form.Control.Feedback>
                        </Form.Group>

                        {/*"PrecioVenta"*/}                    
                        <Form.Group controlId="formPrecioVenta">
                            <Form.Label>Precio Venta</Form.Label>
                            <Form.Control
                                name="precioVenta"
                                type="number"
                                value={formik.values.precioVenta || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.precioVenta &&
                                formik.touched.precioVenta)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.precioVenta}
                             </Form.Control.Feedback>
                        </Form.Group>

                        {/*"Costo"*/}                    
                        <Form.Group controlId="formCosto">
                            <Form.Label>Costo</Form.Label>
                            <Form.Control
                                name="costo"
                                type="number"
                                value={formik.values.costo || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.costo &&
                                formik.touched.costo)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.costo}
                             </Form.Control.Feedback>
                        </Form.Group>
                    
                        {/*"Imagen"*/}                

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
  )
}

export default ArticuloManufacturadoModal