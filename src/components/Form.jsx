import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fixedColors } from '../constants';
import { createTodo, deleteAllTodos, patchTodo, setPatchOff } from '../redux/actions/actionCreators';

const initialFormData = { title: "", description: "", color: fixedColors[0] };
const initialErrorData = { title: false, description: false };

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialErrorData);

  const dispatch = useDispatch();
  const { patchData, todos } = useSelector(state => state);


  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData(prevState => ({ ...prevState, [name]: value }));

    if (error.title || error.description) {
      setError(prevState => ({ ...prevState, [name]: false }));
    };
  };

  const handleColorClick = (color) => {
    setFormData(prevState => ({ ...prevState, color }));
  };

  const onHandleSubmit = () => {
    const { title, description } = formData;
    if (title && description) {
      dispatch(createTodo(formData));
      setFormData(initialFormData);
    } else {
      setError({ title: !title, description: !description })
    };
  };

  const onHandleSave = () => {
    const { title, description } = formData;
    if (title && description) {
      dispatch(patchTodo(formData));
      setFormData(initialFormData);
    } else {
      setError({ title: !title, description: !description })
    };
  };

  const onHandleCancel = () => {
    setFormData(initialFormData);
    setError(initialErrorData);
    dispatch(setPatchOff());
  };

  const onHandleDeleteAll = () => {
    setFormData(initialFormData);
    setError(initialErrorData);
    dispatch(deleteAllTodos(todos));
  };

  useEffect(() => {
    if (patchData) {
      setFormData(patchData);
      setError(initialErrorData);
    };
  }, [patchData])

  return (
    <FormContainer>
      <ErrorText error={error.title || error.description}>Please, fill in all fields.</ErrorText>
      <StyledInput
        name="title"
        placeholder="Title"
        type="text"
        error={error.title}
        value={formData.title}
        onChange={handleInputChange}
      />
      <StyledInput
        name="description"
        placeholder="Description"
        type="text"
        error={error.description}
        value={formData.description}
        onChange={handleInputChange}
      />
      <CustomColorPicker>
        {
          fixedColors.map((el, index) => (
            <ColorSquare
              key={`color-${index}`}
              selected={formData.color === el}
              color={el} title={el}
              onClick={handleColorClick.bind(null, el)}
            />
          ))
        }
      </CustomColorPicker>
      {
        patchData ?
          <BtnGroup>
            <StyledButton backgroundColor="#e7b034" onClick={onHandleSave}>Save</StyledButton>
            <StyledButton backgroundColor="#7b5f1f" onClick={onHandleCancel}>Cancel</StyledButton>
          </BtnGroup>
          :
          <StyledButton backgroundColor="#3fc667" onClick={onHandleSubmit}>Add</StyledButton>
      }
      {todos.length > 0 && <StyledButton className="clearAllBtn" onClick={onHandleDeleteAll} backgroundColor="#f34b4b">Clear All</StyledButton>}
    </FormContainer>
  );
};

export default Form;

//styles

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 1000px) {
    flex-direction: column;
    margin-bottom: 0;
  };
`;

const ErrorText = styled.span`
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 12px;
  bottom: -15px;
  left: 7px;
  color: red;
  display: ${({ error }) => error ? 'block' : 'none'};
  @media (max-width: 1000px) {
    bottom: 23px;
  };
`;

const StyledInput = styled.input`
  font-family: 'Roboto', sans-serif;
  height: 40px;
  padding: 0 12px;
  margin-right: 20px;
  outline: none;
  border: none;
  border-radius: 12px;
  background-color: #e0f3f2;
  box-shadow: ${({ error }) => error ?
    'inset 5px 5px 10px #ff111145, inset -5px -5px 10px #f7eaea'
    : 'inset 5px 5px 10px #8ec0c9, inset -5px -5px 10px #c0ffff'
  };
  :focus {
    box-shadow: ${({ error }) => error ?
    'inset 3px 3px 5px #ff111145, inset -2px -2px 7px #f7eaea'
    : 'inset 3px 3px 5px #8ec0c9, inset -2px -2px 7px #c0ffff'
    };
  };
  @media (max-width: 1000px) {
    margin-bottom: 10px;
    margin-right: 0;
    width: 100%;
  };
`;

const BtnGroup = styled.div`
  display: flex;
`

const StyledButton = styled.button`
  font-family: 'Roboto',sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: white;
  height: 40px;
  padding: 0 12px;
  margin-right: 20px;
  border: none;
  outline: none;
  border-radius: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : 'unset'};
  cursor: pointer;
  box-shadow: -5px -5px 20px #ffffff, 5px 5px 20px #29899a;
  &:hover {
    box-shadow: -2px -2px 5px #ffffff, 2px  2px 5px #29899a;
  };
  &:active {
    box-shadow: inset 2px 2px 2px #407b5fad, inset -2px -2px 2px #e1ffe7d9;
    padding-bottom: 2px;
  };
  &.clearAllBtn {
    margin-left: auto;
    margin-right: 5px;
  };
  @media (max-width: 1000px) {
    margin: 10px;
  };
`;

const CustomColorPicker = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  max-width: 170px;
  padding: 5px;
  margin-right: 20px;
  border-radius: 4px;
  box-shadow: 5px 5px 10px #66b7c5, -5px -5px 10px #c7ffff;
  background-color: #ffffff;
  @media (max-width: 1000px) {
    margin-bottom: 10px;
    margin-right: 0;
  };
`;

const ColorSquare = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  cursor: pointer;
  &:hover {
    outline: #fff solid 2px;
    box-shadow: rgb(0 0 0 / 25%) 0px 0px 5px 2px;
    z-index: 2;
  };
  ${({ selected }) => selected
    ? `
    outline: #fff solid 2px;
    box-shadow: rgb(0 0 0 / 25%) 0px 0px 5px 2px;
    z-index: 2;
    `
    :
    ''
  };
`;
