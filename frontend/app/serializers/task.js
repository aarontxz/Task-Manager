import JSONSerializer from '@ember-data/serializer/json';

export default class TaskSerializer extends JSONSerializer {
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    // Normalize the array response here
    return {
      data: payload.map(task => {
        return {
          type: 'task',
          id: task.id,
          attributes: {
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
          },
        };
      }),
    };
  }
}
