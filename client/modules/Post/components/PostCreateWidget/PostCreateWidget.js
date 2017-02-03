import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  addPost = () => {
    const makeRef = this.refs.make;
    const modelRef = this.refs.model;
    const yearRef = this.refs.year;
    const regNumberRef = this.refs.regNumber;
    const comment = this.refs.comment;
    if (makeRef.value && modelRef.value && yearRef.value && regNumberRef && comment) {
      this.props.addPost(makeRef.value, modelRef.value, yearRef.value, regNumberRef.value, comment.value);
      makeRef.value = modelRef.value = yearRef.value = regNumberRef.value = comment.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewVehicle" /></h2>
          <input placeholder={this.props.intl.messages.make} className={styles['form-field']} ref="make" />
          <input placeholder={this.props.intl.messages.model} className={styles['form-field']} ref="model" />
          <input placeholder={this.props.intl.messages.year} className={styles['form-field']} ref="year" />
          <input placeholder={this.props.intl.messages.regNumber} className={styles['form-field']} ref="regNumber" />
          <textarea placeholder={this.props.intl.messages.comment_} className={styles['form-field']} ref="comment" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
