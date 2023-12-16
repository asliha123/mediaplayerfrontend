import React from "react"
import { PlusCircle } from "react-feather"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { addVideo } from "../service/allapi"
import { ToastContainer, toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'

function Add({handleresponse}) {
  const [uploaddata, setuploaddata] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: "",
  })
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  // define setinput function

  const setInput = (e) => {
    const { name, value } = e.target
    //  ... spread operation
    setuploaddata({ ...uploaddata, [name]: value })
  };
  console.log(uploaddata);
  // extract embeded url from utube original url

  const extractUrl = (e) => {
    let youtubeurl = e.target.value
    if (youtubeurl.includes("v=")) {
      let index = youtubeurl.indexOf("v=")
      console.log(index);

      let videourl = youtubeurl.substring(index + 2, index + 13)

      console.log(videourl)

      let videodata = uploaddata

      videodata.url = `https://www.youtube.com/embed/${videourl}`

      setuploaddata(videodata)
    }
    console.log(uploaddata);
  };

  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploaddata

    if (!id || !caption || !thumbnail || !url) {
      toast.error("please fill the form completely")
    } else {
      // make api call
      const response = await addVideo(uploaddata)

      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data);

            handleresponse(response.data)


        setShow(false)
        toast.success("new video uploaded successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.warning("provide a unique id!!!")
      }
    }
  };

  return (
    <>
      <div onClick={handleShow} className="btn">
        <PlusCircle color="orange" size={90} />
      </div>

      {/* model */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* id */}
            <FloatingLabel className="mb-3" controlId="floatingId" label="Id">
              <Form.Control
                name="id"
                onChange={setInput}
                type="text"
                placeholder="Uploading Video Id"
              />
            </FloatingLabel>

            {/* caption */}

            <FloatingLabel
              className="mb-3"
              controlId="floatingCaption"
              label="Uploading Video Caption"
            >
              <Form.Control
                name="caption"
                type="text"
                onChange={setInput}
                placeholder="Video Caption"
              />
            </FloatingLabel>

            {/* video cover image url */}

            <FloatingLabel
              className="mb-3"
              controlId="floatingimages"
              label="Video cover image url"
            >
              <Form.Control
                name="thumbnail"
                type="text"
                onChange={setInput}
                placeholder=" Video  coverage url"
              />
            </FloatingLabel>

            {/* uploading video link */}

            <FloatingLabel
              className="mb-3"
              controlId="floatingLink"
              label="uploading video link"
            >
              <Form.Control
                name="url"
                type="text"
                onChange={extractUrl}
                placeholder="Video link"
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">
            Add
          </Button>
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
        theme="colored"
      />
    </>
  );
}

export default Add;
