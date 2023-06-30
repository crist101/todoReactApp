import React,{useEffect,useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../home.sass";
import Logo from "./../favicon.ico";
import {  Header ,Button, Container, Label, Message, Placeholder, Table,Icon, Modal, Image, Form, Feed,Tab, Grid, Segment, Card, Accordion, Dropdown } from "semantic-ui-react";
import getCookie from "../cookies/getCookie";
import 'animate.css';
import AddNewConcern from "./addConcern";
import 'semantic-ui-css/semantic.min.css'
import NewListConcern from "./newConcern";

function notifyModal(state, action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer }
      case 'CLOSE_MODAL':
        return { open: false }
      default:
        throw new Error()
    }
  }

const Todo = () => {

  const [state, dispatch] = React.useReducer(notifyModal, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

    const navigate = useNavigate();
    const user = getCookie("sessionID")
    const baseURL = `http://localhost:8000/todo/${user}/`;
    const [pageOption, setPageOption] = useState(["test"]);
    const [takeActionSubject, setTakeActionSubject] = useState(["","",""])
    
      


    const panes = [
        {
          menuItem: 'New Concern',
          render: () => <Tab.Pane attached={false}>
                <NewListConcern />
            </Tab.Pane>,
        },
        {
          menuItem: 'Pending Concern',
          render: () => <Tab.Pane attached={false}>
            Pending Concern
            </Tab.Pane>,
        },
        {
          menuItem: 'Completed',
          render: () => <Tab.Pane attached={false}>
            Completed
            </Tab.Pane>,
        },
      ]

const [accordionIndex, setAccordionIndex] = useState(0)
  const HandleClick = (titleProps) => {
    setAccordionIndex(titleProps);
  }
  var today = new Date(Date.now())
  const Pad = (n)=> {
      return (n < 10 ? '0' : '') + n;
  }  

  const RenderCountdown = (dateStart, dateEnd)=>{

        //console.log(dateStart, dateEnd); 
        // Logs 
        // Sat Dec 19 2015 11:42:04 GMT-0600 (CST) 
        // Mon Jan 18 2016 11:42:04 GMT-0600 (CST)

        let currentDate = dateStart.getTime();
        let targetDate = dateEnd.getTime(); // set the countdown date
        let days, hours, minutes, seconds; // variables for time units
        
        // find the amount of "seconds" between now and target
        let secondsLeft = ((targetDate - currentDate) / 1000);
        days = Pad( Math.floor( secondsLeft / 86400 ) );
        secondsLeft %= 86400;
        hours = Pad( Math.floor( secondsLeft / 3600 ) );
        secondsLeft %= 3600;
        minutes = Math.floor( secondsLeft / 60 ) 

        minutes = Pad(minutes);
        seconds = Pad( Math.floor( secondsLeft % 60 ) );
        // format countdown string + set tag value
        
        return (days==="00"?"":`${days} Day`)+(hours==="00"?"":` ${hours} Hour `)+(minutes==="00"?"":` ${minutes} Minutes`)
    }

    const [confirmationOpen, setOpen] = useState(false)
    const ConfirmationModalHandler = (val)=>{
        setOpen(true);
        console.log(val)
    }
    const [remarksOpen, setRemarksOpen] = useState(false)
    const RemarksModalHandler = (val)=>{
        setRemarksOpen(true);
        console.log(val);
    }
    return (
        <div> 
            <nav className="home-nav">
                <div className="logo">
                    <img src={Logo} alt="Logo" width={45}/>
                    <h4 className="title">Complain Record</h4>
                </div>
                <ul>
                    <li>
                        Welcome <ins>Juan!</ins>
                    </li>
                    <li>
                        <a href="javascript:void(0)" title="Log Out">
                            Log out
                        </a>
                    </li>
                </ul>
            </nav>
            
            <Segment basic>
            <Grid columns={3}>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <AddNewConcern/>  
                    <Card.Group style={{marginTop:'5px'}}>
                        <Card fluid>
                            <Card.Content>
                                <Dropdown text='Option' floated='right' className=" right floated image">
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' text='Edit'/>
                                        <Dropdown.Item icon='remove' text='Delete'/>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Icon name="users" 
                                floated='right' className=" right floated image" size="large"/>
                                <Card.Header>To: Juan Dela Cruz</Card.Header>
                                <Card.Meta>Email: bpi.jdc@gmail.com</Card.Meta>
                                <Card.Meta>PCC Number: <a>ABC-123-456-789</a></Card.Meta>
                                <Card.Meta>Doctrack No: <a>1-0623-0123455</a></Card.Meta>
                                <Card.Meta>June 13, 2023 06:08 AM</Card.Meta>
                                <Card.Description>
                                <h4>Plant Authentication and Seed Certificate</h4>
                                <strong>Concern :</strong><br></br> Ut irure magna quis qui enim eiusmod eiusmod eiusmod ex dolor enim. Reprehenderit mollit dolor irure in magna nisi ut cillum quis ex reprehenderit eu voluptate. Veniam ullamco esse sit ad Lorem cillum reprehenderit Lorem est sint veniam. In Lorem sint ex Lorem amet ex Lorem. Enim ipsum veniam fugiat eiusmod. Sint aliqua sit ad anim laboris do tempor commodo aliquip dolor. Amet dolor pariatur mollit anim culpa fugiat ullamco.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                        <Button basic color='green' onClick={(e)=>{ConfirmationModalHandler(1)}}>Notify</Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <h4>
                        Currently Working
                    </h4>
                    <Card.Group >
                        <Card fluid>
                            <Card.Content>
                            <Label as='a' color='orange' ribbon>
                                {RenderCountdown(today,new Date("Wed 16 Jun 2023, 06:08"))}
                            </Label>
                            <Icon name="users" 
                                floated='right' className=" right floated image" size="large"/>
                                <br></br>
                                <Card.Header style={{marginTop:'10px'}} >To: Juan Dela Cruz</Card.Header>
                                <Card.Meta>Email: bpi.jdc@gmail.com</Card.Meta>
                                <Card.Meta>PCC Number: <a>ABC-123-456-789</a></Card.Meta>
                                <Card.Meta>Doctrack No: <a>1-0623-0123455</a></Card.Meta>
                                <Card.Meta>June 13, 2023 06:08 AM</Card.Meta>
                                <Card.Description>
                                <h4>Plant Authentication and Seed Certificate</h4>
                                <strong>Concern :</strong><br></br> Ut irure magna quis qui enim eiusmod eiusmod eiusmod ex dolor enim. Reprehenderit mollit dolor irure in magna nisi ut cillum quis ex reprehenderit eu voluptate. Veniam ullamco esse sit ad Lorem cillum reprehenderit Lorem est sint veniam. In Lorem sint ex Lorem amet ex Lorem. Enim ipsum veniam fugiat eiusmod. Sint aliqua sit ad anim laboris do tempor commodo aliquip dolor. Amet dolor pariatur mollit anim culpa fugiat ullamco.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green' onClick={(e)=>{RemarksModalHandler(123)}}>
                                    Add Remarks 
                                </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <h4>
                        Almost reached the deadline 
                    </h4>
                    <Card.Group>
                        <Card fluid>
                            <Card.Content>
                            <Label as='a' color='red' ribbon>
                            {RenderCountdown(today,new Date("Wed 14 Jun 2023, 06:08 PM"))}
                            </Label>
                            <Icon name="users" 
                                floated='right' className=" right floated image" size="large"/>
                                <br></br>
                                <Card.Header style={{marginTop:'10px'}} >Paula Del Rosario</Card.Header>
                                <Card.Meta>June 13, 2023 06:08 AM</Card.Meta>
                                <Card.Description>
                                <strong>Subject : </strong>Plant Authentication and Seed Certificate <br></br><strong>Concern :</strong><br></br> Ut irure magna quis qui enim eiusmod eiusmod eiusmod ex dolor enim. Reprehenderit mollit dolor irure in magna nisi ut cillum quis ex reprehenderit eu voluptate. Veniam ullamco esse sit ad Lorem cillum reprehenderit Lorem est sint veniam. In Lorem sint ex Lorem amet ex Lorem. Enim ipsum veniam fugiat eiusmod. Sint aliqua sit ad anim laboris do tempor commodo aliquip dolor. Amet dolor pariatur mollit anim culpa fugiat ullamco.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green' onClick={(e)=>{RemarksModalHandler(123)}}>
                                    Add Remarks 
                                </Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content>
                            <Label as='a' color='red' ribbon>
                                {RenderCountdown(today,new Date("Wed 15 Jun 2023, 06:08 AM"))}
                            </Label>
                            <Icon name="users" 
                                floated='right' className=" right floated image" size="large"/>
                                <br></br>
                                <Card.Header style={{marginTop:'10px'}} >Paula Del Rosario</Card.Header>
                                <Card.Meta>June 13, 2023 06:08 AM</Card.Meta>
                                <Card.Description>
                                <strong>Subject : </strong>Seed Certificate <br></br><strong>Concern :</strong><br></br> Ut irure magna quis qui enim eiusmod eiusmod eiusmod ex dolor enim. 
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green' onClick={(e)=>{RemarksModalHandler(123)}}>
                                    Add Remarks 
                                </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <h4>
                        Completed Concern
                    </h4>
                    <Card.Group>
                        <Card fluid>
                            <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                               <Card.Header style={{marginTop:'10px'}} >Paula Del Rosario</Card.Header>
                                <Card.Meta>June 13, 2023 06:08 AM</Card.Meta>
                                <Card.Description>
                                <strong>Subject : </strong>Plant Authentication and Seed Certificate <br></br><strong>Concern :</strong><br></br> Ut irure magna quis qui enim eiusmod eiusmod eiusmod ex dolor enim. Reprehenderit mollit dolor irure in magna nisi ut cillum quis ex reprehenderit eu voluptate. Veniam ullamco esse sit ad Lorem cillum reprehenderit Lorem est sint veniam. In Lorem sint ex Lorem amet ex Lorem. Enim ipsum veniam fugiat eiusmod. Sint aliqua sit ad anim laboris do tempor commodo aliquip dolor. Amet dolor pariatur mollit anim culpa fugiat ullamco.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Accordion>
                                    <Accordion.Title 
                                        onClick={()=>HandleClick(1)}>
                                        <Icon name='dropdown' />
                                        Remarks
                                    </Accordion.Title>
                                    <Accordion.Content active={accordionIndex === 1}>
                                    <p>
                                        A dog is a type of domesticated animal. Known for its loyalty and
                                        faithfulness, it can be found as a welcome guest in many households
                                        across the world.
                                    </p>
                                    </Accordion.Content>
                                </Accordion>
                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                               <Card.Header style={{marginTop:'10px'}} >Paula Del Rosario</Card.Header>
                                <Card.Meta>June 13, 2023 06:08 AM</Card.Meta>
                                <Card.Description>
                                <strong>Subject : </strong>Seed Certificate <br></br><strong>Concern :</strong><br></br> Ut irure magna quis qui enim eiusmod eiusmod eiusmod ex dolor enim. 
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Accordion>
                                    <Accordion.Title 
                                        onClick={()=>HandleClick(2)}>
                                        <Icon name='dropdown' />
                                        Remarks
                                    </Accordion.Title>
                                    <Accordion.Content active={accordionIndex === 2}>
                                    <p>
                                        A dog is a type of domesticated animal. Known for its loyalty and
                                        faithfulness, it can be found as a welcome guest in many households
                                        across the world.
                                    </p>
                                    </Accordion.Content>
                                </Accordion>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                    <Container  textAlign="center" style={{marginTop:'10px'}}>
                        <a fluid  width>See More</a>
                    </Container>
                </Grid.Column>
            </Grid>
            </Segment>
            <Modal basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={confirmationOpen}
                size='small'>
                <Header icon>
                    <Icon name='send' />
                    Notify Thru Email
                </Header>
                <Modal.Content>
                    <p>
                    Your are attempting to send an email to the recipient, Do you want to continue?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                onClose={() => setRemarksOpen(false)}
                onOpen={() => setRemarksOpen(true)}
                open={remarksOpen}
                size='small'>
                <Header icon>
                    <Icon name='newspaper' />
                    Adding Remarks
                </Header>
                <Modal.Content>
                    <Form>
                        <textarea placeholder="Place your remarks here!"></textarea>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button  color='red' inverted onClick={() => setRemarksOpen(false)}>
                    <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={() => setRemarksOpen(false)}>
                    <Icon name='checkmark' /> Submit & Complete
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}


export default  Todo;