// app/routes/tasks.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TasksRoute extends Route {
    @service store;

    model() {
        return this.store.findAll('task');
    }

    @action
    async deleteTask(task) {
        try {
            const taskId = Number(task.id);

            if (isNaN(taskId)) {
                throw new Error('Task ID is not a valid number');
            }

            const response = await fetch('http://localhost:3000/api/Tasks/deleteTask', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                body: `taskId=${taskId}`,
            });

            if (!response.ok) {
                throw new Error(`Error deleting task: ${response.statusText}`);
            }

            window.location.reload();

            console.log('Task deleted successfully:', task);
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    }
}
