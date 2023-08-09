import NameInput from './NameInput';
import NumberInput from './NumberInput'
const FormInput = ({
  inputData,
  submitBtn,
  userName,
  number,
}) => {
  return (
    <form className="form-container">
      <NameInput inputData={inputData} userName={userName} />
      <NumberInput inputData={inputData} number={number}/>
     
      <button type="submit" onClick={submitBtn}>
        Додати
      </button>
      
    </form>
  );
};
export default FormInput;
