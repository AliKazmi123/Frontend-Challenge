import React, { FC, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { LearningPath } from '../../types/customTypes';
import { FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import './detail.css'
import DetailWithIcon from '../../components/DetailWithIcon';

const Detail: FC = () => {
  const location = useLocation();
  const obj = location.state.learningPath
  const [detail, setDetail] = useState<LearningPath>(obj);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className='imageAndtitle'>
          <img className="detail-card-image" src={detail.icon_url} alt={detail.title} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="detail-card-title">{detail.title}</h2>
            <div className="learning-path-card-date">
              <CalendarOutlined />
              {formatDate(detail.last_modified)}
            </div>
          </div>

        </div>

        <div className="detail-card-item">
          <FileTextOutlined className='detail-icon' />
          <span>{detail.summary}</span>
        </div>
        <DetailWithIcon heading={'Courses'} list={detail?.subjects} />
        <DetailWithIcon heading={'Modules'} list={detail?.modules} />
        <DetailWithIcon heading={'Roles'} list={detail?.roles} />
        <DetailWithIcon heading={'Products'} list={detail?.products} />
        <DetailWithIcon heading={'Levels'} list={detail?.levels} />


      </div>
    </div>
  );
}

export default Detail;
