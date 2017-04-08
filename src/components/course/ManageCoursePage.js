import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import related actions
import * as courseActions from '../../actions/courseActions';
// Import sub components
import CourseForm from './CourseForm';
// For notifications such as success and error
import toastr from 'toastr';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    // Bind functions for proper this context
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // This lifecycle method will be run even if React suspects (not 100% sure)
    // that props are changed.
    // So we're checking for actual changes by comparing course IDs.
    if (this.props.course.id !== nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ course: Object.assign({}, nextProps.course)});
    }
  }

  // When a form field has been changed...
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course: course} );
  }

  saveCourse(event) {
    event.preventDefault();
    // Saving will start
    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      // Using then to wait for the above promise to be fulfilled first.
      .then(() => this.redirect())
      .catch(error => {
        // Show error message
        toastr.error(error);
        // Reset saving flag to hide preloader and restore Save button.
        this.setState({ saving: false });
      });
  }

  redirect() {
    // Saving has completed to resetting the saving flag to hide preloader and
    // restore Save button
    this.setState({ saving: false });
    // Show success message
    toastr.success('Course saved');
    // An alternative to browserHistory.push() for redirecting.
    // Need to define contextTypes in order to use this.context.router
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router object is available on
// this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course) {
    // Since filter returns an array, have to grab the first one.
    return course[0];
  } else {
    return null;
  }
}

// Exposing specific parts of Redux store's state to class.
function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // From the path '/course/:id'
  // Initialize the course object
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
  // If there is a course ID in the request make sure to get the corresponding
  // course data from state.
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  // Exposing props from state
  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

// Exposing specific dispatched actions to the class
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
