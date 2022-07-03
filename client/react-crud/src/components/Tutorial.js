import {render} from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import TutorialService from '../services/TutorialDataService';
import {useParams, useNavigate} from 'react-router-dom';

const Tutorial = (props, params) => {
  let navigate = useNavigate();
  let {id} = useParams();
  const [currentTutorial, setCurrentTutorial] = useState({
    title: '',
    description: '',
    published: false,
    id,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getTutorial();
  }, []);

  const getTutorial = async () => {
    try {
      const reponse = await TutorialService.get(id);
      setCurrentTutorial(reponse.data);
    } catch (error) {
      // log error
    }
  };

  const onTitleChange = event => {
    const updatedTitle = event.target.value;
    setCurrentTutorial({...currentTutorial, ...{title: updatedTitle}});
  };

  const onDescriptionChange = event => {
    const udpatedDesc = event.target.value;
    setCurrentTutorial({...currentTutorial, ...{description: udpatedDesc}});
  };

  const updatePublished = async status => {
    try {
      const response = await TutorialService.update(currentTutorial.id, {
        ...currentTutorial,
        ...{published: status},
      });
      setMessage('The tutorial was updated successfully!');
    } catch (error) {}
  };

  const updateTutorial = async () => {
    try {
      const response = await TutorialService.update(
        currentTutorial.id,
        currentTutorial,
      );
      setMessage('The tutorial was updated successfully!');
    } catch (error) {}
  };

  const deleteTutorial = async () => {
    try {
      const response = await TutorialService.remove(currentTutorial.id);
      console.log('DELETED');
      navigate('/');
    } catch (error) {}
  };

  return (
    <div>
      <div className="edit-form">
        <h4>Tutorial</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={currentTutorial.title}
              onChange={onTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={currentTutorial.description}
              onChange={onDescriptionChange}
            />
          </div>
          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
          </div>
        </form>
        <button
          className="badge badge-primary mr-2"
          onClick={updatePublished.bind(this, true)}
        >
          Publish
        </button>
        <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
          Delete
        </button>
        <button
          type="submit"
          className="badge badge-success"
          onClick={updateTutorial}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Tutorial;
