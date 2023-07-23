import React, { FC } from 'react';
import {  CopyOutlined, UnorderedListOutlined } from '@ant-design/icons';
import './detailWithIcon.css'


interface props {
    heading: String,
    list: String[]
}

const DetailWithIcon: FC<props> = ({ heading, list }) => {
    return (
        <div>
            <div className="detail-card-item">

                <UnorderedListOutlined className='detail-icon' />

                <span style={{ fontSize: 18, fontWeight: 'bold' }}>{heading}</span>
            </div>
            {
                list?.map((item: any) => {
                    return (
                        <div style={{ marginLeft: 40 }} className="detail-card-item">
                            <CopyOutlined className='detail-icon' />
                            <span>{item}</span>
                        </div>
                    )
                })
            }
        </div>

    );
};

export default DetailWithIcon;
