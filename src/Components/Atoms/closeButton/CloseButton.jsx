import styles from './close-button.module.css';

const CloseButton = ({ onClick }) => {
    return (
        <button 
            className={styles.closeBtn} 
            onClick={onClick}
            aria-label="Cerrar"
        >
            X
        </button>
    );
};

export default CloseButton;