import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeaderListArray from '../data';
import LeaderboardList from '../leaderboardList';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ccc;
`;
const HeaderWrapper = styled.section`
  min-width: 1100px;
  background-color: #fff;
  margin: 5rem;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media (max-width: 1150px) {
    min-width: 100%;
  }
`;

const Heading = styled.h2`
  font-size: 3.5rem;
`;

const AddLeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddLeaderHeading = styled.h3`
  font-size: 2rem;
`;

const InputWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;
const InputLabel = styled.label`
  font-size: 1.6rem;
`;
const InputField = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  margin: 0 1rem;
  outline: none;
  border-radius: 4px;
  width: 20rem;
`;

const AddLeaderButton = styled.button`
  padding: 2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 2rem 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover {
    background-color: #ddd;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  margin: 3rem 0 5rem 0;
  @media (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const LeaderBoardComponent = () => {
  const [leaderName, setLeaderName] = useState('');
  const [leaderPoints, setLeaderPoints] = useState('');
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [leaderList, setLeaderList] = useState([]);

  useEffect(() => {
    if (LeaderListArray?.length > 0) {
      LeaderListArray.sort((first, sec) =>
        first.points > sec.points ? -1 : 1
      );
      setLeaderList([...LeaderListArray]);
    }
  }, []);

  useEffect(() => {
    if (leaderName === '' || leaderPoints === '') {
      setAddButtonDisabled(true);
    } else {
      setAddButtonDisabled(false);
    }
  }, [leaderName, leaderPoints]);

  const onInputChange = (e) => {
    if (e?.target?.name === 'name') {
      setLeaderName(e.target.value);
    } else {
      setLeaderPoints(parseInt(e.target.value));
    }
  };

  const onAddLeaderClick = () => {
    const obj = {
      name: leaderName,
      points: leaderPoints,
      id: Math.random(),
    };
    setLeaderList((prev) => [...prev, obj]);
    setLeaderName('');
    setLeaderPoints('');
  };

  const onIncDecPoints = (ele, type) => {
    const objIndex = leaderList.findIndex((obj) => obj.id === ele.id);
    setLeaderList([...leaderList]);
    if (type === 'INC') {
      leaderList[objIndex].points += 1;
    } else {
      leaderList[objIndex].points -= 1;
    }
    setLeaderList([...leaderList]);
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        <Heading>Leaderboard App</Heading>
        <AddLeaderWrapper>
          <AddLeaderHeading>Add New Leader:</AddLeaderHeading>
          <InputWrapper>
            <InputLabel>Leader Name:</InputLabel>
            <InputField
              value={leaderName}
              name="name"
              onChange={(e) => onInputChange(e)}
              placeholder="Name"
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Leader Points:</InputLabel>
            <InputField
              value={leaderPoints}
              name="points"
              onChange={(e) => onInputChange(e)}
              placeholder="Points"
              type="number"
            />
          </InputWrapper>
          <AddLeaderButton
            disabled={addButtonDisabled}
            onClick={() => onAddLeaderClick()}
          >
            Add Leader
          </AddLeaderButton>
        </AddLeaderWrapper>
        <Heading>List of Leader</Heading>
        <ListWrapper>
          <LeaderboardList
            leaderList={leaderList}
            onIncDecPoints={(val, type) => onIncDecPoints(val, type)}
          />
          <LeaderboardList
            leaderList={leaderList}
            onIncDecPoints={(val, type) => onIncDecPoints(val, type)}
          />
        </ListWrapper>
      </HeaderWrapper>
    </MainWrapper>
  );
};

export default LeaderBoardComponent;
