import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Modal } from '@magento/venia-ui/lib/components/Modal';
import Button from '@magento/venia-ui/lib/components/Button';
import Title from './Title';
import { unlockScrolling } from '../../utils/scrollUtils';
import './Popup.css';

const Popup = ({ onSubmit, onClose }) => {
    const { formatMessage } = useIntl();
    const [formData, setFormData] = useState({
        question1: '',
        question2: '',
        question3: ''
    });
    const savedBodyProperties = useRef({});
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).some((answer) => answer === '')) {
            setError(true);
            return;
        }
        unlockScrolling();
        setError(false);
        onSubmit(formData);
    };

    const handleClose = () => {
        unlockScrolling();
        onClose();
    };

    return (
        <Modal>
            <div className='modal-box'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='modal-title'>
                            <Title />
                        </div>
                        <button
                            type='button'
                            className='close-button'
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={handleSubmit}>
                            <Question
                                questionId='Popup.question1'
                                defaultMessage='Do you like our product?'
                                name='question1'
                                value={formData.question1}
                                handleChange={handleChange}
                            />
                            <Question
                                questionId='Popup.question2'
                                defaultMessage='Would you recommend us?'
                                name='question2'
                                value={formData.question2}
                                handleChange={handleChange}
                            />
                            <Question
                                questionId='Popup.question3'
                                defaultMessage='Would you like to receive updates?'
                                name='question3'
                                value={formData.question3}
                                handleChange={handleChange}
                            />
    
                            {error && (
                                <p className='text-red-500 mt-2'>
                                    <FormattedMessage
                                        id='Popup.error'
                                        defaultMessage='Please answer all the questions.'
                                    />
                                </p>
                            )}

                            <div className='modal-footer'>
                                <Button type='submit' priority={'high'}>
                                    <FormattedMessage
                                        id='Popup.save'
                                        defaultMessage='Save'
                                    />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='modal-overlay' onClick={handleClose} ></div>
        </Modal>
    );
};
const Question = ({ questionId, defaultMessage, name, value, handleChange }) => (
    <div className='label-container'>
        <label className='question'>
            <FormattedMessage id={questionId} defaultMessage={defaultMessage} />
        </label>
        <div className='label-group'>
            <label className='label-wrapper'>
                <input
                    type='radio'
                    name={name}
                    value='yes'
                    checked={value === 'yes'}
                    onChange={handleChange}
                    required
                    className='input'
                />
                <span className='label'>
                    <FormattedMessage id='Popup.yes' defaultMessage='Yes' />
                </span>
            </label>
            <label className='label-wrapper'>
                <input
                    type='radio'
                    name={name}
                    value='no'
                    checked={value === 'no'}
                    onChange={handleChange}
                    required
                    className='input'
                />
                <span className='label'>
                    <FormattedMessage id='Popup.no' defaultMessage='No' />
                </span>    
            </label>
        </div>
    </div>
);

Question.propTypes = {
    questionId: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

Popup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Popup;
