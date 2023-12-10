// app/components/task-form.js

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TaskFormComponent extends Component {
  @service store;
  @tracked id = '';
  @tracked title = '';
  @tracked description = '';
  @tracked status = '';
  @tracked dueDate = '';

  @action
  async updateTask() {
    try {
      // Create an object with non-empty values
      const taskData = {
        id: this.id,
        title: this.title,
        description: this.description,
        status: this.status,
        dueDate: this.dueDate,
      };

      // Filter out properties with empty values
      const nonEmptyTaskData = Object.fromEntries(
        Object.entries(taskData).filter(([_, value]) => value !== '')
      );

      // Check if there are non-empty values before making the request
      if (Object.keys(nonEmptyTaskData).length === 0) {
        console.warn('No non-empty values to submit.');
        return;
      }

      // Make a POST request to the createTask endpoint
      const response = await fetch('http://localhost:3000/api/Tasks/updateTask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(nonEmptyTaskData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Optionally, you can clear the form after successfully adding a task
      this.id = '';
      this.title = '';
      this.description = '';
      this.status = '';
      this.dueDate = '';
      console.log('Task updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
}
