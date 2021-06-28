import ReactDom from 'react-dom';

const PopupDom: React.FunctionComponent = ({ children }) => {
    const el = document.getElementById('popupDom');
    return ReactDom.createPortal(children, el);
};

export default PopupDom;