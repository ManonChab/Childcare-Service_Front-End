import { useNavigate } from 'react-router';
import ActionButton from "../../Atoms/actionButton/ActionButton"
import styles from './AuthModal.module.css';
import CloseButton from "../../Atoms/closeButton/CloseButton";

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose(); 
        navigate('/login'); 
    };

    const handleRegister = () => {
        onClose();
        navigate('/register'); 
    };
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <CloseButton onClick = {onClose} />
                <h3>Do you want to see more?</h3>
                <p>Login or registrer for more details!</p>
                <div className={styles.buttons}>
                    <ActionButton 
                    text = "LOG IN" 
                    className = "login" 
                    onClick = {handleLogin}/>
                    <ActionButton 
                    text = "REGISTER" 
                    className = "register" 
                    onClick = {handleRegister}/>
                </div>
            </div>
        </div>
    );
};
export default AuthModal;