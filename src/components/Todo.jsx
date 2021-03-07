import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components';
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as CompletedIcon } from '../assets/icons/completed.svg';
import { deleteTodo, setPatchOn } from '../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';

const Todo = ({ todo: { _id, title, description, color } }) => {
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();

  const onHandlePatch = () => {
    dispatch(setPatchOn({ _id, title, description, color }));
  };

  const onHandleDelete = () => {
    dispatch(deleteTodo(_id));
    try {
      let todoList = localStorage.getItem("todoList");
      let parsedTodoList = JSON.parse(todoList);
      if (parsedTodoList.hasOwnProperty(_id)) {
        delete parsedTodoList[_id];
        localStorage.setItem("todoList", JSON.stringify(parsedTodoList));
      }
    } catch (error) {
      console.log(error.message);
    };
  };

  const onHandleComplete = () => {
    try {
      let todoList = localStorage.getItem("todoList");
      if (todoList) {
        let parsedTodoList = JSON.parse(todoList);
        setCompleted(!parsedTodoList[_id]);
        parsedTodoList[_id] = !parsedTodoList[_id];
        localStorage.setItem("todoList", JSON.stringify(parsedTodoList));
      } else {
        localStorage.setItem("todoList", JSON.stringify({ [_id]: true }));
        setCompleted(true);
      };
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      const isCompleted = JSON.parse(localStorage.getItem("todoList"));
      setCompleted(isCompleted[_id]);
    } catch (error) {
      console.log(error.message);
    }
  }, [_id])

  return (
    <TodoContainer completed={completed}>
      <ColorLine color={color} />
      <CompletedIconContainer>
        <CompletedIcon onClick={onHandleComplete} />
      </CompletedIconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <BtnGroupContainer>
        <IconButton onClick={onHandlePatch}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onHandleDelete}>
          <DeleteIcon />
        </IconButton>
      </BtnGroupContainer>
    </TodoContainer>
  )
}

export default memo(Todo);

const TodoContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  text-decoration: ${({completed}) => completed ? 'line-through' : 'none'};
  color: ${({completed}) => completed ? 'gray' : 'black'};
  position: relative;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 20px;
  background-color: #a7e2ec;
  box-shadow: ${({ completed }) => completed ?
    'inset 5px 5px 10px #8ec0c9, inset -5px -5px 10px #c0ffff'
    : '5px 5px 10px #8ec0c9, -5px -5px 10px #c0ffff'};
`;

const ColorLine = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  left: 20px;
  top: 28px;
  background-color: ${({ color }) => color ? color : '#fff'};
`;

const Title = styled.h1`
  padding: 0 50px 0 30px;
  font-weight: 500;
`;

const Description = styled.p`
  padding: 20px;
`;

const BtnGroupContainer = styled.div`
  position: absolute;
  display: flex;
  right: 20px;
  top: 20px;

`;

const CompletedIconContainer = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  right: 20px;
  bottom: 20px;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: #ebfff0;
  padding-top: 3px;
  box-shadow: -4px -4px 7px #ffffff9c, 4px 4px 7px #29899a;
  &:hover {
    box-shadow: -2px -2px 5px #ffffff9c, 2px  2px 5px #29899a;
  };
  &:active {
    box-shadow: inset 2px 2px 2px #407b5fad, inset -2px -2px 2px #e1ffe7d9;
    padding-bottom: 2px;
  }
  svg {
    width: 24px;
    height: 24px;
    fill: #00ff00;
  };
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  margin-left: 20px;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
  box-shadow: -4px -4px 7px #ffffff9c, 4px 4px 7px #29899a;
  &:hover {
    box-shadow: -2px -2px 5px #ffffff9c, 2px  2px 5px #29899a;
  };
  &:active {
    box-shadow: inset 2px 2px 2px #407b5fad, inset -2px -2px 2px #e1ffe7d9;
    padding-bottom: 2px;
  }
  &:nth-of-type(1) svg {
    width: 20px;
    height: 20px;
  };
  &:nth-of-type(2) svg {
    width: 23px;
    height: 23px;
  };
`;
