import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import { Image, Input, Modal, ModalContent, ModalHeader, Table, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { resourceTypes } from '../../components/resourceTypes';
import './Resource.css';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export const Resource = ({ resources, data, updateRegistry}) => {

    // const [data, setData] = useState();
    const [name, setName] = useState(data.name);
    const [show, setShow] = useState(false)
    const [labels, setLabels] = useState([{
        name : "Name",
        value : "Value"   
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

                        <Table>
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
                                    <Input fluid
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
                                    <Input fluid
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
                                                Labels
                                            </TableCell>
                                            <TableCell>
                                                <Table>
                                                    <TableRow>
                                                        {labels.map((el, i) => 
                                                            <>
                                                            <TableCell>
                                                                <Input
                                                                 onChange={(evt) => {
                                                                    const new_name = evt.target.value;

                                                                    let label = labels[i];
                                                                    label.name = new_name;

                                                                    console.log(label);
                                                                    setLabels(labels => [...labels, label]);

                                                                 }}
                                                                 value={labels[i].name}
                                                                >
                                                                    
                                                                </Input>
                                                            </TableCell>   
                                                            <TableCell>
                                                                <Input
                                                                    onChange={(evt) => {
                                                                        resourceData.metadata.labels[i].name = evt.target.value;
                                                                        setResourceData(resourceData);
                                                                     }}
                                                                    // value={resourceData.metadata.labels[i].value}
                                                                >
                                                                    
                                                                </Input>
                                                            </TableCell> 
                                                            </>
                                                        )}
                                                    </TableRow>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    API Version
                                </TableCell>
                                <TableCell>
                                    <Input fluid
                                        value={resourceData.apiVersion}
                                        disabled
                                    />
                                </TableCell>
                            </TableRow>
                            
                        </Table>
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