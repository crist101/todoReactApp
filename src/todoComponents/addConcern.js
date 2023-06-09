import React, { useEffect, useState } from 'react'
import { Button, Form, Label, Modal, Select, TextArea } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import getCookie from '../cookies/getCookie'

function modalReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

function AddNewConcern() {
    const user = getCookie("sessionID")
    const baseURL = `http://localhost:8000/todo/${user}`;
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state
  const [assigned, setAssigned] = useState("")
  const [newConcern, setNewConcern] = useState("")
  const [subject, setSubject] = useState("")
  const [deadline, setdeadline] = useState("")
  const [userList, setUserList] = useState([])
  const [label, setLabel] = useState({
    assignedLabel:false,
    concernLabel: false,
    subjectLabel:false,
    deadlineLabel:false,
  })
  const checkDetails = ()=>{
    var result = false;
    [assigned,newConcern,deadline,subject].forEach((item)=>item===""&&result===false?result = true:"");
    setLabel((label)=>({...label,assignedLabel : (assigned===""?true:false)}))
    setLabel((label)=>({...label,concernLabel : (newConcern===""?true:false)}))
    setLabel((label)=>({...label,subjectLabel : (subject===""?true:false)}))
    setLabel((label)=>({...label,deadlineLabel : (deadline===""?true:false)}))
    return result
  }

  const submitHandle = (e)=>{
    const checkText = checkDetails();
    if(!checkText){
        axios.post(baseURL+"/add",{setAssigned:assigned,setConcern:newConcern,setSubject:subject,setDeadline:deadline}).then((response)=>{
            console.log(response.data);
        }).catch((error)=>
        console.log("Error ocurred while loading data:"+error)
        );
    }
  }
  return (
    <div>
      <Button
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
      >
        New Concern
      </Button>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>New Concern</Modal.Header>
        <Modal.Content>
            <Form>
                <p>
                <h4>Assign to</h4>
                    {label.assignedLabel?
                    <Label basic color='red' pointing='below'
                    >Please assign a person who need to check this concern.</Label>
                    :""
                    }
                    <select required onChange={(e)=>{setAssigned(e.target.value)}}>
                        <option value="" select></option>
                        <option value="1">Juan</option>
                        <option value="2">Crist</option>
                        <option value="3">Mary</option>
                    </select>
                </p>
                <h4>Subject</h4>
                {label.subjectLabel?
                <Label basic color='red' pointing='below'>Please place the concern here</Label>
                :""}
                <input type="text"  onChange={(e)=>{setSubject(e.target.value)}} required placeholder='Enter the title' />
                
                <h4>Concern</h4>
                {label.concernLabel?
                <Label basic color='red' pointing='below'>Please place the concern here</Label>
                :""}
                <TextArea onChange={(e)=>{setNewConcern(e.target.value)}} required placeholder='Place the concern here' style={{ minHeight: 100 }}></TextArea> 
                
                <h4>Deadline</h4>
                {label.deadlineLabel?
                <Label basic color='red' pointing='below'>Please select a deadline here</Label>
                :""}
                <input type="datetime-local" onChange={(e)=>{setdeadline(e.target.value)}} required placeholder='Enter the title' />
                
            </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Cancel
          </Button>
          <Button  positive onClick={(e) => {submitHandle(e)}}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default AddNewConcern
