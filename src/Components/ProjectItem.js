import React, { Component } from 'react';

class ProjectItem extends Component {
  render() {

  	return (
  		<li>
  			{this.props.project.name} : {this.props.project.category}
  		</li>
  	)

  }
}

export default ProjectItem;
