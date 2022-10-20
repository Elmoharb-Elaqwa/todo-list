import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const token = sessionStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [descrip, setDescrip] = useState('');
  const [mtype, setMType] = useState('');
  const [id, setId] = useState('');
  const [complete, setCompleted] = useState(true);
  const [ncomplete, setNCompleted] = useState(false);
  const getAllTodos = async () => {
    await axios
      .get('https://api-nodejs-todolist.herokuapp.com/task', config)
      .then((todos) => {
        console.log(todos);
        setTodos(todos.data.data);
      });
  };

  useEffect((e) => {
    getAllTodos();
  }, []);

  const postTodo = () => {
    axios
      .post(
        'https://api-nodejs-todolist.herokuapp.com/task',
        { description: descrip },
        config
      )
      .then((todo) => {
        if (todo) {
          setTodos(todo);
          setShow(false);
          getAllTodos();
        }
      });
  };

  const updateTodo = (id) => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${id.toString()}`,
        { description: descrip },
        config
      )
      .then(() => getAllTodos());
  };
  console.log(id);
  const handleChange = (todo) => {
    setMType('Edit');
    setShow(!show);
    setDescrip(todo.description);
    updateTodo(todo._id);
  };

  const handleComplete = (id) => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${id.toString()}`,
        { completed: complete.toString() },
        config
      )
      .then(() => {
        getAllTodos();
      });
  };
  const handleNComplete = (id) => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${id.toString()}`,
        { completed: ncomplete.toString() },
        config
      )
      .then(() => {
        getAllTodos();
      });
  };

  const handleDelete = (todo) => {
    axios
      .delete(`https://api-nodejs-todolist.herokuapp.com/task/${todo}`, config)
      .then(() => {
        getAllTodos();
      });
  };

  return (
    <div className="mt-5" style={{ marginLeft: '100px' }}>
      <Button
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          margin: '0 auto',
        }}
        onClick={() => {
          setShow(!show);
          setMType('Add');
        }}
      >
        Add Todo
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {(mtype === 'Add') & (show === true)
              ? 'Add'
              : (mtype === 'Edit') & (show === true)
              ? 'Edit'
              : ''}{' '}
            Todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            name="description"
            onChange={(e) => {
              setDescrip(e.target.value);
            }}
            value={descrip}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={(e) => {
              if (mtype === 'Add') {
                postTodo();
              } else if (mtype === 'Edit') {
                handleChange(id);
              }
            }}
          >
            Save
          </Button>
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {todos.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Created at</th>
              <th>Status</th>
              <th>Action </th>
            </tr>
          </thead>
          {todos.map((todo) => {
            return (
              <tbody key={todo._id}>
                <tr>
                  <td>0</td>
                  <td>{todo.description}</td>
                  <td>{todo.createdAt}</td>
                  <td>{todo.completed.toString()}</td>
                  <td className="mx-5 d-flex">
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(todo._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        handleChange(todo);
                        setId(todo);
                      }}
                      variant="success"
                      className="mx-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        setCompleted(true);
                        handleComplete(todo._id);
                      }}
                    >
                      Mark as completed
                    </Button>
                    <Button
                      className="mx-1"
                      variant="danger"
                      onClick={() => {
                        setNCompleted(false);
                        handleNComplete(todo._id);
                      }}
                    >
                      Mark as not completed
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default Todos;
