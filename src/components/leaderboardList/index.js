import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.ul`
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 2rem;
  margin: 1rem 2rem;
  width: 50%;
  list-style-type: none;
`;

const EachList = styled.li`
  display: flex;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  justify-content: space-between;
`;
const Name = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;
const Other = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
`;

const Points = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: blue;
`;

const Icon = styled.span`
  i {
    font-size: 1.6rem;
    cursor: pointer;
  }
`;

const LeaderboardList = ({ leaderList, onIncDecPoints }) => {
  return (
    <ListWrapper>
      {leaderList.map((item) => (
        <EachList key={item.id}>
          <Name>{item.name}</Name>
          <Other>
            <Points>{item.points}</Points>
            <Icon onClick={() => onIncDecPoints(item, 'INC')}>
              <i className="fas fa-plus"></i>
            </Icon>
            <Icon onClick={() => onIncDecPoints(item, 'DEC')}>
              <i className="fas fa-minus"></i>
            </Icon>
          </Other>
        </EachList>
      ))}
    </ListWrapper>
  );
};

export default LeaderboardList;
