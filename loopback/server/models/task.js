'use strict';

module.exports = function(Task) {
  // Validation and Automatic date field updates
  Task.observe('before save', function(ctx, next) {
    const taskInstance = ctx.instance || ctx.data;

    // Validation logic
    if (!taskInstance.title) {
      const err = new Error('Title is required');
      err.statusCode = 400;
      return next(err);
    }

    if (!taskInstance.status) {
        const err = new Error('Status is required');
        err.statusCode = 400;
        return next(err);
    }

    // Automatic date field updates
    taskInstance.updatedAt = new Date();
    
    // Continue with the save/update operation
    next();
  });

  // Create a new task
  Task.createTask = function(taskData, callback) {
    Task.create(taskData, function(err, task) {
      if (err) return callback(err);
      callback(null, task);
    });
  };

  // Read all tasks
  Task.getAllTasks = function(callback) {
    Task.find({}, function(err, tasks) {
      if (err) return callback(err);
      callback(null, tasks);
    });
  };

  // Update a task by ID
  Task.updateTask = function(updatedData, callback) {
    const taskId = updatedData.id;

    if (!taskId) {
      return callback(new Error('Task ID is missing in the updatedData'));
    }

    Task.findById(taskId, function(err, task) {
      if (err) return callback(err);
      if (!task) return callback(new Error('Task not found'));

      // Iterate through the keys in updatedData and update only those fields in the task
      Object.keys(updatedData).forEach(key => {
        if (key !== 'id') {
          task[key] = updatedData[key];
        }
      });

      task.save(function(err, updatedTask) {
        if (err) return callback(err);
        callback(null, updatedTask);
      });
    });
  };


  // Delete a task by ID
  Task.deleteTask = function(taskId, callback) {
    Task.deleteById(taskId, function(err) {
      if (err) return callback(err);
      callback(null, { message: 'Task deleted successfully' });
    });
  };

  // Remote methods for the CRUD operations
  Task.remoteMethod('createTask', {
    accepts: { arg: 'taskData', type: 'object', http: { source: 'body' } },
    returns: { arg: 'task', type: 'object' },
    http: { path: '/createTask', verb: 'post' }
  });

  Task.remoteMethod('getAllTasks', {
    returns: { arg: 'tasks', type: 'array' },
    http: { path: '/getAllTasks', verb: 'get' }
  });

  Task.remoteMethod('updateTask', {
    accepts: [
      { arg: 'updatedData', type: 'object', http: { source: 'body' } }
    ],
    returns: { arg: 'updatedTask', type: 'object' },
    http: { path: '/updateTask', verb: 'put' }
  });

  Task.remoteMethod('deleteTask', {
    accepts: { arg: 'taskId', type: 'string' },
    returns: { arg: 'message', type: 'object' },
    http: { path: '/deleteTask', verb: 'delete' }
  });
};
