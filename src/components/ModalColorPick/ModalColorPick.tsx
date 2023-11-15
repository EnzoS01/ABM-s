import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap";

type MyModalProps={
    show: boolean;
    onHide:()=> void;
    handleColorChange: (color:string)=>void;
}
const ModalColorPick = ({show,onHide,handleColorChange}: MyModalProps) => {

    //Variables para cambiar el valor seleccionado del formulario
    const[selectedColor, setSelectedColor]= useState("#FFF");

    const handleColorPickerChange= (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSelectedColor(event.target.value);
    }
    //Al hacer click en aceptar, se pasa el color elegido a la funcion que proviene del componente padre 
    // y se cierra el modal

    const handleAceptClick=()=>{
        handleColorChange(selectedColor);
        onHide();
    }

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" >
        <Modal.Header> 
            <Modal.Title> Cambiar color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/*Color Picker */}
            <Form.Label htmlFor="exampleColorInput">Elige un color </Form.Label>
            <Form.Control
            type="color"
            id='exampleColorInput'
            defaultValue="#FFF"
            title="Elige tu color"
            onChange={handleColorPickerChange}
            />

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}> Cancelar</Button>
            <Button variant="primary" onClick={handleAceptClick}>Aceptar</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalColorPick