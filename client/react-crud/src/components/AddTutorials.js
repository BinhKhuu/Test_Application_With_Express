import React, {useState} from 'react';
import TutorialService from '../services/TutorialDataService';
const AddTutorials = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onTitleChange = event => {
    const title = event.target.value;
    setTitle(title);
  };

  const onDescriptionChange = event => {
    const description = event.target.value;
    setDescription(description);
  };

  const onFormSubmit = async () => {
    try {
      const data = {
        title,
        description,
      };
      await TutorialService.create(data);
      setTitle(data.title);
      setDescription(data.description);
      setSubmitted(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onAddMore = () => {
    setTitle('');
    setDescription('');
    setSubmitted(false);
  };

  return (
    <div className="submit-form" role={'form'}>
      Add Tutorials
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={onAddMore}>
            Add more
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              aria-label="title-input"
              value={title}
              onChange={onTitleChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              aria-label="description-input"
              value={description}
              onChange={onDescriptionChange}
              name="description"
            />
            <button onClick={onFormSubmit} className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTutorials;
