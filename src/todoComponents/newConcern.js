import React from "react";
import { useState } from "react";
import { Table,Feed,Label,Button,Placeholder,Message,Container, Modal, Form, Segment } from "semantic-ui-react";
import axios from "axios";
import { useEffect } from "react";
import getCookie from "../cookies/getCookie";
import { useNavigate } from "react-router-dom";


function exampleReducer(state, action) {
    switch (action.type) {
      case 'OPEN_CONCERN':
        return { open: true, dimmer: action.dimmer }
      case 'CLOSE_CONCERN':
        return { open: false }
      default:
        throw new Error()
    }
  }

const NewListConcern = () => {

    const [state, dispatch] = React.useReducer(exampleReducer, {
      open: false,
      dimmer: undefined,
    })
    const { open, dimmer } = state
    
    const user = getCookie("sessionID")
    const navigate = useNavigate();
    const baseURL = `http://localhost:8000/todo/${user}/`;
    const [employees, setEmployees] = useState([]);
    const [reachedPage, setReachedPage] = useState(false);
    const [pageOption, setPageOption] = useState(["test"]);
    const [takeActionSubject, setTakeActionSubject] = useState(["","",""])
   
    const TakeActionHandler = (id,subject,concern) =>{
        setTakeActionSubject([id,subject,concern]);
    }
   
    const PageController = (page) =>{
        navigate(`?page=${page}`)
        setReachedPage(false)
        setEmployeeData();
    }

    const setEmployeeData = () => {
        const param = getParameter("page") !== null? getParameter("page"):1;
        axios.get(baseURL+`index?page=`+param).then((response)=>{
            if(response.data.status === true){
                setEmployees(response.data.data)
                setPageOption(response.data.paginate)
            }else{
                if(response.data.reachedPage){
                    setReachedPage(true)
                }
            }
        }).catch(error=>{

            console.log("Error ocurred while loading data:"+error);
        });
    }
    useEffect(()=>{
        setEmployeeData();
    },[]);
    // Arrow function to get the parameter
    // of the specified key
    const getParameter = (key) => {
      
        // Address of the current window
        const address = window.location.search
      
        // Returns a URLSearchParams object instance
        const   parameterList = new URLSearchParams(address)
      
        // Returning the respected value associated
        // with the provided key
        return parameterList.get(key)
    }

    return (<>
            <Table celled >
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>No</Table.HeaderCell>
                    <Table.HeaderCell>Concern</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body >
                    {employees.map((item, i)=>(
                        <Table.Row>
                            <Table.Cell>

                                {(((pageOption[0].currentPage*2)-1)+i)}
                            </Table.Cell>
                            <Table.Cell>
                            <Label as='a' color='green' ribbon>
                            New
                            </Label>
                                <h2> {item.subject}</h2>
                                <p>
                                    {item.concern}
                                </p>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.Summary>
                                                Created by: <a>{item.createdBy}</a>
                                            </Feed.Summary>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Feed.Label>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.Summary>
                                                Remarks by: <a>{item.assignedTo}</a>
                                            </Feed.Summary>
                                        </Feed.Summary>
                                        <Feed.Extra  text>
                                                
                                                {item.remarks == "" | item.remarks == null?"No remarks yet.":<p><b>Remarks:</b> <br></br>{item.remarks}</p>}
                                        </Feed.Extra>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                            <Label color={'teal'}>Date Created: {item.date_Created}</Label>
                            <Label color={'red'}>Deadline: {item.deadline}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                    <Button.Group basic vertical labeled icon>
                                            {item.takeAction?
                                                <Button icon='file' content='Take Action' title="Take Action" onClick={() => {dispatch({ type: 'OPEN_CONCERN', dimmer: 'blurring' });TakeActionHandler(item.apiID,item.subject,item.concern)}} />
                                            :""
                                            }
                                            {item.otherTools?
                                                <Button icon='mail' content='Notify Thru Email' title="Send"/>
                                            :""}
                                            
                                            {item.otherTools?
                                            <Button icon='edit'content='Edit' title="Edit"/>
                                            :""}
                                            {item.otherTools?
                                                <Button icon='remove'content='Remove' title="Remove"/>
                                            :""}
                                    </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    {reachedPage?
                    <Table.Row >
                        <Table.Cell colSpan={3}>
                            <Container>
                            <Message negative>
                                <Message.Header>We're sorry to hear </Message.Header>
                                <p>that you've already reached the maximum page. <a href="javascript:void(0)" onClick={(e)=>{PageController(1)}}>Reload</a></p>
                            </Message>
                                <Placeholder>
                                    <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    </Placeholder.Header>
                                    <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                            </Container>
                        </Table.Cell>
                    </Table.Row>
                    :reachedPage}
                </Table.Body>
            </Table>
            <ul className="paginate-style">
                {pageOption[0].hasPrevious?
                        <li>
                            <a href="javascript:void(0)" onClick={(e)=>{PageController(1)}}>&laquo; first</a> &emsp;
                            <a href="javascript:void(0)" onClick={(e)=>{PageController(pageOption[0].currentPage-1)}}>previous</a>
                        </li> 
                :""}
                <li>
                    Page {pageOption[0].currentPage} of {pageOption[0].numberOfPage}
                </li>
                {pageOption[0].hasNext?
                        <li>
                            <a href="javascript:void(0)" onClick={(e)=>{PageController(pageOption[0].currentPage+1)}}>next</a>&emsp;
                            <a href="javascript:void(0)"  onClick={(e)=>{PageController(pageOption[0].numberOfPage)}}>last &raquo;</a>
                        </li> 
                :""}
            </ul> 
            <Modal
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_CONCERN' })}
            >
                <Modal.Header>Take Action</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Label>Subject</Label>
                        <h4>{takeActionSubject[1]}</h4>
                        <Label>Concern</Label>
                        <p>{takeActionSubject[2]}</p>
                        <Label>Remarks</Label>
                        <textarea required placeholder='Place you remarks here'></textarea>
                        
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => dispatch({ type: 'CLOSE_CONCERN' })}>
                    Cancel
                </Button>
                <Button positive onClick={() => dispatch({ type: 'CLOSE_CONCERN' })}>
                    Submit
                </Button>
                </Modal.Actions>
            </Modal>
            </>)
            
}

export default NewListConcern;