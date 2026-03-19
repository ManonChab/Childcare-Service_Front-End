import styles from"./action-button.module.css";

const ActionButton=({type, text, className, onClick})=>{
const btnClass = `${styles.base} ${styles[className]}`;
return(
<>
<button type={type} className={btnClass} onClick={onClick}>{text}</button>
</>

)
}

export default ActionButton;