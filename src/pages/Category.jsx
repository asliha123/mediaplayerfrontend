import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, getAllCategory, getVideos, updateCategory } from '../service/allapi';
import { Trash2 } from 'react-feather';
import { deleteCategory } from '../service/allapi';
import VideoCard from './VideoCard';






function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [allCategory, setallCategory] = useState([{}])
  const [deleteStatus, setdeletestatus] = useState(false)
  useEffect(() => {
    getCategoryList()
  }, [

  ]

  )

  const [categoryItems, setcategoryItem] = useState({
    id: "", name: "", allVideos: []
  })


  // define function

  const addcategoryForm = (e) => {
    const { name, value } = e.target
    setcategoryItem({ ...categoryItems, [name]: value })
  }
  console.log(categoryItems)


  const handleAddcategory = async (e) => {
    e.preventDefault()
    const { id, name } = categoryItems
    if (!id || !name) {
      toast("Please fill the form completely.....")
    }
    else {
      const response = await addCategory(categoryItems)
      console.log(response);

      if (response.status >= 200 && response.status < 300) {

        setShow(false)
        toast.success('New category added successfully', {
          position: "top-center",
          autoClose: 5000,

          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        getCategoryList()

      }
      else {
        toast.warning('Please provide a unique id')
      }
    }
  }

  const getCategoryList = async () => {

    // api call for get category
    const res = await getAllCategory()
    // console.log(res.data);
    setallCategory(res.data)
  }
  console.log(allCategory);


  // delete category function
  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()
    console.log(id);

    // api call delete category
    await deleteCategory(id)
    getCategoryList()//call the function to view remaining without refreshing
  }

  // function defintion(dragover)

  const dragOver = (e) => {
    e.preventDefault()
    console.log("dragging over the category board");
  }

  // function definition dropped

  const dropped = async (e, categoryId) => {
    console.log("category Id:", categoryId);

    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log("sourcecardId", sourceCardId);

    // logic to implement adding card in the given category

    const { data } = await getVideos(sourceCardId)
    console.log("source video data", data);

    // to get dropped gategory details

    let selectedCategory = allCategory.find(item => item.id == categoryId)
    console.log("target category details", selectedCategory);

    // to push drop data into array


    selectedCategory.allvideos?.push(data)

    // update drop data in allvideos array

    const resp= await updateCategory(categoryId,selectedCategory)
    console.log(resp);

    getCategoryList()
  
  }
  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'>Add Category</div>
      </div>

      {

 allCategory.map(item => (
 
          <div droppable onDragOver={e => dragOver(e)} onDrop={e => dropped(e, item?.id)}>

            <div className='d-flex justify-content-between border rounded mt-3 p-2'>
              <h4>{item.name}</h4>
              <span><Trash2 onClick={e => handleDeleteCategory(e, item?.id)} color='red' /></span>

          <Row>
            {
              item?.allVideos?.map((card)=>(
                <Col className='p-3 mb-1 sm={12}'>
                  <VideoCard card={card} insideCategory={true}/>
                </Col>
              ))
            }
          </Row>
            </div>

          </div>

        )
        )}


      {/* model */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
              <Form.Control name="id" onChange={addcategoryForm} type="text" placeholder="Category id" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingcategory" label="Category">
              <Form.Control name="name" onChange={addcategoryForm} type="text" placeholder="Category" />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddcategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </>
  )
}

export default Category