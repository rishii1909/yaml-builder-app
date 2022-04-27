import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import { Image, Input, Modal, ModalContent, ModalHeader, Table, TableCell, TableHeader, TableHeaderCell, TableRow, Button, Icon, Divider, Message, MessageHeader } from 'semantic-ui-react';
import { resourceTypes } from '../../components/resourceTypes';
import './Resource.css';

var fileDownload = require('js-file-download');

const YAML = require("json-to-pretty-yaml");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export const Resource = ({ resources, data, updateRegistry}) => {

    // const [data, setData] = useState();
    const [name, setName] = useState(data.name);
    const [error, setError] = useState(false)


    const [labels, setLabels] = useState([{
        name : "",
        value : ""   
    }])

    const [containers, setContainers] = useState([{
        name : "",
        image : "",
    }])

    const [resourceData, setResourceData] = useState({
        ...data,
        apiVersion : 'v1',
        kind : 'Pod',
        metadata : {
            name, 
            labels : [
                {
                    name : "Name",
                    value : "Value"   
                }
            ]
        },
        spec : {
            containers : []
        }
    });
    const [resource_type, setResource_type] = useState(data.resource_type)
    
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      

    }, [resourceData])
    

    function returnData(){
        return resourceData;
    }

    resources[resourceData.id].returnData = returnData;
    
    const handleNameChange = (value) => {
        setName(value);
        resourceData.name = value;
        setResourceData(resourceData);
    }

    const addLabel = () => {

        setLabels(labels => Object.assign([], labels, {
            [labels.length] : {
                name : "",
                value : ""
            }
        }))

        // console.log(labels);
    }

    const addContainer = () => {

        setContainers(containers => Object.assign([], containers, {
            [containers.length] : {
                name : "",
                image : ""
            }
        }))

        console.log(containers);
    }

    const downloadResource = () => {

        const resource_object = {
            apiVersion : "v1",
            kind : "Pod",
            metadata : {
                name : name,
                labels : labels
            },
            spec : {
                containers : containers
            }
        }

        const yaml_object = YAML.stringify(resource_object);

        fileDownload(yaml_object, `${name}.yaml`)
    } 
    
    return(
        
        <div>
            <Modal
            onClose={() => setModalOpen(false)}
            onOpen={() => setModalOpen(true)}
            open={modalOpen}
            closeOnDimmerClick
            dimmer
            
            trigger={
                <div key={data?.id}>
                    <img
                        className={`resource ${data?.resource_type} builder-icon-image`}
                        src={resourceTypes[data?.resource_type]?.icon}
                        alt={name}
                    />
                </div>
            }
            >
                <ModalHeader>
                    Pod Configuration
                </ModalHeader>
                <ModalContent >
                    <div className='modal-resource-wrapper' style={{backgroundImage : `linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.9)), url(${resourceTypes[resourceData.resource_type]?.icon})`}}>

                        <Table className="root-table">
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>
                                        Attribute
                                    </TableHeaderCell>
                                    <TableHeaderCell>
                                        Value(s)
                                    </TableHeaderCell>
                                </TableRow>
                            </TableHeader>

                            <TableRow>
                                <TableCell>
                                    API Version
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={resourceData.apiVersion}
                                        disabled
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Kind
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={resourceData.kind}
                                        disabled
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Metadata
                                </TableCell>
                                <TableCell>
                                    <Table>
                                        <TableRow>
                                            <TableCell>
                                                Name
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    value={name}
                                                    onChange={(evt) => setName(evt.target.value)}
                                                >
                                                </Input>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Labels
                                            </TableCell>
                                            <TableCell>
                                                <Table>
                                                    
                                                    <TableRow>
                                                        {labels.map((el, i) => 
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Input
                                                                    placeholder="Enter name"
                                                                    onChange={(evt) => {
                                                                        const new_name = evt.target.value;

                                                                        let label = labels[i];
                                                                        label.name = new_name;


                                                                        setLabels(labels => Object.assign([], labels, {[i]: label}));

                                                                    }}
                                                                    value={labels[i].name}
                                                                    >
                                                                        
                                                                    </Input>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Input
                                                                        placeholder="Enter value"
                                                                        onChange={(evt) => {
                                                                            const new_val = evt.target.value;

                                                                            let label = labels[i];
                                                                            label.value = new_val;

                                                                            setLabels(labels => Object.assign([], labels, {[i]: label}));

                                                                            
                                                                        }}
                                                                        value={labels[i].value}
                                                                    >
                                                                        
                                                                    </Input>
                                                                </TableCell> 
                                                            </TableRow>
                                                        )}
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                        <Button primary icon labelPosition='left' floated='right' onClick={addLabel}>
                                                            <Icon name="plus"></Icon>
                                                            Add a new Label
                                                        </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </TableCell>
                            </TableRow>
                            <TableRow>

                                <TableCell>
                                    Specifications
                                </TableCell>
                                <TableCell>
                                    <Table>
                                        <TableRow>
                                            <TableCell>
                                                Containers
                                            </TableCell>
                                            <TableCell>
                                                <Table> 
                                                    
                                                    <TableRow>
                                                        {containers.map((el, i) => 
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Input
                                                                    placeholder="Container Name"
                                                                    onChange={(evt) => {
                                                                        const new_name = evt.target.value;

                                                                        let container = containers[i];
                                                                        container.name = new_name;


                                                                        setContainers(containers => Object.assign([], containers, {[i]: container}));

                                                                    }}
                                                                    value={containers[i].name}
                                                                    >
                                                                        
                                                                    </Input>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Input
                                                                        placeholder="Container Image"
                                                                        onChange={(evt) => {
                                                                            const new_val = evt.target.value;

                                                                            let container = containers[i];
                                                                            container.image = new_val;

                                                                            setContainers(containers => Object.assign([], containers, {[i]: container}));

                                                                            
                                                                        }}
                                                                        value={containers[i].image}
                                                                    >
                                                                        
                                                                    </Input>
                                                                </TableCell> 
                                                            </TableRow>
                                                        )}
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                        <Button primary icon labelPosition='left' floated='right' onClick={addContainer}>
                                                            <Icon name="plus"></Icon>
                                                            Add a new container
                                                        </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </TableCell>
                            </TableRow>

                            
                            
                        </Table>

                        {error && 
                            <Message negative>
                                <MessageHeader>
                                    Error
                                </MessageHeader>
                                {error}
                            </Message>
                        }

                        <Divider></Divider>
                        <Button
                            icon
                            labelPosition='left'
                            floated='right'
                            onClick={() => downloadResource()}
                        >
                            <Icon name='download' ></Icon>
                            Download YAML
                        </Button>
                        <br/>
                        <br/>
                    </div>
                </ModalContent>
            </Modal>
            <div className="resource-label">
                <Input
                    transparent
                    
                    value={name}
                    onChange={(event) => handleNameChange(event.target.value)}
                >
                </Input>
            </div>
        </div>
    )
}