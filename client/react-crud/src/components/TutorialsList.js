import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import TutorialService from '../services/TutorialDataService';
const TutorialsList = props => {
  const [tutorials, setTutorials] = useState(props.tutorials);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = async () => {
    try {
      const tutorials = await TutorialService.getAll();
      setTutorials(tutorials);
    } catch {
      setTutorials([]);
    }
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    TutorialService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            role="searchbox"
            type="text"
            className="form-control"
            placeholder="Search by title"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>
        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={setActiveTutorial.bind(this, tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{' '}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{' '}
              {currentTutorial.published ? 'Published' : 'Pending'}
            </div>
            <Link
              to={'/tutorials/' + currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;
