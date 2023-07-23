import React, { FC } from 'react';
import { Card } from 'antd';
import { LearningPath } from '../../types/customTypes';
import { CalendarOutlined, FileDoneOutlined } from '@ant-design/icons';
import './learningPathCard.css';
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface LearningPathCardProps {
  learningPath: LearningPath;
}

const LearningPathCard: FC<LearningPathCardProps> = ({ learningPath }) => {
  const history = useNavigate();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); 
  };

  const navigate = () =>{
    history(`/detail-product/${learningPath.uid}`,{
      state: {
        learningPath: learningPath,
      }
    })
  }

  return (
    <div onClick={()=>navigate()}>
      <Card className="learning-path-card" key={learningPath.uid}>
        <div className="title-container">
          <img className="learning-path-card-image" src={learningPath.icon_url}  />
          <div className="learning-path-card-title">{learningPath.title}</div>
        </div>
        <div className="learning-path-card-date">
          <CalendarOutlined />
          {formatDate(learningPath.last_modified)}
        </div>
        <div className="learning-path-card-modules">
          <FileDoneOutlined />
          {learningPath.modules.length} modules
        </div>
      </Card>
    </div>
  );
};

export default LearningPathCard;
