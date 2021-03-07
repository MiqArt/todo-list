import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Todo from './Todo';
import { getAllTodos } from '../redux/actions/actionCreators';
import { ReactComponent as Loader } from '../assets/icons/loader.svg';

const TodoList = () => {

  const dispatch = useDispatch();
  const { loading, todos } = useSelector(state => state);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  return (
    <div>
      {
        loading ?
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
          :
          todos.length > 0 ?
            todos.map(el => (
              <Todo key={el._id} todo={el} />
            ))
            :
            <EmptyText>The list is empty</EmptyText>
      }
    </div>
  )
}

export default TodoList;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const EmptyText = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: bold;
  padding: 40px;
  text-shadow: 1px 1px white;
`;

const LoaderContainer = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  & svg {
    animation: ${rotate} 1s linear infinite;
  };
`;
