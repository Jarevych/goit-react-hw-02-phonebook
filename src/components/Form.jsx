import NameInput from './NameInput';
import NumberInput from './NumberInput'
const FormInput = ({
  inputData,
  submitBtn,
  filterData,
  userName,
  number,
  filter,
}) => {
  return (
    <form className="form-container">
      <NameInput inputData={inputData} userName={userName} />
      <NumberInput inputData={inputData} number={number}/>
     
      <button type="submit" onClick={submitBtn}>
        Додати
      </button>
      <label>
        <input
          type="search"
          name="filter"
          value={filter}
          onChange={filterData}
        />
      </label>
    </form>
  );
};
export default FormInput;
