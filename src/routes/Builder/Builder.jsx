import React, {useState, useEffect} from 'react'
import { Button, Input, Menu, MenuItem, Segment } from 'semantic-ui-react'
import FadeInMenuButton from '../../components/FadeInMenuButton/FadeInMenuButton';
import './Builder.css';
import uuid from 'react-uuid'
import { useDrag, useDrop } from 'react-dnd';
import { dragTypes } from '../../components/DragTypes';
import { resourceTypes } from '../../components/resourceTypes';
import { Resource } from './Resource';

var display_elements = {};

const pod_image = require('../../assets/images/pod.png')
const Builder = () => {

    const [resources, setResources] = useState({})
    const [test, setTest] = useState("")

    const insertResource = (resource) => {
        const resource_type = resource.resource_type;
        const uid = uuid();

        const new_node = {
            id : uid,
            blank : true,
            name : `New ${resource_type}`,
            resource_type,
        }

        resources[uid] = new_node;
        setResources(resources);

    }

    const fetchResource = (resource_id) => {
        const resource = resources[test].returnData();


    }

    const handleNameChange = (newName, key) => {
        let temp = resources[key];
        temp.name = newName;

        setResources(temp);
        console.log(resources);
      
    }

    const updateRegistry = (resource_key, update_field, update_val) => {
      resources[resource_key][update_field] = update_val;
      setResources(resources);
    }

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: dragTypes.RESOURCE,
        drop: insertResource,
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
      }));
    return(

        <div className='flexbox-body'>
            <div className='component-menu'>
                <Segment raised secondary >
                    <br />
                    <Menu inverted fluid vertical>
                        <FadeInMenuButton text="Pod" image={pod_image} />
                        <FadeInMenuButton text="Pod" image={pod_image} />
                        <FadeInMenuButton text="Pod" image={pod_image} />
                        <FadeInMenuButton text="Pod" image={pod_image} />
                        <FadeInMenuButton text="Pod" image={pod_image} />
                    </Menu>
                </Segment>
            </div>
            <Segment raised className="namespace-container" >
                    <div className="namespace" id="namespace" ref={dropRef} >
                        {/* {isOver ? '1' : '0'} */}
                        {/* {Object.keys(resources).length} */}
                        {Object.keys(resources).map((rs_key) => 

                            <>
                            <Resource resources={resources} data={resources[rs_key]} updateRegistry={updateRegistry}></Resource>
                            </>
                        )}
{/* 
                        <Input
                            value={test}
                            onChange={(event) => setTest(event.target.value)}
                        >
                        </Input>
                        <Button onClick={fetchResource}>
                            Test
                        </Button> */}

                    </div>
            </Segment>
        </div>
    )
}

export default Builder