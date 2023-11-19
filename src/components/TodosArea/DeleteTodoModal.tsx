import React, { useState } from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { TodoModel } from "../../models/TodoModel";
import { useTodos } from "../../context/TodoProvider";

type DeleteTodoModalProps = {
  todo: TodoModel;
};

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({ todo }) => {
  const [showModal, setShowModal] = useState(false);
  const { removeTodo } = useTodos();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const deleteTodo = () => {
    closeModal();
    removeTodo(todo.id);
  };

  return (
    <>
      <CloseButton onClick={openModal} className="p-0" />

      <Modal
        size="sm"
        show={showModal}
        onHide={closeModal}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body className="p-3 ">
          <Modal.Title className="text-center">
            Remove
            <span className="fw-bold"> {todo.title}</span>?
          </Modal.Title>
          <div className="mt-4  d-flex gap-1 justify-content-center">
            <Button onClick={deleteTodo} variant="danger" className="fw-bold ">
              Remove
            </Button>
            <Button onClick={closeModal} variant="warning" className=" fw-bold">
              CANCEL
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteTodoModal;
