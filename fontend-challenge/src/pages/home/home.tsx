import React, { FC, useState, useEffect } from 'react';
import { CatalogList, LearningPath } from '../../types/customTypes';
import { getMicrosoftCatalogs } from '../../api-services/getMicrosoftLearn';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { setLearningPaths } from '../../redux/reducers/catalogs';
import './home.css'
import LearningPathCard from '../../components/LearningPathCard';


interface PropsFromRedux {
  learningPaths: LearningPath[];
  setLearningPaths: (learningPaths: CatalogList) => void;
}

const Home: FC<PropsFromRedux> = ({ learningPaths, setLearningPaths }) => {

  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean | null>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: CatalogList = await getMicrosoftCatalogs()
      setLearningPaths(response)
      setRefresh(!refresh)
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {

  }, [refresh])

  return (
    <div className="App">
      <div className={error == null?"learning-paths-container":"learning-paths-container-error"}>
        {
          error == null ?
            <>
              {learningPaths.map((learningPath) => (
                <LearningPathCard key={learningPath.uid} learningPath={learningPath} />
              ))}
            </>
            :
            <>
              <div className='error'>
                Something Wrong with getting the catalogs........
              </div>
            </>
          
        }

      </div>
    </div>
  );
}


const mapStateToProps = (state: RootState) => ({
  learningPaths: state.microsoft.learningPaths,
});

const mapDispatchToProps = {
  setLearningPaths,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Home);
