import {Alert} from 'react-bootstrap'

//Se especifica cuales son los props y el tipo de dato que el componente hijo puede recibir 
type AlertGeneratorProps={
  message: String;
}

//El componente hijo tiene argumentos de tipo "AlertGeneratorProps"
const AlertGenerator = ({message}:AlertGeneratorProps) => {

  return (
    <Alert variant="success" className="mt-2 w-25">
      <Alert.Heading>Mensaje recibido</Alert.Heading>
        <p>
          {message}
        </p>
      
      
    </Alert>
  )
}

export default AlertGenerator