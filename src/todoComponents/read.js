import React,{useEffect,useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../home.sass";
import Logo from "./../favicon.ico";
import {  Container, Message, Placeholder, Table } from "semantic-ui-react";
import getCookie from "../cookies/getCookie";
import 'animate.css';
import AddNewConcern from "./addConcern";

const Todo = () => {
    const navigate = useNavigate();
    const user = getCookie("sessionID")
    const baseURL = `http://localhost:8000/todo/${user}`;
    const [employees, setEmployees] = useState([]);
    const [pageOption, setPageOption] = useState(["test"]);
    const [reachedPage, setReachedPage] = useState(false)
     
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
      

    const setEmployeeData = () => {
        const param = getParameter("page") !== null? getParameter("page"):1;
        axios.get(baseURL+`?page=`+param).then((response)=>{
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

    const PageController = (page) =>{
        navigate(`?page=${page}`)
        setReachedPage(false)
        setEmployeeData();
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
            <div className="controls">
                <AddNewConcern />  
            </div>
            <div className="dashboard-body">
            <Table celled >
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>No</Table.HeaderCell>
                    <Table.HeaderCell>Concern</Table.HeaderCell>
                    <Table.HeaderCell>Remarks</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body >
                    {employees.map((item, i)=>(
                        <Table.Row className="animate__animated animate__slideInLeft">
                            <Table.Cell>{(((pageOption[0].currentPage*50)-49)+i)}</Table.Cell>
                            <Table.Cell>{item.concern}</Table.Cell>
                            <Table.Cell negative>None</Table.Cell>
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
            </div>
        </div>
    )
}


export default  Todo;