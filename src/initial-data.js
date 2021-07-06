const initialData={
    tasks:{
        'task-1': {id:'task-1', content: 'primera tarea', value:'important'},
        'task-2': {id:'task-2', content: 'segunda tarea'},
        'task-3': {id:'task-3', content: 'tercera tarea'},
        'task-4': {id:'task-4', content: 'cuarta tarea'},
        'task-5': {id:'task-5', content: 'quinta tarea', value:'important'},

    },
    columns: {
        'column-1': {
            id: 'column-1',
            title : 'To-Do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
        },
        'column-2': {
            id: 'column-2',
            title : 'In pregress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title : 'End',
            taskIds: []
        }
    },

    columnOrder: ['column-1','column-2','column-3']
};

export default initialData;