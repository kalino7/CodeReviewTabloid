import Button from 'react-bootstrap/Button';

const CustomizeButton = ({sticker})=>{
    return <Button as="input" type="submit" value={sticker} />
}

export default CustomizeButton;